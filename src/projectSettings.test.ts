import { expect, it } from 'vitest';
import { initialProject, type MapProject } from './model';
import { normalizeProject, regionColour, tablesFor, terrainEntry, tokenRegion, validateAllTables } from './projectSettings';

it('loads old map JSON without changing region coordinates or the embedded image',()=>{
 const old:MapProject={...structuredClone(initialProject),imageMetadata:{...initialProject.imageMetadata,dataUrl:'data:image/png;base64,test'},regions:[{id:'forest',name:'Wood',habitat:'Forest',terrain:4,hexes:[{q:2,r:3}],notes:''}]};
 const p=normalizeProject(JSON.parse(JSON.stringify(old)));
 expect(p.regions).toEqual(old.regions);expect(p.imageMetadata).toEqual(old.imageMetadata);
 expect(p.view).toEqual({backgroundOpacity:1,showRegions:true,regionOpacity:.42});
 expect(()=>validateAllTables(tablesFor(p))).not.toThrow();
});
it('saves and restores token, visibility, opacity and custom difficulty meanings',()=>{
 const p=normalizeProject(structuredClone(initialProject));
 p.playerToken={q:-2,r:5};p.view={backgroundOpacity:.3,showRegions:false,regionOpacity:.7};
 p.generatorTables.terrain![0]={...p.generatorTables.terrain![0],name:'Easy going',days:.5};
 const loaded=normalizeProject(JSON.parse(JSON.stringify(p)));
 expect(loaded).toEqual(p);expect(terrainEntry(loaded,1)?.name).toBe('Easy going');expect(terrainEntry(loaded,1)?.days).toBe(.5);
});
it('locates the token region independently of grid orientation, size, offsets and visibility',()=>{
 const p=normalizeProject(structuredClone(initialProject));p.regions=[{id:'r',name:'Wood',habitat:'Forest',terrain:4,hexes:[{q:2,r:3}],notes:''}];
 p.playerToken={q:2,r:3};p.view!.showRegions=false;p.grid={...p.grid,orientation:'flat',size:90,offsetX:145,offsetY:-46};
 expect(tokenRegion(p)?.habitat).toBe('Forest');p.playerToken={q:3,r:3};expect(tokenRegion(p)).toBeUndefined();
});
it('gives every habitat a unique colour and makes each difficulty progressively darker',()=>{
 const colours=tablesFor(initialProject).habitat.map(e=>e.color!);expect(new Set(colours).size).toBe(12);
 for(const c of colours){const shades=[1,2,3,4].map(n=>regionColour(c,n));expect(new Set(shades).size).toBe(4);expect(shades[3]).toBe(c);const brightness=shades.map(s=>[1,3,5].reduce((sum,i)=>sum+parseInt(s.slice(i,i+2),16),0));expect(brightness[0]).toBeGreaterThan(brightness[1]);expect(brightness[1]).toBeGreaterThan(brightness[2]);expect(brightness[2]).toBeGreaterThan(brightness[3]);}
});
it('validates every roll table and rejects gaps, overlaps and duplicate dot definitions',()=>{
 const t=tablesFor(initialProject);expect(()=>validateAllTables(t)).not.toThrow();
 const bad=structuredClone(t);bad.habitat[0].max=2;expect(()=>validateAllTables(bad)).toThrow('exactly once');
 const badDots=structuredClone(t);badDots.terrain[1].value=1;expect(()=>validateAllTables(badDots)).toThrow('four dot counts');
 const gap=structuredClone(t);gap.encounter.pop();expect(()=>validateAllTables(gap)).toThrow('roll 14');
});
