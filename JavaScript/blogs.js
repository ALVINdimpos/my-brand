// Get the modal
const togglePostForm = () => {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
const toggleEditForm = () => {
  var x = document.getElementById("edit-form-container");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
const URL = "https://long-ruby-bunny-yoke.cyclic.app/api";
// post blog by using form after reload and clear form and give feed back if successfull added
const postBlog = async () => {
  togglePostForm();
  const postBlogForm = document.getElementById("myForm");
  const title = postBlogForm.elements.Title.value;
  const author = postBlogForm.elements.Author.value;
  const content = postBlogForm.elements.Body.value;
  const image = postBlogForm.elements.URLim.value;

  try {
    const response = await fetch(`${URL}/blog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        title,
        content,
        image,
      }),
    });

    if (response.ok) {
      postBlogForm.reset();
      Toastify({
        text: "Your blog has been added successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
        stopOnFocus: true,
      }).showToast();
      renderBlogs();
    } else {
      const error = await response.json();
      Toastify({
        text: `Failed to add blog: ${error.message}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
        stopOnFocus: true,
      }).showToast();
    }
  } catch (error) {
    console.error(error);
    Toastify({
      text: "Failed to add blog. Please try again later.",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
      stopOnFocus: true,
    }).showToast();
  }
};

// render blogs
const renderBlogs = async (searchText) => {
  let url = `${URL}/blogs`;
  if (searchText) {
    url += `?q=${searchText}`;
  }
  const response = await fetch(url);
  const Blogs = await response.json();
  console.log(Blogs);
  const BlogsContainer = document.querySelector("#Blogs");
  let template = "";
  Blogs.forEach((blogs) => {
    template += `
      <tr>  
        <td>${blogs.title.slice(0, 10)}</td>
        <td>${blogs.content.slice(0, 10)}</td>
        <td>${blogs.createdAt}</td>
        <td>
            <i class="fa fa-eye" aria-hidden="true"> </i>
            <i class="fa fa-pencil" aria-hidden="true" onclick="editBlog('${blogs._id.toString()}')"></i>
            <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteBlog('${blogs._id.toString()}')"></i>
        </td>
      </tr>
    `;
  });
  BlogsContainer.innerHTML = template;
};
// search blog
const search = () => {
  const searchForm = document.querySelector(".search");
  const searchText = searchForm.elements.text.value;
  renderBlogs(searchText);
};
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  search();
});

// delete blog
const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${URL}/blog/delete/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      renderBlogs();
      Toastify({
        text: "Blog deleted successfully!",
        backgroundColor: "green",
      }).showToast();
    } else {
      throw new Error("Failed to delete blog.");
    }
  } catch (error) {
    Toastify({
      text: error.message,
      backgroundColor: "red",
    }).showToast();
  }
};

// edit blog
const editBlog = async (id) => {
  toggleEditForm();
  const response = await fetch(`${URL}/blog/${id}`);
  const blog = await response.json();

  const editForm = document.getElementById("edit-form");
  editForm.elements.Title.value = blog.title;
  editForm.elements.Author.value = blog.author;
  editForm.elements.Body.value = blog.content;
  editForm.elements.URLim.value = blog.image;
  editForm.elements.id.value = blog._id; // add this line to set the blog ID
};
// update blog
const updateBlog = async () => {
  const editForm = document.getElementById("edit-form");
  const title = editForm.elements.Title.value;
  const author = editForm.elements.Author.value;
  const content = editForm.elements.Body.value;
  const image = editForm.elements.URLim.value;
  const id = editForm.elements.id.value;

  try {
    const response = await fetch(`${URL}/blog/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        title,
        content,
        image,
      }),
    });

    if (response.ok) {
      editForm.reset();
      renderBlogs();
      toggleEditForm();
      Toastify({
        text: "Your blog has been updated successfully",
        backgroundColor: "green",
        className: "toastify-success",
      }).showToast();
    } else {
      const error = await response.json();
      Toastify({
        text: `Failed to update blog: ${error.message}`,
        backgroundColor: "red",
        className: "toastify-error",
      }).showToast();
    }
  } catch (error) {
    console.error(error);
    Toastify({
      text: "Failed to update blog. Please try again later.",
      backgroundColor: "red",
      className: "toastify-error",
    }).showToast();
  }
};

window.addEventListener("DOMContentLoaded", () => renderBlogs());
