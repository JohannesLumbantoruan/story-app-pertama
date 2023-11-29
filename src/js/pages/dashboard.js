document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('/data/DATA.json');
    const data = await res.json();
    const stories = data.listStory;

    const storyContainer = document.querySelector('div#story');
    const storyPreviewContainer = document.querySelector('div#story-preview');
    const progressBar = document.querySelector('.progress-bar');

    for (const story of stories) {
        const storyPreview = document.createElement('story-preview');

        storyPreview.setAttribute('id', story.kd);
        storyPreview.setAttribute('src', story.photoUrl);
        storyPreview.setAttribute('name', story.name);

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
    const progressBarInterval = setInterval(() => addProgressBar(progressBar, storyContainer, stories), 1000);
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

    console.log(width);

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