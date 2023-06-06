import '../../sass/components/_notifycations.scss';

const container = document.querySelector('.js-notifycation-root');
let item;
let animDiv;
let animBtnClose;

const addBaseAnim = e => {
    animDiv = document.querySelector('.js-notifycation-anim');
    animDiv.classList.add('animation-base');
    animDiv.addEventListener(
        'animationend',
        () => {
            e.target.classList.add('animation-hide');
            e.target.addEventListener('animationend', el => el.target.remove());
        },
        { once: true }
    );
    e.target;
};

const onAnimationClose = () => {
    item.remove();
};

export const notification = message => {
    if (container.childElementCount > 0) return;
    const markup = `
            <div class="js-notifycation-item animation-show">
                <button class="js-notifycation-close" type="button">
                    <svg width="20" height="20" fill="#fff" viewBox="0 0 32 32">
                        <path
                            d="M23.057 7.057l-16 16c-0.241 0.241-0.39 0.575-0.39 0.943s0.149 0.701 0.39 0.943v0c0.241 0.241 0.575 0.39 0.943 0.39s0.701-0.149 0.943-0.39l16-16c0.241-0.241 0.39-0.575 0.39-0.943s-0.149-0.701-0.39-0.943v0c-0.241-0.241-0.575-0.39-0.943-0.39s-0.701 0.149-0.943 0.39v0z"
                        ></path>
                        <path
                            d="M8 6.667c-0.368 0-0.701 0.149-0.943 0.391v0c-0.241 0.241-0.39 0.575-0.39 0.943s0.149 0.701 0.39 0.943l16 16c0.241 0.241 0.575 0.39 0.943 0.39s0.701-0.149 0.943-0.39v0c0.241-0.241 0.39-0.575 0.39-0.943s-0.149-0.701-0.39-0.943l-16-16c-0.241-0.241-0.575-0.391-0.943-0.391v0z"
                        ></path>
                    </svg>
                </button>
                <div class="js-notifycation-box">
                    <svg class="js-notifycation-icon" viewBox="0 0 32 32">
                        <path
                            d="M23.057 7.057l-16 16c-0.241 0.241-0.39 0.575-0.39 0.943s0.149 0.701 0.39 0.943v0c0.241 0.241 0.575 0.39 0.943 0.39s0.701-0.149 0.943-0.39l16-16c0.241-0.241 0.39-0.575 0.39-0.943s-0.149-0.701-0.39-0.943v0c-0.241-0.241-0.575-0.39-0.943-0.39s-0.701 0.149-0.943 0.39v0z"
                        ></path>
                        <path
                            d="M8 6.667c-0.368 0-0.701 0.149-0.943 0.391v0c-0.241 0.241-0.39 0.575-0.39 0.943s0.149 0.701 0.39 0.943l16 16c0.241 0.241 0.575 0.39 0.943 0.39s0.701-0.149 0.943-0.39v0c0.241-0.241 0.39-0.575 0.39-0.943s-0.149-0.701-0.39-0.943l-16-16c-0.241-0.241-0.575-0.391-0.943-0.391v0z"
                        ></path>
                    </svg>
                </div>
                <p class="js-notifycation-text">${message}</p>
                <div class="js-notifycation-anim"></div>
            </div>`;
    container.innerHTML = markup;
    item = document.querySelector('.js-notifycation-item');
    animBtnClose = document.querySelector('.js-notifycation-close');
    animBtnClose.addEventListener('click', onAnimationClose, { once: true });
    item.addEventListener('animationend', addBaseAnim, { once: true });
};
