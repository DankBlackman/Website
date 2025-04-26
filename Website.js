// Signup Function
function signupUser() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const bloodGroup = document.getElementById('signup-blood').value.trim();

    if (!name || !email || !phone || !bloodGroup) {
        alert("All fields are required.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (isNaN(phone) || phone.length < 11) {
        alert("Please enter a valid phone number.");
        return;
    }

    const password = prompt("Create a password (min 4 characters):");
    if (!password || password.length < 4) {
        alert("Password must be at least 4 characters.");
        return;
    }

    const userData = {
        name,
        email,
        phone,
        bloodGroup,
        password
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful! Please login.");
    window.location.href = "LoginPage.html"; // Redirect to login
}

// Login Function
function validateLogin() {
    const nameInput = document.getElementById('login-name').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();

    const storedData = localStorage.getItem("userData");
    if (!storedData) {
        alert("No user signed up yet.");
        return;
    }

    const userData = JSON.parse(storedData);

    if (userData.name === nameInput && userData.password === passwordInput) {
        localStorage.setItem("loggedInUser", nameInput); // Save logged-in user
        alert("Login successful!");
        window.location.href = "Home.html"; // Redirect to home page
    } else {
        alert("Wrong Username or Password. Please try again.");
    }
}

// Home Page Load (Welcome User)
window.onload = function () {
    if (window.location.pathname.includes("Home.html")) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
            document.getElementById('user-name').textContent = username;
            alert("Welcome back, " + username + "!");
        }
    }
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "LoginPage.html";
}

// Donate Blood
function submitDonation() {
    const bloodGroup = document.getElementById('donate-blood-group').value.trim();
    const area = document.getElementById('donate-area').value.trim();
    const age = document.getElementById('donate-age').value.trim();

    if (!bloodGroup || !area || !age) {
        alert("All fields are required.");
        return;
    }
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }
    alert("Thank you for donating blood!");
    window.location.href = "Home.html"; // Go back to home
}

// Search Donor
function searchDonor() {
    const bloodGroup = document.getElementById('search-blood-group').value.trim();
    const area = document.getElementById('search-area').value.trim();

    if (!bloodGroup || !area) {
        alert("All fields are required.");
        return;
    }
    alert("We will connect you to a donor with your blood group nearby!");
    window.location.href = "Home.html"; // Go back to home
}
