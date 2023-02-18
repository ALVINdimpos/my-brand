const postComment = async () => {
    const comment = document.querySelector("#comment").value;
    const response = await fetch(`http://localhost:3000/Blogs/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
        }),
    });
    document.querySelector("#comment").value = "";
    alert("Your comment has been added successfully")
}