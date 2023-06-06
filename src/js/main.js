import { load } from './services/storage';
import { fetchPopularArticles } from './fetch';
import { normalize } from './normalize';
import { createPagination } from './pagination';
import { renderGallery } from './templates/render-gallery';
import { refs } from './refs';
const throttle = require('lodash.throttle');

export async function allData() {
    try {
        const data = await fetchPopularArticles();
        const { results } = data;

        normalize(results);

        renderGallery(load('bite-search'), true, refs.newsContainer);
        createPagination(load('bite-search'), renderGallery);

        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true, refs.newsContainer);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
    } catch (error) {
        console.log(error);
    }
}

export function addOverLay(e) {
    let elements = e.target.parentNode.parentNode.lastElementChild;
    elements.classList.remove('visually-hidden');
}
