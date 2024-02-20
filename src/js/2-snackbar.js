import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = formData.get('delay');
    const state = formData.get('state');
    form.reset();
    try {
      await new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
          setTimeout(() => {
            resolve(delay);
          }, delay);
        } else {
          setTimeout(() => {
            reject(delay);
          }, delay);
        }
      });

      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  });
});
