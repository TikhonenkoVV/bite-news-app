import { formatDate, numToDateStr } from '../services/format-date';

export const sortUserNews = (userNews, value) => {
    let filterArray;
    let result;
    if (value === true) {
        filterArray = userNews.filter(({ favorite }) => favorite === value);
        result = filterArray;
        return result;
    }
    filterArray = userNews.filter(({ readMore }) => readMore !== value);

    const groupedByKey = filterArray.reduce((acc, obj) => {
        const key = numToDateStr(obj.readMore);
        const collection = acc.get(key);
        if (!collection) {
            acc.set(key, [obj]);
        } else {
            collection.push(obj);
        }
        return acc;
    }, new Map());
    result = Array.from(groupedByKey.values());
    return result;
};
