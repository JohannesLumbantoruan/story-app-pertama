const Add = {
    async init() {
        const { pathname } = window.location;

        const pattern = /^\/stories\/add\.(html$|html\?.*)/;

        if (!pattern.test(pathname)) return;

        const closeBtn = document.querySelectorAll('[data-bs-dismiss="modal"]');

        const modal = document.querySelector('div.modal[tabindex="-1"]');

        closeBtn.forEach((el) => {
            el.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });
    }
};

// document.addEventListener('DOMContentLoaded', () => {
//     const { pathname } = window.location;

//     pattern = /^\/stories\/add\.(html$|html\?.*)/;

//     if (!pattern.test(pathname)) return;

//     const closeBtn = document.querySelectorAll('[data-bs-dismiss="modal"]');

//     const modal = document.querySelector('div.modal[tabindex="-1"]');

//     closeBtn.forEach((el) => {
//         el.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });
//     });
// });

export default Add;