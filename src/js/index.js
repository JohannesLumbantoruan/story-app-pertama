import '../sass/main.scss';

import * as bootstrap from 'bootstrap';
import './components';
import './pages';

document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.stories) {
        const res = await fetch('/data/DATA.json');
        const json = await res.json();
        const stories = JSON.stringify(json.listStory);

        localStorage.setItem('stories', stories);
    }
});