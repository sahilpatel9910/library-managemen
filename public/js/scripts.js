document.getElementById('registrationForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, role: 'user' })
  });
  const data = await response.json();
  if (response.ok) {
    alert('User registered successfully');
    window.location.href = 'login.html';
  } else {
    alert('User registration failed: ' + data.error);
  }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (response.ok) {
    alert('User logged in successfully');
    // Save token in localStorage and redirect to user page
    localStorage.setItem('token', data.token);
    window.location.href = 'user.html';
  } else {
    alert('User login failed: ' + data.error);
  }
});

document.getElementById('resetForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  // Implement reset password logic here
  alert('Password reset link sent to ' + email);
});
