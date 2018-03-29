var apiActions = require('../../../lib/api-actions');
var config = require('../../../config.json');
var db = require('monk')('localhost:27017/sg');
var chai = require('chai');
var assert = chai.assert;

var recipeCollection = db.collection(config.recipes);
var userCollection = db.collection(config.users);


var testRecipe = {
    'recipeName': 'test recipe name',
    'cookingTime': 'test cooking time',
    'ingredients': 'test ingredients',
    'method': 'test method',
    'userID': 'test user id'
};

var testUser = {
    'username': 'test username',
    'firstname': 'test firstname',
    'lastname': 'test lastname',
    'password': 'test password'
};





describe('API actions', () => {
    before(function() {
        db.create(config.recipes);
        db.create(config.users);
    });

    it('should add a document', () => {
        console.log(db);
        console.log(db.collection(config.recipes));
        console.log(recipeCollection);
        console.log(testRecipe);
        db.collection(test).insert(testRecipe);
        apiActions.addDocument(recipeCollection, testRecipe);

        // finds that expected recipe in the db
        // recipeCollection.find({ userID })
    });
});