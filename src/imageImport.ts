import type { MapProject } from './model';

/** Detect the file itself: Windows/browser MIME labels are not always populated. */
export function detectImageType(bytes: Uint8Array): string | undefined {
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b)) return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
}

export async function readBackgroundImage(file: File): Promise<MapProject['imageMetadata']> {
  const type = detectImageType(new Uint8Array(await file.slice(0, 12).arrayBuffer()));
  if (!type) throw new Error('This file is not a PNG, JPG or WebP image. Export your battle map to one of these formats and try again.');
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('The image could not be read. Try a copy saved on this computer.'));
    reader.readAsDataURL(new Blob([file], { type }));
  });
  const image = new Image();
  image.src = dataUrl;
  try { await image.decode(); } catch { throw new Error('The image could not be opened. It may be damaged; try re-saving it as PNG or JPG.'); }
  if (!image.naturalWidth || !image.naturalHeight) throw new Error('The image has no usable dimensions.');
  if (image.naturalWidth * image.naturalHeight > 100_000_000) throw new Error('This image exceeds 100 megapixels. Please use a smaller copy.');
  return { name: file.name, width: image.naturalWidth, height: image.naturalHeight, dataUrl };
}
