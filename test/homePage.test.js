const app = require('../app.js');
const expect = require('chai').expect;
const request = require('supertest');
const nock = require('nock');

var user = nock('http://localhost:3000')
.get('/register')
.query({
    username: ['alice'],
    password: ['fantasticPssword'],
    firstname: ['Alice'],
    lastname: ['InWonderland']
    })
.reply(200, {results: [{id: 'id1'}]});


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
        .expect({
          id: 'id1',
          username: 'alice'
        }, done);
    });
  });

// describe('POST /register', function(){
//   it('returns userId', function(){
//     // submit user details through a form
//     // Send user detail in request to database
//     // how do we connect to the DB?
//     // how to we return data from MongoDB? What datatype?

//     var collection = req.db.get(config.dataBase);
//     user;
//     expect(collection).to.contain('id1')

//   })
// });