var express = require('express');
var router = express.Router();
var config = require('../../config');
var apiActions = require('../api-actions');

router.get('/', function(req, res) {
	var userCollection = req.db.get(config.users);
	var userId = req.cookies.cookinguser;

	apiActions.getDocumentsByQuery(userCollection, 'userId', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		res.render('index', {
			title: 'Cookbook',
			loggedIn: loggedIn,
			username: userInfo.username,
			userId: userInfo._id
		});
	});
});

router.get('/recipestore', function(req, res) {
	var userCollection = req.db.get(config.users);
	var userId = req.cookies.cookinguser;
	
	apiActions.getDocumentsByQuery(userCollection, '_id', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		res.render('recipestore', {
			title: 'Recipe Store',
			loggedIn: loggedIn,
			username: userInfo.username,
			userId: userInfo._id
		});
	})
});

router.get('/recipe/:query', function(req, res) {
	var query = decodeURI(req.params.query).replace(/ /g,"_");
	var userCollection = req.db.get(config.users);
	var recipeCollection = req.db.get(config.recipes);
	var userId = req.cookies.cookinguser;

	apiActions.getDocumentsByQuery(userCollection, '_id', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		apiActions.getDocumentByQuery(recipeCollection, 'title',
			'j:"' + req.cookies.cookinguser + '"', query, function(docs) {
			res.render('recipe', {
				title: 'Recipe',
				recipeName: docs[0].recipeName,
				cookingTime: docs[0].cookingTime,
				ingredients: docs[0].ingredients,
				method: docs[0].method,
				loggedIn: loggedIn,
				username: userInfo.username,
				userId: userInfo._id
			});
		})
	})
});

router.get('/contact', function(req, res) {
	var userCollection = req.db.get(config.users);
	var userId = req.cookies.cookinguser;

	apiActions.getDocumentsByQuery(userCollection, '_id', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		res.render('contact', {
			title: 'Contact us',
			loggedIn: loggedIn,
			username: userInfo.username,
			userId: userInfo._id
		});
	})
});

router.get('/login', function(req, res){
	var userCollection = req.db.get(config.users);
	var userId = req.cookies.cookinguser;

	apiActions.getDocumentsByQuery(userCollection, '_id', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		res.render('login', {
			title: 'Login',
			loggedIn: loggedIn,
			username: userInfo.username,
			userId: userInfo._id
		});
	})
});

router.get('/register', function (req, res) {
	var userCollection = req.db.get(config.users);
	var userId = req.cookies.cookinguser;

	apiActions.getDocumentsByQuery(userCollection, '_id', userId, function(user) {
		var loggedIn = req.cookies.cookinguser ? true : false;
		var userInfo = user ? user[0] : {};

		res.render('register', {
			title: 'Register',
			loggedIn: loggedIn,
			username: userInfo.username,
			userId: userInfo._id
		});
	})
});

router.post('/login', function(req, res) {
	var userCollection = req.db.get(config.users);

	apiActions.getDocumentsByQuery(userCollection, 'username', req.body.username, function(id) {
		res.cookie('cookinguser', id);
		res.status(200).send()
	});
});

router.post('/register', function(req, res) {
	var userCollection = req.db.get(config.users);
	var userDetails = {
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname
	};
	
	apiActions.addDocument(userCollection, userDetails, function(userDetails) {
		apiActions.getDocumentsByQuery(userCollection, 'username', userDetails.username, function(id) {
			res.cookie('cookinguser', id);
			res.status(200).send()
		})
	});
});

module.exports = router;
