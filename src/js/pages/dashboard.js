import axios from '../network/axios';

const Index = {
    oldStory: '',

    async init() {
        const data = await this.fetchData();

        const dashboardPlaceholder = document.querySelector('#dashboard-placeholder');

        dashboardPlaceholder.parentElement.removeChild(dashboardPlaceholder);

        localStorage.stories = JSON.stringify(data);

        const { href } = window.location;

        const pattern = /\/(\??$|\?.*)/;
        const pattern2 = /\/index\.html\??.*/;
    
        if (!pattern.test(href) && (!pattern2.test(href))) return;
    
        const queries = new URLSearchParams(href.split('?')[1]);

        const stories = JSON.parse(localStorage.stories);
    
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
    
        addStoryContainer.addEventListener('click', () => {
            window.location.href = `${location.origin }/stories/add.html`
        });
    
        for (const story of stories) {
            const storyPreview = document.createElement('story-preview');
    
            storyPreview.setAttribute('id', story.id);
            storyPreview.setAttribute('src', story.photoUrl);
            storyPreview.setAttribute('name', story.name);
    
            storyPreview.addEventListener('click', () => this.storyPreviewClickHandler(story.id, stories, storyContainer));
    
            storyPreviewContainer.appendChild(storyPreview);
        }
    
        let randomStory = stories[Math.floor(Math.random() * stories.length)];
        this.oldStory = randomStory;
    
        if (queries.has('id')) {
            [ randomStory ] = stories.filter((story) => story.id === queries.get('id'));
            this.oldStory = randomStory;
        }
    
        const storyCard = document.createElement('story-card');
    
        storyCard.setAttribute('src', randomStory.photoUrl);
        storyCard.setAttribute('title', randomStory.name);
        storyCard.setAttribute('description', randomStory.description);
        storyCard.setAttribute('date', this.formatDate(randomStory.createdAt))
    
        storyContainer.appendChild(storyCard);

        const footerApp = document.createElement('footer-app');
        footerApp.classList.add('col-12');

        document.querySelector('.row').appendChild(footerApp);
    
        setInterval(() => this.addProgressBar(progressBar, storyContainer, stories), 500);
    },

    async fetchData() {
        try {
            const response = await axios.get('/stories', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            });

            return response.data.listStory;
        } catch (error) {
            const { message } = error.response.data;

            alert(`Error: ${message}\nPlease pay attention to the error and try again`);
        }
    },
    
    changeStory(container, stories) {
        let randomStory = stories[Math.floor(Math.random() * stories.length)];
    
        while (randomStory.id === this.oldStory.id) {
            randomStory = stories[Math.floor(Math.random() * stories.length)];
        }
    
        this.oldStory = randomStory;
    
        const storyCard = document.createElement('story-card');
    
        this.renderStory(container, storyCard, randomStory);
    },
    
    addProgressBar(el, container, stories) {
        const width = Number(el.style.width.replaceAll(/[^\d.]/g, ''));
    
        if (width < 100) {
            el.style.width = `${width + 2.5}%`;
        } else {
            el.style.width = '0%';
        }
    
        if (width === 100) {
            this.changeStory(container, stories)
        }
    },
    
    formatDate(date) {
        return new Intl.DateTimeFormat(
            'id-ID',
            {
                dateStyle: 'full'
            }
        ).format(new Date(date));
    },
    
    storyPreviewClickHandler(id, stories, container) {
        const story = stories.filter((story) => story.id === id)[0];
    
        const storyCard = document.createElement('story-card');
    
        this.renderStory(container, storyCard, story);
    
        const progressBar = document.querySelector('.progress-bar');
    
        progressBar.style.width = '0%';
    },
    
    renderStory(container, storyCard, story) {
        container.removeChild(container.children[1]);
    
        storyCard.setAttribute('src', story.photoUrl);
        storyCard.setAttribute('title', story.name);
        storyCard.setAttribute('description', story.description);
        storyCard.setAttribute('date', this.formatDate(story.createdAt))
    
        container.appendChild(storyCard);
    }
};

// function changeStory(container, stories) {
//     let randomStory = stories[Math.floor(Math.random() * stories.length)];

//     while (randomStory.id === this.oldStory.id) {
//         randomStory = stories[Math.floor(Math.random() * stories.length)];
//     }

//     this.oldStory = randomStory;

//     const storyCard = document.createElement('story-card');

//     this.renderStory(container, storyCard, randomStory);
// }

// function addProgressBar(el, container, stories) {
//     const width = Number(el.style.width.replaceAll(/[^\d.]/g, ''));

//     if (width < 100) {
//         el.style.width = `${width + 2.5}%`;
//     } else {
//         el.style.width = '0%';
//     }

//     if (width === 100) {
//         changeStory(container, stories)
//     }
// }

// function formatDate(date) {
//     return new Intl.DateTimeFormat(
//         'id-ID',
//         {
//             dateStyle: 'full'
//         }
//     ).format(new Date(date));
// }

// function storyPreviewClickHandler(id, stories, container) {
//     const story = stories.filter((story) => story.id === id)[0];

//     const storyCard = document.createElement('story-card');

//     this.renderStory(container, storyCard, story);

//     const progressBar = document.querySelector('.progress-bar');

//     progressBar.style.width = '0%';
// }

// function renderStory(container, storyCard, story) {
//     container.removeChild(container.children[1]);

//     storyCard.setAttribute('src', story.photoUrl);
//     storyCard.setAttribute('title', story.name);
//     storyCard.setAttribute('description', story.description);
//     storyCard.setAttribute('date', formatDate(story.createdAt))

//     container.appendChild(storyCard);
// }

export default Index;