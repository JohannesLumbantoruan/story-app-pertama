import 'regenerator-runtime';
import '../sass/main.scss';

import * as bootstrap from 'bootstrap';
import './components';
import './pages';
import Index from './pages/dashboard';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Add from './pages/add';

const routes = {
    login: Login,
    register: Register,
    add: Add,
    index: Index
};

function detectRoute() {
    const { href, origin } = location;

    const loginPattern = new RegExp(`^${origin}\/auth\/login.html$`);
    const registerPattern = new RegExp(`^${origin}\/auth\/register.html$`);
    const addPattern = new RegExp(`^${origin}\/stories\/add.html$`);
    const indexPattern = new RegExp(`^${origin}(\/|\/index.html)$`)

    switch (true) {
        case loginPattern.test(href):
            return routes['login'];
        case registerPattern.test(href):
            return routes['register'];
        case addPattern.test(href):
            return routes['add'];
        case indexPattern.test(href):
            return routes['index'];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const route = detectRoute();
    await route.init();
});