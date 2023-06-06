import { load } from './services/storage';
import { AUTORIZED_USER } from './utils/constants';

export const findUserNews = data => {
    if (!load(AUTORIZED_USER)) return;
    const autorizedUser = load(AUTORIZED_USER).autorized;
    const userData = load(autorizedUser);
    if (!autorizedUser || !userData) return false;
    let res = [];
    data.map(obj => {
        userData.map(el => {
            if (el.url === obj.url) {
                obj.favorite = el.favorite;
                obj.readMore = el.readMore;
            }
        });
        res.push(obj);
    });
    return res;
};
