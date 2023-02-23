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
					  <button type="submit" onclick="event.preventDefault(); postComment(${blog.id}, event)">Post</button>
				  </form>
				  <article>
				  <ul class="comments">
					${comments.map(comment => `
					  <li class="comment">
						<div class="comment-header">
						  <img src="../Images/mine.png" alt="User Avatar">
						  <div class="comment-meta">
							<h3 class="comment-author">${comment.name}</h3>
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
	event.preventDefault(); // prevent default form submission behavior
  
	const commentInput = document.querySelector("#comment");
	const comment = commentInput.value.trim(); // get the value of the comment input and trim any whitespace
  
	if (comment !== "") { // make sure the comment is not empty
	  const res = await fetch(`https://weary-teal-shoe.cyclic.app/comments/${id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ comment }),
	  });
     document.querySelector("#comment").value = "";
	 alert("Your querry has been added successfully")
  };
};

  
window.addEventListener("DOMContentLoaded", () => {
  renderBlog();
});
