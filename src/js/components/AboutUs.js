import { LitElement, html, css } from "lit";

class AboutUs extends LitElement {
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

        h1 {
            text-align: center;
        }

        h1 {
            margin-bottom: 30px;
        }

        h2,
        h3 {
            border: solid;
            width: fit-content;
            margin: 0 auto;
            padding: 0px 20px 5px;
            border-radius: 30px;
        }

        h3 {
            border: none;
            margin-top: 10px;
            border-bottom: solid;
            border-radius: 0;
        }

        p {
            margin-top: 20px;
            text-indent: 20px;
        }

        ul {
            margin-left: 30px;
        }
    `;

    render() {
        return html`
            <h1>About Us</h1>
            <h2>Johannes Lumbantoruan</h2>
            <h3>Back-End Developer</h3>
            <p>Story App merupakan aplikasi yang dapat membagikan momen-momen berhargamu 
            dengan orang lain. Aplikasi ini dikembangkan sebagai salah satu syarat untuk 
            lulus kelas Dicoding, "Belajar Tools Front-End Web Intermediate.</p>
            <p>Ada beberapa teknologi yang digunakan untuk pengembangan web ini. Di antara lain adalah:</p>
            <ul>
                <li>HTML, CSS, JavaScript</li>
                <li>Webpack</li>
                <li>SASS</li>
                <li>Lit</li>
            </ul>
        `;
    }
}

customElements.define('about-us', AboutUs);