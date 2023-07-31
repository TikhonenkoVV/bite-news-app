import axios from 'axios';
import { createPagination } from './pagination';
import { hideMainContent, showMainContent } from './news-not-found';
import { renderGallery } from './templates/render-gallery';
import { normalize } from './normalize';
import throttle from 'lodash.throttle';
import { load, save } from './services/storage';
import { refs } from './refs';
import { closeDropdownMenu } from './categories';
import { loadUserNews } from './db';
import { findUserNews } from './find-user-news';
import { SEARCH_RES } from './utils/constants';
import { hideLoader, showLoader } from './services/toggleLoader';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'e3QVyAs0wF8oNwOW75RSlccT9UsAdwt7';

export const onClickBtns = async e => {
    if (!e.target.classList.contains('js-cat-btn')) {
        return;
    }
    const category = encodeURIComponent(e.target.dataset.section.trim());
    showLoader();
    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/news/v3/content/all/${category}.json`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        const { results } = data;
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
        showMainContent();
    } catch (error) {
        hideMainContent();
        console.log(error);
    }
    hideLoader();
};
