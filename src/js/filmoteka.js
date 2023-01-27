import {
  fetchTrending,
  fetchSearch,
  getGenreList,
  fetchTrailers,
} from './themoviedb-api-service';
import {
  markupSearch,
  markupTrending,
  markupModalFilmInfo,
} from './markup-service';

import * as basicLightbox from 'basiclightbox';

const page = 1;
let filmList;
let genreList;

const formEl = document.querySelector('.form');
const formText = document.querySelector('.form__text');
const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', onCardClick);
formEl.addEventListener('submit', showGallerySearchQuery);

const modalFilmInfo = document.querySelector('.modal-film-info');

initGallery();
export { genreList };

async function initGallery() {
  genreList = await getGenreList();
  await showGallery();
}

async function showGallery() {
  const data = await fetchTrending(page);
  filmList = data.results;
  markupTrending(filmList, gallery);
}

function onCardClick(event) {
  const filmBox = event.target.closest('.film-box');
  if (!filmBox) return;
  const filmBoxId = Number(filmBox.dataset.id);

  const targetFilm = filmList.find(film => film.id === filmBoxId);

  markupModalFilmInfo(targetFilm, modalFilmInfo);

  onTrailerClick(filmBoxId);
}

async function onTrailerClick(movie_id) {
  const data = await fetchTrailers(movie_id);
  const id = data.results[0].key;

  renderTrailer(id);
}
// onTrailerClick();
function renderTrailer(id) {
  const markup = `<iframe class="trailer-container" width="420" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
  console.log(markup);
  // let instance = basicLightbox.create(markup);

  // instance.show();
}

async function showGallerySearchQuery(evt) {
  evt.preventDefault();
  console.log(evt.target.searchQuery.value.trim());
  const search = evt.target.searchQuery.value.trim().toLowerCase();
  const data = await fetchSearch(search);
  const searchQuery = data.results;

  markupSearch(searchQuery, gallery);
  if (!data.total_results) {
    showGallery();
    console.log(data.total_results);
    formText.classList.remove('hidden');
    return;
  } else {
    formText.classList.add('hidden');
  }
}
