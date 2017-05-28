var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../../config');
var apiActions = require('../api-actions');

router.get('/documentlist', function(req, res) {
    var userId = 'j:"' + req.cookies.cookinguser + '"';
    
    apiActions.getDocuments(req.db.get(config.recipes), userId, function(data) {
        res.json(data);
    });
});

router.get('/documentlist/:query', function(req, res) {
    var userId = 'j:"' + req.cookies.cookinguser + '"';
    var query = decodeURI(req.params.query);

    apiActions.getDocument(req.db.get(config.recipes), userId, query, function (data) {
        res.json(data);
    });
});

router.post('/adddocument', function(req, res) {
    apiActions.addDocument(req.db.get(config.recipes), req.body, function() {
        res.send()
    });
});

router.delete('/deletedocument/:id', function(req, res) {
    apiActions.removeDocument(req.db.get(config.recipes), req.params.id, function() {
        res.send()
    })
});

router.get('/recipesearch/:query', function(req, res){
    var httpDetails = {
        query: req.params.query,
        host: 'food2fork.com',
        path: '/api/search?key=c0172c962f73f5feeaddc283613ce9ef&q='
    };
    
    apiActions.makeHttpRequest(httpDetails, res, function(returnValue){
        res.json(returnValue);
    });
});

module.exports = router;
