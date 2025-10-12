
// ------------------------
// Bookmarks page logic
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME TOGGLE SYSTEM =====
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  let themeButton = document.getElementById("themeToggle");

  if (themeButton) {
    if (document.body.classList.contains("dark")) {
      themeButton.innerText = "Light Mode";
    } else {
      themeButton.innerText = "Dark Mode";
    }

    themeButton.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeButton.innerText = "Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        themeButton.innerText = "Dark Mode";
      }
    });
  }
  // Check if we are on bookmarks.html
  if (window.location.pathname.endsWith("bookmarks.html")) {

    // --- Authentication Check ---
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      // Redirect to login page if not logged in
      window.location.replace("index.html");
      return;
    }

    // --- Logout Logic ---
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.replace("index.html");
      });
    }

    // (Optional) --- Personalized Greeting ---
    const heading = document.querySelector("h1");
    if (heading && currentUser) {
      heading.textContent = `Welcome, ${currentUser}!`;
    }
  }
});




// ------------------------
// Signup logic
// ------------------------
const signupButton = document.getElementById("signupButton");
signupButton.addEventListener("click", function() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const signupMessage = document.getElementById("signupMsg");

  if (username === "" || password === "") {
    signupMessage.textContent = "Please enter both username and password.";
    signupMessage.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[username]) {
    signupMessage.textContent = "Username exists. Try login.";
    signupMessage.style.color = "red";
    return;
  }

  users[username] = { password: password, bookmarks: [] };
  localStorage.setItem("users", JSON.stringify(users));

  signupMessage.textContent = "Signup successful! You can now login.";
  signupMessage.style.color = "green";

  document.getElementById("signupUsername").value = "";
  document.getElementById("signupPassword").value = "";
});

// ------------------------
// Login logic
// ------------------------
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const loginMessage = document.getElementById("loginMsg");

  if (username === "" || password === "") {
    loginMessage.textContent = "Please enter both username and password.";
    loginMessage.style.color = "red";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[username]) {
    loginMessage.textContent = "User not found. Please signup first.";
    loginMessage.style.color = "red";
    return;
  }

  if (users[username].password !== password) {
    loginMessage.textContent = "Incorrect password. Try again.";
    loginMessage.style.color = "red";
    return;
  }

  localStorage.setItem("currentUser", username);
  window.location.href = "bookmarks.html";
});

// ------------------------
// Toggle signup/login
// ------------------------
const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", function() {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (loginForm.style.display !== "none") {
    // Switch to signup
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleButton.textContent = "Already have an account? Login";
  } else {
    // Switch to login
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    toggleButton.textContent = "Don't have an account? Sign Up";
  }
});




