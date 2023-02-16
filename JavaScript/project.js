function toggleForm() {
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
const renderprojects = async () => {
  const response = await fetch("http://localhost:3000/projects");
  const projects = await response.json();
  const projectContainer = document.querySelector("#project");
  let template = "";
  projects.forEach((project) => {
    template += `
        <tr>  
          <td><img src="${project.image}" alt=""></td>
          <td>${project.name.slice(0, 50)}</td>
          <td>${project.date}</td>
          <td>
              <i class="fa fa-eye" aria-hidden="true"> </i>
              <i class="fa fa-pencil" aria-hidden="true"></i>
              <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteproject(${
                project.id
              })"></i>
          </td>
        </tr>
      `;
  });
  projectContainer.innerHTML = template;
};
// delete project
const deleteproject = async (id) => {
  const response = await fetch(`http://localhost:3000/projects/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};
const postproject = async () => {
  const name = document.querySelector("#Name").value;
  const date = document.querySelector("#Date").value;
  const image = document.querySelector("#URL").value;
  const response = await fetch("http://localhost:3000/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      date,
      image,
    }),
  });
  document.querySelector("#Name").value = "";
  document.querySelector("#Date").value = "";
  document.querySelector("#URL").value = "";
  alert("Your project has been added successfully");
};

window.addEventListener("DOMContentLoaded", () => renderprojects());
