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

  const searchTerm = form.elements.searchQuery.value;
  page = 1;
  try {
    const images = await fetchImages(searchTerm, page);

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    createMarkup(images);
    galleryLightBox.refresh();
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
    const images = await fetchImages(searchTerm, page);
    createMarkup(images);
    galleryLightBox.refresh();
    if (page === 13) {
      btnLoadMore.classList.add('hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
