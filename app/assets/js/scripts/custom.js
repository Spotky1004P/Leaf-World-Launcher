// const axios = require("axios");
// const cheerio = require("cheerio");
// const iconv = require("iconv-lite");
const electron = require('electron');

function hrefWorker(el) {
  el.addEventListener("click", () => {
    const link = el.getAttribute("href");
    electron.shell.openExternal(link);
  })
}
hrefWorker(document.getElementById("nav_discord"));


document.getElementById("launch_button").addEventListener("click", () => {
  console.log(1);
  document.getElementById("launch_before").style.display = "none";
  document.getElementById("launch_after").style.display = "";
});

// class CafeArticleCrawler {
//   /**
//    * @typedef Article
//    * @property {string} name
//    * @property {string} href
//    * @property {string} title
//    * @property {string} article
//    */

//   #cafeLink = "";
//   #articleListLink = "";
//   /** @type {Article[]} */
//   #articles = [];
//   #loading = true;

//   /**
//    * @param {string} articleListLink 
//    */
//   constructor(articleListLink) {
//     this.#cafeLink = articleListLink.split("?")[0];
//     this.#articleListLink = articleListLink;
//     this.#articles = [];

//     this.#init();
//   }

//   async #init() {
//     await this.#initArticleList();
//     this.#loading = false;
//   }

//   /**
//    * @param {string} link 
//    */
//   async #getHtml(link) {
//     let html = await axios.get(
//       link,
//       {responseType: 'arraybuffer', responseEncoding: 'binary'}
//     );
//     html = iconv.decode(Buffer.from(html.data), "KSC5601");
//     return cheerio.load(html);
//   }

//   async #initArticleList() {
//     const $ = await this.#getHtml(this.#articleListLink);
  
//     const listEls = $("div.article-board").last().find("table > tbody > tr .article");
//     const listElArr = listEls.toArray();

//     const names = listEls.text().split("\n").map(v => v.trim()).filter(v => v.length > 0);

//     for (let i = 0; i < listElArr.length; i++) {
//       const itemEl = listElArr[i];
//       const href = this.#cafeLink + itemEl.attribs.href;
//       const article = await this.#getArticle(href);

//       this.#articles.push({
//         name: names[i],
//         href,
//         title: article.title,
//         article: article.article
//       });
//     }
//   }

//   /**
//    * @param {string} herf 
//    */
//   async #getArticle(link) {
//     const $ = await this.#getHtml(link);

//     const title = $("#spiButton").attr("data-title");
    
//     const rawArticle = $(".se-main-container").text();
//     const article = rawArticle.trim();
    
//     return { title, article };
//   }
//   /**
//    * @returns {Promise<boolean>}

//    */
//   async #waitLoading() {
//     if (!this.#loading) {
//       return true;
//     }
//     return await new Promise((res) => {
//       let looper = setInterval(() => {
//         if (this.#loading) {
//           return;
//         } else {
//           res(true);
//           clearInterval(looper);
//         }
//       }, 1000);
//     });
//   }

//   async getArticleList() {
//     console.log(0)
//     await this.#waitLoading();
//     console.log(1)
//     return this.#articles.map(item => ({...item}));
//   }

//   /**
//    * @param {number} idx 
//    * @returns {Article}

//    */
//   async getArticle(idx) {
//     await this.#waitLoading();
//     const article = this.#articles[idx];
//     return article ?? {
//       article: "",
//       href: "",
//       name: "",
//       title: ""
//     };
//   }
// }

// const crawler = new CafeArticleCrawler("https://cafe.naver.com/reefworld?iframe_url=/reefworld/ArticleList.nhn%3Fsearch.clubid=30949191%26search.menuid=2%26search.boardtype=L");
// crawler.getArticleList()
//   .then(list => {
//     console.log(list);
//   })
//   .catch(e => {
//     console.error(e);
//   });
