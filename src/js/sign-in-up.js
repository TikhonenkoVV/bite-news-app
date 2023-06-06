import { refs } from './refs';
import { load, save } from './services/storage';
import { chkAvaibleUserLogin, loadUserNews, regUser } from './db';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { checkCurrentLocation } from './check-current-location';
import { renderGalleryReadOnDays } from './templates/render-markup-read';
import { favoriteRender } from './favorite-page';
import { markupProfileMenu } from './templates/render-profile-menu';
import { renderGallery } from './templates/render-gallery';
import { AUTORIZED_USER } from './utils/constants';
import { notification } from './services/notification';
import { testInput } from './services/test-input';

export let signInformData = {};
export let signUpformData = {};

export const onSignInSubmit = e => {
    e.preventDefault();
    const {
        elements: { email, password },
    } = e.currentTarget;
    const avaibleUser = chkAvaibleUserLogin(email.value, password.value);
    signInformData = {
        email: email.value,
        password: password.value,
    };
    if (email.value === '' || password.value === '') {
        notification('Fields cannot be empty');
        return;
    }
    if (!avaibleUser) {
        notification('Wrong username or password');
        return;
    }
    const userName = avaibleUser[email.value].profile.user;
    e.target.classList.add('hide');
    refs.autorizeNav.classList.add('hide');
    refs.formSignIn.classList.add('hide');
    refs.profilePhoto.classList.add('show');
    refs.wellcomeLeyout.classList.add('show');
    refs.autorizeTitle.textContent = `Welcome, ${userName}!`;
    refs.profileBtn.classList.remove('hide');
    save(AUTORIZED_USER, { autorized: email.value, userName: userName });
    e.currentTarget.reset();
    refs.formSignUp.reset();
};

export const onSignUpSubmit = e => {
    e.preventDefault();
    const {
        elements: { user, email, password, confirmpassword },
    } = e.currentTarget;
    const avaibleUser = chkAvaibleUserLogin(email.value, null);
    signUpformData = {
        user: user.value,
        email: email.value,
        password: password.value,
    };
    if (
        user.value === '' ||
        email.value === '' ||
        password.value === '' ||
        confirmpassword.value === ''
    ) {
        notification('Fields cannot be empty');
        return;
    }
    if (avaibleUser) {
        notification('This email is in use. If this is you, then sign in.');
        return;
    }
    if (testInput(password.value)) {
        notification(testInput(password.value));
        return;
    }
    if (password.value !== confirmpassword.value) {
        notification('Passwords did not match.');
        return;
    }
    e.target.classList.add('hide');
    refs.autorizeNav.classList.add('hide');
    refs.formSignUp.classList.add('hide');
    refs.autorizeAnime.classList.add('show');
    refs.wellcomeLeyout.classList.add('show');
    refs.autorizeTitle.textContent = 'Thank you for registering!';
    refs.profileBtn.classList.remove('hide');
    save(AUTORIZED_USER, { autorized: email.value, userName: user.value });
    regUser(signUpformData);
    refs.formSignIn.reset();
    e.currentTarget.reset();
};

export const onSignInUpNavClick = e => {
    if (e.target.nodeName !== 'A') return;
    const active = document.querySelector('.autorize__nav-item.active');
    const current = e.target.parentElement;
    if (!current.classList.contains('active')) {
        active.classList.toggle('active');
        current.classList.toggle('active');
        refs.formSignIn.classList.toggle('autorize__form-signin-left');
        refs.formSignUp.classList.toggle('autorize__form-signup-left');
    }
};

export const resetStyle = () => {
    const navBtn = document.querySelectorAll('.autorize__nav-item');
    navBtn[0].classList.add('active');
    navBtn[1].classList.remove('active');
    refs.btnSignIn.classList.remove('hide');
    refs.formSignIn.classList.remove('hide');
    refs.formSignIn.classList.remove('autorize__form-signin-left');
    refs.formSignUp.classList.remove('autorize__form-signup-left');
    refs.autorizeNav.classList.remove('hide');
    refs.formSignIn.classList.remove('hide');
    refs.profilePhoto.classList.remove('show');
    refs.autorizeAnime.classList.add('show');
    refs.wellcomeLeyout.classList.remove('show');
};

export const onSignInBtnCloseClick = () => {
    enableBodyScroll(document.body);
    refs.backdrop.classList.add('is-hidden');
    refs.autorizeModal.classList.add('is-hidden');

    if (checkCurrentLocation() === 'favorite') {
        renderGallery(loadUserNews(), false, refs.favoritesContainer);
        // favoriteRender();
    }
    if (checkCurrentLocation() === 'read') {
        renderGalleryReadOnDays();
    }
    if (checkCurrentLocation() === 'index') {
        renderGallery(load('bite-search'), true, refs.newsContainer);
    }
    markupProfileMenu();
};

const onPassAccessBtnClick = e => {
    if (!e.target.classList.contains('input-btn')) return;
    let ico = e.target.querySelectorAll('.input-btn__use');
    let input = e.target.nextElementSibling;
    input.getAttribute('type') === 'password'
        ? input.setAttribute('type', 'text')
        : input.setAttribute('type', 'password');
    ico.forEach(el => {
        el.classList.toggle('show');
    });
};

export const formShow = () => {
    refs.autorizeModal.classList.remove('is-hidden');
    disableBodyScroll(document.body);
    refs.formSignIn.addEventListener('click', onPassAccessBtnClick);
    refs.formSignUp.addEventListener('click', onPassAccessBtnClick);
    refs.autorizeNav.addEventListener('click', onSignInUpNavClick);
    refs.formSignIn.addEventListener('submit', onSignInSubmit);
    refs.formSignUp.addEventListener('submit', onSignUpSubmit);
    refs.signinBtnClose.addEventListener('click', onSignInBtnCloseClick);
};

export const formClose = () => {
    refs.autorizeModal.classList.add('is-hidden');
    refs.formSignIn.removeEventListener('click', onPassAccessBtnClick);
    refs.formSignUp.removeEventListener('click', onPassAccessBtnClick);
    refs.autorizeNav.removeEventListener('click', onSignInUpNavClick);
    refs.formSignIn.removeEventListener('submit', onSignInSubmit);
    refs.formSignUp.removeEventListener('submit', onSignUpSubmit);
    refs.signinBtnClose.removeEventListener('click', onSignInBtnCloseClick);
};
