import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '40411285-e0a8815789142127d1d60a3c2';

export async function fetchImages(query, page) {
  const options = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page,
  });

  const { data } = await axios(`?${options}`);
  return data.hits;
}
