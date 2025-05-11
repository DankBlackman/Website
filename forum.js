document.addEventListener("DOMContentLoaded", () => {
    const donations = JSON.parse(localStorage.getItem("donations")) || [];
    const areas = ["Bashundhara", "Farmgate", "Uttara", "Dhanmondi", "Mohammadpur"];

    donations.forEach(donor => {
        if (!areas.includes(donor.area)) return;

        const col = document.getElementById(donor.area);
        const box = document.createElement("div");
        box.className = "donor-box";
        box.innerHTML = `
            <strong>Blood Group:</strong> ${donor.bloodGroup}<br>
            <strong>Age:</strong> ${donor.age}<br>
            <strong>Phone:</strong> ${donor.phone}<br>
            <strong>Area:</strong> ${donor.area}
        `;
        col.appendChild(box);
    });
});
