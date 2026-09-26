import { expect,it } from 'vitest';
import { rollEnabled,enabledEncounter } from './enabledRoll';
it('excludes disabled rows for arbitrary dice and handles none enabled',()=>{
 const table=[{min:1,max:2,name:'Off',enabled:false},{min:3,max:4,name:'On'}];
 for(let i=0;i<10;i++)expect(rollEnabled(table,4,()=>i/10)?.entry.name).toBe('On');
 expect(rollEnabled(table.map(e=>({...e,enabled:false})),4)).toBeUndefined();
});
it('preserves d8+d6 pair weights while excluding disabled encounters',()=>{
 const table=[{min:2,max:2,name:'Two'},{min:3,max:3,name:'Three'},{min:4,max:14,name:'Off',enabled:false}];
 const results=[1/6,3/6,5/6].map(n=>enabledEncounter(table,()=>n)!);
 expect(results.filter(s=>s.endsWith('Two'))).toHaveLength(1);
 expect(results.filter(s=>s.endsWith('Three'))).toHaveLength(2);
 expect(enabledEncounter(table.map(e=>({...e,enabled:false})))).toBeUndefined();
});
