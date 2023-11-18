//in order to test  a file it should be :function.test.js 
//and it will find it auto


//------------this a test to the function addNumbers
const { addNumbers } = require('../app/js/server');
const chai = require('chai');
const { expect } = chai;
describe('addNumbers function 2', () => { //optional : for the description
    it('should correctly add two numbers', () => {
      const result = addNumbers(3, 3);
      expect(result).to.equal(6);
    });
    // Add more test cases as needed
  });