import { tokens } from '../..';
import { closeDropdownMenu } from '../categories';
import { onClickBtns } from '../categories-filter';
import { setAuthHeader } from '../db';
import { allData } from '../main';
import { addDataReadNews } from '../read/add-data-read-more';
import { refs } from '../refs';
import { onBannerLoad } from '../weather-banner';

if (tokens) setAuthHeader(tokens.accessToken);

refs.newsContainer.addEventListener('click', addDataReadNews);
refs.categoriesDropdownBtn.addEventListener('click', closeDropdownMenu);
refs.categoriesContainer.addEventListener('click', onClickBtns);

allData();
setTimeout(() => {
    onBannerLoad();
}, 300);
