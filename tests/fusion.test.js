import test from 'node:test';
import assert from 'node:assert/strict';
import { TOWERS } from '../src/data.js';
import { createFusion, fusionStats, ordinaryStats, upgradeCost } from '../src/fusion.js';
const ingredient=(type,level=1)=>({type,level,spent:TOWERS[type].cost*(1+.75*(level===3?3:level-1))});
const tower=(parts,level=1)=>({type:'super',level,fusion:createFusion(parts)});
test('every recipe preserves only its ingredients and conserves direct DPS with 10% fusion bonus',()=>{
 const keys=Object.keys(TOWERS).filter(k=>k!=='super');
 for(const a of keys)for(const b of keys)for(const c of keys){
  const parts=[ingredient(a),ingredient(b,2),ingredient(c,3)],s=fusionStats(tower(parts));
  assert.deepEqual(s.components.map(p=>p.type),[a,b,c]);
  const dps=parts.reduce((n,p)=>{const t=ordinaryStats(p);return n+t.damage/t.interval},0);
  assert(Math.abs(s.damage/s.interval-dps*1.1)<1e-8);
 }
});
test('sacrificed upgrades and investment survive fusion; fusion upgrades cost real gold',()=>{
 const low=tower(Array.from({length:3},()=>ingredient('pea')));
 const high=tower(Array.from({length:3},()=>ingredient('pea',3)));
 assert(fusionStats(high).damage>fusionStats(low).damage);
 assert(upgradeCost(high)>upgradeCost(low));
 assert(upgradeCost(low)>0);
 const next={...high,level:2};
 assert(fusionStats(next).damage/fusionStats(next).interval>fusionStats(high).damage/fusionStats(high).interval);
 assert(upgradeCost(next)>upgradeCost(high));
});
test('recipes are immutable snapshots and cannot recursively consume a super tower',()=>{
 const parts=['flame','lightning','nova'].map(k=>ingredient(k));
 const f=createFusion(parts);parts[0].level=3;
 assert.equal(f.ingredients[0].level,1);
 assert.throws(()=>createFusion([ingredient('pea'),ingredient('pea'),{type:'super'}]));
 assert.throws(()=>createFusion(parts.slice(0,2)));
});
