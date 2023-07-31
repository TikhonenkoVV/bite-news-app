import { tokens } from '../..';
import { loadUserNews } from '../db';
import { hideMainContent } from '../news-not-found';
import { refs } from '../refs';
import { hideLoader, showLoader } from '../services/toggleLoader';
import { formShow } from '../sign-in-up';
import { renderGalleryReadOnDays } from '../templates/render-markup-read';

if (!tokens) {
    hideMainContent();
    refs.backdrop.classList.remove('is-hidden');
    formShow();
} else
    loadUserNews(null, true)
        .then(data => {
            showLoader();
            if (data.length > 0) renderGalleryReadOnDays(data);
            else hideMainContent();
        })
        .catch(() => {
            return;
        })
        .finally(() => hideLoader());
