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