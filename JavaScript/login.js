// Define the API endpoint URL
const API_URL = "https://long-ruby-bunny-yoke.cyclic.app/api";

// Define the login form element and loader element
const loginForm = document.querySelector("#login-form");
const loader = document.querySelector("#loader");

// Add a submit event listener to the form
loginForm.addEventListener("submit", handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  // Get the email and password values from the form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Display a loading message to the user
  loader.innerText = "Loading ...";

  try {
    // Send a POST request to the API endpoint with the email and password
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

    // Get the token from the response
    const { token } = await response.json();

    // Store the token in local storage
    localStorage.setItem("token", token);

    // Add the Authorization header to the API calls using the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Redirect the user to the dashboard page
    window.location.href = "../dashboard/landingPage.html";
  } catch (error) {
    // Display an error message to the user and reset the form and loader
    console.error(error);
    alert(error.message);
    loginForm.reset();
    loader.innerText = "Sign in";
  }
}
