import { loadUserNews, verifyUser } from '../db';
import { refs } from '../refs';
import { sortUserNews } from '../read/sort-news-data';
import { hideMainContent, showMainContent } from '../news-not-found';
import { formShow } from '../sign-in-up';

const formatDate = newsDate => {
    const newDate = new Date(newsDate);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${newDate.getFullYear()}`;
};

export const renderGalleryReadOnDays = () => {
    if (!verifyUser()) {
        refs.backdrop.classList.remove('is-hidden');
        formShow();
        return;
    }
    let isRead = undefined;
    if (loadUserNews()) isRead = loadUserNews().find(el => el.readMore !== '');
    if (!loadUserNews() || !isRead) {
        hideMainContent();
        return;
    }
    showMainContent();
    const array = sortUserNews(loadUserNews(), '');
    let markup = '';
    const gallaryMarkup = array.map(arr => {
        const date = formatDate(arr[0].readMore);
        const markupDtae = `
    <div class="news__item-date">
        <button class="data-read" type="button">
            <p class="data-read__text">${date}</p>
            <svg class="data-read__icon" width="9" height="14">
                <use xlink:href="#icon-arrow-up"></use>
            </svg>
        </button>
    </div>`;
        const markupNews = arr
            .map(
                ({
                    favorite,
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                }) => {
                    let newsBtnText = 'Add to favorite';
                    let iconUse = '<use href="#icon-heart-border"></use>';
                    if (favorite) {
                        newsBtnText = 'Remove from favorite';
                        iconUse = '<use href="#icon-heart-fill"></use>';
                    }
                    return `
    <div class="news__item-read hide">
        <p class="news__section">${section}</p>
        <div class="news__img">
            <img src="${imgUrl}" alt="${title}" loading="lazy"/>
            <button  id="${url}" type="button" class="news__btn">${newsBtnText}
                <svg class="news__btn-icon" width="20" height="20">
                    ${iconUse}
                </svg>
            </button>
        </div>
        <div class="info">
            <p class="info__title">${title}</p>
            <p class="info__abstract">${abstract}</p>
            <p class="info__published-date">${formatDate(published_date)}</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer nofollow"
                class="info__link">Read more</a>
        </div>
    </div>`;
                }
            )
            .join('');
        markup = markupDtae + markupNews;
        refs.readContainer.insertAdjacentHTML('beforeend', markup);
    });
};
