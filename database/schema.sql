-- Create the database
CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

-- Books table
CREATE TABLE IF NOT EXISTS Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    publisher VARCHAR(255),
    quantity INT
);

-- Members table
CREATE TABLE IF NOT EXISTS Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(15)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    issue_date DATE,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- Insert sample books
INSERT INTO Books (title, author, publisher, quantity) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Charles Scribner''s Sons', 5),
('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 3),
('1984', 'George Orwell', 'Secker & Warburg', 4),
('Moby Dick', 'Herman Melville', 'Harper & Brothers', 2);

-- Insert sample members
INSERT INTO Members (name, email) VALUES
('John Doe', 'johndoe@example.com'),
('Jane Smith', 'janesmith@example.com'),
('Alice Johnson', 'alicej@example.com');

-- Insert sample transactions
INSERT INTO Transactions (member_id, book_id, issue_date, return_date) VALUES
(1, 1, '2025-04-18', '2025-04-25'),
(2, 2, '2025-04-19', '2025-04-26'),
(3, 3, '2025-04-20', '2025-04-27');