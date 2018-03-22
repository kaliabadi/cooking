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

});
