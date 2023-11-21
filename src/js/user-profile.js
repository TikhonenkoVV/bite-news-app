import { refs } from './refs';
import { load } from './services/storage';
import { testInput } from './services/test-input';
import { notification } from './services/notification';
import { enableBodyScroll } from 'body-scroll-lock';
import debounce from 'lodash.debounce';
import { loadUserNews } from './db';
import { AUTHORIZED } from './utils/constants';

const onChangePass = e => {
    e.target.value !== ''
        ? refs.userProfileSubmitBtn.removeAttribute('disabled')
        : refs.userProfileSubmitBtn.setAttribute('disabled', true);
};

export const onProfileShow = async () => {
    const favoriteUserNews = await loadUserNews(true, null);
    const readedUserNews = await loadUserNews(null, true);
    const favoritesLength = favoriteUserNews.length;
    const readLength = readedUserNews.length;
    refs.userNameInput.value = load(AUTHORIZED).name;
    refs.statsFavorites.textContent = favoritesLength;
    refs.statsRead.textContent = readLength;
    refs.userProfileCloseBtn.addEventListener('click', onCloseProfile);
    refs.userProfileForm.addEventListener('submit', onProfileSubmit);
    refs.userProfileForm.addEventListener('click', () => {});
    refs.passChangeInput.addEventListener('input', debounce(onChangePass, 300));
};

export const onCloseProfile = () => {
    refs.userProfile.classList.add('is-hidden');
    refs.backdrop.classList.add('is-hidden');
    refs.userProfileForm.reset();
    refs.passChangeInput.removeEventListener(
        'input',
        debounce(onChangePass, 300)
    );
    enableBodyScroll(document.body);
};

export const onProfileSubmit = e => {
    e.preventDefault();
    const {
        elements: { user_name, pass, confirmPass },
    } = e.currentTarget;
    if (pass.value !== '') {
        if (pass.value !== confirmPass.value) {
            notification('Passwords did not match.');
            return;
        }
        if (testInput(pass.value)) {
            notification(testInput(pass.value));
            return;
        }
    }
};
