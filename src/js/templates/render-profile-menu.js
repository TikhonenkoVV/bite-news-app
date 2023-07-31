import { onProfileItemClick } from '../profile-menu';
import { refs } from '../refs';
import { load } from '../services/storage';
import { AUTHORIZED } from '../utils/constants';

export const markupProfileMenu = () => {
    const autorizedUser = load(AUTHORIZED);
    let caption = 'Unauthorized';
    let userName = '';
    let idFirstLink = 'sign-in';
    let idSecondLink = 'sign-up';
    let firstLinkString = 'Sign in';
    let secondLinkString = 'Sign up';
    if (autorizedUser) {
        caption = 'Autorized as';
        userName = autorizedUser.name;
        idFirstLink = 'profile';
        idSecondLink = 'sign-out';
        firstLinkString = 'Your profile';
        secondLinkString = 'Sign out';
    }
    const markup = `
        <p class="profile__caption">${caption}</p>
        <p class="profile__caption">${userName}</p>
        <ul class="profile__list">
            <li class="profile__item">
                <a id="${idFirstLink}" class="profile__link" href="#">${firstLinkString}</a>
            </li>
            <li class="profile__item">
                <a id="${idSecondLink}" class="profile__link" href="#">${secondLinkString}</a>
            </li>
        </ul>
    `;
    refs.profileMenu.innerHTML = markup;
    const profileList = document.querySelector('.profile__list');
    profileList.addEventListener('click', onProfileItemClick);
    autorizedUser
        ? refs.profileBtn.classList.add('autorized')
        : refs.profileBtn.classList.remove('autorized');
};
