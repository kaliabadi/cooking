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
	
	var getRecipeData = function (db, res, next) {
	    db.get(config.dataBase).find({},{},function(e,docs){
	        next(docs);
	    });
	};

	getRecipeData(req.db, res, function(docs) {
		console.log(docs[0].recipeName);
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
