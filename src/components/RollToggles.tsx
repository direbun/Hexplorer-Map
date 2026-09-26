import { useState } from 'react';
import type { RollTableEntry } from '../model';
import type { tablesFor } from '../projectSettings';
type Tables=ReturnType<typeof tablesFor>;
const titles={habitat:'Habitat',terrain:'Terrain',encounter:'Encounter',size:'Size',feature:'Feature'};
export function RollToggles({tables,onChange}:{tables:Tables;onChange:(table:keyof Tables,rows:RollTableEntry[])=>void}) {
  const [open,setOpen]=useState(false),[tab,setTab]=useState<keyof Tables>('habitat');
  const rows=tables[tab],count=rows.filter(e=>e.enabled!==false).length;
  return <div className="roll-toggle-panel"><button className="wide" aria-expanded={open} aria-controls="roll-options" onClick={()=>setOpen(!open)}>☑ Toggle roll options {open?'▴':'▾'}</button>{open&&<div id="roll-options"><div className="roll-toggle-tabs">{(Object.keys(titles) as (keyof Tables)[]).map(t=><button key={t} aria-pressed={tab===t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{titles[t]}</button>)}</div><div className="roll-toggle-actions"><small>{count} / {rows.length} enabled</small><button onClick={()=>onChange(tab,rows.map(e=>({...e,enabled:true})))}>All</button><button onClick={()=>onChange(tab,rows.map(e=>({...e,enabled:false})))}>None</button></div><div className="roll-toggle-grid">{rows.map((e,i)=><label key={e.id??i} title={e.name}><input type="checkbox" checked={e.enabled!==false} onChange={x=>onChange(tab,rows.map((r,j)=>j===i?{...r,enabled:x.target.checked}:r))}/><span>{tab==='size'?`${e.name} hexes`:e.name}</span></label>)}</div><p className="hint">Changes apply immediately to individual rolls and Roll All.</p></div>}</div>;
}
