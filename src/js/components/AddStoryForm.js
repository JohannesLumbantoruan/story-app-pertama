import { html } from "lit";

import LitWithoutShadowDom from "./LitWithoutShadowDom";

class AddStoryForm extends LitWithoutShadowDom {
    render() {
        return html`
            <h1 class="text-center mb-2">Add a New Story</h1>
            <form>
                <div class="mb-3">
                    <label for="inputName" class="form-label">Name</label>
                    <input type="text" class="form-control" id="inputName">
                    <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
                </div>
                <div class="mb-3">
                    <label for="inputDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="inputDescription">
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
            }

            reader.readAsDataURL(image);
        }
    }
}

customElements.define('add-story-form', AddStoryForm);