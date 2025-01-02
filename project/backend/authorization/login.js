document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Input Validation
    if (!email || !password) {
        return alert('Please fill in all fields');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return alert('Please enter a valid email address');
    }

    try {
        const response = await fetch('http://localhost:5001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return alert(errorData.message || 'Login failed');
        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token); // Store JWT in sessionStorage
        alert('Login Successful!');
        window.location.href = '/index.html'; // Redirect to the main page
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
