import { formatDate, numToDateStr } from '../services/format-date';

export const sortUserNews = userNews => {
    let result;

    const groupedByKey = userNews.reduce((acc, obj) => {
        const key = numToDateStr(obj.createdAt);
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
