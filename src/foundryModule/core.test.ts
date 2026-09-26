import {describe,it,expect} from 'vitest';
import {traceRoute,hexToPixel,initialProject,normalizeProject,planTravel,emptyExploration,publicProjection,alertHTML,overlaySVG} from './core';
import {defaultEncounter,defaultConfig} from './types';
const make=()=>normalizeProject({...structuredClone(initialProject),foundry:defaultConfig(),regions:[{id:'forest',name:'Frostwood',habitat:'Forest',terrain:3,notes:'secret GM note',hexes:[{q:0,r:0},{q:1,r:0},{q:2,r:0},{q:3,r:0},{q:4,r:0}],encounter:'Hidden wolf ambush'}]});
describe('Foundry route tracing',()=>{
 for(const orientation of ['flat','pointy'] as const)it(`follows every entered hex in ${orientation} grids`,()=>{
  const g={...initialProject.grid,orientation,offsetX:120,offsetY:83};
  expect(traceRoute([{q:0,r:0},{q:4,r:0}].map(h=>hexToPixel(h,g)),g)).toEqual([{q:1,r:0},{q:2,r:0},{q:3,r:0},{q:4,r:0}]);
 });
 it('follows a bend and preserves re-entry without duplicating shared waypoints',()=>{const g=initialProject.grid;expect(traceRoute([{q:0,r:0},{q:2,r:0},{q:2,r:2},{q:2,r:0}].map(h=>hexToPixel(h,g)),g)).toEqual([{q:1,r:0},{q:2,r:0},{q:2,r:1},{q:2,r:2},{q:2,r:1},{q:2,r:0}]);});
 it('reveals only the landing hex on teleport and nothing on a stationary move',()=>{const g=initialProject.grid,a=hexToPixel({q:0,r:0},g),b=hexToPixel({q:9,r:7},g);expect(traceRoute([a,{...b,teleport:true}],g)).toEqual([{q:9,r:7}]);expect(traceRoute([a,a],g)).toEqual([]);});
});
describe('Private travel rules and public reveal data',()=>{
 it('alerts only on entering a pin aura, including a pass-through and later re-entry',()=>{const p=make();p.markers=[{id:'pin',...hexToPixel({q:2,r:0},p.grid),title:'Tower',description:'',notes:'',hidden:true,kind:'star',radiusHexes:1,alertEnabled:true}];
  const enter=planTravel(p,emptyExploration(),[{q:1,r:0}],0,{q:0,r:0},'a');expect(enter.pinEntries).toHaveLength(1);
  const stay=planTravel(p,enter.state,[{q:2,r:0},{q:3,r:0}],0,{q:1,r:0},'a');expect(stay.pinEntries).toHaveLength(0);expect(stay.nearby).toHaveLength(1);
  const exit=planTravel(p,stay.state,[{q:4,r:0}],0,{q:3,r:0},'a');expect(exit.pinEntries).toHaveLength(0);
  expect(planTravel(p,exit.state,[{q:3,r:0}],0,{q:4,r:0},'a').pinEntries).toHaveLength(1);
  const pass=planTravel(p,emptyExploration(),[1,2,3,4].map(q=>({q,r:0})),0,{q:0,r:0},'a');expect(pass.pinEntries).toHaveLength(1);expect(pass.nearby).toHaveLength(0);
 });
 it('uses the containing region instead of radius and tracks tokens independently',()=>{const p=make();p.markers=[{id:'p',...hexToPixel({q:0,r:0},p.grid),title:'Regional danger',description:'',notes:'',hidden:true,kind:'star',radiusHexes:0,alertEnabled:true,alertMode:'region'}];
  const a=planTravel(p,emptyExploration(),[{q:4,r:0}],0,{q:5,r:0},'a');expect(a.pinEntries).toHaveLength(1);expect(a.nearby).toHaveLength(1);
  expect(planTravel(p,a.state,[{q:3,r:0}],0,undefined,'a').pinEntries).toHaveLength(0);
  expect(planTravel(p,a.state,[{q:4,r:0}],0,{q:5,r:0},'b').pinEntries).toHaveLength(1);
  p.markers[0].y=500;expect(planTravel(p,emptyExploration(),[{q:4,r:0}],0,{q:5,r:0}).pinEntries).toHaveLength(0);
 });
 it('keeps real region borders without outlining an undiscovered continuation',()=>{const p=make();p.regions[0].hexes=[{q:1,r:0},{q:2,r:0}];
  const one=publicProjection(p,['1,0']);expect(one.borders?.match(/M/g)).toHaveLength(5);
  const both=publicProjection(p,['1,0','2,0']);expect(both.borders?.match(/M/g)).toHaveLength(10);
  p.regions.push({...p.regions[0],id:'other',name:'Other Forest',hexes:[{q:3,r:0}]});expect(publicProjection(p,['1,0','2,0','3,0']).borders?.match(/M/g)).toHaveLength(16);
 });
 it('hides symbols without hiding colours or strong region borders',()=>{const p=make(),map=publicProjection(p,['1,0']);const visible=overlaySVG(map,{regions:true,pins:true,auras:false,symbols:true}),hidden=overlaySVG(map,{regions:true,pins:true,auras:false,symbols:false});expect(visible).toContain('data-habitat-symbol');expect(hidden).not.toContain('data-habitat-symbol');expect(hidden).toContain('data-region-borders');expect(hidden).toContain('<polygon');expect(hidden).toContain('stroke="#000000"');});
 it('reminds for each entered hex, with hex overrides and explicit disabled rules',()=>{const p=make();p.foundry!.encounters.forest={...defaultEncounter(),text:'Wolves'};p.foundry!.hexEncounters['2,0']={...defaultEncounter(),text:'Avalanche',threshold:18};p.foundry!.hexEncounters['3,0']={...defaultEncounter(),enabled:false,text:'None'};const r=planTravel(p,emptyExploration(),[{q:1,r:0},{q:2,r:0},{q:3,r:0}],0);expect(r.alerts.map(a=>a.rule.text)).toEqual(['Wolves','Avalanche']);expect(r.state.visited).toEqual(['1,0','2,0','3,0']);});
 it('persists first discovery, and limits a daily rule using Foundry world time',()=>{const p=make();p.foundry!.encounters.forest={...defaultEncounter(),text:'Wolves',repeat:'discovery'};const route=[{q:1,r:0}];const a=planTravel(p,emptyExploration(),route,0);expect(planTravel(p,JSON.parse(JSON.stringify(a.state)),route,90000).alerts).toHaveLength(0);p.foundry!.encounters.forest.repeat='day';expect(planTravel(p,a.state,route,100).alerts).toHaveLength(0);expect(planTravel(p,a.state,route,86400).alerts).toHaveLength(1);});
 it('uses a rolled encounter rule until overridden',()=>{const p=make();p.regions[0].encounterRule={...defaultEncounter(),text:'Rolled wolves'};expect(planTravel(p,emptyExploration(),[{q:1,r:0}],0).alerts[0].rule.text).toBe('Rolled wolves');});
 it('publishes only visited hexes and public pins, with no GM fields or unrevealed geometry',()=>{const p=make();p.markers=[{id:'secret',x:0,y:0,title:'Secret lair',notes:'GM ONLY',description:'SECRET',hidden:true,kind:'star'},{id:'public',...hexToPixel({q:1,r:0},p.grid),title:'Signpost',notes:'PRIVATE',description:'hidden text',hidden:false,kind:'star'}];p.foundry!.encounters.forest={...defaultEncounter(),text:'Wolves'};const projection=publicProjection(p,['1,0']);expect(projection.hexes).toHaveLength(1);expect(projection.markers).toEqual([{id:'public',...hexToPixel({q:1,r:0},p.grid),title:'Signpost',kind:'star'}]);expect(JSON.stringify(projection)).not.toMatch(/notes|encounter|SECRET|PRIVATE|Secret lair|Wolves/);});
 it('escapes chat content and keeps aura details out of player SVG',()=>{const p=make();p.foundry!.encounters.forest={...defaultEncounter(),text:'<img src=x onerror=alert(1)>'};const result=planTravel(p,emptyExploration(),[{q:1,r:0}],0);expect(alertHTML('<script>',result)).not.toContain('<script>');expect(alertHTML('Party',result)).toContain('&lt;img');const svg=overlaySVG(publicProjection(p,['1,0']),{regions:true,pins:true,auras:false});expect(svg).toContain('<svg');expect(svg).not.toContain('secret GM note');});
 it('reports a secret pin privately at the inclusive aura boundary',()=>{const p=make();p.markers=[{id:'p',...hexToPixel({q:0,r:0},p.grid),title:'Tower',description:'',notes:'',hidden:true,kind:'star',radiusHexes:3,alertEnabled:true}];expect(planTravel(p,emptyExploration(),[{q:3,r:0}],0).nearby).toEqual([{title:'Tower',distance:3}]);expect(planTravel(p,emptyExploration(),[{q:4,r:0}],0).nearby).toEqual([]);});
});
