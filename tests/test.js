// test.js
const chai = require('chai');
const { expect } = chai;

// Import the function to test from yourCode.js
const { addNumbers } = require('../app/js/server');

describe('addNumbers function', () => {
  it('should correctly add two numbers', () => {
    const result = addNumbers(2, 3);
    expect(result).to.equal(5);
  });

  // Add more test cases as needed
});
