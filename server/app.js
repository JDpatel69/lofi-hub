const express = require('express')
const cors = require('cors')
const app = express()
let mysql2 = require('mysql2')
app.use(cors())
app.use(express.json())
let connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
});
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Server!");
    connection.query("CREATE DATABASE IF NOT EXISTS to_do", (err) => {
        if (err) throw err;
        connection.query("USE to_do", (err) => {
            if (err) throw err;
            const createUserTableSql = `
                CREATE TABLE IF NOT EXISTS users (
                    username VARCHAR(255) PRIMARY KEY,
                    email VARCHAR(255),
                    phone VARCHAR(255),
                    pass VARCHAR(255),
                    fullname VARCHAR(255)
                );
            `;
            connection.query(createUserTableSql, (err) => {
                if (err) throw err;
                console.log("Table 'users' ready!");
            });
            const createTodoTableSql = `
                CREATE TABLE IF NOT EXISTS To_do (
                    username VARCHAR(255),
                    task VARCHAR(255),
                    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
                );
            `;
            connection.query(createTodoTableSql, (err) => {
                if (err) throw err;
                console.log("Table 'To-do Table is' ready!");
            });
        });
    });
});


app.post('/register', (req, res) => {
    const { username, fullname, email, phone, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    connection.query("SELECT username FROM users WHERE username = ?", [username], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length > 0) {
            return res.status(409).json({ message: "Username already taken" });
        }
        const sql = "INSERT INTO users (username, fullname, email, phone, pass) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, [username, fullname, email, phone, password], (err) => {
            if (err) return res.status(500).json({ message: "Registration failed" });
            res.json({ message: "User registered successfully" });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query("SELECT * FROM users WHERE username = ? AND pass = ?", [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        res.json({ message: "Login successful", user: results[0].username });
    });
});


app.post('/add-task', (req, res) => {
    const { username, task } = req.body;
    const sql = "INSERT INTO To_do (username, task) VALUES (?, ?)";
    connection.query(sql, [username, task], (err) => {
        if (err) return res.status(500).json({ message: "Failed to add task" });
        res.json({ message: "Task added successfully" });
    });
});