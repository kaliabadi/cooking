var assert = require('assert');

describe('cookbook page', () => {
  it('should have the right title', () => {
    browser.url('/');
    var title = browser.getTitle();
    browser.pause(1000)
    browser.saveScreenshot('homepage.png');
    assert.equal(title, 'Cookbook');
  });
});

describe('find recipe with apple', () => {
  it('should display an apple recipe', () => {
    browser.url('/');
    const input = $('#inputSearchQuery');
    input.setValue('apple');
    const button = $('button[href="#results"]');
    button.click();
    const recipe = $('th[class="list-group-item active"]');
    const recipeText = recipe.getText();
    browser.pause(1000)
    browser.saveScreenshot('recipe-search.png');
    assert.equal(true, recipeText === 'Recipe');
  })
});
