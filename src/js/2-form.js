const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

//
try {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Використовуй їх для заповнення форми та об'єкта formData
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
} catch (error) {
  console.error('Error parsing local storage data:', error);
}

// Використовуй метод делегування для відстеження змін у формі через подію input
form.addEventListener('input', event => {
  // Зберігай актуальні дані з полів email та message у formData
  if (event.target.name === 'email' || event.target.name === 'message') {
    formData[event.target.name] = event.target.value;
    // та записуй цей об’єкт у локальне сховище
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  // Перед відправленням форми переконайся, що обидва поля форми заповнені
  // Якщо будь-яке з полів (властивостей об’єкта formData) порожнє
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    // показуй сповіщення
    alert('Fill please all fields');
    return;
  }

  // Якщо всі поля заповнені, виведи у консоль об’єкт formData
  console.log(formData);

  // очисти локальне сховище, об’єкт formData і поля форми
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});