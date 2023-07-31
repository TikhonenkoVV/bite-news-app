export const findUserNews = (normalizeNews, userNews) => {
    let res = [];
    normalizeNews.map(obj => {
        userNews.map(el => {
            if (el.url === obj.url) {
                obj._id = el._id;
                obj.dataId = el._id;
                obj.favorite = el.favorite;
                obj.readed = el.readed;
            }
        });
        res.push(obj);
    });
    return res;
};
