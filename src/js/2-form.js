const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
const storageData = JSON.parse(localStorage.getItem(storageKey)) || {};
form.elements.email.value = storageData.email || '';
form.elements.message.value = storageData.message || '';
form.addEventListener('input', evt => {
  const formData = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
});
form.addEventListener('submit', evt => {
  const formData = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
  console.log(formData.email);
  console.log(formData.message);
  form.reset();
  localStorage.removeItem(storageKey);
});
