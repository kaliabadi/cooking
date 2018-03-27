import RecipeStore from '../page-objects/recipeStore.page';

describe('Cooking homepage', () => {

    before('Navigate to Homepage', () => {
        browser.url('/recipeStore');
    });

    it('should navigate to search page', () => {
        RecipeStore.search.moveToObject();
        RecipeStore.search.waitForVisible();
        RecipeStore.search.click();
        expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });

    it('should navigate to contact page', () => {
        RecipeStore.contact.moveToObject();
        RecipeStore.contact.waitForVisible();
        RecipeStore.contact.click();
        expect(browser.getUrl()).to.contain('/contact');
    });

    it('should navigate to login page', () => {
        RecipeStore.login.moveToObject();
        RecipeStore.login.waitForVisible();
        RecipeStore.login.click();
        expect(browser.getUrl()).to.contain('/login');
    });

    it('should navigate to the register page', () => {
        RecipeStore.register.moveToObject();
        RecipeStore.register.waitForVisible();
        RecipeStore.register.click();
        expect(browser.getUrl()).to.contain('/register');
    });
});
