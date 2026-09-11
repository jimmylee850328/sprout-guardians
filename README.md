# 萌芽守衛隊 · Sprout Guardians

可直接遊玩的 Q 版 3D 塔防遊戲，以 Three.js 建立所有場景、砲台及敵人模型，並使用 Web Audio 即時合成音效。

## 啟動

```bash
npm install
npm run dev
```

開啟終端顯示的本機網址，預設為 `http://localhost:5173`。

```bash
npm run build
npm run preview
```

`dist/` 可部署至任何靜態網站主機。遊戲需要支援 WebGL 的現代瀏覽器。

## 玩法

- 選擇守衛，再點擊圓形種植台建造；每關免費提供一座豌豆砲與蘑菇砲。
- 豌豆小砲手快速單體攻擊；蘑菇轟炸手造成範圍傷害；冰晶小花使敵人減速 55%。
- 點擊已建造的守衛，升級至最高 Lv.3，或以累計投入的 65% 回收。
- 擊退敵人及完成波次會獲得陽光幣。守住全部波次獲勝，生命歸零則失敗。
- 六章依序通關解鎖：微風草原（5 波）、暖陽菇菇林（6 波）、冰糖雪花谷（7 波）、雷鳴高地（7 波）、熔火峽谷（8 波）、星霧秘境（9 波）。每章最後一波都有 Boss。
- 起始金錢恢復正常：240／280／320／340／360／400。
- 全章節均可點選任意三座一般砲台，依序按「融合祭品」，第三座確認後生成太陽核巨砲並佔用三個原位置。配方不可更換，也不能再次拿巨砲合成。
- 巨砲繼承三座祭品當下等級的每秒直接傷害與平均射程，直接傷害合计增加 10%。元素各自保留：豌豆速射、蘑菇範圍爆破、冰霜緩速、雷電連鎖破甲、烈焰燃燒、毒霧腐蝕、重力禁錮。昂貴配方的價值包含控場與範圍能力，並非單體傷害一定最高。
- 同元素直接傷害相加；燃燒／毒霧採遞減疊強度，不依高射速無限堆疊。重力每 1.8 秒觸發一次，Boss 禁錮時間較短。雷電只讓雷電部分無視護甲。
- 巨砲可另升至 Lv.3：每級增加相對初始值 30% 的每秒直接傷害、10% 射速及 0.25 射程。升級費分別為祭品累計投入的 65%／90%，祭品升級費一併計入。
- 塔身依三座祭品附上對應噴口、導電叉、冰晶、傘帽、毒牙、星環或砲管；三色軌道、砲彈、命中特效並存，升級會增加軌道晶體及部件大小。
- 解鎖第二至第五章時，依序永久獲得雷鳴向日葵（連鎖破甲）、熔岩金盞花（燃燒抑制再生）、幽毒捕蠅草（腐蝕護甲）、星環蓮華（範圍禁錮）。已解鎖的砲台可帶回所有舊章節。
- 敵人包含普通兔、疾風兔、鐵甲蟲、分裂史萊姆、再生蘑靈、水晶護衛、抗緩速幽靈與魔王。雷電無視護甲、毒霧使護甲失效；護盾會先吸收傷害。
- 通關時剩餘生命 ≥18 獲得 3 星、≥10 獲得 2 星，其餘為 1 星。最佳星數、章節、已解鎖砲台及音效開關儲存在 localStorage 的 `sprout-guardians`；舊紀錄自動遷移。進行中的戰局不存檔，清除網站資料會清除進度，沒有跨裝置同步。

## 操作

戰場使用滿版視窗高度，整頁不捲動。右上角「砲台」可收合建塔列；手機與低高度橫向畫面預設收合，選好守衛後自動收起，接著點種植台即可放置。砲台清單及關卡抽屜可在自己的區域內捲動。

「關卡」隨時可開啟選關抽屜，開啟時暫停戰鬥，關閉後恢復開啟前狀態；切換已有進度的戰局仍須確認。圖鑑、成就與設定也可從抽屜進入。「⛶」切換瀏覽器全螢幕，不支援時仍保留滿版版面。

| 操作 | 功能 |
| --- | --- |
| 1–7 | 選擇已解鎖守衛 |
| Enter | 開始下一波 |
| Space | 暫停／繼續 |
| Esc | 取消選擇／關閉視窗 |
| 滑鼠拖曳／觸控拖曳 | 旋轉 3D 視角 |
| 滾輪／縮放按鈕 | 縮放地圖 |
| 3D／俯視按鈕 | 平滑切換視角 |

音效會在首次點擊後啟用，符合瀏覽器自動播放限制；可隨時靜音或調整音量。切換到其他分頁時遊戲自動暫停。

## 專案結構

- `src/main.js`：介面、快捷鍵、教學、成就及本機紀錄。
- `src/game.js`：場景、路徑、建造、戰鬥、波次及視角控制。
- `src/models.js`：砲台、敵人、地形物件及模型預覽。
- `src/data.js`：六張地圖、七種一般砲台、融合巨砲、敵人與波次設定。
- `src/progress.js`：本機紀錄讀取、舊版遷移與永久解鎖規則。
- `src/fusion.js`：祭品能力快照、融合平衡公式與升級費。執行 `node --test tests/fusion.test.js` 可檢查配方與投入繼承。
- `src/audio.js`：各類攻擊、建造、受傷與勝敗音效。
- `src/style.css`：桌面與行動版排版。

3D 模型和音效不依賴外部素材。字型使用 Google Fonts，無網路時會自動退回系統字型。

## 部署到 Cloudflare Pages

本專案是 Vite 靜態網站，使用 Pages 的 Git 整合即可，不需要資料庫或後端服務。

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)，進入 **Workers & Pages**。
2. 選擇 **Create application → Pages → Connect to Git**。
3. 連接 GitHub，選擇個人帳號 `jimmylee850328`，授權 Cloudflare 存取 `sprout-guardians` repository。Private repository 也支援，不需要改成 public。
4. 選擇 `jimmylee850328/sprout-guardians`，開始設定：

   | 欄位 | 填入值 |
   | --- | --- |
   | Project name | `sprout-guardians`，若重名可自行更換 |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | 留空，使用 repository 根目錄 |

5. 按 **Save and Deploy**。Cloudflare 會安裝依賴、建置及部署，完成後提供 `*.pages.dev` 遊戲網址。
6. 之後推送更新至 `main`，Cloudflare 就會自動重新建置及部署。

如果 GitHub repository 選單找不到專案，請確認 Cloudflare 的 GitHub App 安裝在上述個人帳號，且有授權這個 private repository。

GitHub repository 的 private 設定只控制原始碼儲存庫存取；Pages 遊戲網址預設可公開瀏覽。

官方操作說明：[Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)、[Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)。
