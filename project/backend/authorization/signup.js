document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Input Validation
    if (!username || !email || !password) {
        return alert('Please fill in all fields');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return alert('Please enter a valid email address');
    }
    if (password.length < 6) {
        return alert('Password must be at least 6 characters long');
    }

    try {
        const response = await fetch('http://localhost:5001/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return alert(errorData.message || 'Signup failed');
        }

        alert('Signup Successful!');
        window.location.href = '/login.html'; // Redirect to login page
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
