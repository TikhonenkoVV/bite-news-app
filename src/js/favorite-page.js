import { loadUserNews, verifyUser } from './db';
import { hideMainContent, showMainContent } from './news-not-found';
import { sortUserNews } from './read/sort-news-data';
import { refs } from './refs';
import { formShow } from './sign-in-up';

// функція що рендерить
// function renderFavoritesCardsInLibrary(results) {

export const favoriteRender = () => {
    const autorizedUser = verifyUser();
    if (!autorizedUser) {
        refs.backdrop.classList.remove('is-hidden');
        formShow();
        return;
    }
    let isFavorite = undefined;
    const isLoadNews = loadUserNews();
    if (isLoadNews)
        isFavorite = loadUserNews().find(el => el.favorite === true);
    if (!isLoadNews || !isFavorite) {
        hideMainContent();
        return;
    }
    showMainContent();
    const array = sortUserNews(loadUserNews(), true);
    const favoritesList = array
        .map(
            ({
                readMore,
                imgUrl,
                title,
                section,
                abstract,
                published_date,
                url,
            }) => {
                let overlayClass = 'overlay visually-hidden';
                if (readMore !== '') {
                    overlayClass = 'overlay';
                }
                return `
<div class="news__item-favorite">
    <p class="news__section">${section}</p>
    <div class="news__img">
        <img src="${imgUrl}" alt="${title}" loading="lazy"/>
        <button id="${url}" type="button" class="news__btn favorites_btn" >Remove from favorite
            <svg class="news__btn-icon" width="20" height="20">
                <use href="#icon-heart-fill"></use>
            </svg>
        </button>
    </div>
    <div class="info">
        <p class="info__title">${title}</p>
        <p class="info__abstract">${abstract}</p>
        <p class="info__published-date">${published_date}</p>
        <a
            href="${url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="info__link">
            Read more
        </a>
        <p class="${overlayClass}">Already read
            <svg class="already" width="20" height="20">
                <use href="#icon-already-read"></use>
            </svg>
        </p>
    </div>
</div>`;
            }
        )
        .join('');

    refs.favoritesContainer.innerHTML = favoritesList;
};
