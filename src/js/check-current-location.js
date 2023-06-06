export const checkCurrentLocation = () => {
    const currentLocation = window.location.pathname;
    let res = 'index';
    if (currentLocation.includes('favorite')) res = 'favorite';
    if (currentLocation.includes('read')) res = 'read';
    return res;
};
