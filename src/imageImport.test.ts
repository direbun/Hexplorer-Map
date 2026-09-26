import { expect, it } from 'vitest';
import { detectImageType } from './imageImport';

it('recognizes image bytes regardless of a missing or incorrect browser MIME label', () => {
  expect(detectImageType(new Uint8Array([137,80,78,71,13,10,26,10]))).toBe('image/png');
  expect(detectImageType(new Uint8Array([255,216,255,224]))).toBe('image/jpeg');
  expect(detectImageType(new TextEncoder().encode('RIFF1234WEBP'))).toBe('image/webp');
});
it('rejects unsupported files and truncated image signatures', () => {
  expect(detectImageType(new TextEncoder().encode('<svg></svg>'))).toBeUndefined();
  expect(detectImageType(new Uint8Array([137,80]))).toBeUndefined();
});
