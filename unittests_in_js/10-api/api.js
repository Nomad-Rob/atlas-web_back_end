// Task 10- Deep equality & Post integration testing

const express = require('express');
const app = express();
const port = 7865;

app.use(express.json()); // This middleware is required to parse JSON bodies.

app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

app.post('/login', (req, res) => {
  const { userName } = req.body;
  res.send(`Welcome ${userName}`);
});

app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
