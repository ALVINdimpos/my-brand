const renderBlogs = async () => {
  const response = await fetch("http://localhost:3000/Blogs");
  const Blogs = await response.json();
  const BlogsContainer = document.querySelector("#Blogs");
  let template = "";
  Blogs.forEach((blogs) => {
    template += `
      <tr>  
        <td>${blogs.title.slice(0, 10)}</td>
        <td>${blogs.body.slice(0, 10)}</td>
        <td>${blogs.date}</td>
        <td>
            <i class="fa fa-eye" aria-hidden="true"> </i>
            <i class="fa fa-pencil" aria-hidden="true"></i>
            <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteBlog(${blogs.id})"></i>
        </td>
      </tr>
    `;
  });
  BlogsContainer.innerHTML = template;
};

// delete blog
const deleteBlog = async (id) => {
    const response = await fetch(`http://localhost:3000/Blogs/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    renderBlogs();
};
// post blog by using form after reload and clear form and give feed back if successfull added
const postBlog = async () => {
  const author = document.querySelector("#Author").value;
  const title = document.querySelector("#Title").value;
  const body = document.querySelector("#Body").value;
  const date = document.querySelector("#Date").value;
  const image = document.querySelector("#URL").value;
  const response = await fetch("http://localhost:3000/Blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author,
      title,
      body,
      date,
      image
    }),
  });
  document.querySelector("#Author").value = "";
  document.querySelector("#Title").value = "";
  document.querySelector("#Body").value = "";
  document.querySelector("#Date").value = "";
  document.querySelector("#URL").value = "";
  alert("Your blog has been added successfully")
  renderBlogs();
};

// open blog form
function toggleForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", () => renderBlogs());
