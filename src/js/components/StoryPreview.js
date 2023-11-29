import { html } from "lit";

import LitWithoutShadowDom from "./LitWithoutShadowDom";

class StoryPreview extends LitWithoutShadowDom {
    static properties = {
        id: { type: String, reflect: true },
        src: { type: String, reflect: true },
        name: { type: String, reflect: true }
    };

    render() {
        return html`
            <div id="${this.id}">
                <img src="${this.src}" alt="" class="img-fluid img-thumbnail circle">
                <p>${this.name}</p>
            </div>
        `;
    }
}

customElements.define('story-preview', StoryPreview);