export const TOWERS={
 pea:{name:'豌豆小砲手',tag:'單體 · 快速射擊',cost:80,damage:18,range:4.6,interval:.65,color:'#96bf62',description:'小小豌豆，大大火力。快速擊退最靠近終點的小怪。'},
 mushroom:{name:'蘑菇轟炸手',tag:'範圍 · 爆破攻擊',cost:120,damage:32,range:4.2,interval:1.7,color:'#dc8057',description:'蓬鬆帽子藏著驚喜，一次轟走一群搗蛋鬼。'},
 frost:{name:'冰晶小花',tag:'控場 · 緩速冰凍',cost:100,damage:9,range:4.3,interval:1.05,color:'#83c7c9',description:'讓小怪慢下腳步，替夥伴爭取更多攻擊時間。'},
 super:{name:'太陽核巨砲',tag:'融合 · 超高速轟擊',cost:0,damage:72,range:6.8,interval:.14,color:'#ffd45f',fusionOnly:true,description:'由三位守衛融合而成，以巨型能量彈高速橫掃整片戰場。'}
};
export const LEVELS=[
 {name:'微風草原',subtitle:'BREEZY MEADOW',theme:'meadow',waves:5,gold:2400,hp:20,ground:'#aabe87',sky:'#eaf0df',path:[[-10,1],[-6,1],[-6,-3],[-1,-3],[-1,3],[4,3],[4,-1],[9,-1]],spots:[[-7,-1],[-4,-1],[-3,2],[1,0],[2,5],[6,1],[2,-3],[6,-3]],trees:[[-8,-4],[-8,4],[-5,5],[7,4],[0,-5],[8,-4]],reward:45},
 {name:'暖陽菇菇林',subtitle:'MUSHROOM GROVE',theme:'grove',waves:6,gold:2800,hp:20,ground:'#b8b77f',sky:'#f0ebdb',path:[[-10,-3],[-5,-3],[-5,3],[0,3],[0,-2],[5,-2],[5,2],[9,2]],spots:[[-7,-1],[-3,-1],[-3,5],[2,1],[2,-4],[7,-1],[3,4],[0,-4]],trees:[[-8,4],[-8,-5],[-4,-5],[7,4],[8,-4],[0,5]],reward:55},
 {name:'冰糖雪花谷',subtitle:'FROSTED VALLEY',theme:'snow',waves:7,gold:3200,hp:20,ground:'#b9d4c9',sky:'#e5efeb',path:[[-10,2],[-6,2],[-6,-2],[-2,-2],[-2,3],[3,3],[3,-3],[7,-3],[7,0],[9,0]],spots:[[-8,0],[-4,0],[-4,4],[0,1],[1,-3],[5,0],[5,5],[8,3]],trees:[[-8,-4],[-8,5],[0,-5],[8,-5],[0,5],[6,5]],reward:65}
];
export function waveRoster(level,wave){const count=5+wave*2+level*2;return Array.from({length:count},(_,i)=>({kind:wave===LEVELS[level].waves&&i===count-1?'boss':i%4===3?'fast':'normal',hp:36+wave*16+level*14,speed:.95+level*.06+wave*.025}))}
