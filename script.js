const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2,
	pin: 1111,
};
const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};
const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};
const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};
const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector('.welcome');
const containerApp = document.querySelector('.app');
const labelBalance = document.querySelector('.balance_value');
const labelSumIn = document.querySelector('.summary_value_in');
const labelSumOut = document.querySelector('.summary_value_out');
const labelSumInterest = document.querySelector('.summary_value_interest');
const btnLogin = document.querySelector('.login-btn');
const inputLoginUsername = document.querySelector('.login_input-user');
const inputLoginPin = document.querySelector('.login_input-pin');
const containerMovements = document.querySelector('.transcations');
const inputTransferTo = document.querySelector('.transfer-to');
const inputTransferAmount = document.querySelector('.transfer-amount');
const btnTransfer = document.querySelector('.form-btn');
const btnClose = document.querySelector('.close-btn');
const inputCloseUsername = document.querySelector('.close-username');
const inputClosePin = document.querySelector('.close-pin');

const displayMovement = function (movements) {
	containerMovements.innerHTML = '';

	movements.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposits' : 'withdrawals';
		const html = `
    <div class="movement_row">
						<p class="movement_type movement_${type}">${i + 1}${type}</p>
						<p class="movement_value">${mov}</p>
					</div>

    `;
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};
// console.log(containerMovements.innerHTML);
const calcDisplaybalance = function (acc) {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${acc.balance}EUR`;
};

const calcDisplaySummary = function (movements) {
	const incomes = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes}EUR`;

	const out = movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${Math.abs(out)}EUR`;

	const interest = movements
		.filter((mov) => mov > 0)
		.map((deposits) => (deposits * 1.2) / 100)
		.filter((int, i, arr) => {
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest}EUR`;
};
calcDisplaySummary(account1.movements);

const createUsername = function (accs) {
	accs.forEach(function (acc) {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map((name) => name[0])
			.join('');
	});
};

createUsername(accounts);

const updateUI = function (acc) {
	displayMovement(acc.movements);

	calcDisplaybalance(acc);

	// calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
	e.preventDefault();

	currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);

	console.log(currentAccount);
	// console.log(inputLoginUsername.value);
	// console.log(currentAccount.username);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
		containerApp.style.opacity = 100;

		inputLoginUsername.value = inputLoginPin.value = ' ';
		inputLoginPin.blur();

		updateUI(currentAccount);
	}
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();
	// console.log('delete');
	console.log(inputCloseUsername.value);
	console.log(currentAccount.username);
	if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
		console.log('hy');
	}
});

// console.log(inputLoginusername);
// console.log(accounts);
// console.log(account1.movements);
