import { describe,expect,it } from 'vitest';
import { initialProject } from './model';
import { alignToFoundry,foundryOrigin,foundrySettings,foundrySettingsText } from './foundry';
import { hexToPixel } from './hex';

describe.each(['pointy','flat'] as const)('%s Foundry alignment',orientation=>{
  it.each([false,true])('matches the Foundry lattice with even=%s',even=>{
    const grid=alignToFoundry({...initialProject.grid,offsetX:21.3,offsetY:-17.7},100,orientation,even);
    const project={...initialProject,grid};const s=foundrySettings(project);
    expect(s.compatible).toBe(true);expect(s.size).toBe(100);
    for(let q=-5;q<=5;q++)for(let r=-5;r<=5;r++){
      // Independent modern Foundry centre formulas; background origin = -offset at padding 0.
      const expected=orientation==='flat'?{x:(3*q+2)*100/(2*Math.sqrt(3)),y:(r+(q+(even?1:0))/2)*100}:{x:(q+(r+(even?1:0))/2)*100,y:(3*r+2)*100/(2*Math.sqrt(3))};
      const p=hexToPixel({q,r},grid);expect(p.x-s.offsetX).toBeCloseTo(expected.x,9);expect(p.y-s.offsetY).toBeCloseTo(expected.y,9);
    }
  });
});
it('flags unsnapped grids instead of silently advertising rounded values as exact',()=>{
 expect(foundrySettings(initialProject).compatible).toBe(false);
 expect(foundrySettingsText(initialProject)).toContain('NOT ALIGNED');
});
it('clamps Foundry sizes, preserves other grid settings, and aligns idempotently',()=>{
 const g=alignToFoundry(initialProject.grid,20);expect(foundrySettings({...initialProject,grid:g}).size).toBe(50);
 expect(alignToFoundry(g,50)).toEqual(g);expect(g.opacity).toBe(initialProject.grid.opacity);
 expect(foundryOrigin(100,'pointy',false)).toEqual({x:0,y:100/Math.sqrt(3)});
});
it('uses original dimensions and keeps parity through project JSON',()=>{
 const p={...initialProject,imageMetadata:{name:'map',width:1672,height:941},grid:alignToFoundry(initialProject.grid,100,'flat',true)};
 const s=foundrySettings(JSON.parse(JSON.stringify(p)));expect(s.width).toBe(1672);expect(s.height).toBe(941);expect(s.type).toBe('Hexagonal Columns - Even');expect(s.padding).toBe(0);
});
