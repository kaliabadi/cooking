var request = require('request');

describe('homepage', function () {
    it('should respond to GET', function () {
        request('http://localhost:8080', function (error, response, body) {
            expect(response.status).to.equal(200);
        })
    })

    it('should respond to GET2', function () {
        request('http://localhost:8080', function (error, response, body) {
            expect(response.status).to.equal(200);
        })
    })

    it('is it cached maybe?', function () {
        request('http://localhost:8080', function (error, response, body) {
            expect(response.status).to.equal(200);
        })
    })
});
