function validateSignupForm() {
    const name = document.querySelector('#signup-container input[placeholder="Name"]').value.trim();
    const email = document.querySelector('#signup-container input[placeholder="Email"]').value.trim();
    const phone = document.querySelector('#signup-container input[placeholder="Phone Number"]').value.trim();
    const bloodGroup = document.querySelector('#signup-container input[placeholder="Blood Group"]').value.trim();
    if (!name || !email || !phone || !bloodGroup) {
        alert("All fields are required.");
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (isNaN(phone) || phone.length < 12) {
        alert("Please enter a valid phone number.");
        return false;
    }
    const password = prompt("Create a password:");
    if (!password || password.length < 6) {
        alert("Password must be at least 4 characters.");
        return false;
    }
    const userData = {
        name,
        email,
        phone,
        bloodGroup,
        password
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful!");
    return true;
}

function showLogin() {
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}
function showHome() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('home-container').classList.remove('hidden');
    document.getElementById('donate-container').classList.add('hidden');
    document.getElementById('search-container').classList.add('hidden');
    document.getElementById('about-container').classList.add('hidden');
}
function showDonateBlood() {
    document.getElementById('home-container').classList.add('hidden');
    document.getElementById('donate-container').classList.remove('hidden');
}
function showLookForDonor() {
    document.getElementById('home-container').classList.add('hidden');
    document.getElementById('search-container').classList.remove('hidden');
}
function showAboutUs() {
    document.getElementById('home-container').classList.add('hidden');
    document.getElementById('about-container').classList.remove('hidden');
}
function logout() {
    document.getElementById('home-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}
function validateDonateForm() {
    const bloodGroup = document.getElementById('donate-blood-group').value.trim();
    const area = document.getElementById('donate-area').value.trim();
    const age = document.getElementById('donate-age').value.trim();

    if (!bloodGroup || !area || !age) {
        alert("All fields are required.");
        return false;
    }
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return false;
    }
    alert("Thank you for donating blood!");
    showHome();
    return true;
}
function validateSearchForm() {
    const bloodGroup = document.getElementById('search-blood-group').value.trim();
    const area = document.getElementById('search-area').value.trim();

    if (!bloodGroup || !area) {
        alert("All fields are required.");
        return false;
    }
    alert("We will connect you to a user who has the same blood group.");
    showHome();
    return true;
}
function validateSignupForm() {
    const name = document.querySelector('#signup-container input[type="text"]').value.trim();
    const email = document.querySelector('#signup-container input[type="email"]').value.trim();
    const phone = document.querySelector('#signup-container input[type="tel"]').value.trim();
    const bloodGroup = document.querySelector('#signup-container input[type="text"]:nth-child(4)').value.trim();

    if (!name || !email || !phone || !bloodGroup) {
        alert("All fields are required.");
        return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (isNaN(phone) || phone.length < 10) {
        alert("Please enter a valid phone number.");
        return false;
    }

    return true;
}
