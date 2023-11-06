import { createMarkup, div } from './js/gallery-markup';
import { fetchImages } from './js/pixabay-API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');

form.addEventListener('submit', handlerSubmit);
btnLoadMore.addEventListener('click', handlerLoadMore);

let page = 1;
btnLoadMore.classList.add('hidden');

async function handlerSubmit(evt) {
  evt.preventDefault();
  div.innerHTML = '';
  btnLoadMore.classList.add('hidden');

  const searchTerm = form.elements.searchQuery.value;
  if (searchTerm === '') return alert('Please, enter something!');
  page = 1;
  try {
    const data = await fetchImages(searchTerm, page);
    const images = data.hits;

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      form.elements.searchQuery.value = '';
      return;
    }

    createMarkup(images);
    galleryLightBox.refresh();
    if (data.totalHits < 40) {
      btnLoadMore.classList.add('hidden');
      return;
    }
    btnLoadMore.classList.remove('hidden');
  } catch (error) {
    console.log(error.message);
  }
}

async function handlerLoadMore(evt) {
  evt.preventDefault();
  page += 1;
  const searchTerm = form.elements.searchQuery.value;
  try {
    const data = await fetchImages(searchTerm, page);
    const images = data.hits;
    const lastPage = Math.ceil(data.totalHits / 40);

    createMarkup(images);
    galleryLightBox.refresh();

    if (page === lastPage) {
      btnLoadMore.classList.add('hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
