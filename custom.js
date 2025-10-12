document.addEventListener("DOMContentLoaded", () => {

  // ===== THEME TOGGLE SYSTEM =====
  const savedTheme = localStorage.getItem("theme");
  const themeButton = document.getElementById("themeToggle");

  // Select all logos
  const logos = document.querySelectorAll("#themeLogo, #signupLogo, #forgotLogo");

  // Apply saved theme on load
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeButton) themeButton.innerText = isDark ? "Light Mode" : "Dark Mode";

  // Update all logos on load
  logos.forEach(logo => {
    if (logo) logo.src = isDark
      ? "assets/images/logo-dark-theme.svg"
      : "assets/images/logo-light-theme.svg";
  });

  // Theme toggle button
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const darkMode = document.body.classList.toggle("dark");
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      themeButton.innerText = darkMode ? "Light Mode" : "Dark Mode";

      // Update all logos on toggle
      logos.forEach(logo => {
        if (logo) logo.src = darkMode
          ? "assets/images/logo-dark-theme.svg"
          : "assets/images/logo-light-theme.svg";
      });
    });
  }

  // ===== BOOKMARKS PAGE LOGIC =====
  if (window.location.pathname.endsWith("bookmarks.html")) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.replace("index.html");
      return;
    }

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.replace("index.html");
      });
    }

    const heading = document.querySelector("h1");
    if (heading && currentUser) {
      heading.textContent = `Welcome, ${currentUser}!`;
    }
  }

  // ===== SIGNUP LOGIC =====
  const signupButton = document.getElementById("signupButton");
  if (signupButton) {
    signupButton.addEventListener("click", () => {
      const username = document.getElementById("signupUsername").value.trim();
      const password = document.getElementById("signupPassword").value;
      const signupMessage = document.getElementById("signupMsg");

      if (!username || !password) {
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
  }

  // ===== LOGIN LOGIC =====
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
      const loginMessage = document.getElementById("loginMsg");

      if (!username || !password) {
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
  }

  // ===== FORM TOGGLE LOGIC =====
  const toggleLogin = document.getElementById("toggleLogin");
  if (toggleLogin) {
    toggleLogin.addEventListener("click", () => {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("signupForm").style.display = "block";
    });
  }

  const toggleSignup = document.getElementById("toggleSignup");
  if (toggleSignup) {
    toggleSignup.addEventListener("click", () => {
      document.getElementById("signupForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    });
  }

  const forgotLink = document.getElementById("forgotLink");
  if (forgotLink) {
    forgotLink.addEventListener("click", () => {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("forgotForm").style.display = "block";
    });
  }

  const toggleForgotLogin = document.getElementById("toggleForgotLogin");
  if (toggleForgotLogin) {
    toggleForgotLogin.addEventListener("click", () => {
      document.getElementById("forgotForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
    });
  }

});
