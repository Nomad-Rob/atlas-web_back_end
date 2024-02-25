// Task 8 - Basic Integration Testing

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// New endpoint for /cart/:id
app.get('/cart/:id(\\d+)', (req, res) => { // Regex to ensure :id is a number
  const { id } = req.params;
  res.send(`Payment methods for cart ${id}`);
});

// Endponig for available_payments
app.get('/available_payments', function (req, res) {
  res.json({
      payment_methods: {
          credit_cards: true,
          paypal: false
      }
  });
});

// Endpoint for /login
app.post('/login', function (req, res) {
  const userName = req.body.userName;
  res.send(`Welcome ${userName}`);
});

app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});

module.exports = app; // Export for testing
