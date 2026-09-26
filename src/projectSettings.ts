import type { MapProject, RollTableEntry } from './model';
import { habitatTable, terrains, encounters } from './data/tables';
import { key } from './hex';

export const palette = ['#76519c','#83705b','#287cc1','#32958e','#96b735','#159653','#327d3b','#ccaa42','#bf7961','#777f99','#61c9dc','#c75032'];
export const defaultView = { backgroundOpacity: 1, showRegions: true, regionOpacity: .42 };
export function tablesFor(p: MapProject): Record<'habitat'|'terrain'|'encounter'|'size'|'feature',RollTableEntry[]> {
  return {
    ...p.generatorTables,
    habitat: (p.generatorTables.habitat ?? habitatTable.map((e,i)=>({...e,color:palette[i],symbol:e.name as NonNullable<RollTableEntry['symbol']>}))).map(e=>({...e,id:e.id??e.name})),
    terrain: p.generatorTables.terrain ?? terrains.map((name,i)=>({min:i+1,max:i+1,name,value:i+1,days:i+1})),
    encounter: p.generatorTables.encounter ?? encounters.map((name,i)=>({min:i+2,max:i+2,name,combine:i===0})),
  };
}
export function normalizeProject(p:MapProject):MapProject {
  return {...p,view:{...defaultView,...p.view},generatorTables:tablesFor(p)};
}
export function terrainEntry(p:MapProject,value:number) {return tablesFor(p).terrain.find(e=>e.value===value);}
export function tokenRegion(p:MapProject) {return p.playerToken?p.regions.find(r=>r.hexes.some(h=>key(h)===key(p.playerToken!))):undefined;}
export function regionColour(base:string,difficulty:number) {
  // Mix the habitat colour with white at one dot, progressing to the base at four.
  const weight=[.25,.5,.75,1][Math.max(0,Math.min(3,difficulty-1))];
  const rgb=[1,3,5].map(i=>Math.round(255+(parseInt(base.slice(i,i+2),16)-255)*weight));
  return `#${rgb.map(n=>n.toString(16).padStart(2,'0')).join('')}`;
}
export function validateAllTables(t:ReturnType<typeof tablesFor>) {
  for(const [name,low,high] of [['habitat',1,20],['terrain',1,4],['encounter',2,14],['size',1,12],['feature',1,100]] as const) {
    const rows=t[name];if(!Array.isArray(rows)||!rows.length)throw new Error(`${name}: add at least one entry.`);
    for(const row of rows){
      if(!Number.isInteger(row.min)||!Number.isInteger(row.max)||row.min<low||row.max>high||row.min>row.max||typeof row.name!=='string'||!row.name.trim())throw new Error(`${name}: each row needs a valid range and name.`);
      if(name==='habitat'&&(!/^#[0-9a-f]{6}$/i.test(row.color??'')||!habitatTable.some(e=>e.name===row.symbol)))throw new Error('Each habitat needs a colour and symbol.');
      if(name==='terrain'&&(!Number.isInteger(row.value)||row.value!<1||row.value!>4||!Number.isFinite(row.days)||row.days!<0))throw new Error('Difficulty requires 1–4 dots and a nonnegative travel time.');
      if(name==='size'&&(!Number.isInteger(Number(row.name))||Number(row.name)<1))throw new Error('Size names must be positive hex counts.');
    }
    for(let n=low;n<=high;n++)if(rows.filter(e=>e.min<=n&&e.max>=n).length!==1)throw new Error(`${name}: roll ${n} must appear exactly once.`);
  }
  if(new Set(t.habitat.map(e=>e.name)).size!==t.habitat.length)throw new Error('Habitat names must be unique.');
  if(t.terrain.length!==4||new Set(t.terrain.map(e=>e.value)).size!==4)throw new Error('Keep one difficulty definition for each of the four dot counts.');
}


