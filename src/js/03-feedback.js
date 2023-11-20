import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormData, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

populateForm();

function onFormSubmit(evt) {
  evt.preventDefault();
  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
}

function onFormData() {
  formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    emailEl.value = savedFormData.email;
    messageEl.value = savedFormData.message;
  }
}
