import { loadUserNews } from '../db';
import { refs } from '../refs';
import { sortUserNews } from '../read/sort-news-data';
import { formatDate } from '../services/format-date';

export const renderGalleryReadOnDays = userNews => {
    const newArray = sortUserNews(userNews);
    let markup = '';
    newArray.map(arr => {
        const date = formatDate(arr[0].createdAt);
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
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                    favorite,
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
                                <p class="info__title line-clamp">${title}</p>
                                <p class="info__abstract line-clamp">${abstract}</p>
                                <p class="info__published-date">${formatDate(
                                    published_date
                                )}</p>
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
