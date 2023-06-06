import { save } from './services/storage';
import { BASE_IMG_URL } from './utils/constants';
import noPoster from '../images/no_poster.jpg';
import { findUserNews } from './find-user-news';

export const normalize = result => {
    if (result[0].hasOwnProperty('published_date')) {
        if (result[0].hasOwnProperty('media')) {
            const res = result.map(
                ({ published_date, section, abstract, media, title, url }) => {
                    let imgUrl = '';
                    const favorite = false;
                    const readMore = '';
                    const arrImg = media[0];
                    if (arrImg !== undefined) {
                        imgUrl = arrImg['media-metadata'][2].url;
                    } else imgUrl = noPoster;

                    return {
                        favorite,
                        readMore,
                        imgUrl,
                        title,
                        section,
                        abstract,
                        published_date,
                        url,
                    };
                }
            );
            findUserNews(res);
            save('bite-search', res);

            return res;
        }
        if (result[0].hasOwnProperty('multimedia')) {
            const res = result.map(
                ({
                    published_date,
                    section,
                    abstract,
                    multimedia,
                    title,
                    url,
                }) => {
                    let imgUrl = '';
                    const favorite = false;
                    const readMore = '';
                    imgUrl =
                        multimedia && multimedia.length > 0
                            ? multimedia[2].url
                            : noPoster;
                    return {
                        favorite,
                        readMore,
                        imgUrl,
                        title,
                        section,
                        abstract,
                        published_date,
                        url,
                    };
                }
            );
            findUserNews(res);
            save('bite-search', res);

            return res;
        }
    }
    if (result[0].hasOwnProperty('pub_date')) {
        const res = result.map(
            ({
                pub_date,
                section_name,
                abstract,
                multimedia,
                headline: { main },
                web_url,
            }) => {
                let imgUrl = '';
                const favorite = false;
                const readMore = '';
                const arrImg = multimedia[0];
                if (arrImg !== undefined) {
                    imgUrl = BASE_IMG_URL + arrImg.url;
                } else imgUrl = noPoster;
                const published_date = pub_date;
                const section = section_name;
                const title = main;
                const url = web_url;

                return {
                    favorite,
                    readMore,
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                };
            }
        );
        findUserNews(res);
        save('bite-search', res);

        return res;
    }
};
