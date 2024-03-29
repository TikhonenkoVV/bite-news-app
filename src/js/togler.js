import { updateTheme } from './db';
import { load, save } from './services/storage';
import { hideLoader, showLoader } from './services/toggleLoader';
import { AUTHORIZED } from './utils/constants';

export const onToglerClick = () => {
    document.body.classList.toggle('dark');
    const isDarkTheme = document.body.classList.contains('dark');
    setTheme(isDarkTheme);
};

export const setTheme = async isDarkTheme => {
    const autorizedUser = load(AUTHORIZED);
    if (autorizedUser) {
        showLoader();
        await updateTheme({ theme: !isDarkTheme ? 'light' : 'dark' });
        hideLoader();
    }
    save('theme', !isDarkTheme ? '' : 'dark');
    const togglerRef = document.querySelector('.theme__lever');
    if (isDarkTheme) {
        togglerRef.style.transform = 'translateX(20px)';
        return;
    }
    togglerRef.style.transform = 'translateX(0px)';
};

export function checkCurrentTheme() {
    const autorizedUser = load(AUTHORIZED);
    let theme;
    autorizedUser ? (theme = autorizedUser.theme) : (theme = load('theme'));
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav__link');
    const mobileLinks = document.querySelectorAll('.mobile-menu__item');
    if (currentLocation.includes('favorite')) {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'favorite');
    } else if (currentLocation.includes('read')) {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'read');
    } else {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'home');
    }
    if (theme === 'dark') {
        onToglerClick();
        return;
    }
}

function toggleNavigationMenuClasses(navLinks, mobileNavLinks, page) {
    [...navLinks].forEach((item, index) => {
        if (item.textContent.toLowerCase() === page) {
            item.classList.add('site-nav__link--active');
            mobileNavLinks[index].classList.add('mobile-menu__item--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__link')
                .classList.add('mobile-menu__link--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__item-svg')
                .classList.add('mobile-menu__item-svg--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__item-next-svg')
                ?.classList.replace(
                    'mobile-menu__item-next-svg',
                    'mobile-menu__item-next-svg--active'
                );
            return;
        }
        item.classList.remove('site-nav__link--active');
        mobileNavLinks[index].classList.remove('mobile-menu__item--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__link')
            .classList.remove('mobile-menu__link--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-svg')
            .classList.remove('mobile-menu__link--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-svg')
            .classList.remove('mobile-menu__item-svg--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-next-svg--active')
            ?.classList.replace(
                'mobile-menu__item-next-svg--active',
                'mobile-menu__item-next-svg'
            );
    });
}

function changeRefStyle(ref, ...styles) {
    styles.forEach(item => {
        ref.style[item.option] = item.value;
    });
}
