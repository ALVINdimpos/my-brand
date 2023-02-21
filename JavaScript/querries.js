const postQuerry = async () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const budget = document.querySelector("#budget").value;
  const message = document.querySelector("#message").value;
  const response = await fetch("https://weary-teal-shoe.cyclic.app/querries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      budget,
      message,
    }),
  });
  document.querySelector("#name").value="";
  document.querySelector("#email").value="";
  document.querySelector("#subject").value="";
  document.querySelector("#budget").value="";
  document.querySelector("#message").value="";
  alert("Your querry has been sent successfully thank you!");
};
const renderQuerries = async () => {
    const response = await fetch("https://weary-teal-shoe.cyclic.app/querries");
    const querries = await response.json();
    const querriesContainer = document.querySelector("#querry");
    let template = "";
    querries.forEach((querry) => {
      template += `
      <tr>
      <td>${querry.name}</td>
      <td>${querry.email}</td>
      <td>${querry.subject}</td>
      <td>${querry.budget}</td>
      <td>${querry.message}</td>
      <td>
          <i class="fa fa-eye" aria-hidden="true"> </i>
          <i class="fa fa-trash-o" aria-hidden="true" onclick="deletequerry(${querry.id})"></i>
      </td>
     </tr>
        `;
    });
    querriesContainer.innerHTML = template;
  };
  const deletequerry = async (id) => {
    const response = await fetch(`https://weary-teal-shoe.cyclic.app/querries/${id}`, {
      method: "DELETE",
    });
  };
  window.addEventListener("DOMContentLoaded", () => renderQuerries());