const id = new URLSearchParams(window.location.search).get("id");
const blogTitle = document.querySelector("#blogContainer");

const renderBlog = async () => {
  const res = await fetch(`http://localhost:3000/blogs/${id}`);
  const blog = await res.json();
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
					<button type="submit" onclick="postComment()">Post</button>
				</form>
				<article>
				<ul class="comments">
				  <li class="comment">
					<div class="comment-header">
					<img src="../Images/mine.png" alt="User Avatar">
					  <div class="comment-meta">
						<h3 class="comment-author">Username</h3>
						<time class="comment-time">Timestamp</time>
					  </div>
					  <div class="comment-actions">
						<button class="like-button">Like</button>
						<button class="reply-button">Reply</button>
					  </div>
					</div>
					<p class="comment-text">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
					<ul class="replies">
					  <li class="reply">
						<div class="comment-header">
						  <img src="../Images/mine.png" alt="User Avatar">
						  <div class="comment-meta">
							<h3 class="comment-author">Username</h3>
							<time class="comment-time">Timestamp</time>
						  </div>
						  <div class="comment-actions">
							<button class="like-button">Like</button>
							<button class="reply-button">Reply</button>
						  </div>
						</div>
						<p class="comment-text">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
					  </li>
					</ul>
				  </li>
				</ul>
			  </article>
				
				</div>
			</div>
		</article>
	</main>
    `;
  blogTitle.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => {
  renderBlog();
});
