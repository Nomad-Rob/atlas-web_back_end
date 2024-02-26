// Task 10- Deep equality & Post integration testing

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for the index page
app.get('/', (req, res) => res.send('Welcome to the payment system'));

// Route for cart items, using a regex to ensure id is a number
app.get('/cart/:id(\\d+)', (req, res) => {
    const { id } = req.params;
    res.send(`Payment methods for cart ${id}`);
});

// Route for available payments
app.get('/available_payments', (req, res) => {
    res.json({
        payment_methods: {
            credit_cards: true,
            paypal: false
        }
    });
});

// Route for user login
app.post('/login', (req, res) => {
    const { userName } = req.body;
    res.send(`Welcome ${userName}`);
});

// Start the server
app.listen(7865, () => console.log('API available on localhost port 7865'));
