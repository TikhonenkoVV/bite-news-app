import { sortUserNews } from './read/sort-news-data';
import { refs } from './refs';
import { load } from './services/storage';
import { testInput } from './services/test-input';
import { AUTORIZED_USER } from './utils/constants';
import { notification } from './services/notification';
import { enableBodyScroll } from 'body-scroll-lock';
import debounce from 'lodash.debounce';

const onChangePass = e => {
    e.target.value !== ''
        ? refs.userProfileSubmitBtn.removeAttribute('disabled')
        : refs.userProfileSubmitBtn.setAttribute('disabled', true);
};

const calcStats = () => {
    const userNews = load(load(AUTORIZED_USER).autorized);
    const favoritesLength = sortUserNews(userNews, true).length;
    const read = sortUserNews(userNews, '');
    let readLength = 0;
    read.forEach(el => (readLength += el.length));
    return { favoritesLength, readLength };
};

export const onProfileShow = () => {
    refs.userNameInput.value = load(AUTORIZED_USER).userName;
    refs.statsFavorites.textContent = calcStats().favoritesLength;
    refs.statsRead.textContent = calcStats().readLength;
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
