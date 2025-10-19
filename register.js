// ✅ Select elements
const registerForm = document.querySelector('#registerForm');
const userName = document.querySelector('#username');
const password = document.querySelector('#password');

// ✅ When form is submitted
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Check if username exists
  if (localStorage.getItem(userName.value)) {
    alert('❌ This username is already taken, try another one.');
    return;
  }

  // Save username & password
  // Save username & password
  // Save username & password
  // Save username & password
  // Save username & password
  localStorage.setItem(userName.value, password.value);

  alert('✅ User registered successfully!');
  window.location.href = 'login.html'; // Redirect to login page
});
