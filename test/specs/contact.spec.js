import Contact from '../page-objects/contact.page';

describe('Contact page', () => {

    before('Navigate to contact page', () => {
        browser.url('/contact');
    });

    it('should navigate to login page', () => {
        Contact.login.moveToObject();
        Contact.login.waitForVisible();
        Contact.login.click();
        expect(browser.getUrl()).to.contain('/login');
    });

    it('should navigate to recipe store page', () => {
        Contact.recipeStore.moveToObject();
        Contact.recipeStore.waitForVisible();
        Contact.recipeStore.click();
        expect(browser.getUrl()).to.contain('/recipeStore');
    });

    it('should navigate to the register page', () => {
        Contact.register.moveToObject();
        Contact.register.waitForVisible();
        Contact.register.click();
        expect(browser.getUrl()).to.contain('/register');
    });

    it('should navigate to the search page', () => {
        Contact.search.moveToObject();
        Contact.search.waitForVisible();
        Contact.search.click();
        expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });

});
