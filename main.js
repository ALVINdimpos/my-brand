const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const budgetInput = document.getElementById('budget');
const messageInput = document.getElementById('message');

const errorMessages = {
	name: 'Please enter your name',
	email: 'Please enter a valid email address',
	subject: 'Please enter a subject',
	budget: 'Please enter a valid budget',
	message: 'Please enter a message',
};

const showError = (input, message) => {
	const formGroup = input.parentElement;
	const error = formGroup.querySelector('.invalid-feedback');
	error.textContent = message;
	error.style.display = 'block';
};

const hideError = (input) => {
	const formGroup = input.parentElement;
	const error = formGroup.querySelector('.invalid-feedback');
	error.textContent = '';
	error.style.display = 'none';
};

const isValidName = (name) => {
	return /^[a-zA-Z ]+$/.test(name);
};

const isValidEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidBudget = (budget) => {
	return !isNaN(budget) && budget >= 0;
};

contactForm.addEventListener('submit', (event) => {
	event.preventDefault();

	var  isFormValid = true;

	if (!isValidName(nameInput.value)) {
		showError(nameInput, errorMessages.name);
		isFormValid = false;
	} else {
		hideError(nameInput);
	}

	if (!isValidEmail(emailInput.value)) {
		showError(emailInput, errorMessages.email);
		isFormValid = false;
	} else {
		hideError(emailInput);
	}

	if (subjectInput.value === '') {
		showError(subjectInput, errorMessages.subject);
		isFormValid = false;
	} else {
		hideError(subjectInput);
	}

	if (!isValidBudget(budgetInput.value)) {
		showError(budgetInput, errorMessages.budget);
		isFormValid = false;
	} else {
		hideError(budgetInput);
	}

	if (messageInput.value === '') {
		showError(messageInput, errorMessages.message);
		isFormValid = false;
	} else {
		hideError(messageInput);
	}

	if (isFormValid) {
		alert(
			`Thank you for contacting us, ${nameInput.value}! We will get back to you shortly.`
		)
		contactForm.submit();

	}
});

