const URL = "https://long-ruby-bunny-yoke.cyclic.app/api";

const renderBlogs = async () => {
  const response = await fetch(`${URL}/blogs?sort=createdAt:desc`);
  const Blogs = await response.json();
  const BlogsContainer = document.querySelector("#blog_card");
  let template = "";
  Blogs.slice(0, 3).forEach((post) => {
    template += `
      <div class="blog_card--item">
        <a href="./Pages/ViewBlog.html?id=${post._id}">
          <img src="${post.image}" alt="">
        </a>
        <div class="blog_card--item--text">
          <h1>${post.title}</h1>
          <p>By <span>${post.author}</span> / <span> ${
      post.createdAt
    }</span></p>
          <p>${post.content.slice(0, 100)}</p>
        </div>
      </div>
    `;
  });
  BlogsContainer.innerHTML = template;
};

// post querry
const postQuerry = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  try {
    const response = await fetch(`${URL}/querry/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("An error occurred while submitting your query");
    }

    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#subject").value = "";
    document.querySelector("#budget").value = "";
    document.querySelector("#message").value = "";

    // Display a success message using toastify
    Toastify({
      text: "Your query has been submitted successfully",
      backgroundColor: "green",
      className: "toastify-success",
    }).showToast();
  } catch (error) {
    // Display an error message using toastify
    Toastify({
      text: error.message,
      backgroundColor: "red",
      className: "toastify-error",
    }).showToast();
  }
};

window.addEventListener("DOMContentLoaded", () => renderBlogs());
