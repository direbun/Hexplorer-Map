// Optional developer verification against the user's installed Foundry core.
// Reads the installation without modifying or distributing Foundry files.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { alignToFoundry, foundrySettings } from '../src/foundry.ts';
import { hexToPixel } from '../src/hex.ts';
import { initialProject } from '../src/model.ts';
if(!process.argv[2])throw new Error('Pass the installed common/grid/hexagonal.mjs path.');
Math.SQRT3=Math.sqrt(3);Math.SQRT1_3=1/Math.sqrt(3);
const {default:HexagonalGrid}=await import(pathToFileURL(process.argv[2]).href);
let count=0,maxError=0;
for(const orientation of ['pointy','flat'])for(const even of [false,true])for(const size of [50,83,100,175]) {
 const grid=alignToFoundry({...initialProject.grid,offsetX:123.4,offsetY:-87.2},size,orientation,even);
 const settings=foundrySettings({...initialProject,grid});
 const foundry=new HexagonalGrid({size,columns:orientation==='flat',even});
 const dimensions=foundry.calculateDimensions(1672,941,0);
 assert.equal(dimensions.x,0);assert.equal(dimensions.y,0);
 for(let q=-10;q<=10;q++)for(let r=-10;r<=10;r++){
   const expected=foundry.getCenterPoint({q,r}),actual=hexToPixel({q,r},grid);
   const error=Math.hypot(actual.x-settings.offsetX-expected.x,actual.y-settings.offsetY-expected.y);
   assert.ok(error<1e-9);maxError=Math.max(maxError,error);count++;
 }
}
console.log(`Verified ${count} hex centres against installed Foundry; maximum error ${maxError} pixels.`);
