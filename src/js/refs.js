export const refs = {
    // backrop and modal windows refs
    backdrop: document.querySelector('.backdrop'),
    autorizeModal: document.querySelector('.autorize__container'),
    userProfile: document.querySelector('.user-profile'),
    userNameInput: document.querySelector('input[name="user_name"]'),
    statsFavorites: document.querySelector('.js-favorites'),
    statsRead: document.querySelector('.js-read'),
    userProfileCloseBtn: document.querySelector('.user-profile__close'),
    userProfileForm: document.querySelector('.user-profile__form'),
    passChangeInput: document.querySelector('[name="pass"]'),
    userProfileSubmitBtn: document.querySelector('.user-profile__btn'),

    //sign in refs
    autorizeNav: document.querySelector('.autorize__nav'),
    formSignIn: document.querySelector('.autorize__form-signin'),
    formSignUp: document.querySelector('.autorize__form-signup'),
    btnSignIn: document.querySelector('.autorize__btn-signin'),
    btnSignUp: document.querySelector('.autorize__btn-signup'),
    profilePhoto: document.querySelector('.autorize__profile-photo'),
    wellcomeLeyout: document.querySelector('.autorize__welcome'),
    autorizeTitle: document.querySelector('.autorize__title'),
    signinBtnClose: document.querySelector('.autorize__btn-close'),
    autorizeAnime: document.querySelector('.autorize__anime'),
    passAccessBtns: document.querySelectorAll('.autorize__password-access'),
    iconUse: document.querySelectorAll('.autorize__use'),
    autorizeField: document.querySelectorAll('.autorize__field'),
    profileBtn: document.querySelector('.profile'),
    profileMenu: document.querySelector('.profile__menu'),
    profileList: document.querySelector('.profile__list'),

    // header refs
    siteNav: document.querySelector('.main-nav'),
    togler: document.querySelector('.theme__togler'),
    mobileToggler: document.querySelector('.theme-mobile__togler'),
    form: document.querySelector('.search-form'),
    seachQuery: document.querySelector('.header__input-search'),
    profileBtn: document.querySelector('.profile__btn'),

    // pages refs
    gridBox: document.querySelector('.grid-box'),
    newsContainer: document.querySelector('.news'),
    // favoritesListBtn: document.getElementById('#favoritesList'),
    categoriesContainer: document.querySelector('.container__categories'),
    categoriesBtns: document.querySelector('.home__category'),
    categoriesDropdownBtn: document.querySelector('.js-category-dropdown'),
    categoriesDropdownMenu: document.querySelector('.home__dropdown-menu'),
    categoryButton: document.querySelector('.js-cat-btn'),
    openIcon: document.querySelector('.home__category-button-icon--open'),
    closeIcon: document.querySelector('.home__category-button-icon--close'),

    // pagination refs
    pg: document.getElementById('pagination'),
    pgWrapper: document.querySelector('.pagination__wrapper'),
    pgContainer: document.querySelector('.pagination__container'),
    btnNextPg: document.querySelector('.pagination__next-page'),
    btnPrevPg: document.querySelector('.pagination__prev-page'),
    readContainer: document.querySelector('.read'),
    favoritesContainer: document.querySelector('.favorites'),
    newsSection: document.querySelector('.news-section'),
    newsNotFoundSection: document.querySelector('.not-found-section'),

    // date-time picker refs
    dateInput: document.querySelector('#datetime-picker'),
    arrowUp: document.querySelector('.up'),
    arrowDown: document.querySelector('.down'),
};
