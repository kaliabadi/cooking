const assert = require('assert');
const request = require('supertest');
const app = require('../../app')

describe('food2fork api', function () {
  it('should return json', function(done) {
    request(app)
      .get('/documents/recipesearch/pasta')
      .expect(function(resp) {
        assert.equal(resp.body.spaghetti, "carbonara");
      })
      .expect(200, done);
  });
});
