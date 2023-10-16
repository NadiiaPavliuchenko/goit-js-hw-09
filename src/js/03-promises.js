import Notiflix from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', generatePromises);

function generatePromises(e) {
  e.preventDefault();
  let delay = parseInt(e.currentTarget.elements.delay.value);
  for (let i = 1; i <= e.currentTarget.elements.amount.value; i += 1) {
    Notiflix.Notify.init({});
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${value.position} in ${value.delay}ms`
        );
      })
      .catch(value => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${value.position} in ${value.delay}ms`
        );
      });
    delay += parseInt(e.currentTarget.elements.step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
