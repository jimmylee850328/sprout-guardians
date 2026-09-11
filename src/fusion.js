import { TOWERS } from './data.js';

export const ELEMENT_NAMES={pea:'速射',mushroom:'爆破',frost:'冰霜',lightning:'雷電',flame:'烈焰',venom:'毒霧',nova:'重力'};
export function ordinaryStats(t){
 const d=TOWERS[t.type];
 return {...d,damage:Math.round(d.damage*(1+(t.level-1)*.65)),range:d.range+(t.level-1)*.45,interval:d.interval/(1+(t.level-1)*.12)};
}
export function createFusion(towers){
 if(towers.length!==3||towers.some(t=>!TOWERS[t.type]||t.type==='super'))throw new Error('融合需要三座一般砲台');
 const ingredients=towers.map(t=>({type:t.type,level:t.level,...ordinaryStats(t),investment:t.spent}));
 return {ingredients,investment:ingredients.reduce((n,t)=>n+t.investment,0)};
}
export function fusionStats(t){
 const ingredients=t.fusion.ingredients,rank=t.level-1;
 const interval=.16/(1+rank*.1),multiplier=1.1*(1+rank*.3);
 // Preserve each ingredient's DPS and damage type, rather than granting free abilities.
 const components=ingredients.map(i=>({type:i.type,damage:i.damage/i.interval*interval*multiplier,power:1+(i.level-1)*.35}));
 return {...TOWERS.super,interval,components,damage:components.reduce((n,c)=>n+c.damage,0),range:ingredients.reduce((n,i)=>n+i.range,0)/3+.65+rank*.25};
}
export function upgradeCost(t){return Math.round(t.type==='super'?t.fusion.investment*(.65+(t.level-1)*.25):TOWERS[t.type].cost*.75*t.level)}
export function recipeLabel(fusion){return Object.entries(fusion.ingredients.reduce((counts,i)=>({...counts,[i.type]:(counts[i.type]||0)+1}),{})).map(([type,n])=>ELEMENT_NAMES[type]+(n>1?' ×'+n:'')).join(' ＋ ')}
