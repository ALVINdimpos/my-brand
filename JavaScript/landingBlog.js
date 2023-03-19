const URL = "https://long-ruby-bunny-yoke.cyclic.app/api";

const renderBlogs = async () => {
  const response = await fetch(`${URL}/blogs`);
  const Blogs = await response.json();
  const BlogsContainer = document.querySelector("#recentBlogs");
  let template = "";
  Blogs.forEach((blogs) => {
    template += `
      <tr>  
        <td>${blogs.title.slice(0, 10)}</td>
        <td>${blogs.content.slice(0, 10)}</td>
        <td>${blogs.createdAt}</td>
        <td><a href="#" class="btn">View</a></td>
      </tr>
    `;
  });
  BlogsContainer.innerHTML = template;
};
// render project.
const renderProjects = async () => {
  const response = await fetch(" https://weary-teal-shoe.cyclic.app/projects");
  const projects = await response.json();
  const projectsContainer = document.querySelector("#recentProjects");
  let template = "";
  projects.forEach((project) => {
    template += `
      <tr>
              <td><img src="${project.image}" alt=""></td>
              <td>${project.name}</td>
              <td><a href="#" class="btn">View</a></td>
            </tr>
    `;
  });
  projectsContainer.innerHTML = template;
};
const blogCountElement = document.querySelector("#count");

const fetchBlogCount = async () => {
  const response = await fetch("https://weary-teal-shoe.cyclic.app/Blogs");
  const blogs = await response.json();
  blogCountElement.innerHTML = `<span>${blogs.length}</span>`;
};
// the total number of project.
const projectCountElement = document.querySelector("#projectCount");
const fetchProjectCount = async () => {
  const response = await fetch("https://weary-teal-shoe.cyclic.app/projects");
  const projects = await response.json();
  projectCountElement.innerHTML = `<span>${projects.length}</span>`;
};
fetchBlogCount();
fetchProjectCount();
renderBlogs();
renderProjects();
window.addEventListener("DOMContentLoaded", () => renderBlogs());
