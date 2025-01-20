// API URLs
const API_URLS = {
    SIGNUP: "http://localhost:5001/auth/signup",
    LOGIN: "http://localhost:5001/auth/login",
    USER_DETAILS: "http://localhost:5001/user",
    BULLETINS: "http://localhost:5001/bulletins",
    CGHS: "http://localhost:5001/cghs",
    CSD_CANTEENS: "http://localhost:5001/csd-canteen",
};

// Utility function to fetch API data
async function apiFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Request failed");
        return data;
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        throw error;
    }
}

// Handle Signup Form Submission
async function handleSignup(e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        await apiFetch(API_URLS.SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        alert("Account created successfully!");
        window.location.href = "home.html";
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("signupForm")?.addEventListener("submit", handleSignup);

// Handle Login Form Submission
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) return alert("Email and password are required.");

    try {
        const data = await apiFetch(API_URLS.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem("authToken", data.token);
        await fetchUserDetails();
        toggleSections("bulletin");
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById("loginForm")?.addEventListener("submit", handleLogin);

// Fetch User Details
async function fetchUserDetails() {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
        const userData = await apiFetch(API_URLS.USER_DETAILS, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        document.getElementById("username").innerText = `Welcome, ${userData.username}`;
    } catch (error) {
        alert("Failed to fetch user details. Please log in again.");
    }
}

// Logout Functionality
function handleLogout() {
    localStorage.removeItem("authToken");
    toggleSections("login");
}

document.getElementById("logoutButton")?.addEventListener("click", handleLogout);


// Breadcrumb Navigation
function generateBreadcrumb() {
    const breadcrumb = document.getElementById("breadcrumb");
    const paths = {
        "home.html": "Bulletin Index",
        "updates.html": "Updates",
        "info_tech.html": "Information Technology Group",
        "library.html": "Library",
        "material_management.html": "Material Management Group",
    };

    const currentPath = window.location.pathname.split("/").pop();
    const currentTitle = paths[currentPath] || "Unknown Page";

    breadcrumb.innerHTML = `<a href="home.html">${paths["home.html"]}</a>`;
    if (currentPath !== "home.html") {
        breadcrumb.innerHTML += ` > <span>${currentTitle}</span>`;
    }
}

// Toggle Sections Visibility
function toggleSections(visibleSection) {
    document.getElementById("login-section").style.display = visibleSection === "login" ? "block" : "none";
    document.getElementById("bulletin-section").style.display = visibleSection === "bulletin" ? "block" : "none";
}
