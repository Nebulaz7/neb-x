// Wallet Code

document.addEventListener("DOMContentLoaded", function() {
    // Initialize variables that are common across pages
    let theme = localStorage.getItem('theme') || 'light'; // Load theme from localStorage or default to 'light'

    // Retrieve balance and transactions from localStorage or set defaults
    let balance = parseFloat(localStorage.getItem('balance')) || 1000.00; // Example starting balance
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Apply the stored theme to the body
    document.body.classList.toggle('dark-theme', theme === 'dark');

    // Function to save balance and transactions to localStorage
    function saveData() {
        localStorage.setItem('balance', balance.toFixed(2));
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Function to update the displayed balance
    function updateBalance() {
        const balanceElement = document.getElementById('balance');
        if (balanceElement) {
            balanceElement.innerText = `$${balance.toFixed(2)}`;
        }
        saveData(); // Save data whenever balance is updated
    }

    // Function to add a transaction
    function addTransaction(amount, type, description, status) {
        const transaction = {
            id: transactions.length + 1,
            amount: amount,
            type: type,
            description: description,
            status: status,
            date: new Date().toLocaleString()
        };
        transactions.push(transaction);
        saveData(); // Save data whenever a transaction is added
        updateTransactionHistory(); // Update the transaction history immediately
    }

    // Function to populate the payment history
    function updateTransactionHistory() {
        const paymentHistory = document.getElementById('payment-history');
        const transactionList = document.getElementById('transaction-list');

        if (paymentHistory) {
            paymentHistory.innerHTML = ''; // Clear current list

            transactions.filter(t => t.type === 'expense').forEach((transaction) => {
                const transactionHTML = `
                    <li>
                        ${transaction.date} - $${transaction.amount.toFixed(2)} (${transaction.description}) - ${transaction.status}
                    </li>
                `;
                paymentHistory.innerHTML += transactionHTML;
            });
        }

        if (transactionList) {
            transactionList.innerHTML = ''; // Clear current list

            transactions.forEach((transaction) => {
                const transactionHTML = `<li>${transaction.type === 'income' ? '+' : '-'} $${transaction.amount.toFixed(2)}</li>`;
                transactionList.innerHTML += transactionHTML;
            });
        }
    }

    // Wallet Page Specific Code
    if (document.querySelector('.wallet-page')) {
        updateBalance(); // Initial update of balance
        updateTransactionHistory(); // Initial population of transaction history

        document.querySelector('.deposit').addEventListener('click', function() {
            const amount = parseFloat(prompt('Enter deposit amount:'));
            if (amount) {
                balance += amount;
                updateBalance();
                addTransaction(amount, 'income', 'Deposit', 'completed');
            }
        });

        document.querySelector('.withdraw').addEventListener('click', function() {
            const amount = parseFloat(prompt('Enter withdrawal amount:'));
            if (amount && balance >= amount) {
                balance -= amount;
                updateBalance();
                addTransaction(amount, 'expense', 'Withdrawal', 'completed');
            } else if (amount > balance) {
                alert('Insufficient funds');
            }
        });
    }

    // Payments Page Specific Code
    if (document.querySelector('.payments-page')) {
        updateBalance(); // Update the balance when the Payments page loads
        updateTransactionHistory(); // Initial population of transaction history

        document.querySelectorAll('.pay-bill-btn').forEach(button => {
            button.addEventListener('click', function() {
                const billType = this.dataset.billType;
                const amount = parseFloat(prompt(`Enter the amount for ${billType}:`));
                if (amount) {
                    makePayment(amount, billType);
                }
            });
        });

        document.querySelectorAll('.send-money-btn').forEach(button => {
            button.addEventListener('click', function() {
                const friendName = prompt("Enter the friend's name:");
                const amount = parseFloat(prompt(`Enter the amount to send to ${friendName}:`));
                if (friendName && amount) {
                    sendMoney(amount, friendName);
                }
            });
        });
    }

    // Make Payment Function
    function makePayment(amount, billType) {
        if (balance < amount) {
            alert('Insufficient funds');
            addTransaction(amount, 'expense', billType, 'failed');
        } else {
            balance -= amount;
            updateBalance();
            addTransaction(amount, 'expense', billType, 'completed');
        }
    }

    // Send Money Function
    function sendMoney(amount, friendName) {
        if (balance < amount) {
            alert('Insufficient funds');
            addTransaction(amount, 'expense', `Send to ${friendName}`, 'failed');
        } else {
            balance -= amount;
            updateBalance();
            addTransaction(amount, 'expense', `Send to ${friendName}`, 'completed');
        }
    }

    // Common Theme Toggle Functionality
    document.querySelector('.theme-toggle')?.addEventListener('click', function() {
        theme = theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem('theme', theme); // Save the current theme to localStorage
    });
});
