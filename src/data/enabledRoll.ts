import type { RollTableEntry } from '../model';

export function rollEnabled(table: RollTableEntry[], sides: number, random = Math.random) {
  const faces = Array.from({length:sides},(_,i)=>i+1).flatMap(face=>{
    const entry=table.find(e=>face>=e.min&&face<=e.max);
    return entry&&entry.enabled!==false?[{face,entry}]:[];
  });
  return faces.length?faces[Math.floor(random()*faces.length)]:undefined;
}

export function enabledEncounter(table: RollTableEntry[], random = Math.random, depth=0):string|undefined {
  const pairs=Array.from({length:8},(_,i)=>i+1).flatMap(a=>Array.from({length:6},(_,j)=>j+1).flatMap(b=>{
    const entry=table.find(e=>a+b>=e.min&&a+b<=e.max);
    return entry&&entry.enabled!==false?[{a,b,entry}]:[];
  }));
  if(!pairs.length)return undefined;
  const {a,b,entry}=pairs[Math.floor(random()*pairs.length)];
  const result=entry.combine?(depth<3?`Combine: [${enabledEncounter(table,random,depth+1)}] + [${enabledEncounter(table,random,depth+1)}]`:'Combine result reached recursion limit; roll manually.'):entry.name;
  return `d8: ${a} · d6: ${b} · Total: ${a+b} — ${result}`;
}
