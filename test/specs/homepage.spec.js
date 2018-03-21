import HomePage from '../page-objects/home.page';

describe('Cooking homepage', () => {

  before ('Navigate to homepage', () => {
    browser.url('/');
    });

  it('should navigate to contact page', () => {
    HomePage.contact.moveToObject();
    HomePage.contact.waitForVisible();
    HomePage.contact.click();
    expect(browser.getUrl()).to.equal('http://localhost:3000/contact');
  });

});
