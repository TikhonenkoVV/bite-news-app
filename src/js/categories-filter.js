import axios from 'axios';
import { createPagination } from './pagination';
import { hideMainContent, showMainContent } from './news-not-found';
import { renderGallery } from './templates/render-gallery';
import { normalize } from './normalize';
import throttle from 'lodash.throttle';
import { load } from './services/storage';
import { refs } from './refs';
import { closeDropdownMenu } from './categories';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'e3QVyAs0wF8oNwOW75RSlccT9UsAdwt7';

export const onClickBtns = async e => {
    // e.preventDefault();
    if (!e.target.classList.contains('js-cat-btn')) {
        return;
    }
    // if (refs.categoriesDropdownMenu.getAttribute('aria-expanded') === true)
    //     closeDropdownMenu();
    const category = encodeURIComponent(e.target.dataset.section.trim());
    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/news/v3/content/all/${category}.json`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        const { results } = data;
        normalize(results);
        renderGallery(load('bite-search'), true, refs.newsContainer);
        createPagination(load('bite-search'), renderGallery);
        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true, refs.newsContainer);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
        showMainContent();
    } catch (error) {
        hideMainContent();
        console.log(error);
    }
};

// export const onClickBtnsDropdown = async e => {
//     e.preventDefault();
//     if (e.target.nodeName !== 'BUTTON') {
//         return;
//     }
//     const category = encodeURIComponent(e.target.dataset.section.trim());

//     try {
//         // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
//         const { data } = await axios.get(
//             `${BASE_URL}/news/v3/content/all/${category}.json`,
//             {
//                 params: {
//                     'api-key': API_KEY,
//                 },
//             }
//         );
//         const { results } = data;
//         const users = results.map(
//             ({ published_date, section, abstract, multimedia, title, url }) => {
//                 let favorite = '';
//                 let readMore = '';
//                 let imgUrl =
//                     multimedia && multimedia.length > 0
//                         ? multimedia[multimedia.length - 1].url
//                         : '';
//                 return {
//                     favorite,
//                     readMore,
//                     imgUrl,
//                     title,
//                     section,
//                     abstract,
//                     published_date,
//                     url,
//                 };
//             }
//         );
//         renderGallery(users, true);
//         createPagination(users, renderGallery);
//         window.addEventListener(
//             'resize',
//             throttle(e => {
//                 renderGallery(load('bite-search'), true);
//                 createPagination(load('bite-search'), renderGallery);
//             }, 1000)
//         );
//         showMainContent();
//     } catch (error) {
//         hideMainContent();
//         console.log(error);
//     }
// };
