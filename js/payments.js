// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

    // Payment functionality
    function makePayment(amount, billType) {
        // Assuming '

// Update balance
balance = transactions.reduce((acc, cur) => {
  if (cur.type === 'income') {
    return acc + cur.amount;
  } else {
    return acc - cur.amount;
  }
}, 0);
document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;

        if (balance < amount) {
            alert('Insufficient funds');
            addTransaction(amount, 'expense', billType, 'failed');
            return;
        }

        balance -= amount;
        document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
        addTransaction(amount, 'expense', billType, 'completed');
        populatePaymentsHistory();
    }

    // Send money to friends
    function sendMoney(amount, friendName) {
        if (balance < amount) {
            alert('Insufficient funds');
            addTransaction(amount, 'expense', `Send to ${friendName}`, 'failed');
            return;
        }

        balance -= amount;
        document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
        addTransaction(amount, 'expense', `Send to ${friendName}`, 'completed');
        populatePaymentsHistory();
    }

    // Populate payment history
    function populatePaymentsHistory() {
        const paymentHistory = document.getElementById('payment-history');
        paymentHistory.innerHTML = '';
        transactions.filter(t => t.type === 'expense').forEach((transaction) => {
            const transactionHTML = `
                <li>
                    ${transaction.date} - $${transaction.amount} (${transaction.description}) - ${transaction.status}
                </li>
            `;
            paymentHistory.innerHTML += transactionHTML;
        });
    }

    // Add event listeners for the "Pay Bills" buttons
    document.querySelectorAll('.pay-bill-btn').forEach(button => {
        button.addEventListener('click', function () {
            const billType = this.dataset.billType;
            const amount = parseFloat(prompt(`Enter the amount for ${billType}:`));
            if (amount) {
                makePayment(amount, billType);
            }
        });
    });

    // Add event listener for the "Send Money" button
    document.querySelector('.send-money-btn').addEventListener('click', function () {
        const friendName = prompt("Enter the friend's name:");
        const amount = parseFloat(prompt(`Enter the amount to send to ${friendName}:`));
        if (friendName && amount) {
            sendMoney(amount, friendName);
        }
    });

    // Initial population of payment history when the page loads
    populatePaymentsHistory();
});
