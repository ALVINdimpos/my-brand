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
  const response = await fetch(
    `https://weary-teal-shoe.cyclic.app/querries/${id}`,
    {
      method: "DELETE",
    }
  );
  renderQuerries();
};
window.addEventListener("DOMContentLoaded", () => renderQuerries());
