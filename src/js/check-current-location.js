export const checkCurrentLocation = () => {
    const currentLocation = window.location.pathname;
    if (currentLocation.includes('favorite')) return 'favorite';
    if (currentLocation.includes('read')) return 'read';
    return 'index';
};
