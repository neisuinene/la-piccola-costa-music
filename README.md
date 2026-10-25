# La Piccola Costa Music

- index.html：整個播放器
- manifest.json、sw.js、各尺寸 png：讓它能安裝、離線使用

歌曲和歌詞存在你的手機裡（瀏覽器的 IndexedDB），不會上傳到任何地方。
換手機或清除網站資料，歌就會不見，請另外保留原始音檔。

上傳到 GitHub：新建 repository la-piccola-costa-music（Public），一次選取全部 8 個檔案上傳，
再到 Settings → Pages 選 main 分支 / (root)。
網址：https://你的帳號.github.io/la-piccola-costa-music/

更新時：把 sw.js 第一行的 lpcm-v1 改成 lpcm-v2（每次加一）。
