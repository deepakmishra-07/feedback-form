const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static frontend files

// Submit Feedback
app.post("/submit-feedback", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Feedback submitted successfully!" });
    });
});

// Get Only Recent Feedback
app.get("/view-feedback", (req, res) => {
    db.query("SELECT * FROM feedback ORDER BY submitted_at DESC LIMIT 1", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update Feedback
app.put("/update-feedback/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "UPDATE feedback SET name=?, email=?, message=? WHERE id=?";
    db.query(sql, [name, email, message, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Feedback updated successfully!" });
    });
});

// Delete Feedback
app.delete("/delete-feedback/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM feedback WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Feedback deleted successfully!" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
