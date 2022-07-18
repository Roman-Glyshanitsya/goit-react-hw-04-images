import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '27117328-15b006dab35854dc72cbe3f6b';

export const fetchImages = (search, page) => {
  return fetch(
    `${BASE_URL}/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error());
  });
};

fetchImages.PropTypes = {
  search: PropTypes.string,
  page: PropTypes.number,
};

const api = { fetchImages };
export default api;
