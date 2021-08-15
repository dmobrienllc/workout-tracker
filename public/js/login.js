const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("In the login form handler.")

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  let response;

  try {
    if (email && password) {
      response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      document.location.replace('/dashboard');
    }
  }
  catch (err) {
    console.log(err);
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("In the signup form handler.")

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  let response;

  try {
    if (username && email && password) {
      response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/dashboard');
    }
  }
  catch (err) {
    console.log(err);
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
