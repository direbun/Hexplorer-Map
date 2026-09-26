import type { GridSettings, MapProject } from './model';

// Foundry 13: size is the short diagonal, and odd grids start on a half hex.
// Verified against the installed Foundry 13.351 HexagonalGrid.cubeToPoint.
// Scene.getDimensions places the image at padding origin minus background offsets.
export function foundryOrigin(size:number,orientation:GridSettings['orientation'],even:boolean) {
  if(orientation==='square')return {x:size/2,y:size/2};
  const radius=size/Math.sqrt(3);
  return orientation==='pointy'?{x:even?size/2:0,y:radius}:{x:radius,y:even?size/2:0};
}
export function alignToFoundry(grid:GridSettings,size:number,orientation=grid.orientation,even=grid.foundryEven??false):GridSettings {
  const pixels=Math.max(50,Math.round(size));
  const origin=foundryOrigin(pixels,orientation,even);
  return {...grid,orientation,foundryEven:even,size:orientation==='square'?pixels:pixels/Math.sqrt(3),offsetX:origin.x+Math.round(grid.offsetX-origin.x),offsetY:origin.y+Math.round(grid.offsetY-origin.y)};
}
export function foundrySettings(project:MapProject) {
  const g=project.grid,even=g.foundryEven??false;
  const actualSize=g.orientation==='square'?g.size:g.size*Math.sqrt(3),size=Math.max(50,Math.round(actualSize));
  const origin=foundryOrigin(size,g.orientation,even);
  const offsetX=Math.round(g.offsetX-origin.x),offsetY=Math.round(g.offsetY-origin.y);
  const compatible=Math.abs(actualSize-size)<1e-7&&Math.abs(g.offsetX-origin.x-offsetX)<1e-7&&Math.abs(g.offsetY-origin.y-offsetY)<1e-7;
  return {size,actualSize,offsetX,offsetY,compatible,type:g.orientation==='square'?'Square':`Hexagonal ${g.orientation==='pointy'?'Rows':'Columns'} - ${even?'Even':'Odd'}`,width:project.imageMetadata.width,height:project.imageMetadata.height,padding:0};
}
export function foundrySettingsText(project:MapProject) {
  const s=foundrySettings(project);
  return `Wild Atlas → Foundry VTT 13/14\n${s.compatible?'Aligned configuration':'NOT ALIGNED: click Apply Foundry alignment first'}\n\nUse the original image, or the Foundry PNG exported at original resolution.\nGrid Type: ${s.type}\nGrid Size (Pixels): ${s.size}\nScene Dimensions: ${s.width} × ${s.height}\nPadding Percentage: 0\nOffset Background Horizontal: ${s.offsetX}\nOffset Background Vertical: ${s.offsetY}\nGrid Style: Solid Lines\nGrid Thickness: ${project.grid.thickness}\nGrid Color: #000000\nGrid Opacity: ${project.grid.opacity}\n\nGrid Scale / Distance / Units: choose for your game; these do not affect visual alignment.\nBackground scale: 1; rotation: 0. Do not resize or crop the image.\nThe dedicated Foundry PNG omits the editor grid so Foundry draws a single grid.\nUse a new scene, or duplicate an existing scene before changing its dimensions/padding; existing walls and tokens may need repositioning.\nFor pre-v10 legacy hex scenes, create a new scene instead.\n`;
}
