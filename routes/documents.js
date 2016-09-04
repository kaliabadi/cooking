var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/documentlist', function(req, res) {
    var db = req.db;
    var collection = db.get('test');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/documentlist/:query', function(req, res) {
    var db = req.db;
    var collection = db.get('test');
    var query = req.params.query;
    collection.find({},{},function(e,docs){
        var recipes = [];
        docs.forEach(function(recipe) {
            if (recipe.ingredients = query) {
                recipes.push(recipe);
            }
        });
        res.json(recipes);
    });
});

router.post('/adddocument', function(req, res) {
    var db = req.db;
    var collection = db.get('test');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deletedocument/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('test1¡');
    var documentToDelete = req.params.id;
    collection.remove({ '_id' : documentToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/recipesearch/:query', function(req, res, next){
    var query = req.params.query;
    function makeHttpRequest(query, callback) {
        var options = {
            host: 'food2fork.com',
            path: '/api/search?key=c0172c962f73f5feeaddc283613ce9ef&q=' + query
        };

        return http.get(options, function(res) {
            console.log('got response' + res.statusCode);
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function(res){
                var parsed = JSON.parse(body);
                callback({
                    parsed: parsed.recipes
                });
            });
        });
    };

   makeHttpRequest(query, function(returnValue){
        res.json(returnValue);
   });
});

module.exports = router;
