import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { handleScreenSizeChange } from './js/categories';
import { handleSubmit } from './js/searchForm';
import { addDataReadNews } from './js/read/add-data-read-more';
import { checkProfileBtn, onProfileBtnClick } from './js/profile-menu';
import { formClose, resetStyle } from './js/sign-in-up';
import { enableBodyScroll } from 'body-scroll-lock';
import { setAuthHeader, verifyUser } from './js/db';
import { load, save } from './js/services/storage';
import { AUTHORIZED, TOKENS } from './js/utils/constants';
import { markupProfileModal } from './js/templates/render-profile-modal';

export const tokens = load(TOKENS);

if (tokens) {
    setAuthHeader(tokens.accessToken);
    verifyUser()
        .then(data => {
            save(AUTHORIZED, data);
            checkProfileBtn();
            markupProfileModal();
            checkCurrentTheme();
        })
        .catch(err => console.log(err.message));
} else checkCurrentTheme();

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
                document
                    .querySelector('.user-profile__card')
                    .classList.add('is-hidden');
            }
            resetStyle();
            enableBodyScroll(document.body);
        },
        { once: true }
    );
});

handleScreenSizeChange();

// refs.newsContainer.addEventListener('click', addDataReadNews);
