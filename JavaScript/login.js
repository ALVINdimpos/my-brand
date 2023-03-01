// select the login form
const loginForm = document.querySelector('#login-form');
const loader = document.querySelector('#loader');
// add a submit event listener to the form
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // get the email and password values from the form inputs
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  loader.innerText = 'Loading ...';
  try {
    // fetch the list of users from the API endpoint
    const response = await fetch('https://weary-teal-shoe.cyclic.app/users');
    const users = await response.json();
    // find the user with the matching email and password
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      // if the user is not found, show an error message
      alert('Invalid email or password');
      loginForm.innerHTML = 'Sign in';
      return;
    }

    // if the user is found, store their information in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // redirect the user to the dashboard page
    window.location.href = '../dasboard/landingPage.html';
  } catch (error) {
    console.error(error);
    alert('An error occurred during login');
    window.location.href = './Login.html';
  }
});

