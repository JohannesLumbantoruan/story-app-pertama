import { html, css, LitElement } from 'lit';

class FooterApp extends LitElement {
    static styles = css`
        *,
        *::before,
        *::after {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        :host {
            display: block;
        }

        footer {
            border-top: 3px solid white;
            padding-block: 10px 30px;
            text-align: center;
            margin-top: 30px;
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