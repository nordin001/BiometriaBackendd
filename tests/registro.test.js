const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');
const fs = require('fs');

// Load the JavaScript and HTML files
const { registro } = require('../app/js/server');
//const registeroPHP = require('../src/registro.php');
const registerHtml = fs.readFileSync('../src/registro.php', 'utf-8');

// Mock the jQuery AJAX method
sinon.stub(jQuery, 'ajax').yieldsTo('success', { success: true });

describe('Registration Process', () => {
  let window;

  before(() => {
    // Create a virtual DOM for testing
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <form id="registrationForm">
            <!-- Your form elements go here -->
          </form>
          <script>${registroJs}</script>
        </body>
      </html>
    `);

    window = dom.window;
  });

  after(() => {
    // Restore the original jQuery AJAX method
    jQuery.ajax.restore();
  });

  it.only('should register a user on form submission', () => {
    // Trigger the form submission
    const form = window.document.getElementById('registrationForm');
    const event = window.document.createEvent('Event');
    event.initEvent('submit', true, true);
    form.dispatchEvent(event);

    // Perform assertions
    // For example, check if jQuery.ajax was called with the correct parameters
    expect(jQuery.ajax.calledOnce).to.be.true;
    expect(jQuery.ajax.firstCall.args[0]).to.deep.equal({
      url: 'register.php',
      type: 'POST',
      data: {
        // ...your data
      },
      dataType: 'json',
    });
  });
});
