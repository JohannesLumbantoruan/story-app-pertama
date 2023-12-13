import axios from '../../network/axios';

const Login = {
    async init() {
        this.attachListener();
    },

    attachListener() {
        const loginForm = document.querySelector('form#loginForm');
        const email = document.querySelector('floating-input[label=Email]');
        const password = document.querySelector('floating-input[label=Password]');
        const emailInput = document.querySelector('input#emailFloatingInput');
        const passwordInput = document.querySelector('input#passwordFloatingInput');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();


            if (!e.target.checkValidity()) {
                if (passwordInput.validity.tooShort) {
                    password.setAttribute('invalidFeedbackMsg', 'Password too short, minimal 8 characters.');
                }

                if (passwordInput.validity.valueMissing) {
                    password.setAttribute('invalidFeedbackMsg', 'Password required');
                }
                
                if (emailInput.validity.typeMismatch) {
                    email.setAttribute('invalidFeedbackMsg', 'Please input a valid email');
                }
    
                loginForm.classList.add('was-validated');
                return;
            }

            const formData = this.getFormData();

            try {
                const data = await this.sendRequest(formData);

                for (const key of Object.keys(data.loginResult)) {
                    localStorage[key] = data.loginResult[key];
                }

                this.goToDashboardPage();
            } catch (error) {
                const alert = document.querySelector('.alert');
                const alertMsg = document.querySelector('.alert > p.message');
                const alerts = document.querySelectorAll('.alert, .alert *');
                const spinner = document.querySelector('.position-absolute');
                const blur = document.querySelector('.row');
                const { message } = error.response.data;

                spinner.style.visibility = 'hidden';
                blur.style.filter = 'none';

                alertMsg.innerText = message;

                alerts.forEach((el) => el.style.display = 'block');

                console.error(message);
            }
        });
    },

    getFormData() {
        const email = document.querySelector('floating-input[label=Email]').value;
        const password = document.querySelector('floating-input[label=Password]').value;

        return { email, password };
    },

    async sendRequest(data) {
        const spinner = document.querySelector('.position-absolute');
        const blur = document.querySelector('.row');
        spinner.style.visibility = 'visible';
        blur.style.filter = 'blur(1px)';

        const response = await axios.post('/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    },

    goToDashboardPage() {
        location.href = location.origin + '/';
    }
};

export default Login;