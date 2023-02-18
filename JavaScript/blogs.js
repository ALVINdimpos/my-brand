const toggleForm = ()=>{
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// Get the blog list from the API
async function getBlogList() {
  const response = await fetch("http://localhost:3000/Blogs");
  const data = await response.json();
  return data;
}
// post blog by using form after reload and clear form and give feed back if successfull added
const postBlog = async () => {
  const postBlogForm = document.getElementById("myForm");
  const title=postBlogForm.elements.Title.value ;
  const author=postBlogForm.elements.Author.value ;
  const date=postBlogForm.elements.Date.value ;
  const body=postBlogForm.elements.Body.value ;
  const image=postBlogForm.elements.URLim.value ;
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
  postBlogForm.reset();
  alert("Your blog has been added successfully")
  renderBlogs();
};

const renderBlogs = async () => {
  const Blogs = await getBlogList();
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
            <i class="fa fa-pencil" aria-hidden="true" onclick="editBlog(${blogs.id})"></i>
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
    renderBlogs();
};
// Edit a blog
async function editBlog(id) {
  var x = document.getElementById("edit-form-container");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  // Get the blog from the API
  const response = await fetch(`http://localhost:3000/Blogs/${id}`);
  const blog = await response.json();
  // Update the blog form with the blog data
  const blogForm = document.getElementById("edit-form");
  blogForm.elements.Title.value = blog.title;
  blogForm.elements.Author.value = blog.author;
  blogForm.elements.Date.value = blog.date;
  blogForm.elements.Body.value = blog.body;
  blogForm.elements.URLim.value = blog.image;
  // Change the form action to update the blog
  blogForm.action = `http://localhost:3000/Blogs/${id}`;
}
// Submit the edited blog
const updateBlog = async () => {
  const blogForm = document.getElementById("edit-form");
  const title = blogForm.elements.Title.value;
  const author = blogForm.elements.Author.value;
  const date = blogForm.elements.Date.value;
  const body = blogForm.elements.Body.value;
  const image = blogForm.elements.URLim.value;
  const response = await fetch(`http://localhost:3000/Blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author,
      date,
      body,
      image
    }),
  });
  const data = response.json()
  console.log(data)
  blogForm.reset(); 
  renderBlogs();
};

fetchBlogCount();
window.addEventListener("DOMContentLoaded", () => renderBlogs());




