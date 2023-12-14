import axios from '../../network/axios';

const Register = {
    async init() {
        this.attachListener();
    },

    getFormData() {
        const name = document.querySelector('floating-input[label=Name]').value;
        const email = document.querySelector('floating-input[label=Email]').value;
        const password = document.querySelector('floating-input-group[label=Password]').value;

        return {
            name, email, password
        }
    },

    attachListener() {
        const registerForm = document.querySelector('form#registerForm');
        const nameInput = document.querySelector('input#nameFloatingInput');
        const passwordInput = document.querySelector('input#passwordFloatingInput');
        const emailInput = document.querySelector('input#emailFloatingInput');
        const name = document.querySelector('floating-input[label=Name]');
        const password = document.querySelector('floating-input-group[label=Password]');
        const email = document.querySelector('floating-input[label=Email]');

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!e.target.checkValidity()) {
                if (nameInput.validity.patternMismatch) {
                    name.setAttribute('invalidFeedbackMsg', 'Name can only consists of letters and space.');
                }
    
                if (nameInput.validity.valueMissing) {
                    name.setAttribute('invalidFeedbackMsg', 'Name required');
                    document.querySelector('.input-group .invalid-feedback').style.display = 'block';
                }
    
                if (passwordInput.validity.tooShort) {
                    password.setAttribute('invalidFeedbackMsg', 'Password too short, minimal 8 characters.');
                }

                if (passwordInput.validity.valueMissing) {
                    password.setAttribute('invalidFeedbackMsg', 'Password required');
                }
                
                if (emailInput.validity.typeMismatch) {
                    email.setAttribute('invalidFeedbackMsg', 'Please input a valid email');
                }
    
                registerForm.classList.add('was-validated');
                return;
            }

            const formData = this.getFormData();

            try {
                const data = await this.sendRequest(formData);

                this.goToLoginPage();
            } catch (error) {
                const { message } = error.response.data;

                const alerts = document.querySelectorAll('.alert, .alert *');
                const alertMsg = document.querySelector('.alert p.message');
                const spinner = document.querySelector('.position-absolute');
                const blur = document.querySelector('.row');

                spinner.style.visibility = 'hidden';
                blur.style.filter = 'none';
                alertMsg.innerText = message;

                alerts.forEach((el) => el.style.display = 'block');
            }
        });

        // alert dismiss listener
        const closeBtn = document.querySelector('.btn-close');
        const alerts = document.querySelectorAll('.alert, .alert *');

        closeBtn.addEventListener('click', () => {
            alerts.forEach((el) => el.style.display = 'none');
        });
    },

    async sendRequest(data) {  
        const spinner = document.querySelector('.position-absolute');
        const blur = document.querySelector('.row');
        spinner.style.visibility = 'visible';
        blur.style.filter = 'blur(1px)';

        const response = await axios.post('/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    },

    goToLoginPage() {
        location.href = location.origin + '/auth/login.html';
    }
};

export default Register;