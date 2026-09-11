import * as THREE from 'three';
import { TOWERS, ENEMIES } from './data.js';
const mats = new Map();
export function material(color, roughness=.8){const key=color+':'+roughness;if(!mats.has(key))mats.set(key,new THREE.MeshStandardMaterial({color,roughness}));return mats.get(key)}
export function mesh(geo,color,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geo,material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;if(parent)parent.add(m);return m}
export function ball(parent,color,x,y,z,sx,sy=sx,sz=sx){const m=mesh(new THREE.SphereGeometry(1,20,14),color,parent,x,y,z);m.scale.set(sx,sy,sz);return m}
export function cylinder(parent,color,x,y,z,top,bottom,height,segments=24){return mesh(new THREE.CylinderGeometry(top,bottom,height,segments),color,parent,x,y,z)}
export function leaf(parent,x,y,z,rot=0,size=1,color='#77a44a'){const m=ball(parent,color,x,y,z,.17*size,.055*size,.43*size);m.rotation.set(-.3,rot,.1);return m}
export function eyes(parent,y,z,spread=.19,size=.067){for(const side of [-1,1]){ball(parent,'#283d32',side*spread,y,z,size,size*1.17,size*.6);ball(parent,'#ffffff',side*spread-.014,y+.024,z+.034,size*.3);ball(parent,'#e7a69a',side*(spread+.13),y-.14,z-.025,.082,.043,.025)}}
function fusionModule(type,level){
 const g=new THREE.Group(),color=TOWERS[type].color,metal='#665532';
 cylinder(g,metal,0,0,0,.22,.3,.22,12);
 if(type==='flame'){
  cylinder(g,'#cf5730',0,.22,0,.22,.26,.45,12);
  for(const side of [-1,0,1]){const flame=mesh(new THREE.ConeGeometry(.16,.6+level*.13,5),side?'#ff813e':'#fff199',g,side*.16,.7,0);flame.rotation.z=-side*.25}
 }else if(type==='lightning'){
  cylinder(g,metal,0,.3,0,.1,.13,.65,10);
  for(const side of [-1,1]){const fork=mesh(new THREE.BoxGeometry(.09,.6,.1),'#b39dff',g,side*.2,.65,0);fork.rotation.z=-side*.35;ball(g,'#fff5bd',side*.3,.97,0,.12)}
 }else if(type==='frost'){
  for(const side of [-1,0,1]){const shard=mesh(new THREE.OctahedronGeometry(.25),'#8ce8ef',g,side*.2,.45+(.2-Math.abs(side)*.2),0);shard.scale.set(.7,2+level*.15,.7);shard.rotation.z=-side*.35}
 }else if(type==='mushroom'){
  cylinder(g,'#ffe5b0',0,.28,0,.16,.22,.6);
  const cap=mesh(new THREE.SphereGeometry(.5,20,12,0,Math.PI*2,0,Math.PI/2),color,g,0,.48,0);cap.scale.y=.8;
  for(const side of [-1,1])ball(g,'#fff1d2',side*.2,.79,.12,.1,.035,.1);
 }else if(type==='venom'){
  for(const side of [-1,1]){const jaw=ball(g,color,side*.2,.5,0,.24,.4,.3);jaw.rotation.z=-side*.4;
   for(let j=0;j<3;j++)mesh(new THREE.ConeGeometry(.06,.18,4),'#fff2cc',g,side*.07,.35+j*.16,.22).rotation.z=side*Math.PI/2}
 }else if(type==='nova'){
  const core=mesh(new THREE.IcosahedronGeometry(.25),'#efb4ff',g,0,.55,0);
  for(let j=0;j<2;j++){const ring=mesh(new THREE.TorusGeometry(.43,.045,8,28),j?'#fff2fb':color,g,0,.55,0);ring.rotation.set(.6+j,0,j*.8)}
 }else{
  const barrel=cylinder(g,color,0,.38,.2,.2,.25,.7);barrel.rotation.x=Math.PI/2;
  const mouth=mesh(new THREE.TorusGeometry(.2,.07,8,24),'#c0e681',g,0,.38,.56);
  ball(g,'#405b31',0,.38,.57,.15,.15,.018);
 }
 g.scale.setScalar(.8+level*.1);return g;
}
export function towerModel(type,level=1,fusion=null){const root=new THREE.Group();const base=new THREE.Group();root.add(base);
 cylinder(base,'#d6bb91',0,.07,0,.66,.72,.15);cylinder(base,'#edb589',0,.28,0,.52,.39,.42);cylinder(base,'#f5c79a',0,.49,0,.59,.59,.15);cylinder(base,'#65583d',0,.58,0,.49,.49,.07);
 for(let i=0;i<7;i++)leaf(base,Math.sin(i)*.33,.63,Math.cos(i)*.33,i,.9);
 const head=new THREE.Group();root.add(head);root.userData.head=head;
 if(type==='super'){
 const metal='#665532',gold='#f4bd3f',glow='#fff1a1';
 cylinder(base,metal,0,.48,0,1.08,1.22,.38,32);cylinder(base,gold,0,.72,0,.88,1.02,.22,32);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const fin=mesh(new THREE.BoxGeometry(.18,.5,.58),i%2?gold:'#e88935',base,Math.sin(a)*.88,.45,Math.cos(a)*.88);fin.rotation.y=a}
 cylinder(head,'#7d6837',0,1.2,0,.45,.62,1.05,20);ball(head,gold,0,1.92,0,.92,.78,.86);ball(head,glow,0,2.12,-.12,.58,.48,.55);
 for(const side of [-1,1]){const barrel=cylinder(head,side<0?'#d87e32':gold,side*.34,1.88,.85,.3,.42,1.35,24);barrel.rotation.x=Math.PI/2;const rim=mesh(new THREE.TorusGeometry(.31,.105,12,28),glow,head,side*.34,1.88,1.52);ball(head,'#4b3c26',side*.34,1.88,1.535,.235,.235,.025)}
 eyes(head,2.18,.7,.35,.09);for(let i=0;i<6;i++){const a=i*Math.PI/3;const ray=mesh(new THREE.OctahedronGeometry(.22),glow,head,Math.sin(a)*.8,2.72,Math.cos(a)*.6);ray.scale.set(.65,1.8,.65)}
 const halo=mesh(new THREE.TorusGeometry(1.08,.065,10,48),glow,head,0,2.25,0);halo.rotation.x=Math.PI/2;root.userData.halo=halo;root.scale.setScalar(1.55);
 root.userData.elementOrbits=[];root.userData.fusionModules=[];
 for(const [i,part] of (fusion?.ingredients||[]).entries()){
  const orbit=new THREE.Group();head.add(orbit);orbit.position.y=1.25+i*.55;
  const color=TOWERS[part.type].color;
  const module=fusionModule(part.type,level);
  const angle=i*Math.PI*2/3+Math.PI/3;module.position.set(Math.sin(angle)*1.05,1.65,Math.cos(angle)*1.05);module.rotation.y=angle;head.add(module);root.userData.fusionModules.push(module);
  const plate=mesh(new THREE.BoxGeometry(.48,.22+level*.07,.28),color,base,Math.sin(angle)*.9,.85,Math.cos(angle)*.9);plate.rotation.y=angle;
  const ring=mesh(new THREE.TorusGeometry(1.05+i*.05,.035+level*.012,8,40),color,orbit);ring.rotation.x=Math.PI/2;
  for(let j=0;j<level+1;j++){const a=j*Math.PI*2/(level+1)+i;const gem=mesh(new THREE.OctahedronGeometry(.13+level*.025),color,orbit,Math.sin(a)*1.1,0,Math.cos(a)*1.1);gem.scale.y=part.type==='flame'?2:1;gem.material=gem.material.clone();gem.material.emissive.set(color);gem.material.emissiveIntensity=.6}
  root.userData.elementOrbits.push(orbit);
 }

 }else if(type==='pea'){
 cylinder(head,'#6c9b48',0,.87,0,.11,.13,.66);leaf(head,.23,.86,0,1.2,1.1);leaf(head,-.21,.94,0,-1.3,.9);
 ball(head,'#97bb61',0,1.48,0,.54,.5,.52);ball(head,'#a8c976',-.12,1.67,-.14,.29,.21,.3);
 const barrel=cylinder(head,'#91b85c',0,1.43,.49,.26,.3,.46);barrel.rotation.x=Math.PI/2;
 const ring=mesh(new THREE.TorusGeometry(.224,.075,10,24),'#acd17c',head,0,1.43,.73);ball(head,'#405b31',0,1.43,.735,.18,.18,.018);
 eyes(head,1.64,.41,.26,.066);leaf(head,.1,1.99,-.1,-.5,.8);leaf(head,-.14,1.98,-.06,1,.6);
 }else if(type==='mushroom'){
 cylinder(head,'#fae6bb',0,1.02,0,.29,.34,.85);ball(head,'#fae6bb',0,1.18,0,.35,.34,.33);eyes(head,1.07,.31,.14,.062);
 const cap=mesh(new THREE.SphereGeometry(.8,32,16,0,Math.PI*2,0,Math.PI/2),'#dc8057',head,0,1.35,0);cap.scale.y=.8;cylinder(head,'#f4c394',0,1.34,0,.78,.72,.1);
 const spots=[[-.3,1.88,.1,.15],[.3,1.87,-.06,.17],[0,1.91,-.32,.13],[-.51,1.65,.3,.12],[.33,1.71,.48,.17],[-.38,1.72,-.4,.14]];
 spots.forEach(([x,y,z,r])=>ball(head,'#fff0c9',x,y,z,r,.037,r));
 leaf(base,.55,.68,.2,1.3,.7,'#bf9b53');
 }else if(['lightning','flame','venom','nova'].includes(type)){
 const color=TOWERS[type].color;
 cylinder(head,'#528566',0,1,0,.14,.2,.9);
 const core=ball(head,color,0,1.6,0,.4);
 eyes(head,1.63,.35,.15,.06);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;
  if(type==='venom'){const jaw=mesh(new THREE.ConeGeometry(.19,.55,4),i%2?'#e6ffac':color,head,Math.sin(a)*.5,1.6,Math.cos(a)*.5);jaw.rotation.z=Math.sin(a)*.65;}
  else{const petal=mesh(new THREE.OctahedronGeometry(type==='nova'?.25:.3),i%2?'#fff2cc':color,head,Math.sin(a)*.58,1.7+Math.cos(a)*.3,Math.cos(a)*.25);petal.scale.y=type==='flame'?2.2:1.4;petal.rotation.z=-a;}
 }
 const halo=mesh(new THREE.TorusGeometry(.75,.045,8,40),color,head,0,1.8,0);halo.rotation.x=Math.PI/2;root.userData.halo=halo;
 if(type==='lightning')for(const side of [-1,1])mesh(new THREE.ConeGeometry(.12,.75,4),'#fff4aa',head,side*.55,2.2,0).rotation.z=side*.4;
 if(type==='nova'){const ring=mesh(new THREE.TorusGeometry(.87,.035,8,40),'#fff0ff',head,0,1.8,0);ring.rotation.x=.5;core.scale.setScalar(.5)}
 }else{
 cylinder(head,'#8bb8ac',0,.86,0,.15,.19,.61);for(let i=0;i<6;i++){const a=i*Math.PI/3;leaf(head,Math.sin(a)*.23,.85,Math.cos(a)*.23,a,1.2,'#b7dbd0')}
 ball(head,'#b4ded3',0,1.35,0,.38,.37,.37);eyes(head,1.35,.33,.15,.06);
 for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const c=mesh(new THREE.OctahedronGeometry(.39,0),i%2?'#b7e3dc':'#82c4c5',head,Math.sin(a)*.35,1.65,Math.cos(a)*.27-.05);c.scale.set(.6,1.5,.7);c.rotation.z=-Math.sin(a)*.5}mesh(new THREE.OctahedronGeometry(.33,0),'#dcf4e9',head,0,1.99,-.05).scale.set(.65,1.45,.65);
 }
 if(level>1){for(let i=0;i<level-1;i++){const star=mesh(new THREE.OctahedronGeometry(.11),'#f6d06c',base,(i-(level-2)/2)*.22,.3,.47);star.scale.z=.35}}
 root.userData.type=type;return root;
}
export function tree(parent,x,z,scale=1,color='#82a566'){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);parent.add(g);cylinder(g,'#ab8b64',0,.5,0,.13,.19,1);ball(g,color,0,1.33,0,.68,.91,.65);ball(g,'#a8bf80',-.24,1.63,.08,.36,.46,.37);ball(g,color,.4,1.22,.04,.43,.55,.46);return g}
export function flower(parent,x,z,color='#fff3cf',size=1){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(size);parent.add(g);cylinder(g,'#7c9b54',0,.17,0,.025,.025,.35,6);for(let i=0;i<5;i++)ball(g,color,Math.sin(i*1.256)*.1,.36,Math.cos(i*1.256)*.1,.083,.047,.083);ball(g,'#e6bb59',0,.39,0,.055);return g}
export function enemyModel(kind){const g=new THREE.Group();const color=ENEMIES[kind]?.color||'#c699ad';const body=ball(g,color,0,.5,0,.36,.4,.33);if(kind==='boss'){g.scale.setScalar(1.55);cylinder(g,'#d5b163',0,1.05,0,.2,.22,.18,5)}
 for(const side of [-1,1]){const ear=ball(g,color,side*.19,.91,-.02,.1,.27,.1);ear.rotation.z=-side*.2;ball(g,'#f0d5ce',side*.19,.92,.06,.045,.16,.018);ball(g,'#765b6c',side*.18,.14,.08,.14,.09,.17)}eyes(g,.58,.299,.13,.055);ball(g,'#eed4d1',0,.41,.321,.12,.065,.025);g.userData.body=body;
 if(kind==='armored'){const shell=ball(g,'#64758e',0,.6,-.18,.49,.34,.4);for(let i=0;i<3;i++)mesh(new THREE.ConeGeometry(.12,.28,4),'#c6d8e1',g,(i-1)*.25,.95,-.15)}
 if(kind==='swarm'){g.scale.setScalar(.85);ball(g,'#b3ef8d',0,.4,0,.55,.38,.5);eyes(g,.55,.43,.18)}
 if(kind==='healer'){const cap=ball(g,'#e898c5',0,1.12,0,.56,.18,.5);mesh(new THREE.BoxGeometry(.12,.4,.1),'#e5ffe0',g,0,1.38,.05);mesh(new THREE.BoxGeometry(.36,.12,.1),'#e5ffe0',g,0,1.38,.05)}
 if(kind==='shield'){const shield=mesh(new THREE.IcosahedronGeometry(.68),'#a4e9ff',g,0,.6,0);shield.material=shield.material.clone();shield.material.transparent=true;shield.material.opacity=.28;g.userData.shield=shield}
 if(kind==='wisp'){g.scale.setScalar(.85);const halo=mesh(new THREE.TorusGeometry(.38,.05,8,24),'#eee0ff',g,0,1.3,0);halo.rotation.x=Math.PI/2;for(const side of [-1,1])ball(g,'#c9b7f0',side*.4,.6,0,.3,.08,.16)}
 return g}
