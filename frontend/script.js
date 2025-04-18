document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const showBooksBtn = document.getElementById('show-books');
    const showMembersBtn = document.getElementById('show-members');
    const showTransactionsBtn = document.getElementById('show-transactions');
    const bookSection = document.getElementById('book-section');
    const memberSection = document.getElementById('member-section');
    const transactionSection = document.getElementById('transaction-section');

    // Modal elements
    const bookModal = document.getElementById('book-modal');
    const memberModal = document.getElementById('member-modal');
    const transactionModal = document.getElementById('transaction-modal');
    const addBookBtn = document.getElementById('add-book-btn');
    const addMemberBtn = document.getElementById('add-member-btn');
    const issueBookBtn = document.getElementById('issue-book-btn');
    const closeButtons = document.querySelectorAll('.close');

    // Form elements
    const bookForm = document.getElementById('book-form');
    const memberForm = document.getElementById('member-form');
    const transactionForm = document.getElementById('transaction-form');

    // Tab switching functionality
    function switchTab(sectionToShow) {
        // Hide all sections
        bookSection.classList.remove('active-section');
        memberSection.classList.remove('active-section');
        transactionSection.classList.remove('active-section');

        // Remove active class from all buttons
        showBooksBtn.classList.remove('active');
        showMembersBtn.classList.remove('active');
        showTransactionsBtn.classList.remove('active');

        // Show selected section and mark button as active
        sectionToShow.classList.add('active-section');
        if (sectionToShow === bookSection) {
            showBooksBtn.classList.add('active');
        } else if (sectionToShow === memberSection) {
            showMembersBtn.classList.add('active');
        } else {
            showTransactionsBtn.classList.add('active');
        }
    }

    showBooksBtn.addEventListener('click', () => switchTab(bookSection));
    showMembersBtn.addEventListener('click', () => switchTab(memberSection));
    showTransactionsBtn.addEventListener('click', () => switchTab(transactionSection));

    // Modal open/close functionality
    addBookBtn.addEventListener('click', () => bookModal.style.display = 'block');
    addMemberBtn.addEventListener('click', () => memberModal.style.display = 'block');
    issueBookBtn.addEventListener('click', () => transactionModal.style.display = 'block');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Form submission handlers
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publisher = document.getElementById('publisher').value;
        const quantity = document.getElementById('quantity').value;

        fetch('http://localhost:3000/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, publisher, quantity }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            bookModal.style.display = 'none';
            bookForm.reset();
            fetchBooks(); // Refresh the book list
        })
        .catch(err => console.error('Error adding book:', err));
    });

    memberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        fetch('http://localhost:3000/addMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone_number: phone }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            memberModal.style.display = 'none';
            memberForm.reset();
            fetchMembers(); // Refresh the member list
        })
        .catch(err => console.error('Error adding member:', err));
    });

    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const member_id = document.getElementById('member-id').value;
        const book_id = document.getElementById('book-id').value;
        const issue_date = document.getElementById('issue-date').value;
        const return_date = document.getElementById('return-date').value;

        fetch('http://localhost:3000/issueBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ member_id, book_id, issue_date, return_date }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            transactionModal.style.display = 'none';
            transactionForm.reset();
            fetchTransactions(); // Refresh the transaction list
        })
        .catch(err => console.error('Error issuing book:', err));
    });

    // Fetch and display functions
    function fetchBooks() {
        fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(data => {
                const bookList = document.getElementById('book-list');
                bookList.innerHTML = ''; // Clear current list
                
                data.forEach(book => {
                    const bookCard = document.createElement('div');
                    bookCard.className = 'card book-card';
                    bookCard.innerHTML = `
                        <h3>${book.title}</h3>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Publisher:</strong> ${book.publisher}</p>
                        <p><strong>Available:</strong> <span class="quantity">${book.quantity}</span></p>
                    `;
                    bookList.appendChild(bookCard);
                });
            })
            .catch(err => console.error('Error fetching books:', err));
    }

    function fetchMembers() {
        fetch('http://localhost:3000/members')
            .then(response => response.json())
            .then(data => {
                const memberList = document.getElementById('member-list');
                memberList.innerHTML = ''; // Clear current list
                
                data.forEach(member => {
                    const memberCard = document.createElement('div');
                    memberCard.className = 'card member-card';
                    memberCard.innerHTML = `
                        <h3>${member.name}</h3>
                        <p><strong>Email:</strong> ${member.email}</p>
                        <p><strong>Phone:</strong> ${member.phone_number || 'Not provided'}</p>
                    `;
                    memberList.appendChild(memberCard);
                });
            })
            .catch(err => console.error('Error fetching members:', err));
    }

    function fetchTransactions() {
        fetch('http://localhost:3000/transactions')
            .then(response => response.json())
            .then(data => {
                const transactionList = document.getElementById('transaction-list');
                transactionList.innerHTML = ''; // Clear current list
                
                data.forEach(transaction => {
                    const transactionCard = document.createElement('div');
                    transactionCard.className = 'card transaction-card';
                    transactionCard.innerHTML = `
                        <h3>Transaction #${transaction.transaction_id}</h3>
                        <p><strong>Book ID:</strong> ${transaction.book_id}</p>
                        <p><strong>Member ID:</strong> ${transaction.member_id}</p>
                        <p><strong>Issued:</strong> ${new Date(transaction.issue_date).toLocaleDateString()}</p>
                        <p><strong>Due:</strong> ${new Date(transaction.return_date).toLocaleDateString()}</p>
                    `;
                    transactionList.appendChild(transactionCard);
                });
            })
            .catch(err => console.error('Error fetching transactions:', err));
    }

    // Initial fetch
    fetchBooks();
    fetchMembers();
    fetchTransactions();
});