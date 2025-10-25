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

    const heading = document.getElementById("userInfo");
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
    const fullNameInput = document.getElementById("signupUsername");
    const emailInput = document.getElementById("signupUserEmail");
    const passwordInput = document.getElementById("signupPassword");

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const nameMsg = document.getElementById("nameMsg");
    const wrongEmailMsg = document.getElementById("wrongEmailMsg");
    const invalidPassMsg = document.getElementById("invalidPassMsg");

    // Reset styles and messages
    [fullNameInput, emailInput, passwordInput].forEach(input => {
      input.classList.remove("error");
      input.classList.add("fine");
    });
    [nameMsg, wrongEmailMsg, invalidPassMsg].forEach(msg => (msg.textContent = ""));

    // Gmail validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let hasError = false;

    // === Required field checks ===
    if (!fullName) {
      nameMsg.textContent = "This field is required";
      nameMsg.style.color = "red";
      fullNameInput.classList.add("error");
      fullNameInput.classList.remove("fine");
      hasError = true;
    }

    if (!email) {
      wrongEmailMsg.textContent = "This field is required";
      wrongEmailMsg.style.color = "red";
      emailInput.classList.add("error");
      emailInput.classList.remove("fine");
      hasError = true;
    }

    if (!password) {
      invalidPassMsg.textContent = "This field is required";
      invalidPassMsg.style.color = "red";
      passwordInput.classList.add("error");
      passwordInput.classList.remove("fine");
      hasError = true;
    }

    if (hasError) return;

    // === Email validation ===
    if (!emailRegex.test(email)) {
      wrongEmailMsg.textContent = "Enter a valid Gmail address.";
      wrongEmailMsg.style.color = "red";
      emailInput.classList.add("error");
      emailInput.classList.remove("fine");
      return;
    }

    // === Password validation ===
    if (password.length < 8) {
      invalidPassMsg.textContent = "Must be at least 8 characters long.";
      invalidPassMsg.style.color = "red";
      passwordInput.classList.add("error");
      passwordInput.classList.remove("fine");
      return;
    }

    // === Load existing users ===
    let users = JSON.parse(localStorage.getItem("users") || "{}");

    // === Check if email already exists ===
    if (users[email]) {
      wrongEmailMsg.textContent = "This email is already registered. Try logging in.";
      wrongEmailMsg.style.color = "red";
      emailInput.classList.add("error");
      return;
    }

    // === Save new user ===
    users[email] = { fullName, password, bookmarks: [] };
    localStorage.setItem("users", JSON.stringify(users));

    // === Success message ===
    invalidPassMsg.textContent = "Signup successful! You can now log in.";
    invalidPassMsg.style.color = "green";

    // === Clear inputs ===
    fullNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  });
}







// ===== LOGIN LOGIC (by email) =====
const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", () => {
    const emailInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const loginMessage = document.getElementById("loginMsg");
    const loginUserMessage = document.getElementById("loginUserMsg");

    // Email validation (must be Gmail format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Clear previous messages and styles
    loginMessage.textContent = "";
    loginUserMessage.textContent = "";
    emailInput.classList.remove("error", "fine");

    // Check if email is empty or invalid format
    if (!emailRegex.test(email)) {
      loginUserMessage.textContent = "Enter valid email address";
      loginUserMessage.style.color = "red";
      emailInput.classList.add("error");
      return;
    }

    // Add "fine" class for valid format
    emailInput.classList.add("fine");

    // Check password field empty or not
    if (!password) {
      loginMessage.textContent = "Please enter both email and password.";
      loginMessage.style.color = "red";
      return;
    }

    // Get users from local storage
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[email];

    // Check if user exists
    if (!user) {
      loginUserMessage.textContent = "Email not found. Please check or sign up first.";
      loginUserMessage.style.color = "red";
      emailInput.classList.remove("fine");
      emailInput.classList.add("error");
      return;
    }

    // Check if password matches
    if (user.password !== password) {
      loginMessage.textContent = "Incorrect password. Try again.";
      loginMessage.style.color = "red";
      return;
    }

    // Login successful
    localStorage.setItem("currentUser", email);
    window.location.href = "bookmarks.html"; // redirect
  });
}


// ===== RESET PASSWORD FEATURE =====

// Step 1: When user enters email and clicks "Send reset link"
var forgotButton = document.getElementById("forgotButton");
var forgotEmailInput = document.getElementById("forgotEmail");
var forgotMsg = document.getElementById("forgotMsg");

