import axios from '../../network/axios';

const Register = {
    async init() {
        this.attachListener();
    },

    getFormData() {
        const name = document.querySelector('floating-input[label=Name]').value;
        const email = document.querySelector('floating-input[label=Email]').value;
        const password = document.querySelector('floating-input[label=Password]').value;

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
        const password = document.querySelector('floating-input[label=Password]');
        const email = document.querySelector('floating-input[label=Email]');

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!e.target.checkValidity()) {
                if (nameInput.validity.patternMismatch) {
                    name.setAttribute('invalidFeedbackMsg', 'Name can only consists of letters and space.');
                }
    
                if (nameInput.validity.valueMissing) {
                    name.setAttribute('invalidFeedbackMsg', 'Name required');
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

                console.log(data);

                this.goToLoginPage();
            } catch (error) {
                console.error(error);
            }
        });
    },

    async sendRequest(data) {        
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