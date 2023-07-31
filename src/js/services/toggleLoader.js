import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { refs } from '../refs';

export const showLoader = () => {
    refs.loader.classList.remove('is-hidden');
    disableBodyScroll(document.body);
};
export const hideLoader = () => {
    refs.loader.classList.add('is-hidden');
    enableBodyScroll(document.body);
};
