// Distance map between areas
const areaDistances = {
    Bashundhara: { Bashundhara: 0, Farmgate: 5, Uttara: 10, Dhanmondi: 7, Mohammadpur: 8 },
    Farmgate: { Bashundhara: 5, Farmgate: 0, Uttara: 6, Dhanmondi: 3, Mohammadpur: 4 },
    Uttara: { Bashundhara: 10, Farmgate: 6, Uttara: 0, Dhanmondi: 9, Mohammadpur: 10 },
    Dhanmondi: { Bashundhara: 7, Farmgate: 3, Uttara: 9, Dhanmondi: 0, Mohammadpur: 2 },
    Mohammadpur: { Bashundhara: 8, Farmgate: 4, Uttara: 10, Dhanmondi: 2, Mohammadpur: 0 }
};

// SIGNUP
function signupUser() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const bloodGroup = document.getElementById("signup-blood").value.trim();
    const area = document.getElementById("signup-area").value.trim();

    if (!name || !email || !phone || !bloodGroup || !area) {
        alert("All fields are required.");
        return;
    }

    const password = prompt("Create a password (min 4 chars):");
    if (!password || password.length < 4) {
        alert("Invalid password.");
        return;
    }

    const userData = {
        name,
        email,
        phone,
        bloodGroup,
        area,
        password
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful!");
    window.location.href = "LoginPage.html";
}

// LOGIN
function validateLogin() {
    const name = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
        alert("No user signed up.");
        return;
    }

    if (userData.name === name && userData.password === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        window.location.href = "Home.html";
    } else {
        alert("Wrong username or password.");
    }
}

// DISPLAY NAME + POPUPS ON HOME
window.onload = function () {
    const path = window.location.pathname;
    if (path.includes("Home.html")) {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) document.getElementById("user-name").textContent = user.name;

        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        const popupContainer = document.getElementById("popup-container");

        donations.forEach((d, index) => {
            const mini = document.createElement("div");
            mini.className = "popup";
            mini.innerHTML = `Donor: ${d.bloodGroup} at ${d.area}`;
            mini.onclick = () => alert(`Blood Group: ${d.bloodGroup}\nArea: ${d.area}\nAge: ${d.age}`);
            popupContainer.appendChild(mini);
        });
    }

    if (path.includes("Forum.html")) {
        const donations = JSON.parse(localStorage.getItem("donations")) || [];
        const donorList = document.getElementById("donor-list");
        donations.forEach(d => {
            const li = document.createElement("li");
            li.textContent = `Blood Group: ${d.bloodGroup}, Area: ${d.area}, Age: ${d.age}`;
            donorList.appendChild(li);
        });
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "LoginPage.html";
}

// DONATE BLOOD
function submitDonation() {
    const bloodGroup = document.getElementById("donate-blood-group").value.trim();
    const area = document.getElementById("donate-area").value.trim();
    const age = document.getElementById("donate-age").value.trim();

    if (!bloodGroup || !area || !age) {
        alert("All fields required.");
        return;
    }

    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    donations.push({ bloodGroup, area, age });
    localStorage.setItem("donations", JSON.stringify(donations));

    alert("Thank you for donating! Your info will be shown on the homepage.");
    window.location.href = "Home.html";
}

function searchDonor() {
    const bloodGroup = document.getElementById("search-blood-group").value.trim();
    const searchArea = document.getElementById("search-area").value.trim();
    const donations = JSON.parse(localStorage.getItem("donations")) || [];

    const matches = donations.filter(d => d.bloodGroup.toLowerCase() === bloodGroup.toLowerCase());

    if (matches.length === 0) {
        showNoMatchPopup();
        return;
    }

    let closest = null;
    let minDistance = Infinity;

    matches.forEach(d => {
        const dist = areaDistances[searchArea]?.[d.area];
        if (dist !== undefined && dist < minDistance) {
            minDistance = dist;
            closest = d;
        }
    });

    if (!closest) {
        showNoMatchPopup();  // No nearby match found even if blood group matched
    } else {
        alert(`Closest donor:\nBlood Group: ${closest.bloodGroup}\nArea: ${closest.area}\nPhone: ${closest.phone}\nDistance: ${minDistance}`);
    }
}

// Submit donation and show popup
function submitDonation() {
    const bloodGroup = document.getElementById("donate-blood-group").value.trim();
    const area = document.getElementById("donate-area").value.trim();
    const age = document.getElementById("donate-age").value.trim();
    const phone = document.getElementById("donate-phone").value.trim();

    if (!bloodGroup || !area || !age || !phone) {
        alert("All fields are required.");
        return;
    }

    const donation = { bloodGroup, area, age, phone };
    let donations = JSON.parse(localStorage.getItem("donations") || "[]");
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));

    localStorage.setItem("lastDonation", JSON.stringify(donation)); // for popup
    window.location.href = "Home.html";
}

// Show popup on Home
window.onload = function () {
    const popup = document.getElementById("popup-container");
    const text = document.getElementById("popup-text");
    const donation = JSON.parse(localStorage.getItem("lastDonation"));
    if (donation && text && popup) {
        text.innerText = `Donated: ${donation.bloodGroup} @ ${donation.area}, Age: ${donation.age}, Phone: ${donation.phone}`;
        popup.classList.remove("hidden");
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && document.getElementById("user-name")) {
        document.getElementById("user-name").innerText = userData.name;
    }

    const donorList = document.getElementById("donor-list");
    if (donorList) {
        const allDonors = JSON.parse(localStorage.getItem("donations") || "[]");
        donorList.innerHTML = "";
        allDonors.forEach(donor => {
            const li = document.createElement("li");
            li.innerText = `${donor.bloodGroup} - ${donor.area}, Age: ${donor.age}, Phone: ${donor.phone}`;
            donorList.appendChild(li);
        });
    }
};

function closePopup() {
    document.getElementById("popup-container").classList.add("hidden");
}
function showNoMatchPopup() {
    const noMatchPopup = document.createElement('div');
    noMatchPopup.className = 'popup-container left-popup';

    noMatchPopup.innerHTML = `
        <div class="popup-message">
            <span>No donor available for this blood group right now.</span>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    document.body.appendChild(noMatchPopup);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
        if (noMatchPopup) noMatchPopup.remove();
    }, 6000);
}
