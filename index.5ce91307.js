async function t(t){try{const e=fetch(`https://api.themoviedb.org/3/search/movie?api_key=e55542ecb6aab3d889d16953eac82937&language=en-US&query=${t}&page=1&include_adult=false`);return(await e).json()}catch(t){return console.log("error :>> ",t)}}async function e(t){try{const e=fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=e55542ecb6aab3d889d16953eac82937&page=${t}`);return(await e).json()}catch(t){return console.log("error :>> ",t)}}let n;function a(t){return n.filter((e=>t.includes(e.id))).map((t=>t.name)).join(", ")}!async function(){(await t()).results}(),async function(){const t=await async function(){try{const t=fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=e55542ecb6aab3d889d16953eac82937");return(await t).json()}catch(t){return console.log("error :>> ",t)}}();n=t.genres}();async function i(t,e){const n=t.reduce(((t,{poster_path:e,release_date:n,genre_ids:i,id:o,title:s})=>t+`<div class="film-box" data-id="${o}">\n      <img class="filmoteka__img" src="https://image.tmdb.org/t/p/w500${e}"  alt="${s}">\n      <p class="filmoteka__title"> ${s}</p>\n<div  class="filmoteka__box">\n      <p class="filmoteka__text"> ${a(i)}</p>\n      <p class="filmoteka__text">&nbsp;|&nbsp; ${parseInt(n)}</p>\n      </div>\n      </div>`),"");e.innerHTML=n}async function o(t,e){const n=t.reduce(((t,{poster_path:e,release_date:n,genre_ids:i,id:o,title:s})=>t+`<div class="film-box" data-id="${o}">\n      <img class="filmoteka__img" src="https://image.tmdb.org/t/p/w500${e}"  alt="${s}">\n      <p class="filmoteka__title"> ${s}</p>\n<div  class="filmoteka__box">\n      <p class="filmoteka__text"> ${a(i)}</p>\n      <p class="filmoteka__text">&nbsp;|&nbsp; ${parseInt(n)}</p>\n      </div>\n      </div>`),"");e.innerHTML=n}async function s(t,e){const{title:n,poster_path:i,overview:o,genre_ids:s,id:r,original_title:c,popularity:l,vote_count:p,vote_average:d}=t,u=`<div class="film-info">\n         <img  src="https://image.tmdb.org/t/p/w500${i}">\n         <div class="film-info-wrapper">\n           <p>${n}</p>\n           <p>Vote ${d}</p>\n           <p>Votes ${p}</p>\n           <p>Popularity ${l}</p>\n           <p>Original Title ${c}</p>\n           <p>Genre ${a(s)}</p>\n           <p>ABOUT</p>\n           <p>${o}</p>\n           <p>id: ${r}</p>\n           <button type="button">Add to watched</button>\n           <button type="button">Add to queue</button>\n         </div>\n        </div>`;e.innerHTML=u}let r;const c=document.querySelector(".form"),l=document.querySelector(".gallery");l.addEventListener("click",(function(t){const e=t.target.closest(".film-box");if(!e)return;const n=Number(e.dataset.id);s(r.find((t=>t.id===n)),p)})),c.addEventListener("submit",(async function(e){e.preventDefault(),console.log(e.target.searchQuery.value.trim());const n=e.target.searchQuery.value.trim(),a=await t(n);i(a.results,l)}));const p=document.querySelector(".modal-film-info");!async function(){const t=await e(1);r=t.results,o(r,l)}();
//# sourceMappingURL=index.5ce91307.js.map
