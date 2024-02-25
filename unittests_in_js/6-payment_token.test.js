// Task 6 - Async tests with done

const expect = require('chai').expect;
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function() {
  it('should return a resolved promise with a success message when true is passed', function(done) {
    getPaymentTokenFromAPI(true)
      .then(response => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Indicate test completion
      })
      .catch(error => {
        done(error); // Fail the test with the error
      });
  });
});
