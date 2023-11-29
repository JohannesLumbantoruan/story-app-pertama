import { html } from "lit";

import LitWithoutShadowDom from "./LitWithoutShadowDom";

class AddStoryForm extends LitWithoutShadowDom {
    static properties = {
        name: { type: String, state: true },
        description: { type: String, state: true },
        img: { type: String, state: true }
    };

    render() {
        return html`
            <h1 class="text-center mb-2">Add a New Story</h1>
            <form @submit=${this.submitHandler}>
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input @input=${this.nameInputHandler} type="text" class="form-control" id="inputName">
                </div>
                <div class="mb-3">
                    <label for="inputDescription" class="form-label">Description</label>
                    <input @input=${this.descriptionInputHandler} type="text" class="form-control" id="inputDescription">
                </div>
                <div class="mb-3">
                    <label for="inputImage" class="form-label">Image</label>
                    <input type="file" class="form-control mb-3" id="inputImage" accept="image/*" @change=${this.imagePreviewHandler}>
                    <div class="img-preview">
                        + Add Image
                    </div>
                </div>
                <button type="submit" class="btn btn-primary d-block w-100 mx-auto mt-5">Submit</button>
            </form>
        `;
    }

    nameInputHandler(e) {
        this.name = e.target.value;
    }

    descriptionInputHandler(e) {
        this.description = e.target.value;
    }

    imagePreviewHandler(e) {
        // const image = document.querySelector('#inputImage').files[0];
        const image = e.target.files[0];
        const imagePreview = document.querySelector('div.img-preview');
        const img = document.createElement('img');

        img.style.maxHeight = '200px';

        img.classList.add('img-fluid', 'img-thumbnail');

        imagePreview.removeChild(imagePreview.childNodes[0]);

        imagePreview.appendChild(img);

        if (image) {
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;

                this.img = e.target.result;
            }

            reader.readAsDataURL(image);
        }
    }

    submitHandler(e) {
        e.preventDefault();

        const stories = JSON.parse(localStorage.stories);

        const id = 'story-' + Date.now();

        const story = {
            id,
            name: this.name,
            description: this.description,
            photoUrl: this.img,
            createdAt: new Date().toISOString()
        }

        stories.push(story);

        localStorage.stories = JSON.stringify(stories);

        window.location.href = `/index.html?id=${id}`;
    }
}

customElements.define('add-story-form', AddStoryForm);