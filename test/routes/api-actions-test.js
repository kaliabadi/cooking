var assert = require('assert');

describe('cookbook web site', () => {
  it('should have the right title', () => {
    browser.url('/');
    var title = browser.getTitle();
    browser.pause(1000)
    browser.saveScreenshot('homepage.png');
    assert.equal(title, 'Cookbook');
  });

  describe('display word recipe', () => {
    it('should display word recipe when lamb ingredient is provided', () => {
      browser.url('/');
      const input = $('#inputSearchQuery');
      input.setValue('lamb');
      const button = $('button[href="#results"]');
      button.click();
      const recipe = $('th[class="list-group-item active"]');
      const recipeText = recipe.getText();
      browser.pause(1000)
      browser.saveScreenshot('recipe-search.png');
      assert.equal(true, recipeText === 'Recipe');
    });

    it('should display word recipe when no ingredient is provided', () => {
      browser.url('/');
      const input = $('#inputSearchQuery');
      input.setValue('pork');
      const button = $('button[href="#results"]');
      button.click();
      const recipe = $('th[class="list-group-item active"]');
      const recipeText = recipe.getText();
      assert.equal(true, recipeText === 'Recipe');
    });
  });

  describe('from recipeStore page', () => {
    it('should be redirected to homepage when clicking "back to search" button', () => {
      browser.url('/recipeStore')
      browser.pause(1000)
      const button = $('a[href="/"]')
      button.click();
      browser.pause(1000)
      var title = browser.getTitle();
      assert.equal(title, 'Cookbook');
    });

    it('should be able to add a new recipe', () => {
      browser.url('/recipeStore')
      browser.pause(1000)
      const recipeName = $('#inputRecipeName');
      recipeName.setValue('parmigiana');

      const cookingTime = $('#inputCookingTime');
      cookingTime.setValue('120 mins');

      const ingredients = $('#inputIngredients');
      ingredients.setValue('eggplant, parmigiano, mozzarella');

      const method = $('#inputMethod');
      method.setValue('baked');

      const addRecipeButton = $('#btnAddRecipe')
      addRecipeButton.click();

      // Test that something new should appear here. If it doens't then should fail.
      browser.pause(2000)
    });
  })
});
