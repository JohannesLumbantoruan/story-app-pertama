document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('/data/DATA.json');
    const data = await res.json();
    const stories = data.listStory;

    const storyContainer = document.querySelector('div#story');
    const storyPreviewContainer = document.querySelector('div#story-preview');
    const progressBar = document.querySelector('.progress-bar');

    for (const story of stories) {
        const storyPreview = document.createElement('story-preview');

        storyPreview.setAttribute('id', story.id);
        storyPreview.setAttribute('src', story.photoUrl);
        storyPreview.setAttribute('name', story.name);

        storyPreview.addEventListener('click', () => storyPreviewClickHandler(story.id, stories, storyContainer));

        storyPreviewContainer.appendChild(storyPreview);
    }

    const randomStory = Math.floor(Math.random() * stories.length);

    const storyCard = document.createElement('story-card');

    storyCard.setAttribute('src', stories[randomStory].photoUrl);
    storyCard.setAttribute('title', stories[randomStory].name);
    storyCard.setAttribute('description', stories[randomStory].description);
    storyCard.setAttribute('date', formatDate(stories[randomStory].createdAt))

    storyContainer.appendChild(storyCard);

    // const storyInterval = setInterval(() => changeStory(storyContainer, stories), 1000 * 20);
    const progressBarInterval = setInterval(() => addProgressBar(progressBar, storyContainer, stories), 500);
});

function changeStory(container, stories) {
    container.removeChild(container.children[1]);

    const randomStory = Math.floor(Math.random() * stories.length);

    const storyCard = document.createElement('story-card');

    storyCard.setAttribute('src', stories[randomStory].photoUrl);
    storyCard.setAttribute('title', stories[randomStory].name);
    storyCard.setAttribute('description', stories[randomStory].description);

    container.appendChild(storyCard);
}

function addProgressBar(el, container, stories) {
    const width = Number(el.style.width.replaceAll(/[\D]/g, ''));

    if (width < 100) {
        el.style.width = (width + 5) + '%';
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
    // const id = e.target.id;
    const story = stories.filter((story) => story.id === id)[0];

    // const storyContainer = document.querySelector('div#story');
    const storyCard = document.createElement('story-card');

    console.log(container.children[1]);

    container.removeChild(container.children[1]);

    storyCard.setAttribute('src', story.photoUrl);
    storyCard.setAttribute('title', story.name);
    storyCard.setAttribute('description', story.description);
    // storyCard.setAttribute('date', formatDate(story.createdAt))

    container.appendChild(storyCard);

    const progressBar = document.querySelector('.progress-bar');

    progressBar.style.width = '0%';
}