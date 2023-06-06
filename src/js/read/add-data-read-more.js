import { openCloseNews } from './open-close-news';
import { load } from '../services/storage';
import { addOverLay } from '../main';
import { saveUserNews, verifyUser } from '../db';
import { checkCurrentLocation } from '../check-current-location';
import { refs } from '../refs';
import { hideMainContent, showMainContent } from '../news-not-found';

export const addDataReadNews = e => {
    openCloseNews(e);
    const savedLocalNews = load('bite-search');
    if (e.target.classList.contains('info__link')) {
        if (verifyUser()) addOverLay(e);
        const url = e.target.href;
        const date = new Date().getTime();
        savedLocalNews.map(obj => {
            if (url === obj.url) {
                obj.readMore = date;
                saveUserNews(obj, 'read');
            }
        });
    } else if (e.target.classList.contains('news__btn')) {
        let isContain = false;
        const url = e.target.id;
        e.target.textContent.trim() === 'Add to favorite'
            ? (e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`)
            : (e.target.innerHTML = `Add to favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-border"></use></svg>`);

        if (checkCurrentLocation() === 'favorite') {
            e.target.parentElement.parentElement.remove();
            if (refs.favoritesContainer.children.length === 0) {
                hideMainContent();
            }
        }
        savedLocalNews.map(obj => {
            if (url === obj.url) {
                obj.favorite = true;
                isContain = true;
                saveUserNews(obj, 'favorite');
            }
        });
        if (!isContain) saveUserNews({ url }, 'favorite');
    }
};
