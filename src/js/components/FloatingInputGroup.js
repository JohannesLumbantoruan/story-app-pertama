import { html } from "lit";

import LitWithoutShadowDom from './LitWithoutShadowDom';

class FloatingInputGroup extends LitWithoutShadowDom {
    static properties = {
        type: { type: String, reflect: true },
        id: { type: String, reflect: true },
        label: { type: String, reflect: true },
        placeholder: { type: String, reflect: true },
        value: { type: String, reflect: true },
        invalidFeedbackMsg: { type: String, reflect: true },
        icon: { type: String, reflect: true }
    };

    inputHandler(e) {
        this.value = e.target.value;

        if (e.target.checkValidity()) {
            this.querySelector('.invalid-feedback').style.display = 'none';
            return;
        }

        const {validity} = e.target;

        if (validity.tooShort) {
            this.invalidFeedbackMsg = 'Password too short, minimal 8 characters.';
        }

        if (validity.valueMissing) {
            this.invalidFeedbackMsg = `${this.label} required`;
        }

        this.querySelector('.invalid-feedback').style.display = 'block';
    }

    render() {
        return html`
            <div class="input-group">
                <div class="form-floating">
                    <input
                        type=${this.type}
                        class="form-control"
                        id=${this.id}
                        placeholder=${this.placeholder}
                        minLength="8"
                        value=${this.value}
                        @input=${this.inputHandler}
                        required
                    >
                    <label for=${this.id}>${this.label}</label>
                </div>
                <span class="input-group-text" id="addon-wrapping">
                    <i class=${this.icon}></i>
                </span>
                <div class="invalid-feedback">${this.invalidFeedbackMsg || `${this.label} required`}</div>
            </div>
        `;
    }
}

customElements.define('floating-input-group', FloatingInputGroup);