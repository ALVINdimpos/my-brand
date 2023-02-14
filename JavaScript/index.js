function toggleForm(){
    var x = document.getElementById("myForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function scrollToContactMe() {
    const contactMeSection = document.querySelector('#contact-me');
    contactMeSection.scrollIntoView({ behavior: 'smooth' });
  }

  // frorm validatin
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    // Prevent the form from submitting
    event.preventDefault();
  
    // Validate the form inputs
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;
    if (!email) {
      alert('Please enter your email');
      return;
    }
  
    if (!isValidEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
  
    if (!password) {
      alert('Please enter a password');
      return;
    }
  
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Submit the form
    form.submit();
  });
  
  function isValidEmail(email) {
    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
