// API URLs
const SIGNUP_URL = "http://localhost:5001/auth/signup";
const LOGIN_URL = "http://localhost:5001/auth/login";
const USER_DETAILS_URL = "http://localhost:5001/user";
const BULLETINS_URL = "http://localhost:5001/bulletins";

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", async function (e) {e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const response = await fetch("http://localhost:5001/auth/signup", {
    method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
        alert("Account created successfully! Please log in.");
        window.location.href = "login.html";
    } else {
        alert(data.message);
    }
});

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        alert(data.message);
    }
});

// Fetch user details and update the UI
async function fetchUserDetails() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("No token found");
        return;
    }

    try {
        const response = await fetch(`${USER_DETAILS_URL}/<USER_ID>`, { // Replace <USER_ID> dynamically as needed
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await response.json();
        if (response.ok) {
            // Update user details in the UI
            document.getElementById("username").innerText = `Welcome, ${userData.username}`;
        } else {
            console.error("Error fetching user details:", userData.message);
            alert("Failed to fetch user details. Please log in again.");
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
}

// Handle logout
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("authToken"); // Clear the token
    document.getElementById("login-section").style.display = "block"; // Show login form
    document.getElementById("bulletin-section").style.display = "none"; // Hide bulletin form
});

// Handle bulletin form submission
document.getElementById("bulletinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const section = document.getElementById("section").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const details = document.getElementById("details").value.trim();

    if (!section || !topic || !details) {
        alert("All fields are required.");
        return;
    }

    const tableContent = document.getElementById("table-content");

    try {
        // Add new row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tableContent.children.length + 1}</td>
            <td>${section}</td>
            <td>${topic}</td>
            <td>${details}</td>
            <td>${new Date().toLocaleString()}</td>
        `;
        tableContent.appendChild(row);

        // Reset form
        document.getElementById("bulletinForm").reset();
    } catch (error) {
        console.error("Error adding row:", error);
    }
});

// On page load, check if the user is logged in
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            // Attempt to fetch user details
            await fetchUserDetails();

            // Show bulletin form and hide login form
            document.getElementById("login-section").style.display = "none";
            document.getElementById("bulletin-section").style.display = "block";
        } catch (error) {
            console.error("Error during auto-login:", error);
            alert("Session expired. Please log in again.");
        }
    } else {
        // Show login form and hide bulletin form
        document.getElementById("login-section").style.display = "block";
        document.getElementById("bulletin-section").style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    // Get the breadcrumb container
    const breadcrumb = document.getElementById("breadcrumb");

    // Define the page paths
    const paths = {
        "index.html": "Bulletin Index",
        "updates.html": "Updates",
        "info_tech.html": "Information Technology Group",
        "library.html": "Library",
        "material_management.html": "Material Management Group",
        // Add more paths as needed
    };

    // Get the current page
    const currentPath = window.location.pathname.split("/").pop(); // Get the current file name
    const currentTitle = paths[currentPath] || "Unknown Page";

    // Generate breadcrumb trail
    let breadcrumbHTML = `<a href="index.html">${paths["index.html"]}</a>`;
    if (currentPath !== "index.html") {
        breadcrumbHTML += ` > <span>${currentTitle}</span>`;
    }

    // Insert the breadcrumb into the DOM
    breadcrumb.innerHTML = breadcrumbHTML;

// Fetch and display bulletins
async function fetchBulletins() {
    try {
        const response = await fetch(BULLETINS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch bulletins: ${response.statusText}`);
        }
        const bulletins = await response.json();
        const tableContent = document.getElementById("table-content");
        if (!tableContent) {
            console.error("Bulletin table not found.");
            return;
        }
        tableContent.innerHTML = ""; // Clear existing content

        bulletins.forEach((bulletin, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bulletin.section}</td>
                <td>${bulletin.topic}</td>
                <td>${bulletin.details}</td>
                <td>${new Date(bulletin.date).toLocaleString()}</td>
            `;
            tableContent.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching bulletins:", error);
    }
}


// Call fetchBulletins on page load
document.addEventListener("DOMContentLoaded", fetchBulletins);

// Within bulletin form submission handler
document.getElementById("bulletinForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const section = document.getElementById("section").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const details = document.getElementById("details").value.trim();
  
    if (!section || !topic || !details) {
      alert("All fields are required.");
      return;
    }
  
    try {
      const response = await fetch(BULLETINS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, topic, details }),
      });
  
      if (response.ok) {
        alert("Bulletin update added successfully!");
        fetchBulletins(); // Refresh the bulletin list
        document.getElementById("bulletinForm").reset();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to add bulletin update.");
      }
    } catch (error) {
      console.error("Error adding bulletin update:", error);
    }
  });
});
