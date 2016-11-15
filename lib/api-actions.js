'use strict';

var http = require('http');
var config = require('../config');
var _ = require('lodash');

var actions = {
    getDocuments: function (req, next) {
        var collection = req.db.get(config.dataBase);

        collection.find({}, {}, function(e, docs){
            next(docs);
        });
    },
    getDocument: function(req, query, next) {
        var collection = req.db.get(config.dataBase);
        var query = decodeURI(query);

        collection.find({},{},function(e,docs){
            var recipes = [];
            docs.forEach(function(recipe) {
                if (_.includes(recipe.ingredients.toUpperCase(), query.toUpperCase())) {
                    recipes.push(recipe);
                }
            });
            next(recipes);
        });
    },
    getDocumentByTitle: function(req, query, next) {
        var collection = req.db.get(config.dataBase);
        var query = decodeURI(query);

        collection.find({},{},function(e,docs){
            var recipes = [];
            docs.forEach(function(recipe) {
                if (recipe.recipeName = query) {
                    recipes.push(recipe);
                }
            });
            next(recipes);
        });
    },
    makeHttpRequest: function(query, host, path, res, next) {
        var options = {
            host: host,
            path: path + query
        };

        return http.get(options, function(res) {
            var body = '';

            if (res.statusCode !== 200) {
                console.log("Uh oh! Something has gone wrong!");
                return;
            }

            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function(){
                var parsed = JSON.parse(body);
                next({
                    parsed: parsed.recipes
                });
            });
        });
    }
};

module.exports = actions;
