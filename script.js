let conversionRates = {
    INR: 1,
    USD: 80,
    EUR: 90,
    GBP: 100
};

async function updateConversionRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        const data = await response.json();
        conversionRates = {
            INR: 1,
            USD: 1 / data.rates.USD,
            EUR: 1 / data.rates.EUR,
            GBP: 1 / data.rates.GBP
        };
        updateAllExpenses();
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
    }
}

updateConversionRates();
setInterval(updateConversionRates, 30000); 

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateAllExpenses();
}

function updateTotalAmount() {
    const total = expenses.reduce((sum, expense) => {
        return sum + (expense.amount * conversionRates[expense.currency]);
    }, 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function displayExpenses() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const amountInINR = expense.amount * conversionRates[expense.currency];
        
        const expenseCard = document.createElement('div');
        expenseCard.className = 'expense-card';
        expenseCard.innerHTML = `
            <h4>${expense.title}</h4>
            ${expense.description ? `<p>${expense.description}</p>` : ''}
            <p class="expense-amount">
                Paid in ${expense.currency}: ${expense.amount}
                (₹${amountInINR.toFixed(2)})
            </p>
            <div class="card-actions">
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="showDeleteConfirmation(${index})">Delete</button>
            </div>
        `;
        expensesList.appendChild(expenseCard);
    });

    updateTotalAmount();
}

function updateAllExpenses() {
    displayExpenses();
}

function validateAmount(amount) {
    const amountError = document.getElementById('amountError');
    if (amount <= 0) {
        amountError.textContent = 'Please enter a positive amount';
        amountError.style.display = 'block';
        return false;
    }
    amountError.style.display = 'none';
    return true;
}

document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    if (!validateAmount(amount)) {
        return;
    }

    const expense = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value.trim(),
        amount: amount,
        currency: document.getElementById('currency').value
    };

    expenses.push(expense);
    saveExpenses();
    
    e.target.reset();
});

const deleteModal = document.getElementById('deleteModal');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');
let currentDeleteIndex = null;

function showDeleteConfirmation(index) {
    currentDeleteIndex = index;
    deleteModal.style.display = 'flex';
}

function hideDeleteConfirmation() {
    deleteModal.style.display = 'none';
    currentDeleteIndex = null;
}

function deleteExpense() {
    if (currentDeleteIndex !== null) {
        expenses.splice(currentDeleteIndex, 1);
        saveExpenses();
        hideDeleteConfirmation();
    }
}

cancelDelete.addEventListener('click', hideDeleteConfirmation);
confirmDelete.addEventListener('click', deleteExpense);

deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        hideDeleteConfirmation();
    }
});

function editExpense(index) {
    const expense = expenses[index];
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.getElementById('title').value = expense.title;
    document.getElementById('description').value = expense.description || '';
    document.getElementById('amount').value = expense.amount;
    document.getElementById('currency').value = expense.currency;

    expenses.splice(index, 1);
    saveExpenses();
}
