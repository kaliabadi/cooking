
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

  describe('registration with invalid credentials', function() {

    afterEach(() => {
      if(browser.alertText()) {
        browser.alertDismiss();
      }
    });

    describe('without a username', function() {

      it('shows alert message', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');
          assert.equal(browser.alertText(), 'Please fill in all fields');
      });

      it('does not redirect to homepage', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');

          assert.equal(browser.getUrl(), 'http://localhost:3000/register');
      });

    });

    describe('without a firstname', function() {

      it('shows alert message', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');
          assert.equal(browser.alertText(), 'Please fill in all fields');
      });

      it('does not redirect to homepage', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');
          assert.equal(browser.getUrl(), 'http://localhost:3000/register');
      });

    });

    describe('without a lastname', function() {

      it('shows alert message', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');
          assert.equal(browser.alertText(), 'Please fill in all fields');
      });

      it('does not redirect to homepage', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputPassword', 'hungry');
          browser.click('#btnRegister');
          assert.equal(browser.getUrl(), 'http://localhost:3000/register');
      });

    });

    describe('without a password', function() {

      it('shows alert message', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.click('#btnRegister');
          assert.equal(browser.alertText(), 'Please fill in all fields');
      });

      it('does not redirect to homepage', function () {
          browser.url('http://localhost:3000/register');
          browser.setValue('#inputUsername', 'JBfood');
          browser.setValue('#inputFirstname', 'Joe');
          browser.setValue('#inputLastname', 'Bloggs');
          browser.click('#btnRegister');
          assert.equal(browser.getUrl(), 'http://localhost:3000/register');
      });

    });

  });

  it('does not show the password while the user is typing', function() {
    browser.url('http://localhost:3000/register');
    console.log(browser.getAttribute('#inputPassword', 'type'))
    assert.equal(browser.getAttribute('#inputPassword', 'type'), 'password');
  });

});
