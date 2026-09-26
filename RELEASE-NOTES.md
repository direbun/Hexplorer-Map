# Wild Atlas 0.2.0

Experimental first public release for Foundry VTT 13–14, plus a standalone Windows map editor.

- Hex and square maps with named regions, habitat colours, difficulty symbols and clear region borders.
- Persistent exploration: tracked tokens reveal each cell they cross.
- Paint square traps: red skull tiles remain hidden until entered, then stay revealed.
- Foundry RollTable connections and private GM encounter/DC reminders.
- Special pins with radius or region entry alerts.
- GM overlay shortcuts, player symbol toggle, JSON project import/export and background alignment tools.

## Downloads

- **Foundry:** install using `https://github.com/direbun/Hexplorer-Map/releases/latest/download/module.json`, or extract `wild-atlas-0.2.0.zip` into your Foundry `Data/modules` folder.
- **Standalone Windows editor:** extract `wild-atlas-editor-0.2.0-windows.zip` and double-click **Start Wild Atlas.vbs**. Requires Node.js 22+ on PATH.
- GitHub's automatically generated source archives are development files, not the ready-to-run Windows download.

## Known limitations

Live multiplayer and Foundry 14 validation are still incomplete. A connected GM is needed to process exploration. Enabled scenes disable Token Vision and Fog Exploration so the full map background is visible; disabling Wild Atlas restores prior settings. Dungeon traps hide their overlays, not the map or tokens behind walls. Overlays do not integrate with lighting, roofs or multi-level occlusion. Encounter checks are private reminders, not automatic system-specific rolls.

Back up worlds before upgrading. Existing users should save changes and refresh GM/player browsers after installation.
