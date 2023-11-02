export const div = document.querySelector('.gallery');

export function createMarkup(
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads
) {
  const markup = `<div class="photo-card">
  <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;

  div.insertAdjacentHTML('beforeend', markup);
}
