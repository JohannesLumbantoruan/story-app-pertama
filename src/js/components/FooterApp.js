import { html, css } from 'lit';

import LitWithoutShadowDom from './LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
    static styles = css`
        :host {
            display: block;
        }
    `;

    render() {
        return html`
            <footer>
                <p>Made with ❤️ by Johannes Lumbantoruan</p>
            </footer>
        `;
    }
}

customElements.define('footer-app', FooterApp);