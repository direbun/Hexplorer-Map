import { describe, expect, it } from 'vitest';
import { initialProject } from './model';
import { hexToPixel,pixelToHex,getHexNeighbors,areHexesAdjacent,getRegionBoundaryEdges,getConnectedComponents } from './hex';
describe.each(['pointy','flat'] as const)('%s hex geometry',orientation=>{
 const grid={...initialProject.grid,orientation,size:37,offsetX:123,offsetY:-71};
 it('round trips axial coordinates through image pixels after offset and size changes',()=>{for(let q=-8;q<=8;q++)for(let r=-8;r<=8;r++){const p=hexToPixel({q,r},grid);expect(pixelToHex(p.x,p.y,grid)).toEqual({q,r});expect(pixelToHex(p.x+2,p.y-2,grid)).toEqual({q,r});}});
 it('has six symmetric adjacent neighbors',()=>{const h={q:3,r:-2};const neighbors=getHexNeighbors(h);expect(neighbors).toHaveLength(6);for(const n of neighbors){expect(areHexesAdjacent(h,n)).toBe(true);expect(areHexesAdjacent(n,h)).toBe(true);}expect(areHexesAdjacent(h,h)).toBe(false);expect(areHexesAdjacent(h,{q:8,r:8})).toBe(false);});
 it('omits the shared edge in every neighbor direction',()=>{const h={q:0,r:0};expect(getRegionBoundaryEdges([h],grid)).toHaveLength(6);for(const n of getHexNeighbors(h)){const edges=getRegionBoundaryEdges([h,n],grid);expect(edges).toHaveLength(10);const a=hexToPixel(h,grid),b=hexToPixel(n,grid);for(const e of edges){const mx=(e.a.x+e.b.x)/2,my=(e.a.y+e.b.y)/2;expect(Math.hypot(mx-(a.x+b.x)/2,my-(a.y+b.y)/2)).toBeGreaterThan(1);}}});
 it('keeps a hole boundary and removes all interior seams',()=>{expect(getRegionBoundaryEdges([{q:0,r:0},...getHexNeighbors({q:0,r:0})],grid)).toHaveLength(18);expect(getRegionBoundaryEdges(getHexNeighbors({q:0,r:0}),grid)).toHaveLength(24);});
});
it('finds disconnected components including a removed bridge',()=>{expect(getConnectedComponents([])).toEqual([]);expect(getConnectedComponents([{q:0,r:0},{q:1,r:0},{q:2,r:0}])).toHaveLength(1);expect(getConnectedComponents([{q:0,r:0},{q:2,r:0}])).toHaveLength(2);});
