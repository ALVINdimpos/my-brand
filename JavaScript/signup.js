const form = document.querySelector('form');
const loader = document.querySelector("#loader");

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  loader.innerText = "Loading ...";
  
  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password').value;
  const confirmpassword = form.querySelector('#confirm-password').value;

  // Check if the password and confirm password fields match
  if (password !== confirmpassword) {
    alert('Passwords do not match');
    return;
  }

  // Send a POST request to the API endpoint
  try {
    const response = await fetch('https://long-ruby-bunny-yoke.cyclic.app/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password , confirmpassword})
    });

    // Check if the request was successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Display success message to user and redirect to login page
    form.reset();
    alert("Account created successfully! Please login with your credentials.");
    window.location.href = '../pages/login.html';
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
  } finally {
    loader.innerText = "Sign up";
  }
});