if (forgotButton) {
  forgotButton.addEventListener("click", function() {
    var enteredEmail = forgotEmailInput.value.trim();

    // Check if input is empty
    if (enteredEmail === "") {
      forgotMsg.textContent = "Please enter your email.";
      forgotMsg.style.color = "red";
      forgotEmailInput.classList.add("error");
      forgotEmailInput.classList.remove("fine");
      return;
    }

    // Check if email format is valid (simple regex)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      forgotMsg.textContent = "Enter a valid email address.";
      forgotMsg.style.color = "red";
      forgotEmailInput.classList.add("error");
      forgotEmailInput.classList.remove("fine");
      return;
    }

    // Get all users from localStorage (object keyed by email)
    var users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[enteredEmail]) {
      // Registered email found
      sessionStorage.setItem("resetEmail", enteredEmail);

      // Reset input styles and message
      forgotEmailInput.classList.remove("error");
      forgotEmailInput.classList.add("fine");
      forgotMsg.textContent = "";

      // Hide forgot form, show new password form
      document.getElementById("forgotForm").style.display = "none";
      document.getElementById("newPasswordForm").style.display = "block";
    } else {
      // Email not found
      forgotMsg.textContent = "Email not found. Please check or sign up first.";
      forgotMsg.style.color = "red";
      forgotEmailInput.classList.add("error");
      forgotEmailInput.classList.remove("fine");
    }
  });
}

// Step 2: When user enters new password and confirms
var savePasswordButton = document.getElementById("savePasswordButton");
if (savePasswordButton) {
  savePasswordButton.addEventListener("click", function() {
    var newPassword = document.getElementById("newPassword").value.trim();
    var confirmPassword = document.getElementById("confirmPassword").value.trim();
    var resetMsg = document.getElementById("resetMsg");

    if (newPassword === "" || confirmPassword === "") {
      resetMsg.textContent = "Please fill both fields.";
      resetMsg.style.color = "red";
      document.getElementById("newPassword").classList.add("error");
      document.getElementById("confirmPassword").classList.add("error");
      return;
    }

    if (newPassword.length < 8) {
      resetMsg.textContent = "Password must be at least 8 characters long.";
      resetMsg.style.color = "red";
      document.getElementById("newPassword").classList.add("error");
      document.getElementById("confirmPassword").classList.add("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      resetMsg.textContent = "Passwords do not match!";
      resetMsg.style.color = "red";
      document.getElementById("newPassword").classList.add("error");
      document.getElementById("confirmPassword").classList.add("error");
      return;
    }

    // Read email from sessionStorage
    var currentResetEmail = sessionStorage.getItem("resetEmail");

    if (!currentResetEmail) {
      resetMsg.textContent = "No reset request found. Please try again.";
      resetMsg.style.color = "red";
      return;
    }

    // Get users object from localStorage
    var users = JSON.parse(localStorage.getItem("users") || "{}");

    // Update password for this email
    if (users[currentResetEmail]) {
      users[currentResetEmail].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      sessionStorage.removeItem("resetEmail");

      // Success message
      resetMsg.textContent = "Password updated successfully!";
      resetMsg.style.color = "green";

      // Remove error borders
      document.getElementById("newPassword").classList.remove("error");
      document.getElementById("confirmPassword").classList.remove("error");
      document.getElementById("newPassword").classList.add("fine");
      document.getElementById("confirmPassword").classList.add("fine");
    }
  });
}

// ===== GO BACK TO LOGIN PAGE AFTER PASSWORD RESET =====
var updateLoginLink = document.getElementById("updateLogin");
if (updateLoginLink) {
  updateLoginLink.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("newPasswordForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("resetMsg").textContent = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    // Reset input borders
    document.getElementById("newPassword").classList.remove("error");
    document.getElementById("confirmPassword").classList.remove("error");
    document.getElementById("newPassword").classList.add("fine");
    document.getElementById("confirmPassword").classList.add("fine");
  });
}




// ====== card options toggle section =====
const cardOptions = document.getElementById('cardOptions');
const cardMenu = document.getElementById('cardMenu');

// cardOptions.addEventListener("click", function(event){

//   if (cardMenu.style.display === "block"){
//     cardMenu.style.display = "none";
//   }else{
//     cardMenu.style.display = "block";
//   }
// });

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
