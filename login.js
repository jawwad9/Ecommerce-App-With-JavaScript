const loginForm = document.querySelector('#loginForm');
const userName = document.querySelector('#username');
const password = document.querySelector('#password');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const storedUser = localStorage.getItem(userName.value);

  if (storedUser === null) {
    alert('❌ Not a registered username!');
  } else if (storedUser === password.value) {
    alert('✅ Login Successful!');
    window.location.href = "index.html";
  } else {
    alert('⚠️ Invalid Password!');
    alert('⚠️ Invalid Password!');
    alert('⚠️ Invalid Password!');
    alert('⚠️ Invalid Password!');
  }
});
