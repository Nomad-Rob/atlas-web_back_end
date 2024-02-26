// Task 10 - Deep equality & Post integration testing

const request = require('request');
const { expect } = require('chai');

// Main describe block for the API
describe('API Tests', function () {
    // Test suite for the Index page
    describe('GET /', () => {
        it('should return the correct status code and result', (done) => {
            request('http://localhost:7865', (error, response, body) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Welcome to the payment system');
                done();
            });
        });
    });

    // Test suite for the Cart page
    describe('GET /cart/:id', () => {
        it('should return correct status and result for a valid id', (done) => {
            request('http://localhost:7865/cart/12', (error, response, body) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Payment methods for cart 12');
                done();
            });
        });

        it('should return 404 for a non-numeric id', (done) => {
            request('http://localhost:7865/cart/hello', (error, response) => {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    // Test suite for the /login endpoint
    describe('POST /login', () => {
        it('should welcome the user with correct status code and message', (done) => {
            request.post({
                url: 'http://localhost:7865/login',
                json: { userName: 'Betty' }
            }, (error, response, body) => {
                if (error) return done(error);
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Welcome Betty');
                done();
            });
        });
    });

    // Test suite for the /available_payments endpoint
    describe('GET /available_payments', () => {
        it('should return the correct status code and payment methods', (done) => {
            request('http://localhost:7865/available_payments', (error, response, body) => {
                if (error) return done(error);
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
});
