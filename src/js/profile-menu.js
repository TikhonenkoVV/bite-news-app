import { disableBodyScroll } from 'body-scroll-lock';
import { checkCurrentLocation } from './check-current-location';
import { refs } from './refs';
import { load } from './services/storage';
import { formShow } from './sign-in-up';
import { renderGallery } from './templates/render-gallery';
import { markupProfileMenu } from './templates/render-profile-menu';
import { AUTORIZED_USER } from './utils/constants';
import { onProfileShow } from './user-profile';

export const onProfileBtnClick = () => {
    document.querySelector('main').classList.toggle('blur');
    refs.profileMenu.classList.toggle('hide');
};

export const onProfileItemClick = e => {
    if (e.target.nodeName !== 'A') return;
    onProfileBtnClick();
    const linkId = e.target.getAttribute('id');
    if (linkId === 'sign-in') {
        refs.backdrop.classList.remove('is-hidden');
        setTimeout(() => formShow(), 300);
    }
    if (linkId === 'sign-up') {
        const navBtn = document.querySelectorAll('.autorize__nav-item');
        navBtn[0].classList.remove('active');
        navBtn[1].classList.add('active');
        refs.formSignIn.classList.add('autorize__form-signin-left');
        refs.formSignUp.classList.add('autorize__form-signup-left');
        refs.backdrop.classList.remove('is-hidden');
        setTimeout(() => formShow(), 300);
    }
    if (linkId === 'profile') {
        refs.backdrop.classList.remove('is-hidden');
        refs.userProfile.classList.remove('is-hidden');
        onProfileShow();
        disableBodyScroll(document.body);
    }
    if (linkId === 'sign-out') {
        localStorage.removeItem(AUTORIZED_USER);
        refs.profileBtn.classList.remove('autorized');
        markupProfileMenu();
        if (checkCurrentLocation() === 'index') {
            renderGallery(load('bite-search'), true, refs.newsContainer);
        } else {
            refs.backdrop.classList.remove('is-hidden');
            formShow();
        }
    }
};
