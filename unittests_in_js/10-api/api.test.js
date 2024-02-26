// Task 10 - Deep equality & Post integration testing

const request = require('request');
const expect = require('chai').expect;

describe('Cart page', function() {
    it('should return 200 and correct message for numeric id', function(done) {
        request.get('http://localhost:7865/cart/12', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Payment methods for cart 12');
            done();
        });
    });

    it('should return 404 for non-numeric id', function(done) {
        request.get('http://localhost:7865/cart/hello', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

});

describe('test suite for index page', function() {
    it('should return 200 when everything is all good', function(done) {
        request.get('http://localhost:7865', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should welcome us warmly', function(done) {
        request.get('http://localhost:7865', function(error, response, body) {
            expect(body).to.equal('Welcome to the payment system');
            done();
        });
    });
});

describe('test suite for available payment methods', function() {
    it('should return payment methods object', function(done) {
        request.get('http://localhost:7865/available_payments', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body)).to.deep.equal({
                payment_methods: {
                    credit_cards: true,
                    paypal: false
                }
            });
            done();
        });
    });
});

describe('test suite for logging in featuring our dear old Betty', function() {
    it('should welcome a user when username is provided', function(done) {
        const options = {
            url: 'http://localhost:7865/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: 'Betty' })
        };

        request(options, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Welcome Betty');
            done();
        });
    });
});
