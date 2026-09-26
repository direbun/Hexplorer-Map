import { expect, it } from 'vitest';
import { rollEnabledHabitat } from './habitatRoll';
import { habitatTable } from './tables';

it('excludes disabled habitats and preserves remaining face weights', () => {
  const table = habitatTable.map(e => ({ ...e, enabled: e.name !== 'Tropical' }));
  const results = Array.from({ length: 18 }, (_, i) => rollEnabledHabitat(table, () => (i + .5) / 18)!);
  expect(results.some(r => r.name === 'Tropical')).toBe(false);
  expect(results.filter(r => r.name === 'Forest')).toHaveLength(2);
  expect(results.filter(r => r.name === 'Frozen')).toHaveLength(1);
  expect(results.map(r => r.face)).toEqual([1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,19,20]);
});
it('handles only one enabled habitat and all disabled without retrying', () => {
  expect(rollEnabledHabitat(habitatTable.map(e => ({...e,enabled:e.name==='Frozen'})))?.name).toBe('Frozen');
  expect(rollEnabledHabitat(habitatTable.map(e => ({...e,enabled:false})))).toBeUndefined();
});
it('keeps old tables enabled by default and persists exclusions in JSON', () => {
  expect(rollEnabledHabitat(habitatTable, () => .425)?.name).toBe('Tropical');
  const saved = JSON.parse(JSON.stringify(habitatTable.map(e => ({...e,enabled:e.name!=='Tropical'}))));
  expect(rollEnabledHabitat(saved, () => .425)?.name).not.toBe('Tropical');
});
