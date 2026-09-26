const ID='wild-atlas';
type Visibility={tokenVision:boolean;fogExploration:boolean};
type SceneData=Visibility&{flags?:Record<string,{enabled?:boolean;visibilityBackup?:Visibility}>};
/** Full-map exploration uses Foundry's normal unrestricted scene visibility.
 * The previous settings are restored when hexploration is switched off. */
export function hexplorationVisibilityUpdate(scene:SceneData,changes:Record<string,any>={}){
 const flags=scene.flags?.[ID],enabled=changes.flags?.[ID]?.enabled??changes[`flags.${ID}.enabled`]??flags?.enabled;
 const backup=flags?.visibilityBackup;
 if(enabled){
  const patch:Record<string,any>={};
  if(!backup)patch.flags={[ID]:{visibilityBackup:{tokenVision:scene.tokenVision,fogExploration:scene.fogExploration}}};
  if((changes.tokenVision??scene.tokenVision)!==false)patch.tokenVision=false;
  if((changes.fogExploration??scene.fogExploration)!==false)patch.fogExploration=false;
  return patch;
 }
 if(flags?.enabled&&backup&&enabled===false)return {...backup,flags:{[ID]:{'-=visibilityBackup':null}}};
 return {};
}
