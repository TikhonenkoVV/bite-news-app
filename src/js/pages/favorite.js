import { tokens } from '../..';
import { loadUserNews } from '../db';
import { hideMainContent } from '../news-not-found';
import { refs } from '../refs';
import { hideLoader, showLoader } from '../services/toggleLoader';
import { formShow } from '../sign-in-up';
import { renderGallery } from '../templates/render-gallery';

if (!tokens) {
    hideMainContent();
    refs.backdrop.classList.remove('is-hidden');
    formShow();
} else
    loadUserNews(true, null)
        .then(data => {
            showLoader();
            if (data.length > 0)
                renderGallery(data, false, refs.favoritesContainer);
            else hideMainContent();
        })
        .catch(() => {
            return;
        })
        .finally(() => hideLoader());
