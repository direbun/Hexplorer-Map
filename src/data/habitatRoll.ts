import type { RollTableEntry } from '../model';

// Sample the remaining d20 faces directly. This preserves table weights without
// an unbounded reroll loop when most or all habitats are disabled.
export function rollEnabledHabitat(table: RollTableEntry[], random = Math.random) {
  const faces = Array.from({ length: 20 }, (_, i) => i + 1).flatMap(face => {
    const entry = table.find(e => face >= e.min && face <= e.max);
    return entry && entry.enabled !== false ? [{ face, name: entry.name }] : [];
  });
  return faces.length ? faces[Math.floor(random() * faces.length)] : undefined;
}
