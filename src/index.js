import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { allData } from './js/main';
import { closeDropdownMenu, handleScreenSizeChange } from './js/categories';
import { handleSubmit } from './js/searchForm';
import { onBannerLoad, displayBanner } from './js/weather-banner';
import { checkCurrentLocation } from './js/check-current-location';
import { addDataReadNews } from './js/read/add-data-read-more';
import { renderGalleryReadOnDays } from './js/templates/render-markup-read';
import { onProfileBtnClick, onProfileItemClick } from './js/profile-menu';
import { markupProfileMenu } from './js/templates/render-profile-menu';
import { formClose, resetStyle } from './js/sign-in-up';
import { enableBodyScroll } from 'body-scroll-lock';
import { renderGallery } from './js/templates/render-gallery';
import { loadUserNews } from './js/db';
import { hideMainContent, showMainContent } from './js/news-not-found';
import { sortUserNews } from './js/read/sort-news-data';

const currentLocation = checkCurrentLocation();

markupProfileMenu();

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.form.addEventListener('submit', handleSubmit);
refs.profileBtn.addEventListener('click', onProfileBtnClick);

refs.backdrop.addEventListener('mousedown', e => {
    if (!e.target.classList.contains('backdrop')) return;
    e.target.addEventListener(
        'mouseup',
        el => {
            el.target.classList.add('is-hidden');
            if (!refs.autorizeModal.classList.contains('is-hidden')) {
                refs.autorizeModal.classList.add('is-hidden');
                refs.formSignIn.reset();
                refs.formSignUp.reset();
                formClose();
            }
            if (!refs.userProfile.classList.contains('is-hidden')) {
                refs.userProfile.classList.add('is-hidden');
                refs.userProfileForm.reset();
            }
            resetStyle();
            enableBodyScroll(document.body);
        },
        { once: true }
    );
});

checkCurrentTheme();
handleScreenSizeChange();

refs.newsContainer.addEventListener('click', addDataReadNews);
if (refs.categoriesBtns && refs.categoriesDropdownBtn) {
    refs.categoriesDropdownBtn.addEventListener('click', closeDropdownMenu);
}

if (currentLocation === 'index') {
    refs.categoriesContainer.addEventListener('click', onClickBtns);
    allData();
    setTimeout(() => {
        onBannerLoad();
    }, 300);
}

if (currentLocation === 'favorite') {
    const isLoadNews = loadUserNews();
    if (isLoadNews)
        isFavorite = loadUserNews().find(el => el.favorite === true);
    if (!isLoadNews || !isFavorite) {
        hideMainContent();
        return;
    }
    showMainContent();
    const array = sortUserNews(loadUserNews(), true);
    renderGallery(array, false, refs.favoritesContainer);
    return;
}
if (currentLocation === 'read') {
    renderGalleryReadOnDays();
    return;
}
