import type { MapProject } from '../model';
export type TableKind='habitat'|'terrain'|'size'|'encounter'|'feature';
export interface EncounterRule {
 enabled:boolean; text:string; mode:'dc'|'chance'; threshold:number; check:string;
 trigger:'failure'|'success'; repeat:'entry'|'discovery'|'day';
}
export interface FoundryConfig {
 enabled:boolean; tables:Partial<Record<TableKind,string>>;
 encounters:Record<string,EncounterRule>; hexEncounters:Record<string,EncounterRule>;
 resultRules:Record<string,EncounterRule>;
}
export const defaultConfig=():FoundryConfig=>({enabled:true,tables:{},encounters:{},hexEncounters:{},resultRules:{}});
export const defaultEncounter=():EncounterRule=>({enabled:true,text:'',mode:'dc',threshold:14,check:'Survival',trigger:'failure',repeat:'entry'});
export interface FoundryHost {
 sceneName:string;
 load:()=>Promise<MapProject>;
 save:(project:MapProject)=>Promise<void>;
 create:(project:MapProject)=>Promise<void>;
 tables:()=>Promise<{uuid:string;name:string}[]>;
 results:(uuid:string)=>Promise<{id:string;name:string}[]>;
 roll:(kind:TableKind,project:MapProject)=>Promise<{value:string|number;rule?:EncounterRule}>;
 selectToken:()=>Promise<string>;
 reset:()=>Promise<void>;
 toggle:(view:string)=>void;
 getView:()=>Record<string,boolean>;
 subscribeView:(listener:(view:Record<string,boolean>)=>void)=>()=>void;
}
export function getFoundryHost():FoundryHost|null {
 if(window.parent===window)return null;
 try{return (window.parent as unknown as {game?:{modules:Map<string,{api?:{connectEditor:(w:Window)=>FoundryHost}}>}}).game?.modules.get('wild-atlas')?.api?.connectEditor(window)??null;}catch{return null;}
}
