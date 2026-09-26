import type { MapProject } from './model';
export function download(blob:Blob,name:string) {const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export async function exportMap(project:MapProject,player:boolean,format:string,scale:number,quality:number,options:{omitGrid?:boolean}={}) {
 const original=document.getElementById('map-svg')!;const svg=original.cloneNode(true) as SVGSVGElement;
 svg.removeAttribute('style');svg.setAttribute('width',String(project.imageMetadata.width));svg.setAttribute('height',String(project.imageMetadata.height));svg.querySelectorAll('[data-editor]').forEach(n=>n.remove());
 if(options.omitGrid)svg.querySelectorAll('[data-layer="grid"]').forEach(n=>n.remove());
 if(player)svg.querySelectorAll('[data-layer="region-colours"],[data-layer="regions"],[data-layer="symbols"],[data-layer="names"],[data-layer="hidden"]').forEach(n=>n.remove());
 const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
 try {const image=new Image();image.src=url;await image.decode();const canvas=document.createElement('canvas');canvas.width=Math.round(project.imageMetadata.width*scale);canvas.height=Math.round(project.imageMetadata.height*scale);if(canvas.width*canvas.height>100_000_000)throw new Error('Export exceeds 100 megapixels. Choose a smaller scale.');const ctx=canvas.getContext('2d')!;ctx.drawImage(image,0,0,canvas.width,canvas.height);const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Image export failed')),`image/${format}`,quality));download(blob,`${player?'player':'gm'}-map.${format==='jpeg'?'jpg':format}`);}finally{URL.revokeObjectURL(url);}
}


