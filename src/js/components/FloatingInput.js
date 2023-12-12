import { html, nothing } from "lit";
import LitWithoutShadowDom from './LitWithoutShadowDom';

class FloatingInput extends LitWithoutShadowDom {
    static properties = {
        type: { type: String, reflect: true },
        id: { type: String, reflect: true },
        placeholder: { type: String, reflect: true },
        value: { type: String, reflect: true },
        label: { type: String, reflect: true },
        invalidFeedbackMsg: { type: String, reflect: true }
    };

    inputHandler(e) {
        this.value = e.target.value;

        if (e.target.checkValidity()) {
            this.querySelector('.invalid-feedback').style.display = 'none';
            return;
        }

        const validity = e.target.validity;

        if (validity.patternMismatch) {
            this.invalidFeedbackMsg = 'Name can only consists of letters and space';
        }

        if (validity.tooShort) {
            this.invalidFeedbackMsg = 'Password too short, minimal 8 characters.';
        }

        if (validity.typeMismatch) {
            this.invalidFeedbackMsg = 'Please input a valid email';
        }

        if (validity.valueMissing) {
            this.invalidFeedbackMsg = `${this.label} required`;
        }

        this.querySelector('.invalid-feedback').style.display = 'block';
    }

    render() {
        return html`
            <div class="form-floating mb-3">
                <input
                    type=${this.type}
                    class="form-control"
                    id=${this.id}
                    placeholder=${this.placeholder}
                    value=${this.value}
                    @input=${this.inputHandler}
                    required
                    pattern=${this.type === 'text' ? '([a-zA-Z]+)(\\s{1}[a-zA-Z]+)*' : nothing }
                    minLength=${this.type === 'password' ? 8 : nothing}
                >
                <div class="invalid-feedback">${this.invalidFeedbackMsg || `${this.label} required`}</div>
                <label for=${this.id}>${this.label}</label>
            </div>
        `;
    }
}

customElements.define('floating-input', FloatingInput);