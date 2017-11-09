
var assert = require('assert');

describe('Registration page', function() {

  describe('registration with valid credentials', function() {

    it('shows registration success message', function () {
        browser.url('http://localhost:3000/register');
        browser.setValue('#inputUsername', 'JBfood');
        browser.setValue('#inputFirstname', 'Joe');
        browser.setValue('#inputLastname', 'Bloggs');
        browser.setValue('#inputPassword', 'hungry');
        browser.click('#btnRegister');
        assert.equal(browser.getText('#registerSuccess'), 'Thank you for registering');
    });

    it('redirects to homepage', function () {
        browser.url('http://localhost:3000/register');
        browser.setValue('#inputUsername', 'JBfood');
        browser.setValue('#inputFirstname', 'Joe');
        browser.setValue('#inputLastname', 'Bloggs');
        browser.setValue('#inputPassword', 'hungry');
        browser.click('#btnRegister');
        assert.equal(browser.getUrl(), 'http://localhost:3000/');
    });

  });

});
