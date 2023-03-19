const URL = "https://long-ruby-bunny-yoke.cyclic.app/api";
const id = new URLSearchParams(window.location.search).get("id");
const blogTitle = document.querySelector("#blogContainer");
// current date
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const currentDate = `${day}/${month}/${year}`;

const renderBlog = async () => {
  const res = await fetch(`${URL}/blog/${id}`);
  const blog = await res.json();
  // Fetch comments for the corresponding blog post ID
  const commentsRes = await fetch(`${URL}/blog/${id}/comments`);
  const comments = await commentsRes.json();
  let template = "";
  template += `
		  <header>
		  <h1>My Blog</h1>
		  <p>By ${blog.author} | ${blog.createdAt}</p>
	  </header>
	  <main>
		  <article>
			  <h2>${blog.title}</h2>
			  <img src="${blog.image}" alt="Blog Image">
			  <p>${blog.content.replace(/\n/g, "<br>")}</p>

			  <div class="like">
				  <button id="like-btn">Like</button>
				  <p id="like-count">${blog.likes} likes</p>
			  </div>
			  <div class="comment">
				  <h3>Comments</h3>
				  <form>
					  <label for="comment">Comment:</label>
					  <textarea id="comment" name="comment" required></textarea>
					  <button type="button" onclick="postComment('${blog._id}')">Post</button>
				  </form>
				  <article>
				  <ul class="comments">
					${comments
            .map(
              (comment) => `
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
						<p class="comment-text">${comment.commentBody}</p>
					  </li>
					`
            )
            .join("")}
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
const postComment = async (id) => {
  const commentInput = document.querySelector("#comment");
  const commentBody = commentInput.value.trim();
  const response = await fetch(`${URL}/blog/create/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({commentBody: commentBody}),
  });
  if (response.ok) {
    alert("Comment posted!");
   renderBlog();
  } else {
    alert("Failed to post comment");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  renderBlog();
});
 