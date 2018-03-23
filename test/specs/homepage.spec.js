import HomePage from '../page-objects/home.page';

describe('Cooking homepage', () => {

  before ('Navigate to Homepage', () => {
    browser.url('/');
    });

  it('should navigate to contact page', () => {
    HomePage.contact.moveToObject();
    HomePage.contact.waitForVisible();
    HomePage.contact.click();
    expect(browser.getUrl()).to.contain('/contact');
  });

  it('should navigate to recipe store page', () => {
    HomePage.recipeStore.moveToObject();
    HomePage.recipeStore.waitForVisible();
    HomePage.recipeStore.click();
    expect(browser.getUrl()).to.contain('/recipeStore');
  });

  it ('should navigate to login page', () => {
    HomePage.login.moveToObject();
    HomePage.login.waitForVisible();
    HomePage.login.click();
    expect(browser.getUrl()).to.contain('/login');
  });
});
