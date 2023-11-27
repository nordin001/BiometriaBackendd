// test.js
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
// Import the function to test from yourCode.js
const { addNumbers } = require('../app/js/server');
const { registro } = require('../app/js/server');
const registeroPHP = require('../src/registro.php');


describe('addNumbers function', () => {
  it('should correctly add two numbers', () => {
    const result = addNumbers(2, 3);
    expect(result).to.equal(5);
  });

  // Add more test cases as needed
});



describe('registerUser function', () => {
  it('should register a new user', async () => {
    // Create a sinon stub to mock the PHP file or HTTP request
    const phpFileStub = sinon.stub(registeroPHP, 'yourPhpFunction').resolves('success');

    // Call registerUser
    const result = await registerUser(/* parameters */);

    // Assert the result and ensure the PHP file or HTTP request was called
   expect(result).to.equal('success');
    sinon.assert.calledOnce(phpFileStub);

    // Restore the original function after the test
    phpFileStub.restore();
  });
});
