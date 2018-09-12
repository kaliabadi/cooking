const HomePage = require('../lib/routes');
const app = require('../app.js');
const expect = require('chai').expect;
const assert = require('chai').assert;
const express = require('express');
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