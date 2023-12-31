import { html, css } from 'lit';

import LitWithoutShadowDom from './LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
    static styles = css`
        :host {
            display: block;
        }
    `;
    
    render() {
        return html`
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/index.html">Story App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item loggedIn"></li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/stories/add.html">Add Story</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/about.html">About</a>
                            </li>
                            <div id="guest">
                                <li class="nav-item">
                                    <a class="nav-link" href="/auth/login.html">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/auth/register.html">Register</a>
                                </li>
                            </div>
                            <div class="nav-item loggedIn">
                                <a href="" class="nav-link" @click=${this.logout}>Logout</a>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        `;
    }

    logout() {
        localStorage.removeItem('token');
    }
}

customElements.define('nav-app', NavApp);