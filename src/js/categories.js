import { fetchCategoryArticles } from './fetch';

const onAnyClick = () => {
    if (refs.categoriesDropdownMenu.getAttribute('aria-expanded') === 'true') {
        document.addEventListener('click', closeDropdownMenu, { once: true });
    }
};

import { refs } from './refs';

export const closeDropdownMenu = e => {
    e.stopPropagation();
    // console.log(refs.categoriesDropdownBtn.firstChild.textContent);
    const isOpen =
        refs.categoriesDropdownMenu.getAttribute('aria-expanded') === 'true' ||
        false;
    refs.categoriesDropdownMenu.setAttribute('aria-expanded', !isOpen);
    refs.openIcon.classList.toggle('hidden');
    refs.closeIcon.classList.toggle('hidden');
    refs.categoriesDropdownMenu.classList.toggle('hidden');
    onAnyClick();
};
// if (refs.categoryButton) {
//     refs.categoryButton.addEventListener('click', event => {
//         event.preventDefault();
//         refs.openIcon.classList.toggle('hidden');
//         refs.closeIcon.classList.toggle('hidden');
//         refs.categoriesDropdownMenu.classList.toggle('hidden');
//     });
// }

// window.addEventListener('click', e => {
//     if (e.target.classList.contains('home__category-dropdown')) return;
//     refs.categoriesDropdownMenu.setAttribute('aria-expanded', 'false');
//     refs.categoriesDropdownMenu.classList.add('hidden');
//     refs.openIcon.classList.remove('hidden');
//     refs.closeIcon.classList.add('hidden');
// });

const createBtnsMarkupMobile = results => {
    return results
        .map(({ display_name, section }) => {
            return `<button class="home__category-button js-cat-btn" type="button" data-section="${section}">${display_name}</button>`;
        })
        .join('');
};

const renderMarkupMobile = results => {
    refs.categoriesDropdownMenu.innerHTML = createBtnsMarkupMobile(results);
};

const createBtnsMarkupTablet = results => {
    const buttonsMarkup = results
        .slice(0, 4)
        .map(({ display_name, section }) => {
            return `<button class="home__category-button js-cat-btn" type="button" data-section="${section}">
                    ${display_name}
                </button>`;
        })
        .join('');

    const dropdownMarkup = results
        .slice(4)
        .map(({ display_name, section }) => {
            return `<button class="js-cat-btn" type="button" data-section="${section}">${display_name}</button>`;
        })
        .join('');

    refs.categoriesBtns.innerHTML = buttonsMarkup;
    refs.categoriesDropdownMenu.innerHTML = dropdownMarkup;
};

const createBtnsMarkupDesktop = results => {
    const buttonsMarkup = results
        .slice(0, 6) // обмежуємо результат лише першими 7 категоріями
        .map(({ display_name, section }) => {
            return `<button class="home__category-button js-cat-btn" type="button" data-section="${section}">
                    ${display_name}
                </button>`;
        })
        .join('');

    const dropdownMarkup = results
        .slice(6) // обмежуємо результат всіма категоріями, що залишилися
        .map(({ display_name, section }) => {
            return `<button class="js-cat-btn" type="button" data-section="${section}">${display_name}</button>`;
        })
        .join('');

    refs.categoriesBtns.innerHTML = buttonsMarkup;
    refs.categoriesDropdownMenu.innerHTML = dropdownMarkup;
};

let timeout;

export const handleScreenSizeChange = async () => {
    if (!refs.categoriesBtns) {
        return;
    }
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        // mobile
        refs.categoriesBtns.innerHTML = '';
        refs.categoriesDropdownBtn.firstChild.textContent = 'Categories';
        await fetchCategoryArticles().then(({ results }) => {
            renderMarkupMobile(results);
        });
    } else if (screenWidth < 1280) {
        // tablet
        refs.categoriesBtns.innerHTML = '';
        refs.categoriesDropdownBtn.firstChild.textContent = 'Others';
        await fetchCategoryArticles().then(({ results }) => {
            createBtnsMarkupTablet(results);
        });
    } else {
        // desktop
        refs.categoriesBtns.innerHTML = '';
        refs.categoriesDropdownBtn.firstChild.textContent = 'Others';
        await fetchCategoryArticles().then(({ results }) => {
            createBtnsMarkupDesktop(results);
        });
    }
};

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(handleScreenSizeChange, 500);
});

// викликаємо при завантаженні сторінки
handleScreenSizeChange();
