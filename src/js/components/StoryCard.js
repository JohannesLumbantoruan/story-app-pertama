import { html } from "lit";

import LitWithoutShadowDom from "./LitWithoutShadowDom";

class StoryCard extends LitWithoutShadowDom {
    static properties = {
        src: { type: String, reflect: true },
        title: { type: String, reflect: true },
        description: { type: String, reflect: true },
        date: { type: String, reflect: true }
    };

    render() {
        return html`
            <div class="card">
                <img src="${this.src}" alt="" class="card-img-top img-fluid">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <h6>${this.date}</h6>
                    <p class="card-text">${this.description}</p>
                </div>
            </div>
        `;
    }
}

customElements.define('story-card', StoryCard);