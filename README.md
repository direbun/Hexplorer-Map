# Wild Atlas

A local hex and square map editor with a Foundry VTT module for exploration, regions and dungeon traps. No account, backend, or database. All runtime assets are bundled; imported images stay in the browser and saved project JSON.

## Downloads and Foundry installation

Get the ready-to-use packages from [GitHub Releases](https://github.com/direbun/Hexplorer-Map/releases/latest). The automatic GitHub **Source code** ZIP is for development; use the attached release downloads to run the application.

- **Foundry:** in Setup → Add-on Modules → Install Module, paste this Manifest URL:
  `https://github.com/direbun/Hexplorer-Map/releases/latest/download/module.json`
- **Windows editor:** download `wild-atlas-editor-0.2.0-windows.zip`, extract it, and double-click **Start Wild Atlas.vbs**. Node.js 22+ must be installed; the Foundry module does not need Node.js installed separately.

Enable Wild Atlas in your world. On a scene, open Configure → Basics and enable **Wild Atlas exploration scene** at the bottom. See the [module guide](foundry-module/README.md) for tracked tokens, roll tables, traps and shortcuts.

Targets Foundry 13–14. Live multiplayer and Foundry 14 verification remain incomplete. Enabled scenes show the full background by disabling Token Vision and Fog Exploration, restoring their prior settings when disabled. This also applies to square dungeon scenes. Overlays do not participate in walls, lighting, roofs or level occlusion.

For maintainers: [manual GitHub upload and release steps](PUBLISHING.md).

## Open the editor (Windows)

Double-click **Start Wild Atlas.vbs** in this folder. It starts the editor silently and opens your default browser. No CMD or PowerShell window is needed. Opening it again reuses the running server.

Save your project before closing the browser. To shut down the background server, double-click **Stop Wild Atlas.vbs**. You can create a Windows shortcut to the Start file and place that shortcut on your desktop.

Download and extract the Windows editor ZIP from Releases, and install Node.js 22 or newer separately. The launcher uses the included production build and Node.js on your PATH. Keep the launcher, `launcher` folder and `dist` folder together. The editor runs at `http://127.0.0.1:4178` and does not require internet access.

## Development only

```sh
npm ci
npm run dev
```

Open the localhost address printed by Vite. `npm run build` creates `dist`; `npm test` runs geometry tests.

## Workflow

### Region workshop and nearby pins

The sidebar is split into **Regions**, **Pins**, **Map**, **View** and **Export**. Import backgrounds and configure Foundry under Map; appearance and token controls are under View.

In Regions, **New + roll all** creates an empty region with a fresh generator draft. Give it a name in the always-visible name field, then **Apply & paint** and draw its hexes. These controls remain at the top while you scroll. Click the region selector to search a bounded list by name or habitat; a large region list does not push the generator down the page. Encounter, feature and manual region properties expand only when needed.

In Pins, click **Place special pin**, then click the map. Set its name, notes and **Aura radius (hexes)**. New pins default to a 3-hex aura and GM-only visibility; existing saved markers keep alerts off until enabled. Radius 0 means the pin's own hex. The selected aura can be previewed as a dashed hex boundary and never appears in image exports. Click a pin to edit it or drag it to move. Text labels remain available in this tab too.

The bottom-right DM panel displays the current region name and all enabled pins within range, sorted by hex distance. Expand a nearby pin to read its description and GM notes. Alerts work across region boundaries, with regions hidden, and for GM-only pins. Pins stay anchored to image pixels; their occupied hex and aura are recalculated if the grid changes. Names, aura radii and alert switches are included in saved project JSON; pin edits/movement are undoable.

### Match a Foundry VTT scene

Open **Foundry VTT alignment** below Map & grid. Choose one of the four hex types and a whole-number Foundry pixel size (minimum 50), then click **Apply Foundry alignment**. This changes the editor grid in one undoable step; existing region coordinates follow that grid. The background is not resized. If you already painted regions, inspect their placement after applying.

The panel lists the exact grid type, size, original scene dimensions, zero padding and background offsets for the aligned configuration. Copy or download the settings. Use a new modern Foundry scene (13/14), choose the same background image, and enter those values. Grid distance and units do not affect pixel alignment. Keep background scale 1 and rotation 0. Create a fresh scene for old pre-v10 legacy hex grids.

**Player PNG for Foundry** and **GM PNG for Foundry** always export at original resolution without a baked hex grid, regardless of normal export size settings; let Foundry draw the grid. GM layers follow the editor visibility controls. Changing the regular grid controls can invalidate alignment, which the panel detects. Reapply alignment before exporting again. Altering padding or scene dimensions in an already detailed Foundry scene can displace its walls/tokens; use a duplicate first.

The conversion was checked against the locally installed Foundry 13.351 core for all four grid types and several sizes. Optional developer check: `node launcher/verify-foundry.mjs "PATH_TO_FOUNDRY/common/grid/hexagonal.mjs"` (requires Node 24 and your own Foundry installation).

### During a game

- Use **Open project** in the header to load a previously saved JSON map, then **Player Token** to click its current hex. You can also drag the blue P token in any tool mode. The bottom-right panel shows its habitat, difficulty, travel time and region; unassigned hexes show a dash.
- **Save project** saves the embedded background, regions, token position, custom tables and the new view settings together. Existing project JSON files still load. Save before refreshing or closing the browser.
- **View & game session** has background opacity, region colour opacity and a **Show regions** switch. Hiding regions removes colours, outlines, symbols and selection highlights while keeping the token readout active. Turn off the hex grid separately for a clean base map.
- Each habitat has a colour; one through four dots progress from pale to dark. Edit the base colours under **Edit all roll tables & colours**.
- All five tables have a form editor. Habitat names, colours, symbols and roll ranges are editable. Difficulty names and days per hex are editable for each dot count. Encounter rows can optionally roll twice and combine. Size uses d12 and feature uses d100. Table changes apply on **Save all tables** and are stored in the project; cancel discards them.
- Token and its readout are play aids and do not appear in exported images. Player exports omit all region colours and other region overlays.

1. Import a PNG, JPEG or WebP. The workspace adopts its native resolution.
2. Adjust grid orientation, radius and offsets. Coordinates remain axial when the grid changes.
3. Create a region; click or drag to paint. Erase with the Erase tool or right mouse button. Disconnected additions and splitting removals require an explicit override when continuity is enabled.
4. Edit habitat and terrain, or roll draft results and apply them. Place Symbol moves the single region symbol to a member hex; symbols can also be dragged.
5. Add markers or labels and edit their details in the sidebar. GM-only items are excluded from player exports.
6. Save project JSON regularly. It includes the original image; there is no automatic persistence. Import Project JSON restores it.
7. Choose export layers and export the GM or Player image. Canvas is used only for final image flattening. PNG defaults to original resolution; JPEG/WebP and scale/quality settings are available.

Ctrl+Z undoes; Ctrl+Y or Ctrl+Shift+Z redoes. Text fields retain native text editing shortcuts. Painting is undoable per hex.

## Structure

- `src/model.ts`: project and region types
- `src/hex.ts`: axial conversion, adjacency, components and boundary edges
- `src/hex.test.ts`: orientation, offsets, neighbor edges, holes and connectivity tests
- `src/data/tables.ts`: habitat, terrain and encounter generators
- `src/components/MapView.tsx`: SVG map and pointer interaction
- `src/components/Symbol.tsx`: twelve monochrome SVG symbols
- `src/export.ts`: SVG serialization and offscreen raster export
- `src/App.tsx`: editor state, history and sidebar

The size and feature tables start with placeholder entries. Size entries use numeric names for hex counts. All tables validate full die coverage without overlaps. Habitat and difficulty changes affect both the map legend and generator.

Very large images or very dense grids may be slow; export is limited to 100 megapixels. Grid adjustments reposition all axial region coordinates intentionally. Markers and labels use image-pixel coordinates. Pan/zoom and export visibility settings are session UI state, not part of the saved project.

