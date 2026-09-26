import type { MapProject } from '../model';

export function BackgroundImport({ image, loading, error, onImport }: {
  image: MapProject['imageMetadata']; loading: boolean; error: string; onImport: (file?: File) => void;
}) {
  return <div className="background-import">
    <strong>{image.dataUrl ? 'Background map loaded' : 'Start with your battle map'}</strong>
    <p>Choose an image below, or drag a map file onto the workspace. Your hexes and region symbols go on top.</p>
    <label className="image-file-label">{image.dataUrl ? 'Replace background image' : 'Choose background image'}
      <input type="file" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp" disabled={loading}
        onChange={e => { onImport(e.target.files?.[0]); e.target.value = ''; }} />
    </label>
    {loading && <p role="status">Opening your map…</p>}
    {error && <p className="import-error" role="alert">{error}</p>}
    {image.dataUrl && <div className="background-preview"><img src={image.dataUrl} alt="Imported background map preview"/><span>{image.name}<small>{image.width} × {image.height} pixels</small></span></div>}
    <small>PNG, JPG or WebP · stored locally in your project</small>
  </div>;
}
