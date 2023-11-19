import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormData, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormData(evt) {
  const name = evt.target.name;
  const value = evt.target.value;

  formData[name] = value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    const { email, message } = savedFormData;
    emailEl.value = email;
    messageEl.value = message;
  }
}
