import { disableBodyScroll } from 'body-scroll-lock';
import { refs } from './refs';
import { formShow } from './sign-in-up';
import { AUTHORIZED } from './utils/constants';
import { onProfileShow } from './user-profile';
import { load } from './services/storage';

export const onProfileBtnClick = () => {
    if (load(AUTHORIZED)) {
        refs.backdrop.classList.remove('is-hidden');
        refs.userProfile.classList.remove('is-hidden');
        document
            .querySelector('.user-profile__card')
            .classList.remove('is-hidden');
        onProfileShow();
        disableBodyScroll(document.body);
    } else {
        refs.backdrop.classList.remove('is-hidden');
        setTimeout(() => formShow(), 300);
    }
};

export const checkProfileBtn = () => {
    const autorizedUser = load(AUTHORIZED);
    if (autorizedUser) {
        refs.profileBtn.classList.add('autorized');
        if (load(AUTHORIZED).smallAvatar !== '') {
            refs.profileBtn.style.backgroundImage = `url('${
                load(AUTHORIZED).smallAvatar
            }')`;
        }
    } else {
        refs.profileBtn.classList.remove('autorized');
    }
};
