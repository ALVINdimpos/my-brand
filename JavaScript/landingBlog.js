const renderBlogs =async()=>{
    const response = await fetch(' http://localhost:3000/Blogs?limit=1');
    const Blogs = await response.json();
    const BlogsContainer = document.querySelector('#recentBlogs');
    let template = '';
    Blogs.forEach(blogs => {
      template += `
      <tr>  
        <td>${blogs.title.slice(0,10)}</td>
        <td>${blogs.body.slice(0,10)}</td>
        <td>${blogs.date}</td>
        <td><a href="#" class="btn">View</a></td>
      </tr>
    `
    }
    );
    BlogsContainer.innerHTML = template;
  }
   
  window.addEventListener('DOMContentLoaded', ()=>renderBlogs());