const CheckUserAuth = {
    isUserSignedIn() {
        return Boolean(localStorage.token);
    },

    async checkLoginState() {
        const isUserSignedIn = this.isUserSignedIn();
        const guest = document.querySelector('#guest');
        const loggedIn = document.querySelectorAll('.loggedIn');
        let name;

        if (isUserSignedIn) {
            name = localStorage.name;

            if (loggedIn) {
                for (const el of loggedIn) {
                    if (!el.textContent) el.innerText = name;
                    el.style.display = 'block';
                }
            }

            if (guest) {
                guest.style.display = 'none';
            }

            if(this.isOnAuthPage()) {
                location.href = `${location.origin}/`;
            }
        } else {
            if (!this.isOnAuthPage()) {
                this.goToLoginPage();
            }
        }
    },

    isOnAuthPage() {
        const { origin, href } = location;

        const authPage = [
            new RegExp(`^${origin}/auth/login.html$`),
            new RegExp(`^${origin}/auth/register.html$`)
        ];

        for (const pattern of authPage) {
            if (pattern.test(href)) return true;
        }

        return false;
    },

    goToLoginPage() {
        location.href = `${location.origin}/auth/login.html`;
    }
};

export default CheckUserAuth;