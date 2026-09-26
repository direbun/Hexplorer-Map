import type { HexCoordinate, MapProject,MapMarker,GridSettings } from './model';
import { pixelToHex,key } from './hex';

export function hexDistance(a:HexCoordinate,b:HexCoordinate,g?:GridSettings) {
  const q=a.q-b.q,r=a.r-b.r;
  if(g?.orientation==='square')return Math.max(Math.abs(q),Math.abs(r));
  return Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r));
}
export function hexArea(center:HexCoordinate,radius:number,g?:GridSettings) {
  const hexes:HexCoordinate[]=[];
  if(g?.orientation==='square'){for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)hexes.push({q:center.q+q,r:center.r+r});return hexes;}
  for(let q=-radius;q<=radius;q++)for(let r=Math.max(-radius,-q-radius);r<=Math.min(radius,-q+radius);r++)hexes.push({q:center.q+q,r:center.r+r});
  return hexes;
}
export function nearbyMarkers(project:MapProject) {
  if(!project.playerToken)return [];
  return project.markers.filter(m=>m.alertEnabled).map(marker=>({marker,distance:hexDistance(project.playerToken!,pixelToHex(marker.x,marker.y,project.grid),project.grid)}))
    .filter(({marker})=>pinContains(project,marker,project.playerToken!))
    .sort((a,b)=>a.distance-b.distance||a.marker.title.localeCompare(b.marker.title));
}
export function pinContains(project:MapProject,marker:MapMarker,hex:HexCoordinate){
 const centre=pixelToHex(marker.x,marker.y,project.grid);
 if(marker.alertMode==='region'){
  const region=project.regions.find(r=>r.hexes.some(h=>key(h)===key(centre)));
  return !!region?.hexes.some(h=>key(h)===key(hex));
 }
 return hexDistance(hex,centre,project.grid)<=(marker.radiusHexes??0);
}
export function pinArea(project:MapProject,marker:MapMarker){
 const centre=pixelToHex(marker.x,marker.y,project.grid);
 return marker.alertMode==='region'?(project.regions.find(r=>r.hexes.some(h=>key(h)===key(centre)))?.hexes??[]):hexArea(centre,marker.radiusHexes??0,project.grid);
}
