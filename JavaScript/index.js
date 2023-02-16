function toggleForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function scrollToContactMe() {
  const contactMeSection = document.querySelector("#contact-me");
  contactMeSection.scrollIntoView({ behavior: "smooth" });
}

// frorm validatin
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Validate the form inputs
  const emailInput = document.querySelector("#email");
  const email = emailInput.value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;
  if (!email) {
    emailInput.setCustomValidity("Please enter your email");
    emailInput.style.borderColor = "red";
    emailInput.reportValidity();
    return;
  }

  if (!isValidEmail(email)) {
    emailInput.setCustomValidity("Please enter a valid email");
    emailInput.style.borderColor = "red";
    emailInput.reportValidity();
    return;
  }

  if (!password) {
    alert("Please enter a password");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Submit the form
  form.submit();
});

function isValidEmail(email) {
  // Regular expression to match email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const renderBlogs =async()=>{
  const response = await fetch(' http://localhost:3000/Blogs?_sort=date&_order=desc&_limit=3');
  const Blogs = await response.json();
  const BlogsContainer = document.querySelector('#blog_card');
  let template = '';
  Blogs.forEach(post => {
    template += `
    <div class="blog_card--item">
    <a href="./Pages/ViewBlog.html?id=${post.id}">
      <img src="${post.image}" alt="">
     </a>
    <div class="blog_card--item--text">
      <h1>${post.title}</h1>
      <p>By <span>${post.author}</span> / <span> ${post.date}</span></p>
      <p>${post.body}</p>
    </div>
  </div>
  `
  }
  );
  BlogsContainer.innerHTML = template;
}
 
window.addEventListener('DOMContentLoaded', ()=>renderBlogs());