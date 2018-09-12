const HomePage = require('../lib/routes');
const expect = require('chai').expect;

// import HomePage from '../lib/routes';

describe('CookingHomepage', () => {
var url = 'http://localhost:3000';


    it('return status code 2000', () => {
        request(url, function(error, response, body){
            expect(response.statusCode).to.equal(200);
        })
    });
    
});     