import { refs } from './refs';
import { enableBodyScroll } from 'body-scroll-lock';

export const onProfileShow = () => {
    document
        .querySelector('.user-profile__close')
        .addEventListener('click', onCloseProfile);
};

export const onCloseProfile = () => {
    refs.userProfile.classList.add('is-hidden');
    refs.backdrop.classList.add('is-hidden');
    document
        .querySelector('.user-profile__close')
        .removeEventListener('click', onCloseProfile);
    enableBodyScroll(document.body);
};
