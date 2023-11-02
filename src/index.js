import { createMarkup, div } from './js/gallery-markup';
import { fetchImages } from './js/pixabay-API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');

console.log(form);
form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(evt) {
  evt.preventDefault();
  div.innerHTML = '';

  const searchTerm = form.elements.searchQuery.value;
  try {
    const images = await fetchImages(searchTerm);

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    for (let i = 0; i < images.length; i++) {
      const { webformatURL, tags, likes, views, comments, downloads } =
        images[i];
      createMarkup(webformatURL, tags, likes, views, comments, downloads);
    }
  } catch (error) {
    console.log(error.message);
  }
}
