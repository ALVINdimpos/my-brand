const id = new URLSearchParams(window.location.search).get("id");
const blogTitle = document.querySelector("#blogContainer");
// current date
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const currentDate = `${day}/${month}/${year}`;

const renderBlog = async () => {
	const res = await fetch(`https://weary-teal-shoe.cyclic.app/Blogs/${id}`);
	const blog = await res.json();
	// Fetch comments for the corresponding blog post ID
	const commentsRes = await fetch(`https://weary-teal-shoe.cyclic.app/comments?blogId=${id}`);
	const comments = await commentsRes.json();
	
	let template = "";
	template += `
		  <header>
		  <h1>My Blog</h1>
		  <p>By ${blog.author} | ${blog.date}</p>
	  </header>
	  <main>
		  <article>
			  <h2>${blog.title}</h2>
			  <img src="${blog.image}" alt="Blog Image">
			  <p>${blog.body}</p>
			  <div class="like">
				  <button id="like-btn">Like</button>
				  <p id="like-count">${blog.likes} likes</p>
			  </div>
			  <div class="comment">
				  <h3>Comments</h3>
				  <form>
					  <label for="comment">Comment:</label>
					  <textarea id="comment" name="comment" required></textarea>
					  <button type="submit" onclick="postComment(${blog.id}, event)">Post</button>
				  </form>
				  <article>
				  <ul class="comments">
					${comments.map(comment => `
					  <li class="comment">
						<div class="comment-header">
						  <img src="../Images/user.png" alt="User Avatar">
						  <div class="comment-meta">
							<h3 class="comment-author">anonymous</h3>
							<time class="comment-time">${currentDate}</time>
						  </div>
						  <div class="comment-actions">
							<button class="like-button">Like</button>
							<button class="reply-button">Reply</button>
						  </div>
						</div>
						<p class="comment-text">${comment.comment}</p>
					  </li>
					`).join('')}
				  </ul>
				</article>
				  
				  </div>
			  </div>
		  </article>
	  </main>
	  `;
	blogTitle.innerHTML = template;
  };
  
// post comment
const postComment = async (id, event) => {
	event.preventDefault();
	
	const commentInput = document.querySelector("#comment");
	const comment = commentInput.value.trim();
	
	if (comment !== "") {
	  const res = await fetch("https://weary-teal-shoe.cyclic.app/comments", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ blogId: id, comment }),
	  });
  
	  // Clear the comment input field
	  commentInput.value = "";
  alert("Your comment has been added successfully")
	  // Refresh the comments section
	}
	renderBlog();
  };
  // Function to handle the like button click event
   const likeBlog = async (blogId) => {
    const res = await fetch(`https://weary-teal-shoe.cyclic.app/Blogs/${blogId}`);
    const blog = await res.json();

    blog.likes++; // increment the likes property of the blog object

    // Update the blog object on the server using a PUT request
    const putRes = await fetch(`https://weary-teal-shoe.cyclic.app/Blogs/${blogId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blog)
    });
	renderBlog();
};
window.addEventListener("DOMContentLoaded", () => {
  renderBlog();
});
