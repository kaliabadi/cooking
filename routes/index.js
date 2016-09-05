var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookbook' });
});

router.get('/recipestore', function(req, res, next) {
	res.render('recipestore', { title: 'Recipe Store'});
});

router.get('/recipe/:query', function(req, res, next) {
	res.render('recipe', { title: 'Recipe'});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', {title: 'Contact us'});
});

module.exports = router;
