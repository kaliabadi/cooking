const HomePage = require('../lib/routes');
const app = require('../app.js');
const expect = require('chai').expect;
const assert = require('chai').assert;
const express = require('express');
const request = require('supertest');

// import HomePage from '../lib/routes';

describe('CookingHomepage', () => {
var url = 'http://localhost:3000';


describe('GET /', function() {
    it('respond with status code 200', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});     