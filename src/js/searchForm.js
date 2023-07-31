import { fetchSearchArticles } from './fetch';
import { renderGallery } from './templates/render-gallery';
import { normalize } from './normalize';
import { save } from './services/storage';
import { createPagination } from './pagination';
import throttle from 'lodash.throttle';
import { hideMainContent } from './news-not-found';
import { selectedDate } from './calendar';
import { notification } from './services/notification';
import { loadUserNews } from './db';
import { findUserNews } from './find-user-news';
import { SEARCH_RES } from './utils/constants';
import { hideLoader, showLoader } from './services/toggleLoader';

export const handleSubmit = async e => {
    e.preventDefault();
    if (
        e.currentTarget.querySelector('.header__input-search').clientWidth < 49
    ) {
        return;
    }
    const query = e.target.searchQuery.value.trim();
    if (!query) {
        notification('Enter some query');
        // Notify.warning('Enter some query');
        return;
    }

    // displayBanner(true);
    try {
        showLoader();
        // addLoader();
        let results = [];

        for (let i = 1; i <= 2; i += 1) {
            try {
                const {
                    response: { docs },
                } = await fetchSearchArticles(i - 1, query, selectedDate);
                if (!docs.length) {
                    hideMainContent();
                    return;
                }

                const normalizeNews = normalize(docs);

                const userNews = await loadUserNews();

                if (userNews) {
                    const sortedNews = findUserNews(normalizeNews, userNews);
                    results.push(...sortedNews);
                } else results.push(...normalizeNews);

                save(SEARCH_RES, results);
            } catch (err) {
                console.log(err);
            }
            await new Promise(res => setTimeout(res, 1500));
            createPagination(results, renderGallery);
            disableButtons();
        }

        hideLoader();
        enableButtons();
        // removeLoader();

        window.addEventListener(
            'resize',
            throttle(e => {
                createPagination(results, renderGallery);
            }, 1000)
        );
    } catch (err) {
        console.log(err);
    }
};

function disableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');
    const btnPrevPg = document.querySelector('.pagination__prev-page');

    if (btnNextPg && paginationButtons) {
        paginationButtons.forEach(button => {
            button.classList.add('disabled');
        });
        btnNextPg.setAttribute('disabled', true);
        if (!btnPrevPg.hasAttribute('disabled'))
            btnPrevPg.setAttribute('disabled', true);
    }
}

function enableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');

    if (btnNextPg && paginationButtons) {
        paginationButtons.forEach(button => {
            button.classList.remove('disabled');
        });
        btnNextPg.removeAttribute('disabled');
    }
}

function addLoader() {
    const loaderBox = document.createElement('div');
    const wrapper = document.querySelector('.pagination__wrapper');
    loaderBox.classList.add('pagination__loader');
    loaderBox.innerHTML =
        '<p>All news are loading, please wait few seconds...</p>';
    wrapper.prepend(loaderBox);
}

export function removeLoader() {
    const loader = document.querySelector('.pagination__loader');
    loader.classList.add('visually-hidden');
}
