import { build } from 'vite';
import { resolve } from 'node:path';
const root=resolve('foundry-module/wild-atlas');
await build({base:'./',build:{outDir:resolve(root,'editor'),emptyOutDir:true}});
await build({configFile:false,define:{'process.env.NODE_ENV':'"production"'},build:{outDir:resolve(root,'scripts'),emptyOutDir:false,lib:{entry:resolve('src/foundryModule/core.tsx'),formats:['es'],fileName:()=> 'core.js'},rollupOptions:{output:{inlineDynamicImports:true}}},esbuild:{jsx:'automatic'}});
console.log('Foundry module built:',root);
