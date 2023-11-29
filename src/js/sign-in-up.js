import { refs } from './refs';
import { load, save } from './services/storage';
import { signIn, signUp } from './db';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TOKENS } from './utils/constants';
import { notification } from './services/notification';
import { testInput } from './services/test-input';
import { hideLoader, showLoader } from './services/toggleLoader';
import { checkProfileBtn } from './profile-menu';

export const onSignUpSubmit = async e => {
    e.preventDefault();
    const currentTheme = load('theme') !== 'dark' ? 'light' : 'dark';
    const {
        elements: { user, email, password, confirmpassword },
    } = e.currentTarget;
    const signUpformData = {
        name: user.value,
        email: email.value,
        password: password.value,
        theme: currentTheme,
    };
    const signInformData = {
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
    if (testInput(password.value)) {
        notification(testInput(password.value));
        return;
    }
    if (password.value !== confirmpassword.value) {
        notification('Passwords did not match.');
        return;
    }
    showLoader();
    const status = await signUp(signUpformData);
    if (status === 201) {
        e.target.classList.add('hide');
        refs.autorizeNav.classList.add('hide');
        refs.formSignUp.classList.add('hide');
        refs.autorizeAnime.classList.add('show');
        refs.wellcomeLeyout.classList.add('show');
        refs.autorizeTitle.textContent = 'Thank you for registering!';
        refs.profileBtn.classList.remove('hide');
        refs.formSignIn.reset();
        e.target.reset();
        const userData = await signIn(signInformData);
        save(TOKENS, {
            accessToken: userData.tokens.accessToken,
            refreshToken: userData.tokens.refreshToken,
        });
    } else notification('User already exist');
    hideLoader();
};

export const onSignInSubmit = async e => {
    e.preventDefault();
    const {
        elements: { email, password },
    } = e.currentTarget;
    const signInformData = {
        email: email.value,
        password: password.value,
    };
    if (email.value === '' || password.value === '') {
        notification('Fields cannot be empty');
        return;
    }
    showLoader();
    const res = await signIn(signInformData);
    hideLoader();
    if (res) {
        e.target.classList.add('hide');
        refs.autorizeNav.classList.add('hide');
        refs.formSignIn.classList.add('hide');
        refs.profilePhoto.classList.add('show');
        refs.wellcomeLeyout.classList.add('show');
        refs.autorizeTitle.textContent = `Welcome, ${res.user.name}!`;
        refs.profileBtn.classList.remove('hide');
        save(TOKENS, {
            accessToken: res.tokens.accessToken,
            refreshToken: res.tokens.refreshToken,
        });
        e.target.reset();
        refs.formSignUp.reset();
    } else notification('Wrong username or password');
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
    checkProfileBtn();
    location.reload();
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
