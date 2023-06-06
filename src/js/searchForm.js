import { fetchSearchArticles } from './fetch';
import { renderGallery } from './templates/render-gallery';
import { normalize } from './normalize';
import { load, save } from './services/storage';
import { createPagination } from './pagination';
import throttle from 'lodash.throttle';
import { hideMainContent, showMainContent } from './news-not-found';
import { selectedDate } from './calendar';
import { notification } from './services/notification';
import { refs } from './refs';

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
    try {
        const {
            response: { docs },
        } = await fetchSearchArticles(0, query, selectedDate);
        if (!docs.length) {
            hideMainContent();
            return;
        }
        showMainContent();

        normalize(docs);
        renderGallery(load('bite-search'), true, refs.newsContainer);
        createPagination(load('bite-search'), renderGallery);
        disableButtons();
        addLoader();

        let results = [];
        results.push(...load('bite-search'));

        for (let i = 1; i <= 2; i += 1) {
            try {
                const {
                    response: { docs },
                } = await fetchSearchArticles(i, query);
                if (!docs.length) {
                    return;
                }
                normalize(docs);
                results.push(...load('bite-search'));
                save('bite-search', results);
            } catch (err) {
                console.log(err);
            }
            await new Promise(res => setTimeout(res, 1500));
            createPagination(results, renderGallery);
            disableButtons();
        }

        enableButtons();
        removeLoader();

        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true);
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
