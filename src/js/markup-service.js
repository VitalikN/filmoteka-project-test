import { genreList } from './filmoteka';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function getGenreById(genre_ids) {
  const res = [];
  for (const item of genre_ids) {
    const genreObject = genreList.find(genre => genre.id === Number(item));

    genreObject.name !== 'Science Fiction'
      ? res.push(genreObject.name)
      : res.push('Sci-Fi');
  }
  return res.length > 2 ? `${res[0]}, ${res[1]},  Other` : res.join(', ');
}

export async function markupSearch(filmList, gallery) {
  const markup = filmList.reduce(
    (acc, { poster_path, release_date, genre_ids, id, title }) => {
      const genreString = getGenreById(genre_ids);
      return (acc += `<div class="film-box" data-id="${id}">
      <img class="filmoteka__img" src="${IMAGE_URL}${poster_path}"  alt="${title}">
      <p class="filmoteka__title"> ${title}</p>
<div  class="filmoteka__box">
      <p class="filmoteka__text"> ${genreString}</p>
      <p class="filmoteka__text">&nbsp;|&nbsp; ${parseInt(release_date)}</p>
      </div>
      </div>`);
    },
    ``
  );
  gallery.innerHTML = markup;
}

//

export async function markupTrending(filmList, gallery) {
  const markup = filmList.reduce(
    (acc, { poster_path, release_date, genre_ids, id, title }) => {
      const genreString = getGenreById(genre_ids);

      return (acc += `<div class="film-box" data-id="${id}">
      <img class="filmoteka__img" src="${IMAGE_URL}${poster_path}"  alt="${title}">
      <p class="filmoteka__title"> ${title}</p>
<div  class="filmoteka__box">
      <p class="filmoteka__text"> ${genreString}</p>
      <p class="filmoteka__text">&nbsp;|&nbsp; ${parseInt(release_date)}</p>
      </div>
      </div>`);
    },
    ``
  );
  gallery.innerHTML = markup;
}

export async function markupModalFilmInfo(targetFilm, modalFilmInfo) {
  const {
    title,
    poster_path,
    overview,
    genre_ids,
    id,
    original_title,
    popularity,
    vote_count,
    vote_average,
  } = targetFilm;
  const genreString = getGenreById(genre_ids);
  const markup = `<div class="film-info">
         <img  src="${IMAGE_URL}${poster_path}">
         <div class="film-info-wrapper">
           <p>${title || original_title}</p>
           <p>Vote ${vote_average}</p>
           <p>Votes ${vote_count}</p>
           <p>Popularity ${popularity}</p>
           <p>Original Title ${original_title}</p>
           <p>Genre ${genreString}</p>
           <p>ABOUT</p>
           <p>${overview}</p>
           <p>id: ${id}</p>
           <button type="button">Add to watched</button>
           <button type="button">Add to queue</button>
         </div>
        </div>`;

  modalFilmInfo.innerHTML = markup;
}
