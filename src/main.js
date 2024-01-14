import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const PIXABEY_API = '41780713-d9d59fd8c4b13cd5ac9a220da';
const galleryEl = document.querySelector('.gallery');
const loaderWrapper = document.querySelector('.loader-wrapper');
const form = document.querySelector('.search-form');
const gallery = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let images = [];

function searchImages(query) {
  loaderWrapper.classList.add('is-active');
  images = [];

  return fetch(
    `https://pixabay.com/api/?key=${PIXABEY_API}&q=${query}&image_type=photo&orientation=horizontal&pretty=true&safesearch=true&per_page=21`
  )
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => console.log(error))
    .finally(() => loaderWrapper.classList.remove('is-active'));
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = document.querySelector('.search-form input').value;

  if (searchQuery === '') {
    return iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
  }

  const pixabayImages = await searchImages(searchQuery);

  images.push(...pixabayImages);

  const markup = images
    .map(img => {
      return `
        <li class="gallery-item">
            <a class="gallery-link" href="${img.largeImageURL}">
            <img
                class="gallery-image"
                src="${img.webformatURL}"
                alt="${img.tags}"
            />
            </a>
        </li>
        `;
    })
    .join('');

  galleryEl.innerHTML = markup;

  if (pixabayImages.length === 0) {
    return iziToast.error({
      title: 'Error',
      message: 'No images found for this request',
    });
  }

  gallery.refresh();
});
