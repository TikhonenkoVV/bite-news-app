import axios from 'axios';
import { BASE_URL } from './utils/constants';

const instansNews = axios.create({
    baseURL: BASE_URL,
});

export const setAuthHeader = token => {
    instansNews.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const signUp = async formData => {
    try {
        const { status } = await instansNews.post('/users/signUp', formData);
        return status;
    } catch (error) {
        if (error.response.status === 409) return false;
    }
};

export const signIn = async formData => {
    try {
        const { data } = await instansNews.post('/users/signin', formData);
        setAuthHeader(data.tokens.accessToken);
        return data;
    } catch (error) {
        if (error) return false;
    }
};

export const verifyUser = async () => {
    try {
        const { data } = await instansNews.get('/users/current');
        return data;
    } catch (error) {
        if (error) return false;
    }
};

export const updateAvatar = async avatar => {
    try {
        const { data } = await instansNews.patch('/users/avatars', avatar);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const signOut = async () => {
    try {
        const { status } = await instansNews.post('/users/signout');
        return status;
    } catch (error) {
        if (error) console.log('Unauthorized');
    }
};

export const loadUserNews = async (favorite, readed) => {
    try {
        const { data } = await instansNews.get('/news', {
            params: { favorite, readed },
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const addUserNews = async news => {
    try {
        const { data } = await instansNews.post('/news', news);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const updateFavorite = async (newsId, favorite) => {
    try {
        const { data } = await instansNews.patch(`/news/favorite/${newsId}`, {
            favorite,
        });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const findNewsById = async newsId => {
    try {
        const { data } = await instansNews.get(`/news/${newsId}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const remoweNews = async newsId => {
    try {
        await instansNews.delete(`/news/${newsId}`);
    } catch (error) {
        console.log(error.message);
    }
};
