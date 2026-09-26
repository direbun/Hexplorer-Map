import type { Habitat, RollTableEntry } from '../model';
export const habitats: Habitat[]=['Shadowblighted','Underground','Aquatic','Wetland','Grassland','Tropical','Forest','Drylands','Rolling','Mountain','Frozen','Badlands'];
export const habitatTable:RollTableEntry[]=habitats.map((name,i)=>({name,min:[1,2,3,5,7,9,11,13,15,17,19,20][i],max:[1,2,4,6,8,10,12,14,16,18,19,20][i]}));
export const terrains=['Optimal','Fair','Rough','Extreme'];
export const encounters=['Roll twice and combine both encounters','Fellow travelers','Temporary setback','Seekers-in-Shadow','Extreme weather','Bandits/brigands/mercenaries','Territorial beast','Environmental hazard','Cult of the Two-Headed Coin','Wondrous or dangerous site','Good fortune','Settlement or outpost','Treasure/cache'];
export const die=(sides:number)=>Math.floor(Math.random()*sides)+1;
export const lookup=(table:RollTableEntry[],n:number)=>table.find(e=>n>=e.min&&n<=e.max)?.name??'No matching entry';
export function rollEncounter(table:RollTableEntry[]=encounters.map((name,i)=>({min:i+2,max:i+2,name,combine:i===0})),depth=0):string {
 const a=die(8),b=die(6),entry=table.find(e=>a+b>=e.min&&a+b<=e.max);
 return `d8: ${a} · d6: ${b} · Total: ${a+b} — ${entry?.combine?(depth<3?`Combine: [${rollEncounter(table,depth+1)}] + [${rollEncounter(table,depth+1)}]`:'Combine result reached recursion limit; roll manually.'):entry?.name??'No matching entry'}`;
}
