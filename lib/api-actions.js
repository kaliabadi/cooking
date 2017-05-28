'use strict';

var http = require('http');
var config = require('../config');
var _ = require('lodash');

var actions = {
    getDocuments: function (req, next) {
        var collection = req.db.get(config.dataBase);
        var userID = 'j:"' + req.cookies.cookinguser + '"';

        collection.find({userID: userID}, {}, function(e, docs){
            next(docs);
        });
    },
    getDocument: function(req, query, next) {
        var collection = req.db.get(config.dataBase);
        var query = decodeURI(query);
        var userID = 'j:"' + req.cookies.cookinguser + '"';

        collection.find({userID: userID},{},function(e,docs){
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
        var query = decodeURI(query).replace(/ /g,"_");;
        var userID = 'j:"' + req.cookies.cookinguser + '"';

        collection.find({userID: userID},{},function(e,docs){
            var recipes = [];
            docs.forEach(function(recipe) {
                var recipeName = recipe.recipeName.toUpperCase().replace(/ /g,"_");

                if (recipeName === query.toUpperCase()) {
                    recipes.push(recipe);
                }
            });
            next(recipes);
        });
    },
    getUser: function(req, next) {
        var collection = req.db.get(config.dataBase);
        var username = req.body.username;
        var password = req.body.password;

        collection.find({}, {}, function(e, docs) {
            docs.forEach(function(potentialUser) {
                if (potentialUser.username === username && potentialUser.password === password) {
                    next(potentialUser)
                }
            })
        })
    },
    registerUser: function(req, next) {
        var collection = req.db.get(config.dataBase);
        var newUser = {};

        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;

        collection.insert(newUser, function() {
            next(newUser)
        });
    },
    getUserID: function(req, next) {
        var collection = req.db.get(config.dataBase);

        collection.find({}, {}, function(e, users) {
            users.forEach(function(user) {
                if(user.username === req.body.username) {
                    next(user._id)
                }
            })
        })
    },
    getUserInfo: function(req, next) {
        var collection = req.db.get(config.dataBase);
        
        collection.find({_id: req.cookies.cookinguser}, {}, function(e, user) {
            next(user)
        })
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
