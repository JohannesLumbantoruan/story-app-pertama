let oldStory;

document.addEventListener('DOMContentLoaded', async () => {
    const { href } = window.location;

    const pattern = /\/(\??$|\?.*)/;
    const pattern2 = /\/index\.html\??.*/;

    if (!pattern.test(href) && (!pattern2.test(href))) return;

    const queries = new URLSearchParams(href.split('?')[1]);

    let stories;

    if (!localStorage.stories) {
        const res = await fetch('/data/DATA.json');
        const data = await res.json();
        stories = data.listStory;

        localStorage.setItem('stories', JSON.stringify(stories));
    } else {
        stories = JSON.parse(localStorage.getItem('stories'));
    }

    const storyContainer = document.querySelector('div#story');
    const storyPreviewContainer = document.querySelector('div#story-preview');
    const progressBar = document.querySelector('.progress-bar');

    const addStoryContainer = document.createElement('div');
    const addStoryPreview = document.createElement('div');
    const addStoryText = document.createElement('p');

    addStoryPreview.innerText = '+ Add Story';
    addStoryPreview.style.display = 'flex';
    addStoryPreview.style.justifyContent = 'center';
    addStoryPreview.style.alignItems = 'center';
    addStoryPreview.style.border = 'solid white';

    addStoryText.innerText = 'Bagikan ceritamu';

    addStoryContainer.setAttribute('id', 'add-story-preview');

    addStoryContainer.appendChild(addStoryPreview);
    addStoryContainer.appendChild(addStoryText);
    storyPreviewContainer.appendChild(addStoryContainer);

    addStoryContainer.addEventListener('click', () => window.location.pathname = '/stories/add.html');

    for (const story of stories) {
        const storyPreview = document.createElement('story-preview');

        storyPreview.setAttribute('id', story.id);
        storyPreview.setAttribute('src', story.photoUrl);
        storyPreview.setAttribute('name', story.name);

        storyPreview.addEventListener('click', () => storyPreviewClickHandler(story.id, stories, storyContainer));

        storyPreviewContainer.appendChild(storyPreview);
    }

    let randomStory = stories[Math.floor(Math.random() * stories.length)];
    oldStory = randomStory;

    if (queries.has('id')) {
        randomStory = stories.filter((story) => story.id === queries.get('id'))[0];
        oldStory = randomStory;
    }

    const storyCard = document.createElement('story-card');

    storyCard.setAttribute('src', randomStory.photoUrl);
    storyCard.setAttribute('title', randomStory.name);
    storyCard.setAttribute('description', randomStory.description);
    storyCard.setAttribute('date', formatDate(randomStory.createdAt))

    storyContainer.appendChild(storyCard);

    const progressBarInterval = setInterval(() => addProgressBar(progressBar, storyContainer, stories), 500);
});

function changeStory(container, stories) {
    let randomStory = stories[Math.floor(Math.random() * stories.length)];

    while (randomStory.id === oldStory.id) {
        randomStory = stories[Math.floor(Math.random() * stories.length)];
    }

    oldStory = randomStory;

    const storyCard = document.createElement('story-card');

    renderStory(container, storyCard, randomStory);
}

function addProgressBar(el, container, stories) {
    const width = Number(el.style.width.replaceAll(/[^\d.]/g, ''));

    if (width < 100) {
        el.style.width = (width + 2.5) + '%';
    } else {
        el.style.width = '0%';
    }

    if (width === 100) {
        changeStory(container, stories)
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat(
        'id-ID',
        {
            dateStyle: 'full'
        }
    ).format(new Date(date));
}

function storyPreviewClickHandler(id, stories, container) {
    const story = stories.filter((story) => story.id === id)[0];

    const storyCard = document.createElement('story-card');

    renderStory(container, storyCard, story);

    const progressBar = document.querySelector('.progress-bar');

    progressBar.style.width = '0%';
}

function renderStory(container, storyCard, story) {
    container.removeChild(container.children[1]);

    storyCard.setAttribute('src', story.photoUrl);
    storyCard.setAttribute('title', story.name);
    storyCard.setAttribute('description', story.description);
    storyCard.setAttribute('date', formatDate(story.createdAt))

    container.appendChild(storyCard);
}