import { load, save } from '../services/storage';
import { addOverLay } from '../main';
import { addUserNews, remoweNews, updateFavorite } from '../db';
import { checkCurrentLocation } from '../check-current-location';
import { refs } from '../refs';
import { hideMainContent } from '../news-not-found';
import { tokens } from '../..';
import { SEARCH_RES } from '../utils/constants';
import { hideLoader, showLoader } from '../services/toggleLoader';

export const addDataReadNews = async e => {
    const savedLocalNews = load(SEARCH_RES);
    let newArr = [];
    if (e.target.classList.contains('info__link')) {
        if (tokens) {
            showLoader();
            addOverLay(e);
            const url = e.target.href;
            let newObj;
            savedLocalNews.map(obj => {
                if (url === obj.url) {
                    if (obj.readed === true) {
                        return;
                    }
                    obj.readed = true;
                    newObj = obj;
                }
                newArr.push(obj);
            });
            if (newObj) await addUserNews(newObj);
            hideLoader();
        }
    } else if (e.target.classList.contains('news__btn')) {
        let favoriteStatus;
        if (e.target.textContent.trim() === 'Add to favorite') {
            e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`;
            favoriteStatus = true;
        } else {
            e.target.innerHTML = `Add to favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-border"></use></svg>`;
            favoriteStatus = false;
        }

        const url = e.target.id;
        const dataSetId = e.target.dataset.id;
        if (dataSetId !== 'noid') {
            showLoader();
            savedLocalNews.map(obj => {
                if (url === obj.url) {
                    obj.favorite = true;
                }
                newArr.push(obj);
            });
            const currentNews = await updateFavorite(dataSetId, favoriteStatus);
            if (!currentNews.readed) {
                await remoweNews(dataSetId);
                e.target.dataset.id = 'noid';
            }
            hideLoader();
        } else {
            showLoader();
            let newObj;
            let objId;
            savedLocalNews.map((obj, i) => {
                if (url === obj.url) {
                    obj.favorite = true;
                    newObj = obj;
                    objId = i;
                }
                newArr.push(obj);
            });
            const res = await addUserNews(newObj);
            newObj._id = res._id;
            newObj.dataId = res._id;
            e.target.dataset.id = res._id;
            newArr.splice(objId, 1, newObj);
            hideLoader();
        }

        if (checkCurrentLocation() === 'favorite') {
            e.target.parentElement.parentElement.remove();
            if (refs.favoritesContainer.children.length === 0) {
                hideMainContent();
            }
        }
    }
    save(SEARCH_RES, newArr);
};
