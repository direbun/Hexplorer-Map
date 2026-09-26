import { renderToStaticMarkup } from 'react-dom/server';
import { Symbol } from '../components/Symbol';
import { initialProject, type MapProject, type HexCoordinate, type GridSettings } from '../model';
import { normalizeProject,tablesFor,regionColour } from '../projectSettings';
import { corners,hexToPixel,pixelToHex,key,boundaryPath,getRegionBoundaryEdges } from '../hex';
import { hexArea,hexDistance,pinContains,pinArea } from '../proximity';
import { defaultConfig, type EncounterRule } from './types';
export {initialProject,normalizeProject,defaultConfig,pixelToHex,hexToPixel,key,tablesFor};
export {hexplorationVisibilityUpdate} from './visibility';
export type Point={x:number;y:number;teleport?:boolean};

// Clip each actual movement segment against hex polygons. This follows bends and
// excludes cells merely touched at an edge or vertex; centre-to-centre interpolation does not.
export function traceSegment(a:Point,b:Point,g:GridSettings):HexCoordinate[]{
 const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy);
 if(!length)return [];
 const candidates=new Map<string,HexCoordinate>();
 const samples=Math.ceil(length/(g.size*.3));
 if(samples>100000)throw new Error('Movement is too long. Split it into shorter moves.');
 for(let i=0;i<=samples;i++)for(const h of hexArea(pixelToHex(a.x+dx*i/samples,a.y+dy*i/samples,g),1,g))candidates.set(key(h),h);
 const hits:{h:HexCoordinate;t:number}[]=[];
 for(const h of candidates.values()){
  const polygon=corners(h,g);let lo=0,hi=1;
  for(let i=0;i<polygon.length;i++){
   const p=polygon[i],q=polygon[(i+1)%polygon.length],ex=q.x-p.x,ey=q.y-p.y;
   const n=ex*(a.y-p.y)-ey*(a.x-p.x),d=ex*dy-ey*dx;
   if(Math.abs(d)<1e-9){if(n< -1e-8){hi=-1;break;}}
   else if(d>0)lo=Math.max(lo,-n/d);else hi=Math.min(hi,-n/d);
  }
  if(hi-lo>1e-8&&hi>=0&&lo<=1){const midpoint=(lo+hi)/2;if(key(pixelToHex(a.x+dx*midpoint,a.y+dy*midpoint,g))===key(h))hits.push({h,t:lo});}
 }
 hits.sort((x,y)=>x.t-y.t||key(x.h).localeCompare(key(y.h)));
 return hits.map(x=>x.h);
}
export function traceRoute(points:Point[],g:GridSettings):HexCoordinate[]{
 if(points.length<2)return [];
 const out:HexCoordinate[]=[];let previous=key(pixelToHex(points[0].x,points[0].y,g));
 for(let i=1;i<points.length;i++){
  const cells=points[i].teleport?[pixelToHex(points[i].x,points[i].y,g)]:traceSegment(points[i-1],points[i],g);
  for(const h of cells){if(key(h)!==previous)out.push(h);previous=key(h);}
 }
 return out;
}
export interface Exploration {visited:string[];triggered:Record<string,number>;processed:string[];trapDiscovery?:string[];pinOccupancy?:Record<string,string[]>}
export function emptyExploration():Exploration{return {visited:[],triggered:{},processed:[]};}
export function planTravel(project:MapProject,state:Exploration,route:HexCoordinate[],worldTime:number,origin?:HexCoordinate,tokenId='party'){
 const trapDiscovery=new Set(state.trapDiscovery??[]),visited=new Set(state.visited),triggered={...state.triggered};
 const byHex=new Map(project.regions.flatMap(r=>r.hexes.map(h=>[key(h),r] as const)));
 const config=project.foundry??defaultConfig(),day=Math.floor(worldTime/86400);
 const alerts:{hex:string;region:string;rule:EncounterRule}[]=[];
 for(const h of route){
  const k=key(h),r=byHex.get(k),first=!visited.has(k);visited.add(k);if(r?.kind==='trap')trapDiscovery.add(r.id+':'+k);
  const rule=config.hexEncounters[k]??(r?config.encounters[r.id]??r.encounterRule:undefined);
  if(!rule?.enabled||!rule.text.trim())continue;
  if(rule.repeat==='discovery'&&!first||rule.repeat==='day'&&triggered[k]===day)continue;
  alerts.push({hex:k,region:r?.name||'Unassigned region',rule});triggered[k]=day;
 }
 const destination=route.at(-1),pins=project.markers.filter(m=>m.alertEnabled);
 let inside=new Set(origin?pins.filter(m=>pinContains(project,m,origin)).map(m=>m.id):state.pinOccupancy?.[tokenId]??[]);
 const pinEntries:{title:string;distance:number;mode?:'radius'|'region';hex:string}[]=[];
 for(const h of route){const next=new Set(pins.filter(m=>pinContains(project,m,h)).map(m=>m.id));for(const m of pins)if(next.has(m.id)&&!inside.has(m.id))pinEntries.push({title:m.title,distance:hexDistance(h,pixelToHex(m.x,m.y,project.grid),project.grid),mode:m.alertMode,hex:key(h)});inside=next;}
 const nearby=destination?pins.filter(m=>pinContains(project,m,destination)).map(m=>({title:m.title,distance:hexDistance(destination,pixelToHex(m.x,m.y,project.grid))})):[];
 return {state:{...state,visited:[...visited],triggered,trapDiscovery:[...trapDiscovery],pinOccupancy:{...state.pinOccupancy,[tokenId]:[...inside]}},alerts,nearby,pinEntries,region:destination?byHex.get(key(destination))?.name:undefined};
}
export interface PublicHex {q:number;r:number;name:string;habitat:string;terrain:number;color:string;symbol:string}
export interface PublicMap {version:1;grid:GridSettings;width:number;height:number;opacity:number;borders?:string;hexes:PublicHex[];markers:{id:string;x:number;y:number;title:string;kind:string}[];labels:{id:string;x:number;y:number;title:string}[]}
export function publicProjection(p:MapProject,visited:string[],trapDiscovery?:string[]):PublicMap{
 const seen=new Set(visited),traps=trapDiscovery?new Set(trapDiscovery):null;
 const revealed=(r:MapProject['regions'][number],h:HexCoordinate)=>seen.has(key(h))&&(r.kind!=='trap'||!traps||traps.has(r.id+':'+key(h)));
 const habitats=tablesFor(p).habitat;
 const edgeKey=(e:ReturnType<typeof getRegionBoundaryEdges>[number])=>[`${e.a.x.toFixed(5)},${e.a.y.toFixed(5)}`,`${e.b.x.toFixed(5)},${e.b.y.toFixed(5)}`].sort().join('|');
 const borders=p.regions.flatMap(r=>{const boundary=new Set(getRegionBoundaryEdges(r.hexes,p.grid).map(edgeKey));return r.hexes.filter(h=>revealed(r,h)).flatMap(h=>getRegionBoundaryEdges([h],p.grid).filter(e=>boundary.has(edgeKey(e))));}).map(e=>`M${e.a.x},${e.a.y}L${e.b.x},${e.b.y}`).join(' ');
 return {version:1,grid:{...p.grid},width:p.imageMetadata.width,height:p.imageMetadata.height,opacity:p.view?.regionOpacity??.42,borders,
  hexes:p.regions.flatMap(r=>r.hexes.filter(h=>revealed(r,h)).map(h=>({q:h.q,r:h.r,name:r.name,habitat:r.kind==='trap'?'Trap':r.habitat,terrain:r.terrain,color:r.kind==='trap'?'#df4d44':regionColour(habitats.find(e=>e.name===r.habitat)?.color??'#777777',r.terrain),symbol:r.kind==='trap'?'Trap':habitats.find(e=>e.name===r.habitat)?.symbol??'Forest'}))),
  markers:p.markers.filter(m=>!m.hidden&&seen.has(key(pixelToHex(m.x,m.y,p.grid)))).map(({id,x,y,title,kind})=>({id,x,y,title,kind})),
  labels:p.labels.filter(m=>!m.hidden&&seen.has(key(pixelToHex(m.x,m.y,p.grid)))).map(({id,x,y,title})=>({id,x,y,title}))};
}
export const escapeHTML=(s:unknown)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function alertHTML(token:string,result:ReturnType<typeof planTravel>,chat=false){
 return `<section><h3>${escapeHTML(token)} · Wild Atlas</h3>${result.region?`<p>Region: <b>${escapeHTML(result.region)}</b></p>`:''}${result.alerts.map(a=>`<p><b>${escapeHTML(a.region)} · Cell ${escapeHTML(a.hex)}</b><br>${a.rule.mode==='dc'?`${escapeHTML(a.rule.check)} DC ${a.rule.threshold}; on ${a.rule.trigger}`:`${a.rule.threshold}% chance`}: ${escapeHTML(a.rule.text)}</p>`).join('')}${(chat?result.pinEntries:result.nearby).map(m=>`<p>${chat?'Entered pin alert area':'Nearby'} — <b>${escapeHTML(m.title)}</b> (${m.distance} cell${m.distance===1?'':'s'})</p>`).join('')}</section>`;
}
export function overlaySVG(map:PublicMap,options:{regions:boolean;pins:boolean;auras:boolean;symbols?:boolean;project?:MapProject}){
 const g=map.grid;
 return renderToStaticMarkup(<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${map.width} ${map.height}`} width={map.width} height={map.height}><defs><clipPath id="atlas-bounds"><rect width={map.width} height={map.height}/></clipPath></defs><g clipPath="url(#atlas-bounds)">
 {options.regions&&map.hexes.map(h=>{const p=hexToPixel(h,g);return <g key={key(h)}><polygon points={corners(h,g).map(c=>`${c.x},${c.y}`).join(' ')} fill={h.color} fillOpacity={map.opacity} stroke="#27271f" strokeOpacity=".35" strokeWidth={g.thickness}/>{options.symbols!==false&&<g data-habitat-symbol="true" transform={`translate(${p.x} ${p.y-4})`}><Symbol habitat={h.symbol as Parameters<typeof Symbol>[0]['habitat']} terrain={h.terrain} size={g.size/70}/></g>}</g>;})}
 {options.regions&&map.borders&&<path data-region-borders="true" d={map.borders} fill="none" stroke="#000000" strokeWidth={Math.max(3,g.size*.055)} strokeLinejoin="round" strokeLinecap="round"/>}
 {options.auras&&options.project?.markers.filter(m=>m.alertEnabled).map(m=><path key={m.id} d={boundaryPath(pinArea(options.project!,m),g)} fill="none" stroke="#ae5cfa" strokeWidth="3" strokeDasharray="8 5"/>)}
 {options.pins&&map.markers.map(m=><g key={m.id} transform={`translate(${m.x} ${m.y})`}><circle r="12" fill="#fff5da" stroke="#302924" strokeWidth="2"/><text textAnchor="middle" y="5" fontSize="16">{m.kind==='star'?'★':m.kind==='danger'?'!':'◆'}</text><text y="29" textAnchor="middle" fontSize="15" fill="#111" stroke="#fff" strokeWidth="3" paintOrder="stroke">{m.title}</text></g>)}
 {options.pins&&map.labels.map(m=><text key={m.id} x={m.x} y={m.y} textAnchor="middle" fontSize="22" fill="#111" stroke="#fff" strokeWidth="3" paintOrder="stroke">{m.title}</text>)}
 </g></svg>);
}