export function cottage(parent,x,z){const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);mesh(new THREE.BoxGeometry(1.5,1.4,1.4),'#f8e6bd',g,0,.72,0);const roof=mesh(new THREE.ConeGeometry(1.25,1.15,4),'#c57c5e',g,0,1.91,0);roof.rotation.y=Math.PI/4;mesh(new THREE.BoxGeometry(.44,.78,.08),'#91a976',g,0,.43,.73);ball(g,'#f0cb7d',.13,.45,.79,.043);for(const side of [-1,1]){mesh(new THREE.BoxGeometry(.32,.36,.07),'#fff6da',g,side*.48,.91,.735);mesh(new THREE.BoxGeometry(.22,.26,.08),'#a1bec0',g,side*.48,.91,.78)}cylinder(g,'#e1c49b',0,.08,.94,.64,.72,.13);mesh(new THREE.BoxGeometry(.27,.6,.3),'#e7cba2',g,.45,1.9,-.26);return g}
export function disposeGroup(group){const shared=new Set(mats.values()),disposed=new Set();group.traverse(o=>{o.geometry?.dispose();for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){if(!shared.has(m)&&!disposed.has(m)){m.dispose();disposed.add(m)}}});group.clear()}
export function makePreviews(){const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(240,220);renderer.setPixelRatio(1.5);renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;const scene=new THREE.Scene();scene.add(new THREE.AmbientLight('#fff8e6',2.6));const light=new THREE.DirectionalLight('#ffffff',3);light.position.set(-3,6,5);scene.add(light);const camera=new THREE.PerspectiveCamera(33,240/220,.1,30);camera.position.set(3,2.6,5);camera.lookAt(0,1,0);const images={};for(const type of Object.keys(TOWERS).filter(k=>!TOWERS[k].fusionOnly)){const m=towerModel(type);scene.add(m);renderer.render(scene,camera);images[type]=renderer.domElement.toDataURL();scene.remove(m);disposeGroup(m)}renderer.dispose();return images}
