document.addEventListener("DOMContentLoaded", () => {

  // ===== theme toggle part starts =====
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
  // ===== theme toggle part ends =====

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
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userData = users[currentUser]; // currentUser stores email
    if (userData && userData.fullName) {
    heading.textContent = `Welcome, ${userData.fullName}`;
    } else {
    heading.textContent = `Welcome, ${currentUser}`; // fallback to email
  }
}

  }

// ===== SIGNUP LOGIC =====
const signupButton = document.getElementById("signupButton");
if (signupButton) {
  signupButton.addEventListener("click", () => {
    const fullName = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupUserEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const signupMessage = document.getElementById("signupMsg");

    // Simple email validation (must be a valid format and end with @gmail.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!fullName || !email || !password) {
      signupMessage.textContent = "All fields are required.";
      signupMessage.style.color = "red";
      return;
    }

    if (!emailRegex.test(email)) {
      signupMessage.textContent = "Please enter a valid Gmail address (example@gmail.com).";
      signupMessage.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      signupMessage.textContent = "This email is already registered. Try logging in.";
      signupMessage.style.color = "red";
      return;
    }

    users[email] = { fullName, password, bookmarks: [] };
    localStorage.setItem("users", JSON.stringify(users));

    signupMessage.textContent = "Signup successful! You can now log in.";
    signupMessage.style.color = "green";

    // Clear form
    document.getElementById("signupUsername").value = "";
    document.getElementById("signupUserEmail").value = "";
    document.getElementById("signupPassword").value = "";
  });
}


// ===== LOGIN LOGIC (by email) =====
const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", () => {
    const email = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMsg");

    // create message element if missing
    let msg = loginMessage;
    if (!msg) {
      msg = document.createElement("p");
      msg.id = "loginMsg";
      loginButton.insertAdjacentElement("afterend", msg);
    }

    msg.textContent = "";

    if (!email || !password) {
      msg.textContent = "Please enter both email and password.";
      msg.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[email];

    if (!user) {
      msg.textContent = "User not found. Please signup first.";
      msg.style.color = "red";
      return;
    }

    if (user.password !== password) {
      msg.textContent = "Incorrect password. Try again.";
      msg.style.color = "red";
      return;
    }

    // store the logged in user
    localStorage.setItem("currentUser", email);
    window.location.href = "bookmarks.html"; // redirect
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
