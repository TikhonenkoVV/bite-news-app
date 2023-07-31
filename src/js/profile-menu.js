import { disableBodyScroll } from 'body-scroll-lock';
import { refs } from './refs';
import { formShow } from './sign-in-up';
import { AUTHORIZED, TOKENS } from './utils/constants';
import { onProfileShow } from './user-profile';
import { signOut } from './db';
import { hideLoader, showLoader } from './services/toggleLoader';

export const onProfileBtnClick = () => {
    document.querySelector('main').classList.toggle('blur');
    refs.profileMenu.classList.toggle('hide');
};

export const onProfileItemClick = async e => {
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
        showLoader();
        const status = await signOut();
        if (status === 204) {
            localStorage.removeItem(TOKENS);
            localStorage.removeItem(AUTHORIZED);
        }
        hideLoader();
        location.reload();
    }
};
