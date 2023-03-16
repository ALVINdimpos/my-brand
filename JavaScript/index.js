const URL = "https://long-ruby-bunny-yoke.cyclic.app/api";

const renderBlogs =async()=>{
  const response = await fetch(`${URL}/blogs?_sort=createdAt&_order=desc&_limit=3`);
  const Blogs = await response.json();
  const BlogsContainer = document.querySelector('#blog_card');
  let template = '';
  Blogs.forEach(post => {
    template += `
    <div class="blog_card--item">
    <a href="./Pages/ViewBlog.html?id=${post._id}">
      <img src="${post.image}" alt="">
     </a>
    <div class="blog_card--item--text">
      <h1>${post.title}</h1>
      <p>By <span>${post.author}</span> / <span> ${post.createdAt}</span></p>
      <p>${post.content.slice(0,100)}</p>
    </div>
  </div>
  `
  }
  );
  BlogsContainer.innerHTML = template;
}
// post querry
const postQuerry = async ( event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
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
  document.querySelector("#name").value="";
  document.querySelector("#email").value="";
  document.querySelector("#subject").value="";
  document.querySelector("#budget").value="";
  document.querySelector("#message").value="";
  alert("Your querry has been added successfully")
};

window.addEventListener('DOMContentLoaded', ()=>renderBlogs());