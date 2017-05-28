var express = require('express');
var router = express.Router();
var http = require('http');
var config = require('../../config');
var apiActions = require('../api-actions');

router.get('/documentlist', function(req, res) {
    apiActions.getDocuments(req, function(data, err) {
        res.json(data);
    });
});

router.get('/documentlist/:query', function(req, res) {
    apiActions.getDocument(req, req.params.query, function (data) {
        res.json(data);
    });
});

router.post('/adddocument', function(req, res) {
    var collection = req.db.get(config.dataBase);

    collection.insert(req.body, function(err){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deletedocument/:id', function(req, res) {
    var collection = req.db.get(config.dataBase);

    collection.remove({ '_id' : req.params.id }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/recipesearch/:query', function(req, res){
    var query = req.params.query;
    var host = 'food2fork.com';
    var path = '/api/search?key=c0172c962f73f5feeaddc283613ce9ef&q=';

    apiActions.makeHttpRequest(query, host, path, res, function(returnValue){
        res.json(returnValue);
    });
});

module.exports = router;
