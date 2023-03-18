// Define the API endpoint URL
const API_URL = "https://long-ruby-bunny-yoke.cyclic.app/api";

// Define the login form element and loader element
const loginForm = document.querySelector("#login-form");
const loader = document.querySelector("#loader");

// Add a submit event listener to the form
loginForm.addEventListener("submit", handleLogin);

// Define the handleLogin function
async function handleLogin(event) {
  event.preventDefault();

  // Get the email and password values from the form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Hash the password on the client-side using SHA256

  // Display a loading message to the user
  loader.innerText = "Loading ...";

  try {
    // Send a POST request to the API endpoint with the email and hashed password
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("An error occurred during login");
    }

    // Get the access token from the response
    const { accessToken } = await response.json();

    // Store the access token in local storage
    localStorage.setItem("accessToken", accessToken);

    // Add the Authorization header to the API calls using the access token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    // redirect user to dashboard
    window.location.href = "../dashboard/landingPage.html";
  } catch (error) {
    // Display an error message to the user and reset the form and loader
    console.error(error);
    Toastify({
      text: error.message,
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "right",
      backgroundColor: "red",
      stopOnFocus: true,
    }).showToast();
    loginForm.reset();
    loader.innerText = "Sign in";
  }
}
