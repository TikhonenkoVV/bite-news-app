import { load, save } from './services/storage';
import { resetStyle } from './sign-in-up';
import { checkCurrentLocation } from './check-current-location';
import { hideMainContent } from './news-not-found';
import { BITE_DB, AUTORIZED_USER } from './utils/constants';

export const verifyUser = () => {
    const isAutorized = load(AUTORIZED_USER);
    if (!isAutorized) {
        if (checkCurrentLocation() !== 'index') {
            resetStyle();
            hideMainContent();
        }
        return undefined;
    } else {
        return isAutorized.autorized;
    }
};

export const chkAvaibleUserLogin = (email, pass) => {
    let avaibleUser;
    const loadUserData = load(BITE_DB);
    if (!loadUserData) return false;
    loadUserData.map(key => {
        if (key.hasOwnProperty(email)) {
            if (!pass) {
                avaibleUser = true;
            }
            if (key[email].profile.password === pass) {
                avaibleUser = key;
            }
        }
    });
    if (avaibleUser === undefined) return false;
    return avaibleUser;
};

export const regUser = ({ user, email, password }) => {
    const loadUserData = load(BITE_DB);
    let arr = [];
    const res = {
        [email]: { profile: { user: user, password: password } },
    };
    if (!loadUserData) {
        arr.push(res);
        save(BITE_DB, arr);
        return;
    }
    loadUserData.map(el => arr.push(el));
    arr.push(res);
    save(BITE_DB, arr);
};

export const loadUserNews = () => {
    if (!load(AUTORIZED_USER)) return;
    const autorizedUser = load(AUTORIZED_USER).autorized;
    const userNews = load(autorizedUser);
    return userNews;
};

export const saveUserNews = (data, status) => {
    if (!load(AUTORIZED_USER)) return;
    const autorizedUser = load(AUTORIZED_USER).autorized;
    const userNews = load(autorizedUser);
    const url = data.url;
    let isContains = false;
    let array = [];
    if (userNews) {
        userNews.map(obj => {
            if (status === 'favorite') {
                if (obj.url === url) {
                    const isFavorite = obj.favorite;
                    if (isFavorite === false) {
                        obj.favorite = true;
                    } else {
                        obj.favorite = false;
                    }
                    isContains = true;
                }
                array.push(obj);
            } else if (status === 'read') {
                if (obj.url === url) {
                    if (obj.readMore === '') obj.readMore = data.readMore;
                    isContains = true;
                }
                array.push(obj);
            }
        });
    }
    if (isContains === false) array.push(data);
    save(autorizedUser, array);
};

// FIREBASE ============================

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: 'AIzaSyDpIsSwbFSumHGIJOl_If9cSvfr9OAF2A0',
//     authDomain: 'myprojectayth.firebaseapp.com',
//     projectId: 'myprojectayth',
//     storageBucket: 'myprojectayth.appspot.com',
//     messagingSenderId: '39354384134',
//     appId: '1:39354384134:web:7e2893d1e627cb3c6ae887',
// };

// Initialize Firebase
// export const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp);
//
