import { refs } from '../refs';
import { load, save } from '../services/storage';
import { AUTHORIZED, IMAGES, TOKENS } from '../utils/constants';
import sprite from '../../images/sprite.svg';
import { loadUserNews, signOut, updateAvatar, verifyUser } from '../db';
import Cropper from 'cropperjs';
import { hideLoader, showLoader } from '../services/toggleLoader';
import { checkProfileBtn } from '../profile-menu';

export const markupProfileModal = async () => {
    const autorizedUser = load(AUTHORIZED);
    const userName = autorizedUser.name;
    let avatar = autorizedUser.avatar;
    if (avatar === '') {
        avatar = `${IMAGES}/assets/jpeg/avatar-default.jpg`;
    }
    const favoriteUserNews = await loadUserNews(true, null);
    const readedUserNews = await loadUserNews(null, true);
    const favoritesLength = favoriteUserNews.length;
    const readLength = readedUserNews.length;

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
        profileCard.classList.add('is-hidden');
    };

    const onCropBackdropClick = e => {
        e.target.classList.add('hide');
        if (e.target === e.currentTarget) {
            profileCard.classList.remove('is-hidden');
        }
    };

    const hendleOpenImage = e => {
        if (e.target.tagName === 'INPUT') {
            cropper.destroy();
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                image.src = reader.result;
                cropper = new Cropper(image, cropperOptions);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSaveAvatar = () => {
        const croppedImg = cropper.getCroppedCanvas().toDataURL('image/jpeg');

        const formData = new FormData();
        formData.append('avatar', croppedImg);

        const updAvatar = async () => {
            showLoader();
            await updateAvatar(formData);
            verifyUser()
                .then(data => {
                    save(AUTHORIZED, data);
                    checkProfileBtn();
                })
                .catch(err => console.log(err.message));
            hideLoader();
        };
        updAvatar();
        checkProfileBtn();

        document.querySelector('.user-profile__avatar').src = croppedImg;
        profileCard.classList.remove('is-hidden');
        profileCard.classList.add('unsaved');
        cropper.destroy();
        cropBackdrop.classList.add('hide');
        cropper = new Cropper(image, cropperOptions);
    };

    const onClearAvatar = () => {
        cropper.destroy();
        image.src = `${IMAGES}/assets/jpeg/avatar-default.jpg`;
        cropper = new Cropper(image, { ...cropperOptions, zoomable: false });
    };

    const markup = `
    <div class="user-profile__card is-hidden">
        <button class="user-profile__close">
            <svg width="30" height="30">
                <use href="${sprite}#icon-close"></use>
            </svg>
        </button>
        <div class="user-profile__box">
            <h2 class="user-profile__name">${userName}</h2>
            <div class="user-profile__img-box">
                <button class="user-profile__edit-btn" type="button">
                    <svg class="user-profile__ico" width="32" height="32">
                        <use class="js-href" href="${sprite}#icon-pencil"></use>
                    </svg>
                </button>
                <img
                    width="250"
                    height="250"
                    class="user-profile__avatar"
                    src="${avatar}"
                    alt="User photo"
                />
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
                <svg width="25" height="25">
                    <use href="${sprite}#icon-sign-out"></use>
                </svg>
            </button>
        </div>
    </div>
    <div class="user-profile__crop-backdrop hide">
        <div class="user-profile__crop-box">
            <div class="user-profile__img-wrapper">
                <img
                    class="crop-layer"
                    src="${avatar}"
                    alt="User photo"
                />
            </div>
            <div class="user-profile__btn-wrapper">
                <label class="user-profile__open-btn">
                    <input hidden value="Open" title="open" accept="image/jpeg" type="file" />
                    Add
                    <svg width="25" height="25">
                        <use href="${sprite}#icon-image"></use>
                    </svg>
                </label>
                <button aria-label="clear" class="user-profile__clear-btn" type="button">
                    <svg width="25" height="25">
                        <use href="${sprite}#icon-bin"></use>
                    </svg>
                </button>
                <button class="user-profile__save-btn" type="button">
                    Save
                    <svg width="25" height="25">
                        <use href="${sprite}#icon-save"></use>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    `;
    refs.userProfile.innerHTML = markup;
    const profileCard = document.querySelector('.user-profile__card');
    const image = document.querySelector('.crop-layer');
    const signOutBtn = document.querySelector('.user-profile__sign-out-btn');
    const editAvatarBtn = document.querySelector('.user-profile__edit-btn');
    const cropBackdrop = document.querySelector('.user-profile__crop-backdrop');
    const addImageBtn = document.querySelector('.user-profile__open-btn');
    const saveImageBtn = document.querySelector('.user-profile__save-btn');
    const clearBtn = document.querySelector('.user-profile__clear-btn');

    signOutBtn.addEventListener('click', onSingnOut);
    editAvatarBtn.addEventListener('click', onEditAvatar);
    cropBackdrop.addEventListener('click', onCropBackdropClick);
    saveImageBtn.addEventListener('click', onSaveAvatar);
    clearBtn.addEventListener('click', onClearAvatar);

    const cropperOptions = {
        aspectRatio: 1 / 1,
        viewMode: 2,
        autoCropArea: 1,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        dragMode: 'move',
    };

    let cropper = new Cropper(image, cropperOptions);

    addImageBtn.addEventListener('change', hendleOpenImage);
};
