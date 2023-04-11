const emailInput = document.getElementById('form__email');
const loader = document.querySelector("#sub_loader");

const submitHandler= async (event) => {
  event.preventDefault();

  loader.innerText = "Loading ...";
  const email = emailInput.value;
  const endpoint = 'https://long-ruby-bunny-yoke.cyclic.app/api/subscribe';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  console.log('HTTP response:', response);

  const data = await response.json();
  console.log('API response:', data);

  if (response.ok) {
    Toastify({
        text: "Subscription successful",
        backgroundColor: "green",
        className: "toastify-success",
      }).showToast();
  } else {
    Toastify({
        text: "Subscription failed",
        backgroundColor: "red",
        className: "toastify-error",
      }).showToast();
  }
    loader.innerText = "send";
    emailInput.value = "";
};
