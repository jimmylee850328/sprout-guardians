import { LEVELS, TOWERS } from './data.js';
export const STORAGE_KEY='sprout-guardians';
export function normalizeProgress(raw={}){
 const stars=LEVELS.map((_,i)=>Math.min(3,Math.max(0,Math.floor(Number(raw?.stars?.[i])||0))));
 const highest=Math.max(0,...stars.map((s,i)=>s>0?i+1:0));
 const chapter=Math.min(LEVELS.length,Math.max(1,highest+1,Math.floor(Number(raw?.unlockedChapter)||1)));
 const unlockedTowers=Object.keys(TOWERS).filter(k=>!TOWERS[k].fusionOnly&&((TOWERS[k].unlock||1)<=chapter||raw?.unlockedTowers?.includes?.(k)));
 return {version:2,stars,muted:raw?.muted===true,unlockedChapter:chapter,unlockedTowers};
}
export function loadProgress(storage){try{return normalizeProgress(JSON.parse(storage.getItem(STORAGE_KEY)||'{}'))}catch{return normalizeProgress()}}
export function completeChapter(progress,index,stars){
 const next=normalizeProgress(progress);
 next.stars[index]=Math.max(next.stars[index]||0,stars);
 return normalizeProgress(next);
}
