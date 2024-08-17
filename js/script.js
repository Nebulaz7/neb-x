/* login page code */
function btnAction() {
	let username = document.querySelector("#username").value;
	let password = document.querySelector("#password").value;
console.log(username);	
console.log(password);

};
/* login code ends*/


 // wallet code begins
let transactions = [
		 { id: 1, amount: 100, type: 'income' },
		 { id: 2, amount: 50, type: 'expense' },
		 { id: 3, amount: 200, type: 'income' },
		 ]; 
		 // sample data
		let balance = 0;
		let theme = 'light';

		// update balance
		balance = transactions.reduce((acc, cur) => {
			if (cur.type === 'income') {
				return acc + cur.amount;
			} else {
				return acc - cur.amount;
			}
		}, 0);
		document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;

		// populate transaction list
		transactions.forEach((transaction) => {
			const transactionHTML = `
				<li>
					${transaction.type === 'income' ? '+' : '-'} $${transaction.amount}
				</li>
			`;
			document.getElementById('transaction-list').innerHTML += transactionHTML;
		});

		// add transaction
		function addTransaction(amount, type) {
			const transactionHTML = `
				<li>
					${amount} <span>(${type})</span>
				</li>
			`;
			document.getElementById('transaction-list').innerHTML += transactionHTML;
		}

		// deposit
		function deposit() {
			const amount = prompt('Enter deposit amount:');
			if (amount) {
				balance += parseFloat(amount);
				document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
				addTransaction(`+ $${amount}`, 'credited');
				animateBalanceUpdate();
			}
		}

		// withdraw
		function withdraw() {
			const amount = prompt('Enter withdrawal amount:');
			if (amount) {
				balance -= parseFloat(amount);
				document.getElementById('balance').innerText = `$${balance.toFixed(2)}`;
				addTransaction(`- $${amount}`, 'debited');
				animateBalanceUpdate();
			}
		}

		// toggle theme
		function toggleTheme() {
			if (theme === 'light') {
				document.body.classList.add('dark-theme');
				theme = 'dark';
			} else {
				document.body.classList.remove('dark-theme');
				theme = 'light';
			}
			// update styles for other elements
		}
		function blur() {
		   document.querySelector("#balance").innerText = "****"
		};

		// animate balance update
		function animateBalanceUpdate() {
			const balanceElement = document.getElementById('balance');
			balanceElement.classList.add('animate');
			setTimeout(() => {
				balanceElement.classList.remove('animate');
			}, 1000);
		}
		function openNav() {
		document.getElementById("mySidenav").style.width = "250px";
		};
		
		function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
		};
		
		let availableBalance = document.querySelector("#balance");
		let isHidden = false;
		
	  function hideBal() {
	    if(!isHidden){
	     	availableBalance.style.filter = "blur(5px)";
	    	isHidden = true;
	    }
	    else{
	     	availableBalance.style.filter = "none";
	    	isHidden = false;
	    }
	    
	  };
		
		// wallet code ends