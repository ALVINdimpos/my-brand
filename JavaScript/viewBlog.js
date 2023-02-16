const id= new URLSearchParams( window.location.search).get('id');
const blogTitle= document.querySelector('#blogContainer');

const renderBlog= async () => {
    const res= await fetch(`http://localhost:3000/blogs/${id}`);
    const blog= await res.json();
    let template= '';
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
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" required>
					<label for="comment">Comment:</label>
					<textarea id="comment" name="comment" required></textarea>
					<button type="submit">Post</button>
				</form>
				<div class="comment-list">
				</div>
			</div>
		</article>
	</main>
    `;
    blogTitle.innerHTML= template;
}

window.addEventListener('DOMContentLoaded', () => {
    renderBlog();
})