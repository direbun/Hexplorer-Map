import type {GridSettings} from '../model';
import {foundryOrigin} from '../foundry';
export function switchGridMode(grid:GridSettings,square:boolean):GridSettings{
 if((grid.orientation==='square')===square)return grid;
 const width=grid.orientation==='square'?grid.size:grid.size*Math.sqrt(3);
 const orientation=square?'square':'pointy';
 const oldOrigin=foundryOrigin(width,grid.orientation,grid.foundryEven??false),origin=foundryOrigin(width,orientation,false);
 return {...grid,orientation,foundryEven:false,size:square?width:width/Math.sqrt(3),offsetX:grid.offsetX-oldOrigin.x+origin.x,offsetY:grid.offsetY-oldOrigin.y+origin.y};
}
export function GridModeControl({grid,onChange,onTrap}:{grid:GridSettings;onChange:(g:GridSettings)=>void;onTrap:()=>void}){
 const square=grid.orientation==='square';
 return <div className="grid-mode-control"><div className="grid-mode-buttons" role="group" aria-label="Grid shape"><button className={!square?'active':''} aria-pressed={!square} onClick={()=>onChange(switchGridMode(grid,false))}>⬡ Hex</button><button className={square?'active':''} aria-pressed={square} onClick={()=>onChange(switchGridMode(grid,true))}>▦ Square</button></div><label>{square?'Cell width (px)':'Hex radius (px)'}<input aria-label={square?'Square cell width':'Hex radius'} type="number" min="12" step="1" value={Number(grid.size.toFixed(3))} onChange={e=>onChange({...grid,size:Math.max(12,Number(e.target.value))})}/></label>{square&&<button className="trap-paint-button" onClick={onTrap}>☠ Paint traps</button>}</div>;
}
