export const TOWERS={
 pea:{name:'豌豆小砲手',tag:'單體 · 快速射擊',cost:80,damage:18,range:4.6,interval:.65,color:'#96bf62',description:'小小豌豆，大大火力。快速擊退最靠近終點的小怪。'},
 mushroom:{name:'蘑菇轟炸手',tag:'範圍 · 爆破攻擊',cost:120,damage:32,range:4.2,interval:1.7,color:'#dc8057',description:'蓬鬆帽子藏著驚喜，一次轟走一群搗蛋鬼。'},
 frost:{name:'冰晶小花',tag:'控場 · 緩速冰凍',cost:100,damage:9,range:4.3,interval:1.05,color:'#83c7c9',description:'讓小怪慢下腳步，替夥伴爭取更多攻擊時間。'},
 lightning:{name:'雷鳴向日葵',tag:'電弧 · 連鎖破甲',cost:165,damage:24,range:4.5,interval:1.1,color:'#b39dff',unlock:2,description:'連鎖電弧跳躍四名敵人，無視護甲。'},
 flame:{name:'熔岩金盞花',tag:'烈焰 · 持續燃燒',cost:180,damage:17,range:3.8,interval:.8,color:'#ff813e',unlock:3,description:'火焰爆破點燃一群敵人，持續灼燒並壓制再生。'},
 venom:{name:'幽毒捕蠅草',tag:'毒霧 · 腐蝕護甲',cost:155,damage:12,range:4.5,interval:1.2,color:'#aaec63',unlock:4,description:'毒霧持續侵蝕敵人，讓厚重護甲失效。'},
 nova:{name:'星環蓮華',tag:'星爆 · 重力禁錮',cost:240,damage:48,range:5.1,interval:2.2,color:'#eeb1ff',unlock:5,description:'星環爆破禁錮範圍內敵人，適合攔截高速突襲。'},
 super:{name:'太陽核巨砲',tag:'融合 · 超高速轟擊',cost:0,damage:12,range:5.8,interval:.14,color:'#ffd45f',fusionOnly:true,description:'由三位守衛融合而成，以巨型能量彈高速橫掃整片戰場。'}
};
export const LEVELS=[
 {name:'微風草原',subtitle:'BREEZY MEADOW',theme:'meadow',waves:5,gold:240,hp:20,ground:'#aabe87',sky:'#eaf0df',path:[[-10,1],[-6,1],[-6,-3],[-1,-3],[-1,3],[4,3],[4,-1],[9,-1]],spots:[[-7,-1],[-4,-1],[-3,2],[1,0],[2,5],[6,1],[2,-3],[6,-3]],trees:[[-8,-4],[-8,4],[-5,5],[7,4],[0,-5],[8,-4]],reward:45},
 {name:'暖陽菇菇林',subtitle:'MUSHROOM GROVE',theme:'grove',waves:6,gold:280,hp:20,ground:'#b8b77f',sky:'#f0ebdb',path:[[-10,-3],[-5,-3],[-5,3],[0,3],[0,-2],[5,-2],[5,2],[9,2]],spots:[[-7,-1],[-3,-1],[-3,5],[2,1],[2,-4],[7,-1],[3,4],[0,-4]],trees:[[-8,4],[-8,-5],[-4,-5],[7,4],[8,-4],[0,5]],reward:55},
 {name:'冰糖雪花谷',subtitle:'FROSTED VALLEY',theme:'snow',waves:7,gold:320,hp:20,ground:'#b9d4c9',sky:'#e5efeb',path:[[-10,2],[-6,2],[-6,-2],[-2,-2],[-2,3],[3,3],[3,-3],[7,-3],[7,0],[9,0]],spots:[[-8,0],[-4,0],[-4,4],[0,1],[1,-3],[5,0],[5,5],[8,3]],trees:[[-8,-4],[-8,5],[0,-5],[8,-5],[0,5],[6,5]],reward:65},
 {name:'雷鳴高地',subtitle:'THUNDER HEIGHTS',theme:'storm',waves:7,gold:340,hp:20,ground:'#9aabb7',sky:'#d8e0ed',path:[[-10,-4],[-6,-4],[-6,2],[-2,2],[-2,-3],[3,-3],[3,3],[9,3]],spots:[[-8,-2],[-4,-2],[-4,4],[0,0],[1,-5],[5,0],[5,5],[7,1],[0,4],[7,-3]],trees:[[-8,4],[-4,-5],[8,-5],[0,5]],reward:65},
 {name:'熔火峽谷',subtitle:'EMBER CANYON',theme:'ember',waves:8,gold:360,hp:20,ground:'#c29783',sky:'#f0dccc',path:[[-10,3],[-7,3],[-7,-3],[-3,-3],[-3,3],[2,3],[2,-2],[7,-2],[7,2],[9,2]],spots:[[-9,0],[-5,0],[-5,5],[-1,0],[0,-4],[4,0],[4,5],[8,-4],[-1,5],[5,-4]],trees:[[-9,-5],[-2,-5],[8,5],[0,5]],reward:70},
 {name:'星霧秘境',subtitle:'ASTRAL SANCTUARY',theme:'astral',waves:9,gold:400,hp:20,ground:'#a89cbd',sky:'#e3dcec',path:[[-10,-3],[-6,-3],[-6,3],[-1,3],[-1,-3],[4,-3],[4,3],[9,3]],spots:[[-8,0],[-4,0],[-4,5],[1,0],[1,-5],[6,0],[6,5],[8,-3],[-1,5],[-4,-5]],trees:[[-9,5],[-8,-5],[8,5],[0,-5]],reward:75}
];

export const ENEMIES={
 normal:{name:'搗蛋兔',hp:1,speed:1,color:'#c699ad'},
 fast:{name:'疾風兔',hp:.7,speed:1.7,color:'#e5b976'},
 armored:{name:'鐵甲蟲',hp:2.2,speed:.7,color:'#8395ac',armor:.5},
 swarm:{name:'分裂史萊姆',hp:1.3,speed:.9,color:'#8dc969'},
 healer:{name:'再生蘑靈',hp:1.5,speed:.85,color:'#e3a4ce'},
 shield:{name:'水晶護衛',hp:1.9,speed:.8,color:'#8ccfdc',shield:.6},
 wisp:{name:'幻影幽靈',hp:.85,speed:1.5,color:'#b6a5ed',resistSlow:true},
 boss:{name:'巨角魔王',hp:9,speed:.65,color:'#a077b4'}
};
export function waveRoster(level,wave){
 const pools=[['normal','fast'],['normal','fast','armored'],['normal','fast','swarm','healer'],['armored','fast','shield'],['armored','swarm','healer','wisp'],['shield','wisp','healer','swarm','armored']];
 const pool=pools[level],count=6+wave*2+level*2;
 return Array.from({length:count},(_,i)=>({kind:wave===LEVELS[level].waves&&i===count-1?'boss':pool[(i+wave)%pool.length],hp:32+wave*17+level*14+wave*level*2,speed:.95+level*.045+wave*.025}));
}
