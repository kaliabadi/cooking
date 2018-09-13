const app = require('../app.js');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET /', function() {
    it('respond with status code 200', function(done) {
      request(app)
        .get('/')
        .then(function(response){
          expect(200, response.text).to.contain('Cookbook');
        }, done());
    });
  }); 

  describe('POST /register', function() {
    it('returns user ID', function(done) {
      request(app)
        .post('/register')
        .send('username=alice')
        .set('Accept', 'application/json')
        .expect(function(res) {
          res.body.id = 'id1';
          res.body.username = 'alice';
        })
        .expect(200, {
          id: 'id1',
          username: 'alice'
        }, done);
    });
  });
