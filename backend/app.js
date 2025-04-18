require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' // Configure allowed origins
}));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER, // Replace with your MySQL username
  password: process.env.DB_PASSWORD, // Replace with your MySQL root password
  database: 'library_management',
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Routes for handling requests

// Fetch all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new book
app.post('/addBook', (req, res) => {
  const { title, author, publisher, quantity } = req.body;
  const query = 'INSERT INTO Books (title, author, publisher, quantity) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, publisher, quantity], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Book added successfully!' });
  });
});

// Fetch all members
app.get('/members', (req, res) => {
  db.query('SELECT * FROM Members', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new member
app.post('/addMember', (req, res) => {
  const { name, email, phone_number } = req.body;
  const query = 'INSERT INTO Members (name, email, phone_number) VALUES (?, ?, ?)';
  db.query(query, [name, email, phone_number], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Member added successfully!' });
  });
});

// Fetch all transactions
app.get('/transactions', (req, res) => {
  db.query('SELECT * FROM Transactions', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Issue a book
app.post('/issueBook', (req, res) => {
  const { member_id, book_id, issue_date, return_date } = req.body;
  const query = 'INSERT INTO Transactions (member_id, book_id, issue_date, return_date) VALUES (?, ?, ?, ?)';
  db.query(query, [member_id, book_id, issue_date, return_date], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Book issued successfully!' });
  });
});

// Return a book
app.post('/returnBook', (req, res) => {
  const { transaction_id } = req.body;
  const query = 'DELETE FROM Transactions WHERE transaction_id = ?';
  db.query(query, [transaction_id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Book returned successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
