const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if needed
    password: "1234", // Add your MySQL password
    database: "feedback_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL database.");
    }
});

module.exports = connection;
