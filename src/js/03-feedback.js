import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormDataWriteToLS, 500));

const FORM_KEY = 'feedback-form-state';

function onGetFormData() {
  const formData = {};
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  return formData;
}

function onFormDataWriteToLS() {
  localStorage.setItem(FORM_KEY, JSON.stringify(onGetFormData()));
}

populateForm();

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(FORM_KEY));

  if (savedFormData) {
    const { email, message } = savedFormData;
    emailEl.value = email;
    messageEl.value = message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!emailEl.value || !messageEl.value) {
    return;
  }

  console.log(onGetFormData());
  form.reset();
  localStorage.removeItem(FORM_KEY);
}
