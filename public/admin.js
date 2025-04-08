function adminLogin() {
    const username = document.getElementById("adminUser").value;
    const password = document.getElementById("adminPass").value;

    fetch("/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("dashboardSection").style.display = "block";
            loadAdminFeedback();
        } else {
            document.getElementById("loginError").innerText = data.message;
        }
    })
    .catch(error => {
        document.getElementById("loginError").innerText = "Login failed. Please try again.";
        console.error("Login Error:", error);
    });
}

function loadAdminFeedback() {
    fetch("/admin-feedback")
    .then(res => res.json())
    .then(feedbacks => {
        const list = document.getElementById("adminFeedbackList");
        list.innerHTML = "";
        feedbacks.forEach(fb => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <div>
                    <strong>${fb.name}</strong><br>
                    <small>${fb.email}</small><br>
                    ${fb.message}
                </div>
                <button class="btn btn-sm btn-danger" onclick="deleteAdminFeedback(${fb.id})">Delete</button>
            `;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error loading feedback:", error);
    });
}

function deleteAdminFeedback(id) {
    fetch(`/admin-delete-feedback/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadAdminFeedback();
    })
    .catch(error => {
        console.error("Error deleting feedback:", error);
    });
}
