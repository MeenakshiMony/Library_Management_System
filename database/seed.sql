USE library_management;

-- Sample books
INSERT IGNORE INTO Books (title, author, publisher, quantity) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Charles Scribner''s Sons', 5),
('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 3),
('1984', 'George Orwell', 'Secker & Warburg', 4),
('Moby Dick', 'Herman Melville', 'Harper & Brothers', 2);

-- Sample members
INSERT IGNORE INTO Members (name, email) VALUES
('John Doe', 'johndoe@example.com'),
('Jane Smith', 'janesmith@example.com'),
('Alice Johnson', 'alicej@example.com');

-- Sample transactions
INSERT IGNORE INTO Transactions (member_id, book_id, issue_date, return_date) VALUES
(1, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY)),
(2, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY)),
(3, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY));