var express = require('express');
var router = express.Router();
var config = require('../../config');
var apiActions = require('../api-actions');

router.get('/', function(req, res) {
  res.render('index', { title: 'Cookbook' });
});

router.get('/recipestore', function(req, res) {
	res.render('recipestore', { title: 'Recipe Store'});
});

router.get('/recipe/:query', function(req, res) {
	var query = req.params.query;

	apiActions.getDocumentByTitle(req, query, function(docs) {
		res.render('recipe', {
			title: 'Recipe',
			recipeName: docs[0].recipeName,
			cookingTime: docs[0].cookingTime,
			ingredients: docs[0].ingredients,
			something: docs[0].something
		});
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {title: 'Contact us'});
});

module.exports = router;
