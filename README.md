# Expense Tracker

A vanilla JavaScript expense tracking application that helps users manage and track their expenses with real-time currency conversion.

## Features

### 1. Expense Management
- **Add Expenses**: Users can add new expenses with:
  - Title (required)
  - Description (optional)
  - Amount (required, positive numbers only)
  - Currency selection (INR, USD, EUR, GBP)

- **Edit Expenses**: 
  - Click the "Edit" button on any expense card
  - Form is pre-filled with expense details
  - Submit to update the expense

- **Delete Expenses**: 
  - Custom confirmation modal for delete actions
  - Click outside modal to cancel
  - Prevents accidental deletions

### 2. Currency Conversion
- Real-time currency conversion to INR
- Supports multiple currencies:
  - Indian Rupee (INR)
  - US Dollar (USD)
  - Euro (EUR)
  - British Pound (GBP)
- Automatic rate updates every hour
- Displays both original amount and INR equivalent

### 3. Total Expense Tracking
- Maintains a running total of all expenses in INR
- Updates automatically when:
  - Adding new expenses
  - Editing existing expenses
  - Deleting expenses
  - Currency rates change

### 4. Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly buttons and inputs
- Readable typography across devices

### 5. Data Persistence
- All expenses are saved automatically
- Survives page reloads
- No data loss between sessions

## APIs Used

### 1. Local Storage API
The Browser's Local Storage API is used for client-side data persistence.

**Features:**
- Stores data as key-value pairs
- Data persists even after browser is closed
- Storage limit of 5-10 MB (varies by browser)

**Implementation:**
```javascript
// Save data
localStorage.setItem('expenses', JSON.stringify(expenses));

// Retrieve data
const savedExpenses = localStorage.getItem('expenses');

// Parse stored data
expenses = JSON.parse(savedExpenses) || [];
```

**Benefits:**
- No server required
- Fast data access
- Works offline
- No external dependencies

### 2. Exchange Rate API
The application uses the Exchange Rate API (https://api.exchangerate-api.com) for currency conversion.

**Features:**
- Real-time exchange rates
- Multiple currency support
- Free tier available
- JSON response format

**Implementation:**
```javascript
// API Endpoint
const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR';

// Fetch exchange rates
async function updateConversionRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Process and store conversion rates
}

// Update frequency every 30 Seconds
setInterval(updateConversionRates, 30000); 
```

**Response Format:**
```json
{
    "base": "INR",
    "rates": {
        "USD": 0.012,
        "EUR": 0.011,
        "GBP": 0.0095
    }
}
```

## Technical Implementation

### Local Storage
The application uses the Browser's Local Storage API to:
- Save expenses automatically
- Persist data between sessions
- Load saved expenses on page load

```javascript
// Save expenses
localStorage.setItem('expenses', JSON.stringify(expenses));

// Load expenses
expenses = JSON.parse(localStorage.getItem('expenses')) || [];
```

### Currency API
Uses the Exchange Rate API (api.exchangerate-api.com) for:
- Real-time currency conversion
- Hourly rate updates
- Conversion to INR base currency

```javascript
// API endpoint
'https://api.exchangerate-api.com/v4/latest/INR'

// Update frequency every 30 Seconds
setInterval(updateConversionRates, 30000);
```

### Input Validation
- Prevents negative amounts
- Requires essential fields (title, amount)
- Shows error messages for invalid inputs
- Validates data before saving

### Event Handling
- Form submission for adding expenses
- Click events for edit/delete actions
- Modal interaction handling
- Automatic updates on currency changes

## Browser Support
The application uses standard web APIs and should work in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## File Structure
- `index.html`: Main HTML structure
- `styles.css`: All styling and responsive design
- `script.js`: Application logic and API integration
