'use strict';


var config = require('../config');
var _ = require('lodash');

var actions = {
    addDocument: function(collection, content, next) {
        collection.insert(content, function(){
            next()
        });
    },
    removeDocument: function(collection, id, next) {
        collection.remove({ _id: id}, function(e) {
            next()
        });
    },
    getDocuments: function (collection, userId, next) {
        collection.find({userID: userId}, {}, function(e, docs){
            next(docs);
        });
    },
    getDocument: function(collection, userId, query, next) {
        collection.find({userID: userId},{},function(e, docs){
            var recipes = [];
            docs.forEach(function(recipe) {
                if (_.includes(recipe.ingredients.toUpperCase(), query.toUpperCase())) {
                    recipes.push(recipe);
                }
            });
            next(recipes);
        });
    },
    getDocumentByTitle: function(collection, userId, query, next) {
        collection.find({userID: userId},{},function(e, docs){
            var recipes = [];
            docs.forEach(function(recipe) {
                var recipeName = recipe.recipeName.toUpperCase().replace(/_/g, " ");

                if (recipeName === query.toUpperCase()) {
                    recipes.push(recipe);
                }
            });
            next(recipes);
        });
    },
    registerUser: function(collection, userDetails, next) {
        collection.insert(userDetails, function() {
            next(userDetails)
        });
    },
    getUserID: function(collection, username, next) {
        collection.find({username: username}, {}, function(e, users) {
            next(users[0]._id)
        })
    },
    getUserInfo: function(collection, userId, next) {
        collection.find({_id: userId}, {}, function(e, user) {
            next(user[0])
        })
    }
};

module.exports = actions;
