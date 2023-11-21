import { checkCurrentLocation } from '../check-current-location';
import { formatDate } from '../services/format-date';
import { load } from '../services/storage';
import { AUTHORIZED } from '../utils/constants';

export const renderGallery = (gallery, ifFirstPage, container) => {
    const autorizedUser = load(AUTHORIZED);
    let hiddenClass = '';
    let noTrasfer = '';
    if (
        container.classList.contains('favorites') ||
        container.classList.contains('read')
    )
        noTrasfer = ' news__item-favorite';
    if (!autorizedUser) hiddenClass = ' visually-hidden';

    const gallaryMarkup = gallery
        .map(
            (
                {
                    _id,
                    dataId,
                    title,
                    abstract,
                    section,
                    url,
                    imgUrl,
                    published_date,
                    favorite,
                    readed,
                },
                index
            ) => {
                if (checkCurrentLocation() === 'index') {
                    if (ifFirstPage) {
                        if (window.matchMedia('(min-width: 1280px)').matches) {
                            if (index > 7) {
                                return;
                            }
                        } else if (
                            window.matchMedia('(min-width: 768px)').matches
                        ) {
                            if (index > 6) {
                                return;
                            }
                        } else {
                            if (index > 3) {
                                return;
                            }
                        }
                    }
                }
                const newDate = formatDate(published_date.split('T')[0]);

                let newsBtnText = 'Add to favorite';
                let iconUse = '<use href="#icon-heart-border"></use>';
                let overlayClass = 'overlay visually-hidden';
                if (favorite) {
                    newsBtnText = 'Remove from favorite';
                    iconUse = '<use href="#icon-heart-fill"></use>';
                }
                if (readed) {
                    overlayClass = 'overlay';
                }

                return `
                    <div class="news__item${noTrasfer}">
                        <p class="news__section">${section}</p>
                        <div class="news__img">
                            <img src="${imgUrl}" alt="${title}" loading="lazy"/>
                            <button id="${url}" data-id="${
                    _id ? _id : dataId ? dataId : 'noid'
                }" type="button" class="news__btn${hiddenClass}">${newsBtnText}
                                <svg class="news__btn-icon" width="20" height="20">
                                    ${iconUse}
                                </svg>
                            </button>
                            </div>
                            <div class="info">
                                <p class="info__title line-clamp">${title}</p>
                                <p class="info__abstract line-clamp">${abstract}</p>
                                <p class="info__published-date">${newDate}</p>
                                <a
                                    href="${url}"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    class="info__link">
                                    Read more
                                </a>
                            </div>
                            <p class="${overlayClass}">Already read
                                <svg class="already" width="20" height="20">
                                    <use href="#icon-already-read"></use>
                                </svg>
                            </p>
                    </div>`;
            }
        )
        .join('');
    container.innerHTML = gallaryMarkup;
};
