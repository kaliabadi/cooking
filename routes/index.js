var express = require('express');
var router = express.Router();
var config = require('../config');
var BPromise = require('bluebird');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookbook' });
});

router.get('/recipestore', function(req, res, next) {
	res.render('recipestore', { title: 'Recipe Store'});
});

router.get('/recipe/:query', function(req, res, next) {
	var query = req.params.query;
	var dbSearchterm = query.replace(/\_/g," ")

	var getRecipeData = function (db, res, next) {
	    db.get(config.dataBase).find({},{},function(e,docs){
	    	var recipes = [];
	    	docs.forEach(function(recipe) {
	            if (recipe.recipeName = dbSearchterm) {
	                recipes.push(recipe);
	            }
        	});
        	next(recipes);
	    });
	};

	getRecipeData(req.db, res, function(docs) {
		res.render('recipe', {
			title: 'Recipe',
			recipeName: docs[0].recipeName,
			cookingTime: docs[0].cookingTime,
			ingredients: docs[0].ingredients,
			something: docs[0].something
		});
	});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', {title: 'Contact us'});
});

module.exports = router;
