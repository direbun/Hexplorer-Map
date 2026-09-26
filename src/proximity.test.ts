import { describe,expect,it } from 'vitest';
import { initialProject, type MapProject } from './model';
import { hexDistance,hexArea,nearbyMarkers } from './proximity';
import { hexToPixel } from './hex';
import { normalizeProject } from './projectSettings';

it('uses cube distance and includes the entire three-step perimeter',()=>{
 const center={q:-2,r:5},area=hexArea(center,3);
 expect(area).toHaveLength(37);expect(area.filter(h=>hexDistance(center,h)===3)).toHaveLength(18);
 expect(hexDistance({q:0,r:0},{q:3,r:3})).toBe(6);
 expect(hexDistance({q:0,r:0},{q:3,r:-3})).toBe(3);
 expect(hexArea(center,0)).toEqual([center]);
});
describe.each(['pointy','flat'] as const)('%s pin alerts',orientation=>{
 it('includes hidden GM pins at the radius and removes them outside it',()=>{
   const p:MapProject=normalizeProject(structuredClone(initialProject));
   p.grid={...p.grid,orientation,size:64,offsetX:37,offsetY:-42};
   const pos=hexToPixel({q:0,r:0},p.grid);
   p.markers=[{id:'pin',...pos,title:'Ruins',description:'',notes:'Secret',hidden:true,kind:'star',alertEnabled:true,radiusHexes:3}];
   p.playerToken={q:3,r:-3};p.view!.showRegions=false;
   expect(nearbyMarkers(p).map(x=>[x.marker.title,x.distance])).toEqual([['Ruins',3]]);
   p.playerToken={q:4,r:-4};expect(nearbyMarkers(p)).toEqual([]);
   p.playerToken={q:0,r:0};p.markers[0].radiusHexes=0;expect(nearbyMarkers(p)).toHaveLength(1);
   p.markers[0].alertEnabled=false;expect(nearbyMarkers(p)).toEqual([]);
 });
});
it('round trips pin alerts and leaves old markers without alerts',()=>{
 const p=normalizeProject(structuredClone(initialProject));const pos=hexToPixel({q:0,r:0},p.grid);
 p.playerToken={q:0,r:0};p.markers=[{id:'legacy',...pos,title:'Old',description:'',notes:'',hidden:true,kind:'star'},{id:'new',...pos,title:'New',description:'',notes:'',hidden:true,kind:'star',radiusHexes:3,alertEnabled:true}];
 const loaded=normalizeProject(JSON.parse(JSON.stringify(p)));expect(nearbyMarkers(loaded).map(x=>x.marker.id)).toEqual(['new']);
 delete loaded.playerToken;expect(nearbyMarkers(loaded)).toEqual([]);
});
