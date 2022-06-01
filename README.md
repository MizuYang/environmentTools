<h1><a href="https://mizuyang.github.io/environmentTools/#/">作品連結 (建議手機觀看)</a></h1>
<h2><a href="https://equatorial-alloy-23b.notion.site/f6226e0c3e42458898d5cbdda240f6b6">頁面介紹、開發紀錄</a><h2>

<article>
  <header>
    <h3>為何開發這個作品？</h3>
    <p>
      由於疫情當前，許多疫情資訊包括確診數、死亡數、藥局販售快篩數量都公告在不同地方， <br />
      需要有地方能去整合所有的資料，所以這個作品就這樣問世了。<br />
  考量到家人平常只使用手機查看資訊，比較少用電腦，所以此專案就以手機版為優先。<br />
  原先是只想做給家人使用，但沒想到後來家人分享給各自公司的同事們，並獲得他們的好評，<br />
  有幫助到身邊周遭親人、朋友，覺得非常有成就感，
  也更讓我有動力持續做下去！
    </p>
    <h3>網站使用技術</h3>
    <ul>
      <li>Vue3  開發專案</li>
      <li>使用 Vue-Router 建構路由 ( SPA )</li>
      <li>components 元件拆分管理</li>
      <li>mixins 拆分元件可共用部分出來</li>
      <li>將常用函式拆分模組 ( ESM )</li>
      <li>AJAX / JSON 串接 RESTful API <br />( 氣象局、環保署 、政府公開平台、國外疫情網 API )</li>
      <li>ESLint 管控程式品質(standard 風格)</li>
      <li>Bootstrap 5 整合 SCSS 開發</li>
      <li>使用 RWD 響應式網頁設計</li>
      <li>HTML / CSS 網站設計</li>
      <li>localStorage 開發收藏功能</li>
      <li>GitHub Pages 部署靜態網頁</li>
      <li>Git 版本控制、良好 commit 命名與管理</li>
    </ul>
    <h3>更新紀錄</h3>
    <ul>
      <li><a href="https://equatorial-alloy-23b.notion.site/update_14-2022-6-1-3b8b06d0a57644d38022e2f0cac21fe3">update_14 - 2022/6/1</a></li>
      <li><a href="https://equatorial-alloy-23b.notion.site/update_13-2022-5-23-a7520b4243ab448b9a29134ac5be9cb3">update_13 - 2022/5/23</a></li>
      <li><a href="https://equatorial-alloy-23b.notion.site/update_12-2022-5-21-10218a5851ff425c9c2a86126e28b9cf">update_12 - 2022/5/21</a></li>
    </ul>
    <details>
      <summary><h4>過去的更新紀錄<h4></summary>
      <ul>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_11-2022-5-17-a077182b88864ec78d87ff85ba3e0f09">update_11 - 2022/5/17</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_10-2022-5-16-a3ad5fc20eba4e40985f4a6c61d2913e">update_10 - 2022/5/16</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_9-2022-5-12-11aafc424bca47fcbe21fbecde751b52">update_9 - 2022/5/12</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_8-2022-5-11-f8deeb2583f74b4a85caea8d2df7e985">update_8 - 2022/5/11</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_7-2022-5-9-8ab45df4871947c38fac32fcacb84e35">update_7 - 2022/5/9</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_6-2022-5-7-125eaa8baf8546fa8bf7dc59e85d40dc">update_6 - 2022/5/7</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_5-2022-5-5-1080fe245d6245539bb7c478f3208af8">update_5 - 2022/5/5</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_4-2022-5-4-965a97b39fca471cbc885947f8f4a4b9">update_4 - 2022/5/4</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_3-2022-5-3-2703265bc09b4ed5a4ccb2aec5bb2512">update_3 - 2022/5/3</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_2-2022-5-2-f54aeb7fb6834418b083a311cb1c14a5">update_2 - 2022/5/2</a></li>
        <li><a href="https://equatorial-alloy-23b.notion.site/update_1-2022-4-29-de2a1ec9fe7a48239417005f68a6d9b3">update_1 - 2022/4/29</a></li>
      </ul>
    </details>
  </header>
  <hr />
  <main>
    <h3>快篩頁面</h3>
    <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E5%BF%AB%E7%AF%A9%E9%A0%81%E9%9D%A2.png?raw=true" alt="快篩頁面" height="500" width="250">
    <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E5%BF%AB%E7%AF%A9%E8%97%A5%E5%B1%80%E9%A1%AF%E7%A4%BA.png?raw=true" alt="快篩藥局顯示" height="500" width="250">
    <ul>
      <li>功能提示教學 (Bootstrap Modal)</li>
      <li>下拉選單查詢縣市、地區藥局快篩剩餘數量</li>
      <li>關鍵字查詢藥局快篩剩餘數量</li>
      <li>可輸入藥局名稱或地址查詢</li>
      <li>localStorage 開發收藏功能，加入、移除收藏，</li>
      <li>只要將家或公司附近的藥局加入收藏，下次開啟網頁，<br />
      只要點擊查詢已收藏藥局，就能直接查詢。</li>
      <li>家人和朋友都有使用這個功能，並得到良好的回饋</li>
    </ul>
    <h3>疫情頁面</h3>
    <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E7%96%AB%E6%83%85%E9%A0%81%E9%9D%A2.png?raw=true" alt="疫情頁面顯示" height="500" width="250">
      <ul>
        <li>功能提示教學 (Bootstrap Modal)</li>
        <li>查詢今天、昨天、前天疫情狀況</li>
        <li>可使用下拉選單查詢其他國家的疫情</li>
        <li>可使用關鍵字查詢各個國家疫情 (英文)</li>
        <li>關鍵字英文大小寫都可以 ( toLowerCase )</li>
        <li>可以輸入下拉選單沒有的國家名稱</li>
        <li>切換國家就更換為該國家的國旗</li>
      </ul>
      <h3>天氣頁面</h3>
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E5%A4%A9%E6%B0%A3%E9%A0%81%E9%9D%A2.png?raw=true" alt="天氣頁面顯示" height="500" width="250">
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E6%B0%A3%E8%B1%A1%E7%9B%B8%E9%97%9Cicons.png?raw=true" alt="天氣頁面 icons顯示" height="250" width="250">
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E7%B4%AB%E5%A4%96%E7%B7%9A.png?raw=true" alt="紫外線指數圖片顯示" height="250" width="250">
      <ul>
        <li>功能提示教學 (Bootstrap Modal)</li>
        <li>跑馬燈顯示天氣警報</li>
        <li>查看縣市、地區的天氣、溫度、紫外線、 降雨率、空氣品質...等，<br />
        並依照天氣狀況來改變天氣 icon 圖示 (用物件包裝天氣與對應 icon 寫判斷)。</li>
        <li>localStorage 開發收藏功能，加入、移除收藏。</li>
        <li>點擊已收藏的地區就自動搜尋該縣市天氣，</li>
        <li>移動到該地區位置(自動展開該地區 + 高亮)</li>
      </ul>
      <h3>天災頁面</h3>
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E5%A4%A9%E7%81%BD%E9%A0%81%E9%9D%A2.png?raw=true" alt="天災頁面顯示" height="500" width="250">
      <img src="https://github.com/MizuYang/environmentTools/blob/main/src/assets/image/README/%E5%9C%B0%E9%9C%87%E8%B3%87%E6%96%99.png?raw=true" alt="天災頁面顯示" height="500" width="250">
      <ul>
        <li>查詢颱風動向</li>
        <li>查詢較大地震、小區域有感地震</li>
        <li>呈現地震報告資料</li>
        <li>呈現地震報告圖</li>
        <li>呈現震度圖</li>
        <li>因為目前尚未遇到颱風，所以資料比較少。</li>
        <li>而地震發生時，的確能捕捉到地震資訊並快速更新</li>
      </ul>
  </main>
<article>

