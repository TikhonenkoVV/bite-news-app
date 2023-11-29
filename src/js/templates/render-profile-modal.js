import { refs } from '../refs';
import { load } from '../services/storage';
import { AUTHORIZED, TOKENS } from '../utils/constants';
import sprite from '../../images/sprite.svg';
import { loadUserNews, signOut } from '../db';
import defaultAvatar from '../../images/avatar-default.png';
import Cropper from 'cropperjs';
import { hideLoader, showLoader } from '../services/toggleLoader';

export const markupProfileModal = async () => {
    const onSingnOut = async () => {
        showLoader();
        const status = await signOut();
        if (status === 204) {
            localStorage.removeItem(TOKENS);
            localStorage.removeItem(AUTHORIZED);
        }
        hideLoader();
        location.reload();
    };

    const onEditAvatar = () => {
        cropBackdrop.classList.remove('hide');
    };

    const onCropBackdropClick = e => e.target.classList.add('hide');

    const autorizedUser = load(AUTHORIZED);
    const userName = autorizedUser.name;
    let avatar = autorizedUser.avatar;
    if (avatar === '') {
        avatar = defaultAvatar;
    }
    const favoriteUserNews = await loadUserNews(true, null);
    const readedUserNews = await loadUserNews(null, true);
    const favoritesLength = favoriteUserNews.length;
    const readLength = readedUserNews.length;
    const markup = `
    <button class="user-profile__close">
        <svg width="30" height="30">
            <use href="${sprite}#icon-close"></use>
        </svg>
    </button>
    <div class="user-profile__form">
        <div class="user-profile__box">
            <div class="user-profile__input-box">
                <h2 class="user-profile__name">${userName}</h2>
            </div>
            <div class="user-profile__img-box">
                <button class="user-profile__edit-btn" type="button">
                    <svg class="user-profile__ico" width="32" height="32">
                        <use href="${sprite}#icon-pencil"></use>
                    </svg>
                </button>
                <img                   
                    src="${avatar}"
                    alt="User photo"
                />
            </div>
        </div>
        <div class="user-profile__stats">
            <h2 class="user-profile__title">Statistics</h2>
            <div class="user-profile__stats-box">
                <p class="user-profile__stat">Allready read:</p>
                <p class="user-profile__stat">${readLength}</p>
                <p class="user-profile__stat">Favorites:</p>
                <p class="user-profile__stat">${favoritesLength}</p>
            </div>
        </div>
        <button class="user-profile__sign-out-btn" type="button">
            Sign out
        </button>
    </div>
    <div class="user-profile__crop-backdrop hide">
        <div class="user-profile__crop-box">
        <img
            class="crop-layer"
            src="${avatar}"
            alt="User photo"
        /></div>
    </div>
    `;
    refs.userProfile.innerHTML = markup;
    const signOutBtn = document.querySelector('.user-profile__sign-out-btn');
    const editAvatarBtn = document.querySelector('.user-profile__edit-btn');
    const cropBackdrop = document.querySelector('.user-profile__crop-backdrop');

    signOutBtn.addEventListener('click', onSingnOut);
    editAvatarBtn.addEventListener('click', onEditAvatar);
    cropBackdrop.addEventListener('click', onCropBackdropClick);
    const image = document.querySelector('.crop-layer');
    const cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 2,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        dragMode: 'move',
    });
};
