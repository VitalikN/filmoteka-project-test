!async function(){(await async function(e){try{const a=fetch(`https://api.themoviedb.org/3/search/movie?api_key=e55542ecb6aab3d889d16953eac82937&language=en-US&query=${e}&page=1&include_adult=false`);return(await a).json()}catch(e){return console.log("error :>> ",e)}}()).results}();
//# sourceMappingURL=library.6fa758d7.js.map
