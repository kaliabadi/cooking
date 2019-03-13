var assert = require('assert');

describe('cookbook web site', () => {
  it('should have the right title', () => {
    browser.url('/');
    var title = browser.getTitle();
    browser.pause(1000)
    browser.saveScreenshot('homepage.png');
    assert.equal(title, 'Cookbook');
  });

  describe('search for a recipe', () => {
    it('should display recipes with lamb if there are some', () => {
      // How do I test that?
      browser.url('/');
      const input = $('#inputSearchQuery');
      input.setValue('lamb');
      const button = $('button[href="#results"]');
      button.click();

      var textWithLambWord = browser.getText("//*[contains(text(),'lamb')]")

      assert.equal(true, textWithLambWord);
    });

    it('should display message saying there arent any recipies with this ingrediente', () => {
      browser.url('/');
      const input = $('#inputSearchQuery');
      input.setValue('pork');
      const button = $('button[href="#results"]');
      button.click();
      const recipe = $('th[class="list-group-item active"]');
      const recipeText = recipe.getText();
      assert.equal(true, recipeText === 'Recipe');
    });

    it('when no ingredient is given, should display message saying ingredient must be provided ', () => {
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
      const backToSearchButton = $('a[href="/"]')
      backToSearchButton.click();
      var title = browser.getTitle();
      assert.equal(title, 'Cookbook');
    });

    it('after entering required info, should add recipe to the list', () => {
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

      // Test there is a new row on table, and recipe name should correspond with given recipe name.
      browser.debug();

    });
  })
});
