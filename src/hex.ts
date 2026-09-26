import type { GridSettings, HexCoordinate } from './model';
export const key = (h: HexCoordinate) => `${h.q},${h.r}`;
const squareDirections=[{q:0,r:-1},{q:1,r:0},{q:0,r:1},{q:-1,r:0}];
const directions = [{q:1,r:0},{q:1,r:-1},{q:0,r:-1},{q:-1,r:0},{q:-1,r:1},{q:0,r:1}];
export const getHexNeighbors = (h: HexCoordinate,g?:GridSettings) => (g?.orientation==='square'?squareDirections:directions).map(d => ({ q:h.q+d.q,r:h.r+d.r }));
export const areHexesAdjacent = (a: HexCoordinate,b: HexCoordinate,g?:GridSettings) => getHexNeighbors(a,g).some(h=>key(h)===key(b));
export function hexToPixel(h: HexCoordinate,g: GridSettings) { if(g.orientation==='square')return {x:g.offsetX+g.size*h.q,y:g.offsetY+g.size*h.r};return g.orientation==='pointy' ? { x:g.offsetX+g.size*Math.sqrt(3)*(h.q+h.r/2), y:g.offsetY+g.size*1.5*h.r } : { x:g.offsetX+g.size*1.5*h.q,y:g.offsetY+g.size*Math.sqrt(3)*(h.r+h.q/2) }; }
export function pixelToHex(x:number,y:number,g:GridSettings):HexCoordinate {
  x=(x-g.offsetX)/g.size; y=(y-g.offsetY)/g.size;
  if(g.orientation==='square')return {q:Math.floor(x+.5)||0,r:Math.floor(y+.5)||0};
  const q=g.orientation==='pointy'?Math.sqrt(3)/3*x-y/3:2*x/3;
  const r=g.orientation==='pointy'?2*y/3:-x/3+Math.sqrt(3)/3*y;
  let rq=Math.round(q),rr=Math.round(r); const s=-q-r,rs=Math.round(s);
  if(Math.abs(rq-q)>Math.abs(rr-r)&&Math.abs(rq-q)>Math.abs(rs-s)) rq=-rr-rs;
  else if(Math.abs(rr-r)>Math.abs(rs-s)) rr=-rq-rs;
  return {q:rq===0?0:rq,r:rr===0?0:rr};
}
export function corners(h:HexCoordinate,g:GridSettings) { const p=hexToPixel(h,g);if(g.orientation==='square')return [[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>({x:p.x+x*g.size/2,y:p.y+y*g.size/2})); return Array.from({length:6},(_,i)=>{ const a=(i*60+(g.orientation==='pointy'?30:0))*Math.PI/180; return {x:p.x+g.size*Math.cos(a),y:p.y+g.size*Math.sin(a)}; }); }
export function getRegionBoundaryEdges(hexes:HexCoordinate[],g:GridSettings) {
  const set=new Set(hexes.map(key));
  // Corner pairs run clockwise; these indices map each edge to its axial neighbor.
  const indices=g.orientation==='square'?[0,1,2,3]:g.orientation==='pointy'?[5,4,3,2,1,0]:[0,5,4,3,2,1];
  return hexes.flatMap(h=>{const c=corners(h,g),n=getHexNeighbors(h,g);return c.flatMap((a,i)=>set.has(key(n[indices[i]]))?[]:[{a,b:c[(i+1)%c.length]}]);});
}
export const boundaryPath=(hexes:HexCoordinate[],g:GridSettings)=>getRegionBoundaryEdges(hexes,g).map(e=>`M${e.a.x},${e.a.y}L${e.b.x},${e.b.y}`).join(' ');
export function getConnectedComponents(hexes:HexCoordinate[],g?:GridSettings) { const remaining=new Map(hexes.map(h=>[key(h),h]));const result:HexCoordinate[][]=[];while(remaining.size){const seed=remaining.values().next().value!;remaining.delete(key(seed));const group=[seed];for(let i=0;i<group.length;i++)for(const n of getHexNeighbors(group[i],g))if(remaining.delete(key(n)))group.push(n);result.push(group);}return result; }
export function visibleHexes(width:number,height:number,g:GridSettings) { const bounds=[pixelToHex(-g.size,-g.size,g),pixelToHex(width+g.size,-g.size,g),pixelToHex(-g.size,height+g.size,g),pixelToHex(width+g.size,height+g.size,g)];const out:HexCoordinate[]=[];for(let q=Math.min(...bounds.map(h=>h.q))-1;q<=Math.max(...bounds.map(h=>h.q))+1;q++)for(let r=Math.min(...bounds.map(h=>h.r))-1;r<=Math.max(...bounds.map(h=>h.r))+1;r++){const p=hexToPixel({q,r},g);if(p.x>=-g.size&&p.y>=-g.size&&p.x<=width+g.size&&p.y<=height+g.size)out.push({q,r});}return out; }
