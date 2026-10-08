# Wild Atlas for Foundry

The installable module is in **wild-atlas/**. It is a development build (0.2.3), targeting Foundry 13 and 14. The installed 13.351 source was used to check API integration. It has not yet been verified in a live multiplayer Foundry world, so the manifest intentionally does not claim a verified version.

## Install from GitHub Releases

In Foundry Setup → Add-on Modules → Install Module, use:

https://github.com/direbun/Hexplorer-Map/releases/latest/download/module.json

Alternatively download the wild-atlas ZIP from the release and follow the manual steps below. These URLs become available after the maintainer publishes the release assets.

## Install — no command prompt

1. In Foundry Setup, open your **User Data** directory using Foundry's folder shortcut.
2. Open its **Data/modules** folder (if the shortcut opens Data directly, just open modules).
3. Copy the entire **wild-atlas** folder from here into modules. The result must be `Data/modules/wild-atlas/module.json`.
4. Restart Foundry, open a test world, and enable **Wild Atlas** under Manage Modules.
5. Open a scene with a **Square, Hexagonal Rows or Columns** grid. Right-click the scene → **Configure**, then enable **Wild Atlas exploration scene** on the Basics tab. Controls appear only on enabled scenes. Existing 0.1.0 exploration scenes remain enabled.

No Node.js, npm, CMD, or separate web server is required to use the packaged module. The editor runs inside Foundry. Hexplorer is not a dependency and none of its code is redistributed. Turn Hexplorer off on the test scene to avoid competing exploration actions.

## Hex and square maps

The editor has **Hex / Square** buttons at the top of the left sidebar, plus an immediate size preview. In square mode the size is the full cell width in pixels; in hex mode it is the radius. Import an image, choose Square and adjust cell width/offsets to align dungeon tiles before creating a scene. Use **Foundry → Create new scene from map** to create the matching square scene. Existing square Foundry scenes load with their exact grid geometry.

Painting, region borders, table rolls, discovery, per-cell encounters, pins, region alerts and exports work in both modes. Square regions connect across edges. Square-radius alerts count diagonal steps as one cell; radius 1 covers a 3×3 area. A radius-0 pin is suitable for a trap on one square. A movement path only triggers cells it enters, not squares touched at a corner.

Changing grid shape retains region cell indices and changes their drawn layout. Undo restores the previous shape. It does not convert an existing Foundry scene in place: create a new scene from the preview to preserve existing walls/tokens. Grid shape and size are saved in project JSON.

The scene checkbox is located at the **bottom of the Basics content tab**, below standard scene settings.

## Paint trap squares

Choose **Square**, then **Paint traps** at the top of the editor. Name the trap and click or drag to paint its squares. Separate squares are allowed in the same trap group. The DM sees each square tinted red with a skull; players see each individual trap only after entering it, and it stays revealed afterward. A new trap on an already-explored floor cell still waits for entry. Use the Foundry encounter settings on the selected trap to add a private DC reminder.

## First map

Open Wild Atlas. The current scene image and hex grid load automatically. Use the Regions and Pins tabs as in the standalone editor, then click **Save to scene**.

For an existing Wild Atlas JSON, use **Open project** inside the editor, apply **Map → Foundry alignment** if needed, then **Foundry → Create new scene from map**. This creates a separate aligned scene and uploads an embedded background into `worlds/<world-id>/wild-atlas/`. Close the old editor and open Wild Atlas on the new scene. It does not reposition tokens or walls in an existing scene.

New scenes use grid opacity 0, token vision off and fog exploration off, so the original image is visible before exploration. Enabled hexploration scenes automatically disable Token Vision and Fog Exploration, including existing scenes when the GM opens them. The previous values are saved and restored when hexploration is disabled. This ensures players see the background without needing an owned vision token. Set grid opacity to 0 yourself on existing scenes if you want no native grid lines. Leave background rotation at 0 and scale at 1. Legacy hex grids are not supported. Changing scene dimensions/grid after painting requires realignment or a new scene.

## Exploration

Select the party token on the Foundry canvas. Open or restore the editor and click **Foundry → Use selected Foundry token for exploration**. Minimize the editor to select or move tokens. The normal Player Token inside the editor remains a planning/reference tool; it does not move Foundry tokens.

Only tracked tokens reveal overlays. The origin hex is not revealed merely by designating a token: move into a hex to discover it. Each entered hex retains its colour, habitat symbol and difficulty dots for all players. Crossing part of a region does not reveal the rest. Only public pins/labels inside discovered hexes are published. A GM must be connected to process discovery and reminders.

Actual passed movement waypoints are followed in order, including intermediate cells. Teleport/displace steps only discover their destination. Retracing a route can trigger entry-based encounters again. The token centre determines its hex; a large token's full footprint is not explored. First-discovery and daily limits are shared across the party; “day” uses Foundry world time / 86,400 seconds.

## Tables and encounters

In **Foundry**, select a world or visible compendium RollTable for each generator, or paste its UUID. Blank means the built-in editor table. The normal Roll buttons then use those choices without public chat messages or consuming table results.

- Habitat results: an exact name from the editor's enabled habitats (case-insensitive). Set colour/symbol in the editor tables.
- Terrain: an enabled difficulty's name or a number from 1 to 4.
- Size: a positive integer.
- Encounter/feature: result text. HTML is treated as text rather than executed.

Unknown or disabled mapped habitats/difficulties produce a visible error, not a silent reroll. Use an appropriate regional Foundry table to limit its results. If a table returns multiple encounter results, their text is combined; the first returned result supplies the configured rule. Nested table results should be configured in the table that directly supplies the encounter if result IDs differ.

Encounter rules can apply to the selected region, a specific q,r hex, or an encounter table result. A rolled result rule is copied when you Apply the draft; editing the table rule later does not retroactively alter old regions. Specific hex rules override region defaults, including a disabled rule that deliberately suppresses an encounter on that hex.

Configure DC/check/on-failure or on-success, or percentage chance, and a repeat policy. Movement sends one GM-only chat message listing each applicable entered hex and its encounter. Checks are reminders, not system-specific automatic skill rolls. Pins support either a hex-radius aura or **Region alert**, which covers the region containing the pin. Chat alerts fire only when entering the area, including entries along an intermediate route, and rearm after leaving. They are tracked separately for each exploration token. The DM readout continues showing nearby pins while inside without repeating pin chat. The GM panel also reports the destination region.

## GM controls

Toolbar buttons and remappable Configure Controls bindings:

| Shortcut | Action |
|---|---|
| Alt+W | Open/restore editor |
| Alt+R | Toggle GM region overlays |
| Alt+P | Toggle GM pins/labels |
| Alt+A | Toggle GM pin auras |
| Alt+V | Switch DM / Player view |
| Alt+S | Toggle habitat symbols/difficulty dots (also available to players) |

Buttons show On/Off states and the current DM/Player view. The compact DM readout sits below the controls at the top centre. Strong black outlines mark actual region boundaries; unexplored boundary geometry is not disclosed to players. Shortcuts also work inside the embedded editor except while typing in fields. These preferences are client-specific and never reset exploration. Player preview changes map overlays; it does not impersonate player vision or permissions. **Untrack token** stops tracking selected canvas tokens. The editor's Foundry tab offers a confirmed discovery reset which retains all authored map data.

## Saving and privacy

The complete project, encounter rules, revision and discovery history are saved in a GM-owned Journal Entry named **Wild Atlas · scene name · GM data**, with a text page named **Wild Atlas data**. Keep this entry and page private and do not edit their generated JSON manually. The scene contains only the explored public map projection. Chat reminders whisper to GM recipients. This uses Foundry document permissions; it is not encrypted storage.

Use **Save to scene** for world persistence, **Save project** for JSON backup, and Foundry world backups before module upgrades. JSON from a scene can reference its Foundry background URL; for a portable standalone backup, import/embed the background image before exporting JSON. Saving from a second stale editor is rejected to avoid overwriting another GM's edits. Exploration writes are serialized through the elected active GM.

## Development

From the editor project root: `npm run build:foundry`. This rebuilds the iframe editor and shared core into this module folder. `npm test` covers existing editor behaviour plus movement paths, discovery, per-hex overrides, private/public projection and encounter reminders. `npm run build` builds the standalone editor independently.

### Live verification still required

Use a test world with separate GM and player browser sessions. Check row/column odd/even grids; waypoint moves, interrupted moves and teleports; multiple tracked tokens and multiple GMs; reconnect persistence; no-GM behaviour; private journal/chat permissions; image alignment under zoom/pan; token visibility below the overlay; and Foundry 14 multi-level scenes. The current overlay is a transparent HTML/SVG layer above the canvas, so it does not participate in Foundry lighting, roofs or level occlusion. Use a simple single-level wilderness scene for this first build.


## Movable control panel

Hold the right mouse button anywhere on the combined controls/location panel and drag it. Position is saved in this browser per world and user and kept within the window. Left-click icons to toggle regions, symbols, pins, auras and player preview; gold icons are active and hover labels describe their state. Wild Atlas opens the editor. The GM location and nearby-pin readout lives below the icons in the same panel. Players receive only their own symbol control, without the GM readout.

## Group actor tracking

Scene Configure → Basics → Wild Atlas group actor UUID accepts a world actor UUID (Actor.ID). Place one token for that actor on the scene. This becomes the only tracked token, overriding individual explorer flags. If multiple tokens use that actor, only the first scene token is tracked. Clearing the UUID restores individual-token tracking. Location, cell, habitat, terrain difficulty and nearby pins update on scene load and token changes, without needing an exploration move first. Unmapped cells show unassigned values.

Close now hides the editor immediately and preserves unsaved edits in the current browser session, like Minimize. Reopen with Wild Atlas. Save to scene before refreshing or leaving the world.

Version 0.2.3 uses versioned runtime filenames to avoid mixed cached updates. The panel displays its running version. Right-drag the panel or left-drag its header; Reset position restores the top-centre position.
