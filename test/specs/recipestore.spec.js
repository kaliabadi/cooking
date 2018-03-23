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
});
