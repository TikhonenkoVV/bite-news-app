import { refs } from '../refs';
import { sortUserNews } from '../read/sort-news-data';
import { formatClassName, formatDate } from '../services/format-date';
import { hndleReadNewsClick } from '../read/readNewsBtnClick';

export const renderGalleryReadOnDays = userNews => {
    const newArray = sortUserNews(userNews);
    let markup = [];
    newArray.map(arr => {
        const date = formatDate(arr[0].createdAt);
        const className = `date-${formatClassName(arr[0].createdAt)}`;
        markup.push(`
            <div class="data-read">
                <button id="${className}" class="data-read__btn" type="button">
                    ${date}
                    <svg class="data-read__icon" width="9" height="14">
                        <use xlink:href="#icon-arrow-up"></use>
                    </svg>
                </button>
                <div class="data-read__news hide ${className}">`);

        arr.map(
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
                markup.push(`
                        <div class="news__item-read">
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
                        </div>`);
            }
        );

        markup.push(`</div>
            </div>
        `);
    });
    refs.readContainer.insertAdjacentHTML('beforeend', markup.join(''));
    refs.readContainer.addEventListener('click', hndleReadNewsClick);
};
