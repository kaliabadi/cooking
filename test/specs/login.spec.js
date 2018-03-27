import Login from '../page-objects/login.page';

describe('Login page', () => {

    before('Navigate to login page', () => {
        browser.url('/login');
    });

    it('should navigate to contact page', () => {
        Login.contact.moveToObject();
        Login.contact.waitForVisible();
        Login.contact.click();
        expect(browser.getUrl()).to.contain('/contact');
    });

    it('should navigate to recipe store page', () => {
        Login.recipeStore.moveToObject();
        Login.recipeStore.waitForVisible();
        Login.recipeStore.click();
        expect(browser.getUrl()).to.contain('/recipeStore');
    });

    it('should navigate to the register page', () => {
        Login.register.moveToObject();
        Login.register.waitForVisible();
        Login.register.click();
        expect(browser.getUrl()).to.contain('/register');
    });

    it('should navigate to the search page', () => {
        Login.search.moveToObject();
        Login.search.waitForVisible();
        Login.search.click();
        expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });

});
