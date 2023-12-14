function activePage() {
    document.querySelectorAll('.nav-link').forEach((el) => {
        el.classList.remove('active');
    });

    const { href, origin } = location;

    const pages = [
        `${origin}/`,
        `${origin}/index.html`,
        `${origin}/stories/add.html`,
        `${origin}/about.html`,
    ];

    const navLinks = {
        home: document.querySelector('.nav-item:nth-child(2) > .nav-link'),
        add: document.querySelector('.nav-item:nth-child(3) > .nav-link'),
        about: document.querySelector('.nav-item:nth-child(4) > .nav-link')
    };

    switch (href) {
        case pages[0]:
        case pages[1]:
            navLinks['home'].classList.add('active');
            break;
        case pages[2]:
            navLinks['add'].classList.add('active');
            break;
        case pages[3]:
            navLinks['about'].classList.add('active');
            break;
    }
}

export default activePage;