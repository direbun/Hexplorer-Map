import {describe,it,expect} from 'vitest';
import {hexplorationVisibilityUpdate as update} from './visibility';
describe('Hexploration background visibility',()=>{
 const ordinary={tokenVision:true,fogExploration:true,flags:{}};
 it('leaves ordinary scenes alone',()=>expect(update(ordinary)).toEqual({}));
 it('disables token vision and fog when enabling, preserving the old values',()=>expect(update(ordinary,{flags:{'wild-atlas':{enabled:true}}})).toEqual({tokenVision:false,fogExploration:false,flags:{'wild-atlas':{visibilityBackup:{tokenVision:true,fogExploration:true}}}}));
 it('repairs existing enabled scenes on load',()=>expect(update({...ordinary,flags:{'wild-atlas':{enabled:true}}}).tokenVision).toBe(false));
 it('does not repeatedly update a repaired scene or overwrite its backup',()=>expect(update({tokenVision:false,fogExploration:false,flags:{'wild-atlas':{enabled:true,visibilityBackup:{tokenVision:true,fogExploration:true}}}})).toEqual({}));
 it('prevents later scene forms from reintroducing the black background',()=>expect(update({tokenVision:false,fogExploration:false,flags:{'wild-atlas':{enabled:true,visibilityBackup:ordinary}}},{tokenVision:true})).toEqual({tokenVision:false}));
 it('restores the prior visibility options when disabling',()=>expect(update({tokenVision:false,fogExploration:false,flags:{'wild-atlas':{enabled:true,visibilityBackup:{tokenVision:true,fogExploration:false}}}},{'flags.wild-atlas.enabled':false})).toEqual({tokenVision:true,fogExploration:false,flags:{'wild-atlas':{'-=visibilityBackup':null}}}));
});
