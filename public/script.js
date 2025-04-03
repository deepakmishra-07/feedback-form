document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerText = data.message;
        loadFeedback();
        this.reset();
    })
    .catch(error => console.error("Error:", error));
});

function loadFeedback() {
    fetch("/view-feedback")
    .then(response => response.json())
    .then(data => {
        const feedbackList = document.getElementById("feedbackList");
        feedbackList.innerHTML = "";

        if (data.length > 0) {
            const feedback = data[0]; // Only show the most recent feedback
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message} 
                <button class="btn btn-sm btn-warning" onclick="editFeedback(${feedback.id}, '${feedback.name}', '${feedback.email}', '${feedback.message}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteFeedback(${feedback.id})">Delete</button>`;
            feedbackList.appendChild(li);
        }
    })
    .catch(error => console.error("Error:", error));
}

function editFeedback(id, name, email, message) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("message").value = message;

    document.getElementById("feedbackForm").onsubmit = function (e) {
        e.preventDefault();
        fetch(`/update-feedback/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseMessage").innerText = data.message;
            loadFeedback();
        })
        .catch(error => console.error("Error:", error));
    };
}

function deleteFeedback(id) {
    fetch(`/delete-feedback/${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").innerText = data.message;
        loadFeedback();
    })
    .catch(error => console.error("Error:", error));
}

window.onload = loadFeedback;
