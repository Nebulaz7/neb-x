/* ssign up page code begins */

function signUp() {
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const reEnterPassword = document.getElementById('re-password').value;

  if (!email || !username || !password || !reEnterPassword) {
    document.querySelector(".errortext").innerHTML = "All fields are required.";
    document.querySelector(".errortext").style.color = "red";
    return;
  }

  if (password !== reEnterPassword) {
    document.querySelector(".errortext").innerHTML = "Passwords do not match.";
    document.querySelector(".errortext").style.color = "red";
    return;
  }

  const userData = {
    email: email,
    username: username,
    password: password
  };

  // Convert the user data to JSON and save it in localStorage
  localStorage.setItem('user', JSON.stringify(userData));
  alert('Sign-up successful! You can now log in.');
  window.location.href = 'login.html'; // Redirect to login page
}

/*sign up page code ends*/

/* login page code begins */

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Retrieve the stored user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert('Login successful! Redirecting to your dashboard.');
    window.location.href = 'Wallet.html'; // Redirect to the wallet dashboard
  } else {
    alert('Incorrect username or password.');
  }
}
/* login code ends*/


 
