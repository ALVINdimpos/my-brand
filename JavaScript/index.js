
const renderBlogs =async()=>{
  const response = await fetch(' https://weary-teal-shoe.cyclic.app/Blogs?_sort=date&_order=desc&_limit=3');
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
      <p>${post.body.slice(0,100)}</p>
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
  const subject = document.querySelector("#subject").value;
  const budget = document.querySelector("#budget").value;
  const message = document.querySelector("#message").value;
  const response = await fetch("https://weary-teal-shoe.cyclic.app/querries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      budget,
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