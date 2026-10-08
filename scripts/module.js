import {initialProject,normalizeProject,defaultConfig,emptyExploration,publicProjection,overlaySVG,traceRoute,planTravel,alertHTML,tablesFor,key,pixelToHex,escapeHTML,hexplorationVisibilityUpdate} from './core.js';

const ID='wild-atlas';
const queues=new Map(),editors=new Map();
const view={regions:true,pins:true,auras:false,preview:false,symbols:true};
const actions=[['regions','KeyR','Toggle private region view'],['pins','KeyP','Toggle private pins'],['auras','KeyA','Toggle private pin auras'],['preview','KeyV','Switch DM / player view'],['symbols','KeyS','Toggle habitat symbols and difficulty dots'],['editor','KeyW','Open Wild Atlas editor']];
let dock;
const buttons=new Map();
const activeScene=()=>!!canvas.ready&&!!canvas.scene?.getFlag(ID,'enabled');
let overlay,overlayImage,hud,launcher,frameRequest,drawVersion=0;
const clone=value=>JSON.parse(JSON.stringify(value));
const gm=()=>{if(!game.user.isGM)throw new Error('Only the GM can edit Wild Atlas.');};
const report=e=>{console.error('Wild Atlas',e);ui.notifications.error(`Wild Atlas: ${e.message??e}`);};
function enqueue(scene,task){const next=(queues.get(scene.id)??Promise.resolve()).catch(()=>{}).then(task);queues.set(scene.id,next);return next;}
function master(scene){return game.journal.find(j=>j.getFlag(ID,'sceneId')===scene.id);}
function read(scene){
 gm();const journal=master(scene);if(!journal)return null;
 const page=journal.pages.find(p=>p.name==='Wild Atlas data');
 if(!page)throw new Error('Wild Atlas data page is missing. Restore the project JSON backup.');
 const element=document.createElement('div');element.innerHTML=page.text.content;
 return JSON.parse(element.textContent);
}
function safeText(text){const p=document.createElement('pre');p.textContent=text;return p.outerHTML;}
async function write(scene,record){
 gm();const data={name:'Wild Atlas data',type:'text',ownership:{default:0},text:{format:1,content:safeText(JSON.stringify(record))}};
 const journal=master(scene);
 if(journal){const page=journal.pages.find(p=>p.name===data.name);if(!page)throw new Error('Missing Wild Atlas data page.');await page.update({'text.content':data.text.content});}
 else await JournalEntry.create({name:`Wild Atlas · ${scene.name} · GM data`,ownership:{default:0},flags:{[ID]:{sceneId:scene.id}},pages:[data]});
}
function sceneProject(scene){
 if(!scene.grid.isHexagonal&&!scene.grid.isSquare)throw new Error('Choose a Square, Hexagonal Rows or Columns grid in Scene Configuration first.');
 if(scene.flags.core?.legacyHex)throw new Error('Legacy hex grids are unsupported. Create a new scene.');
 if(scene.background.rotation||(scene.background.scaleX??1)!==1||(scene.background.scaleY??1)!==1)throw new Error('Use background rotation 0 and scale 1 for exact alignment.');
 const d=scene.getDimensions(),origin=scene.grid.isSquare?scene.grid.getCenterPoint({i:0,j:0}):scene.grid.cubeToPoint({q:0,r:0,s:0});
 return normalizeProject({...clone(initialProject),imageMetadata:{name:scene.name,width:scene.width,height:scene.height,dataUrl:scene.background.src?new URL(scene.background.src,document.baseURI).href:undefined},grid:{...initialProject.grid,size:scene.grid.isSquare?scene.grid.size:scene.grid.size/Math.sqrt(3),orientation:scene.grid.isSquare?'square':scene.grid.columns?'flat':'pointy',foundryEven:scene.grid.even,offsetX:origin.x-d.sceneX,offsetY:origin.y-d.sceneY},foundry:defaultConfig()});
}
function sameGeometry(a,b){return a.imageMetadata.width===b.imageMetadata.width&&a.imageMetadata.height===b.imageMetadata.height&&a.grid.orientation===b.grid.orientation&&['size','offsetX','offsetY'].every(k=>Math.abs(a.grid[k]-b.grid[k])<.00001);}
function validate(p){
 if(p?.version!==1||!Array.isArray(p.regions)||!Array.isArray(p.markers)||!Array.isArray(p.labels)||!Number.isFinite(p.grid?.size)||p.grid.size<12)throw new Error('Invalid Wild Atlas project.');
 if(!Number.isFinite(p.imageMetadata?.width)||!Number.isFinite(p.imageMetadata?.height)||p.imageMetadata.width<1||p.imageMetadata.height<1)throw new Error('Invalid map dimensions.');
 const seen=new Set();for(const r of p.regions){if(typeof r.name!=='string'||r.terrain<1||r.terrain>4)throw new Error('Invalid region.');for(const h of r.hexes){if(!Number.isInteger(h.q)||!Number.isInteger(h.r)||seen.has(key(h)))throw new Error('Invalid or overlapping region hexes.');seen.add(key(h));}}
 for(const m of [...p.markers,...p.labels])if(!Number.isFinite(m.x)||!Number.isFinite(m.y)||(m.radiusHexes!==undefined&&(!Number.isInteger(m.radiusHexes)||m.radiusHexes<0||m.radiusHexes>50)))throw new Error('Invalid pin or aura.');
 for(const rule of [...Object.values(p.foundry?.encounters??{}),...Object.values(p.foundry?.hexEncounters??{}),...Object.values(p.foundry?.resultRules??{}),...p.regions.map(r=>r.encounterRule).filter(Boolean)])if(!Number.isFinite(rule.threshold)||rule.threshold<0||rule.mode==='chance'&&rule.threshold>100)throw new Error('Invalid encounter DC or chance.');
}
async function publish(scene,record){
 // Only explored, player-facing fields cross into the Scene. No full-region
 // geometry, table references, encounter rules, notes or secret pins are included.
 await scene.update({[`flags.${ID}.public`]:publicProjection(record.project,record.state.visited,record.state.trapDiscovery??[])});
}
async function save(scene,project,expectedRevision){
 gm();validate(project);const geometry=sceneProject(scene);
 if(!sameGeometry(project,geometry))throw new Error('The map grid differs from this scene. Use “Create new scene from map” to preserve this map and align a new scene.');
 if(project.imageMetadata.dataUrl&&project.imageMetadata.dataUrl!==geometry.imageMetadata.dataUrl)throw new Error('The background differs from this scene. Use “Create new scene from map”.');
 return enqueue(scene,async()=>{
  const old=read(scene);if(old&&expectedRevision!==undefined&&old.revision!==expectedRevision)throw new Error('Another editor saved this scene. Export your JSON, close and reopen the editor before merging changes.');
  const record={project:clone(project),state:old?.state??emptyExploration(),revision:(old?.revision??0)+1};
  delete record.project.playerToken;
  await write(scene,record);await publish(scene,record);return record.revision;
 });
}
async function listTables(){
 gm();const out=game.tables.map(t=>({uuid:t.uuid,name:t.name}));
 for(const pack of game.packs.filter(p=>p.documentName==='RollTable'&&p.visible)){
  try{const index=await pack.getIndex();for(const t of index)out.push({uuid:`Compendium.${pack.collection}.RollTable.${t._id}`,name:`${pack.metadata.label} / ${t.name}`});}catch(e){console.warn('Wild Atlas: unavailable table pack',pack.collection,e);}
 }
 return out.sort((a,b)=>a.name.localeCompare(b.name));
}
function plain(text){const el=document.createElement('div');el.innerHTML=String(text??'');return el.textContent.trim();}
async function getTable(uuid){gm();const table=await fromUuid(uuid);if(table?.documentName!=='RollTable')throw new Error('The selected UUID is not a RollTable.');return table;}
async function rollTable(kind,project){
 const uuid=project.foundry?.tables[kind],table=await getTable(uuid);
 // roll() evaluates without consuming results or publishing a chat message.
 const draw=await table.roll({recursive:true}),results=draw.results??[];
 if(!results.length)throw new Error(`${table.name} returned no result. Check its formula and drawn results.`);
 const texts=results.map(r=>plain(r.description??r.text??r.name));
 const text=texts.join('; '),local=tablesFor(project);
 if(kind==='habitat'){const entry=local.habitat.find(h=>h.name.toLowerCase()===text.toLowerCase());if(!entry)throw new Error(`Add habitat “${text}” and its colour/symbol in the editor tables first.`);if(entry.enabled===false)throw new Error(`${text} is disabled in this map. Adjust the Foundry table or enable it.`);return {value:entry.name};}
 if(kind==='terrain'){const entry=local.terrain.find(t=>t.name.toLowerCase()===text.toLowerCase()||String(t.value)===text);if(!entry||entry.enabled===false)throw new Error(`Difficulty result “${text}” must match an enabled difficulty name or 1–4.`);return {value:entry.value};}
 if(kind==='size'){const n=Number(text);if(!Number.isInteger(n)||n<1)throw new Error('Size table results must be positive numbers.');return {value:n};}
 return {value:text,rule:kind==='encounter'?project.foundry?.resultRules[`${uuid}#${results[0].id}`]:undefined};
}
async function createScene(project){
 gm();validate(project);const square=project.grid.orientation==='square',actualSize=square?project.grid.size:project.grid.size*Math.sqrt(3),size=Math.round(actualSize);
 if(size<50||Math.abs(size-actualSize)>.00001)throw new Error('In Map → Foundry alignment, apply a whole-pixel Foundry grid size first, then create the scene.');
 let src=project.imageMetadata.dataUrl??'';
 if(src.startsWith('data:')){
  if(!/^data:image\/(png|jpeg|webp);base64,/.test(src))throw new Error('Use a PNG, JPEG or WebP background.');
  const blob=await(await fetch(src)).blob(),ext=blob.type.split('/')[1];
  const picker=foundry.applications.apps.FilePicker.implementation;
  const directory=`worlds/${game.world.id}/wild-atlas`;
  await picker.createDirectory('data',directory).catch(async()=>{await picker.browse('data',directory);});
  const result=await picker.upload('data',directory,new File([blob],`map-${foundry.utils.randomID()}.${ext}`,{type:blob.type}),{}, {notify:false});
  if(!result.path)throw new Error('Background upload failed.');src=result.path;
 }else if(src){const url=new URL(src,document.baseURI);if(url.origin===location.origin)src=url.pathname.replace(/^\//,'');}
 const even=project.grid.foundryEven??false,pointy=project.grid.orientation==='pointy';
 const origin=square?{x:size/2,y:size/2}:{x:pointy?(even?size/2:0):size/Math.sqrt(3),y:pointy?size/Math.sqrt(3):(even?size/2:0)};
 // Padding calculation can still add a rounding margin. Account for it explicitly.
 const type=square?1:pointy?(even?3:2):(even?5:4);
 const grid=square?new foundry.grid.SquareGrid({size}):new foundry.grid.HexagonalGrid({columns:!pointy,even,size});
 const dims=grid.calculateDimensions(project.imageMetadata.width,project.imageMetadata.height,0);
 const offsetX=project.grid.offsetX-origin.x+dims.x,offsetY=project.grid.offsetY-origin.y+dims.y;
 if(Math.abs(offsetX-Math.round(offsetX))>.00001||Math.abs(offsetY-Math.round(offsetY))>.00001)throw new Error('Apply Foundry alignment in the Map tab first.');
 const scene=await Scene.create({name:project.imageMetadata.name||'Wild Atlas',width:project.imageMetadata.width,height:project.imageMetadata.height,padding:0,flags:{[ID]:{enabled:true}},background:{src,offsetX:Math.round(offsetX),offsetY:Math.round(offsetY)},grid:{type,size,alpha:0},tokenVision:false,fogExploration:false});
 const p=clone(project);p.imageMetadata.dataUrl=src?new URL(src,document.baseURI).href:undefined;
 await save(scene,p);await scene.view();ui.notifications.info('Wild Atlas scene created. Close the old editor and open Wild Atlas on this scene.');
}
function connectEditor(windowRef){
 gm();const entry=[...editors.values()].find(e=>e.frame.contentWindow===windowRef);
 if(!entry)throw new Error('Unknown Wild Atlas editor window.');
 const scene=entry.scene;
 return {sceneName:scene.name,load:async()=>{gm();const record=read(scene);entry.revision=record?.revision??0;const p=clone(record?.project??sceneProject(scene));p.imageMetadata.dataUrl=sceneProject(scene).imageMetadata.dataUrl;return p;},
  save:async project=>{entry.revision=await save(scene,project,entry.revision);},create:createScene,tables:listTables,
  results:async uuid=>(await getTable(uuid)).results.map(r=>({id:r.id,name:plain(r.description??r.text??r.name)})),roll:rollTable,
  selectToken:async()=>{gm();if(canvas.scene?.id!==scene.id)throw new Error('Return to this editor’s scene first.');const tokens=canvas.tokens.controlled;if(!tokens.length)throw new Error('Select a token on the canvas first.');if(scene.getFlag(ID,'trackedActorUuid'))throw new Error('This scene tracks a group actor UUID. Clear it in Scene Configure → Basics to select individual tokens.');for(const t of tokens)await t.document.setFlag(ID,'explorer',true);refreshReadout();return `${tokens.map(t=>t.name).join(', ')} will reveal hexes. Use the scene toolbar to turn tracking off.`;},
  getView:()=>({...view}),subscribeView:listener=>{entry.onView=listener;return()=>{entry.onView=null;};},toggle,reset:()=>enqueue(scene,async()=>{gm();const record=read(scene);if(!record)return;record.state=emptyExploration();await write(scene,record);await publish(scene,record);})};
}
function openEditor(){
 gm();const scene=canvas.scene;if(!scene)return ui.notifications.warn('Open a scene first.');if(!activeScene())return ui.notifications.warn('Right-click the scene → Configure → enable Wild Atlas exploration scene.');
 if(editors.has(scene.id)){editors.get(scene.id).shell.hidden=false;return;}
 try{sceneProject(scene);}catch(e){return report(e);}
 const shell=document.createElement('section');shell.className='wild-atlas-editor';
 const bar=document.createElement('div');bar.className='wild-atlas-windowbar';
 const title=document.createElement('b');title.textContent=`Wild Atlas · ${scene.name}`;
 const minimize=document.createElement('button');minimize.textContent='Minimize';minimize.onclick=()=>shell.hidden=true;
 const close=document.createElement('button');close.type='button';close.textContent='Close';close.title='Hide editor and keep unsaved edits for this session';close.onclick=()=>{shell.hidden=true;};
 bar.append(title,minimize,close);const frame=document.createElement('iframe');frame.title='Wild Atlas editor';frame.src=`modules/${ID}/editor/index.html`;
 frame.addEventListener('load',()=>{try{frame.contentWindow.addEventListener('keydown',handleEditorKey);}catch(e){report(e);}});
 editors.set(scene.id,{shell,frame,scene,revision:0});shell.append(bar,frame);document.body.append(shell);
}
function positionDock(x,y){
 const r=dock.getBoundingClientRect();
 dock.style.left=Math.max(0,Math.min(x,window.innerWidth-r.width))+'px';
 dock.style.top=Math.max(0,Math.min(y,window.innerHeight-r.height))+'px';
}
function draggableDock(){
 const storageKey=ID+':dock:'+game.world.id+':'+game.user.id;
 let saved;try{saved=JSON.parse(localStorage.getItem(storageKey));}catch{}
 requestAnimationFrame(()=>positionDock(Number.isFinite(saved?.x)?saved.x:(window.innerWidth-dock.offsetWidth)/2,Number.isFinite(saved?.y)?saved.y:70));
 let drag;
 dock.title='Hold right mouse button and drag to move';
 dock.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();});
 dock.addEventListener('pointerdown',e=>{
  if(e.button!==2)return;
  e.preventDefault();e.stopPropagation();const r=dock.getBoundingClientRect();
  drag={id:e.pointerId,x:e.clientX-r.left,y:e.clientY-r.top};dock.setPointerCapture(e.pointerId);dock.classList.add('is-dragging');
 },true);
 dock.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();e.stopPropagation();positionDock(e.clientX-drag.x,e.clientY-drag.y);});
 const finish=e=>{if(!drag||drag.id!==e.pointerId)return;e.stopPropagation();drag=null;dock.classList.remove('is-dragging');if(dock.hasPointerCapture(e.pointerId))dock.releasePointerCapture(e.pointerId);try{localStorage.setItem(storageKey,JSON.stringify({x:parseFloat(dock.style.left),y:parseFloat(dock.style.top)}));}catch{}};
 dock.addEventListener('pointerup',finish);dock.addEventListener('pointercancel',finish);dock.addEventListener('lostpointercapture',finish);
 new ResizeObserver(()=>{if(!dock.hidden)positionDock(parseFloat(dock.style.left)||0,parseFloat(dock.style.top)||0);}).observe(dock);
 window.addEventListener('resize',()=>positionDock(parseFloat(dock.style.left)||0,parseFloat(dock.style.top)||0));
}
function updateControls(){
 if(dock)dock.hidden=!activeScene();
 for(const [action,b]of buttons){
  const playerOnly=action==='symbols';b.hidden=!playerOnly&&!game.user.isGM;
  if(action==='editor'||action==='untrack')continue;
  const on=view[action];b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));
  const label={regions:'Regions',pins:'Pins',auras:'Auras',symbols:'Symbols'}[action];
  b.textContent={regions:'⬡',symbols:'✦',pins:'⚑',auras:'◎',preview:on?'👁':'◆'}[action];
  b.setAttribute('aria-label',action==='preview'?(on?'View: Player':'View: DM'):label+': '+(on?'On':'Off'));
  b.title=b.getAttribute('aria-label')+' — click to toggle';
 }
 for(const entry of editors.values())entry.onView?.({...view});
}
function toggle(which){if(which!=='symbols')gm();if(!(which in view)||!activeScene())return;view[which]=!view[which];updateControls();game.settings.set(ID,'view-'+which,view[which]).catch(report);draw().catch(report);}
function runAction(action){if(!activeScene()||(action!=='symbols'&&!game.user.isGM))return false;try{action==='editor'?openEditor():toggle(action);return true;}catch(e){report(e);return false;}}
function handleEditorKey(event){
 if(event.repeat||event.target?.closest?.('input,textarea,select,[contenteditable="true"]'))return;
 const modifiers=[...(event.altKey?['Alt']:[]),...(event.ctrlKey||event.metaKey?['Control']:[]),...(event.shiftKey?['Shift']:[])];
 for(const [action]of actions){const bindings=game.keybindings.get(ID,action)??[];if(bindings.some(b=>(b.key===event.code||b.key===event.key.toUpperCase())&&(b.modifiers??[]).length===modifiers.length&&(b.modifiers??[]).every(m=>modifiers.includes(m)))){if(runAction(action)){event.preventDefault();event.stopPropagation();}return;}}
}
async function draw(){
 const version=++drawVersion,scene=canvas.scene;updateControls();refreshReadout();if(!activeScene()){if(overlay)overlay.hidden=true;if(hud)hud.hidden=true;for(const entry of editors.values())entry.shell.hidden=true;return;}
 let map=scene.getFlag(ID,'public');let project;
 if(game.user.isGM&&!view.preview){const record=read(scene);project=record?.project;if(project){map=publicProjection(project,project.regions.flatMap(r=>r.hexes.map(key)));map.markers=project.markers;map.labels=project.labels;}}
 if(!map){if(overlay)overlay.hidden=true;return;}
 const svg=overlaySVG(map,{regions:!game.user.isGM||view.regions,pins:!game.user.isGM||view.pins,symbols:view.symbols,auras:game.user.isGM&&!view.preview&&view.auras,project});
 if(version!==drawVersion)return;
 if(!overlay){overlay=document.createElement('div');overlay.className='wild-atlas-overlay';overlayImage=document.createElement('img');overlayImage.alt='';overlay.append(overlayImage);document.body.append(overlay);}
 overlay.hidden=false;overlayImage.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;overlayImage.style.width=`${map.width}px`;overlayImage.style.height=`${map.height}px`;
 updateTransform();
}
function updateTransform(){
 if(!overlay||overlay.hidden||!canvas.ready)return;
 const d=canvas.scene.getDimensions(),t=canvas.stage.worldTransform,rect=canvas.app.view.getBoundingClientRect();
 overlay.style.left=`${rect.left}px`;overlay.style.top=`${rect.top}px`;overlay.style.width=`${rect.width}px`;overlay.style.height=`${rect.height}px`;
 overlayImage.style.transform=`matrix(${t.a},${t.b},${t.c},${t.d},${t.tx+d.sceneX*t.a+d.sceneY*t.c},${t.ty+d.sceneX*t.b+d.sceneY*t.d})`;
}
function scheduleTransform(){cancelAnimationFrame(frameRequest);frameRequest=requestAnimationFrame(updateTransform);}
function trackedTokens(scene){
 const tokens=Array.from(scene.tokens??[]);
 const uuid=String(scene.getFlag(ID,'trackedActorUuid')??'').trim();
 if(uuid){return tokens.filter(t=>t.actor?.uuid===uuid||('Actor.'+t.actorId)===uuid).slice(0,1);}
 return tokens.filter(t=>t.getFlag(ID,'explorer'));
}
function isTracked(token){
 const uuid=String(token.parent.getFlag(ID,'trackedActorUuid')??'').trim();
 return uuid?trackedTokens(token.parent).some(t=>t.id===token.id):!!token.getFlag(ID,'explorer');
}
function refreshReadout(){
 if(!dock)return;
 if(!game.user.isGM||!activeScene()){if(hud)hud.hidden=true;return;}
 if(!hud){hud=document.createElement('aside');hud.className='wild-atlas-readout';dock.append(hud);}
 const scene=canvas.scene,tokens=trackedTokens(scene),token=tokens.find(t=>canvas.tokens.controlled.some(c=>c.document.id===t.id))??tokens[0];
 const project=read(scene)?.project;
 if(!token||!project){hud.innerHTML='<strong>DM · PLAYER LOCATION</strong><div>'+(!token?'No tracked token on this scene. Link a group actor UUID in Scene Configure → Basics, or select a token in the editor.':'Save a Wild Atlas map to this scene first.')+'</div><div>Cell: — · Habitat: — · Difficulty: — · Terrain: —</div><div>Nearby: —</div>';hud.hidden=false;return;}
 const center=token.getCenterPoint(token._source),d=scene.getDimensions(),cell=pixelToHex(center.x-d.sceneX,center.y-d.sceneY,project.grid);
 const result=planTravel(project,emptyExploration(),[cell],game.time.worldTime,cell,token.id);
 showReadout(token.name,result,project,cell);
}
function showReadout(token,result,project,cell){
 if(!game.user.isGM||!activeScene())return;if(!hud){hud=document.createElement('aside');hud.className='wild-atlas-readout';dock.append(hud);}
 const region=project?.regions.find(r=>r.hexes.some(h=>key(h)===key(cell)));
 hud.innerHTML=`<strong>DM · PLAYER LOCATION</strong><div><b>${escapeHTML(token)}</b> · ${escapeHTML(result.region??'Unassigned region')}</div><div>Cell: ${cell?escapeHTML(key(cell)):'—'} · Habitat: ${escapeHTML(region?.kind==='trap'?'Trap':region?.habitat??'—')} · Difficulty: ${region?'•'.repeat(region.terrain):'—'} · Terrain: ${escapeHTML(region?(tablesFor(project).terrain.find(t=>t.value===region.terrain)?.name??String(region.terrain)):'—')}</div><div class="wild-atlas-nearby">Nearby: ${result.nearby.length?result.nearby.map(m=>escapeHTML(m.title)).join(', '):'None'}</div>`;hud.hidden=false;
}
async function moved(token,movement){
 // The elected active GM serializes all scene writes, avoiding duplicate whispers
 // and lost discoveries when multiple tokens move together.
 if(!game.user.isGM||!game.users.activeGM?.isSelf||!isTracked(token))return;
 const scene=token.parent;if(!scene.getFlag(ID,'enabled'))return;
 const id=`${token.id}:${movement.id}`;
 const d=scene.getDimensions();
 const source=movement.passed?.waypoints??[];
 if(!source.length)return;
 const points=[movement.origin,...source].map(p=>{const center=token.getCenterPoint({...token._source,...p});return {x:center.x-d.sceneX,y:center.y-d.sceneY,teleport:p.teleport===true||CONFIG.Token.movement.actions[p.action]?.teleport===true};});
 return enqueue(scene,async()=>{
  const record=read(scene);if(!record||record.state.processed.includes(id))return;
  const route=traceRoute(points,record.project.grid).filter(h=>{const p=record.project;const center=pixelCenter(h,p.grid);return center.x>=0&&center.y>=0&&center.x<=p.imageMetadata.width&&center.y<=p.imageMetadata.height;});
  if(!route.length)return;
  const result=planTravel(record.project,record.state,route,game.time.worldTime,pixelToHex(points[0].x,points[0].y,record.project.grid),token.id);
  record.state=result.state;record.state.processed=[...record.state.processed,id].slice(-200);
  await write(scene,record);await publish(scene,record);
  if(result.alerts.length||result.pinEntries.length)await ChatMessage.create({speaker:{alias:token.name},whisper:game.users.filter(u=>u.isGM).map(u=>u.id),content:alertHTML(token.name,result,true)});
  if(canvas.scene?.id===scene.id)showReadout(token.name,result,record.project,route.at(-1));
 });
}
function pixelCenter(h,g){if(g.orientation==='square')return {x:g.offsetX+g.size*h.q,y:g.offsetY+g.size*h.r};return g.orientation==='pointy'?{x:g.offsetX+g.size*Math.sqrt(3)*(h.q+h.r/2),y:g.offsetY+g.size*1.5*h.r}:{x:g.offsetX+g.size*1.5*h.q,y:g.offsetY+g.size*Math.sqrt(3)*(h.r+h.q/2)};}
Hooks.once('init',()=>{
 for(const k of Object.keys(view))game.settings.register(ID,'view-'+k,{scope:'client',config:false,type:Boolean,default:view[k]});
 for(const [action,keyName,name]of actions)game.keybindings.register(ID,action,{name,editable:[{key:keyName,modifiers:['Alt']}],restricted:action!=='symbols',precedence:CONST.KEYBINDING_PRECEDENCE.PRIORITY,onDown:context=>context?.repeat?false:runAction(action)});
});
Hooks.once('ready',()=>{
 game.modules.get(ID).api={openEditor,connectEditor};
 for(const k of Object.keys(view))view[k]=game.settings.get(ID,'view-'+k);
 dock=document.createElement('div');dock.className='wild-atlas-dock';launcher=document.createElement('div');launcher.className='wild-atlas-toolbar';dock.append(launcher);document.body.append(dock);draggableDock();
 for(const [action,label,callback]of [['editor','Wild Atlas',openEditor],['regions','Regions',()=>toggle('regions')],['symbols','Symbols',()=>toggle('symbols')],['pins','Pins',()=>toggle('pins')],['auras','Auras',()=>toggle('auras')],['preview','View: DM',()=>toggle('preview')],['untrack','Untrack token',async()=>{if(canvas.scene.getFlag(ID,'trackedActorUuid')){ui.notifications.info('Clear the group actor UUID in Scene Configure → Basics to stop actor tracking.');return;}for(const t of canvas.tokens.controlled)await t.document.unsetFlag(ID,'explorer');refreshReadout();ui.notifications.info('Selected tokens no longer reveal hexes.');}]]){
  const b=document.createElement('button');b.type='button';b.textContent=action==='untrack'?'⊘':label;b.title=label;b.setAttribute('aria-label',label);b.onclick=()=>Promise.resolve().then(callback).catch(report);buttons.set(action,b);launcher.append(b);
 }
 refreshScene().catch(report);
});
async function refreshScene(){
 if(activeScene()&&game.user.isGM&&game.users.activeGM?.isSelf){const scene=canvas.scene,patch=hexplorationVisibilityUpdate(scene);if(Object.keys(patch).length){await scene.update(patch);return;}}
 refreshReadout();
 if(activeScene()&&game.user.isGM&&game.users.activeGM?.isSelf){const scene=canvas.scene;await enqueue(scene,async()=>{const record=read(scene);if(record)await publish(scene,record);});}
 await draw();
}
Hooks.on('preUpdateScene',(scene,changes)=>{const patch=hexplorationVisibilityUpdate(scene,changes);foundry.utils.mergeObject(changes,patch,{inplace:true});});
Hooks.on('renderSceneConfig',(app,html)=>{
 if(!game.user.isGM)return;
 const root=html instanceof HTMLElement?html:html?.[0];if(!root||root.querySelector('[data-wild-atlas-config]'))return;
 const target=root.querySelector('.tab[data-tab="basics"]')??root.querySelector('[data-application-part="basics"]');
 if(!target)return;
 const group=document.createElement('div');group.className='form-group';group.dataset.wildAtlasConfig='true';
 const label=document.createElement('label');label.textContent='Wild Atlas exploration scene';
 const fields=document.createElement('div');fields.className='form-fields';const input=document.createElement('input');input.type='checkbox';input.name='flags.'+ID+'.enabled';input.checked=!!app.document.getFlag(ID,'enabled');fields.append(input);
 const hint=document.createElement('p');hint.className='hint';hint.textContent='Hex or square exploration: players see the background and discover cells as they move. Temporarily disables Token Vision and Fog Exploration; disabling restores them.';
 label.htmlFor='wild-atlas-scene-'+app.document.id;input.id=label.htmlFor;group.append(label,fields,hint);target.append(group);
 const actorGroup=document.createElement('div');actorGroup.className='form-group';
 const actorLabel=document.createElement('label');actorLabel.textContent='Wild Atlas group actor UUID';
 const actorInput=document.createElement('input');actorInput.type='text';actorInput.name='flags.'+ID+'.trackedActorUuid';actorInput.id='wild-atlas-actor-'+app.document.id;actorLabel.htmlFor=actorInput.id;actorInput.placeholder='Actor.abcdefghijklmnop';actorInput.value=app.document.getFlag(ID,'trackedActorUuid')??'';actorInput.pattern='Actor\\.[A-Za-z0-9_-]+';
 const actorHint=document.createElement('p');actorHint.className='hint';actorHint.textContent='Paste a world actor UUID. Its token on this scene becomes the only explorer, overriding individual tracking. Place one token for this actor; if duplicated, only the first is tracked. Leave blank to track individual tokens.';
 actorGroup.append(actorLabel,actorInput,actorHint);target.append(actorGroup);
});
Hooks.on('canvasReady',()=>refreshScene().catch(report));
Hooks.on('canvasTearDown',()=>{drawVersion++;if(overlay)overlay.hidden=true;if(hud)hud.hidden=true;if(dock)dock.hidden=true;for(const entry of editors.values())entry.shell.hidden=true;});
Hooks.on('canvasPan',scheduleTransform);
window.addEventListener('resize',scheduleTransform);
Hooks.on('updateScene',(scene,changes)=>{if(scene.id!==canvas.scene?.id)return;if(changes?.flags?.[ID]?.enabled===true)refreshScene().catch(report);else draw().catch(report);});
Hooks.on('updateJournalEntryPage',page=>{if(page.parent?.getFlag(ID,'sceneId')===canvas.scene?.id&&game.user.isGM)draw().catch(report);});
Hooks.on('moveToken',(token,movement)=>moved(token,movement).catch(report));

for(const hook of ['updateToken','createToken','deleteToken'])Hooks.on(hook,token=>{if(token.parent?.id===canvas.scene?.id)refreshReadout();});
Hooks.on('controlToken',()=>refreshReadout());
