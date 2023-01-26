import {
  fetchTrending,
  fetchSearch,
  getGenreList,
} from './themoviedb-api-service';
import {
  markupSearch,
  markupTrending,
  markupModalFilmInfo,
} from './markup-service';

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
