const renderBlogs =async()=>{
    const response = await fetch(' http://localhost:3000/Blogs');
    const Blogs = await response.json();
    const BlogsContainer = document.querySelector('#recentBlogs');
    let template = '';
    Blogs.forEach(blogs => {
      template += `
        <td>${blogs.title.slice(0,10)}</td>
        <td>${blogs.body.slice(0,10)}</td>
        <td>${blogs.date}</td>
        <td><a href="#" class="btn">View</a></td>
    `
    }
    );
    BlogsContainer.innerHTML = template;
  }
   
  window.addEventListener('DOMContentLoaded', ()=>renderBlogs());