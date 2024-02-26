// Task 10- Deep equality & Post integration testing

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the payment system');
});

app.get('/cart/:id(\\d+)', (req, res) => {
    const idToSend = req.params.id;
    res.status(200).send(`Payment methods for cart ${idToSend}`);
});

app.get('/available_payments', (req, res) => {
    res.status(200).json({
        payment_methods: {
            credit_cards: true,
            paypal: false
        }
    });
});

app.post('/login', (req, res) => {
    const userName = req.body.userName;
    res.status(200).send(`Welcome ${userName}`);
});

app.listen(7865, () => {
    console.log('API available on localhost port 7865');
});

module.exports = app;
