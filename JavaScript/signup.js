const form = document.querySelector("form");
const loader = document.querySelector("#loader");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  loader.innerText = "Loading ...";

  const email = form.querySelector("#email").value;
  const password = form.querySelector("#password").value;
  const confirmpassword = form.querySelector("#confirm-password").value;

  // Check if the password and confirm password fields match
  if (password !== confirmpassword) {
    Toastify({
      text: "Passwords do not match",
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
      position: "center",
    }).showToast();
    return;
  }

  // Send a POST request to the API endpoint
  try {
    const response = await fetch(
      "https://long-ruby-bunny-yoke.cyclic.app/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmpassword }),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Display success message to user and redirect to login page
    form.reset();
    Toastify({
      text: "Account created successfully! Please login with your credentials.",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      position: "center",
    }).showToast();
    window.location.href = "../pages/Login.html";
  } catch (error) {
    Toastify({
      text: `An error occurred: ${error.message}`,
      backgroundColor: "linear-gradient(to right, #f85032, #e73827)",
      position: "center",
    }).showToast();
  } finally {
    loader.innerText = "Sign up";
  }
});
