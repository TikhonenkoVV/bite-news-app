import { load, save } from './services/storage';
import { fetchPopularArticles } from './fetch';
import { normalize } from './normalize';
import { createPagination } from './pagination';
import { renderGallery } from './templates/render-gallery';
import { loadUserNews } from './db';
import { findUserNews } from './find-user-news';
import { SEARCH_RES } from './utils/constants';
import throttle from 'lodash.throttle';
import { hideLoader, showLoader } from './services/toggleLoader';

export const allData = async () => {
    showLoader();
    try {
        const { results } = await fetchPopularArticles();

        const normalizeNews = normalize(results);

        const userNews = await loadUserNews();

        if (userNews) {
            const sortedNews = findUserNews(normalizeNews, userNews);
            save(SEARCH_RES, sortedNews);
        } else save(SEARCH_RES, normalizeNews);

        createPagination(load(SEARCH_RES), renderGallery);

        window.addEventListener(
            'resize',
            throttle(e => {
                createPagination(load(SEARCH_RES), renderGallery);
            }, 1000)
        );
    } catch (error) {
        console.log(error);
    }
    hideLoader();
};

export const addOverLay = e => {
    let elements = e.target.parentNode.parentNode.lastElementChild;
    elements.classList.remove('visually-hidden');
};
