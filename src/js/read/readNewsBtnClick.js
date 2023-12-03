export const hndleReadNewsClick = e => {
    if (e.target.tagName === 'BUTTON') {
        const btnId = e.target.getAttribute('id');
        e.target.classList.toggle('expanded');
        document.querySelector(`.${btnId}`).classList.toggle('hide');
        // console.log(e.target.getAttribute('id'));
    }
};
