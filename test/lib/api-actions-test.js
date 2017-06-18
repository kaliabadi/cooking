var apiActions = require('../../lib/api-actions');
var config = require('../../config.json');
var db = require('monk')('localhost:27017/test');
var chai = require('chai');
var assert = chai.assert;

var recipeCollection = db.collection(config.recipes);
var userCollection = db.collection(config.users);

var testRecipe = {
    'recipeName': 'test recipe name',
    'cookingTime':'test cooking time',
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

describe('api actions tests', function() {
    before(function() {
        db.create(config.recipes);
        db.create(config.users);
    });
    
    after(function() {
        recipeCollection.drop();
        userCollection.drop();
    });

    afterEach(function() {
        recipeCollection.remove()
    });

    afterEach(function() {
        userCollection.remove()
    });
    
    describe('add document', function () {
        it('add a valid document', function (done) {
            apiActions.addDocument(recipeCollection, testRecipe);

            recipeCollection.find({userID: testRecipe.userID}, {}, function(e, docs){
                try {
                    assert.equal(docs[0].recipeName, 'test recipe name');
                    assert.equal(docs[0].cookingTime, 'test cooking time');
                    assert.equal(docs[0].ingredients, 'test ingredients');
                    assert.equal(docs[0].method, 'test method');
                    assert.equal(docs[0].userID, 'test user id');
                    done()
                } catch(e) {
                    done(e);
                }
            });
        });

        it('giving the wrong user id should return no results', function(done) {
            var noUserIdRecipe = {
                'recipeName': 'test recipe name',
                'cookingTime':'test cooking time',
                'ingredients': 'test ingredients',
                'method': 'test method',
                'userID': ''
            };

            apiActions.addDocument(recipeCollection, noUserIdRecipe);

            recipeCollection.find({userID: testRecipe.userID}, {}, function(e, docs) {
                try {
                    assert.equal(docs.length, 0);
                    done()
                } catch(e) {
                    done(e);
                }
            });

        });
    });

    describe('remove document', function() {
        it('remove a document', function() {
            apiActions.addDocument(recipeCollection, testRecipe);
            recipeCollection.find({userID: testRecipe.userID}, {}, function(e, docs) {
                try {
                    assert.equal(docs.length, 1);
                } catch(e) {
                    done(e);
                }

                apiActions.removeDocument(recipeCollection, docs[0]._id);
            });

            recipeCollection.find({userID: testRecipe.userID}, {}, function(e, docs) {
                try {
                    assert.equal(docs.length, 0);
                    done()
                } catch(e) {
                    done(e);
                }
            });
        });
    });

    describe('get documents', function() {
        it('get a all of a users listed documents', function(done) {
            var testRecipe2 = {
                'recipeName': 'test recipe name2',
                'cookingTime':'test cooking time2',
                'ingredients': 'test ingredients2',
                'method': 'test method2',
                'userID': 'test user id'
            };

            apiActions.addDocument(recipeCollection, testRecipe);
            apiActions.addDocument(recipeCollection, testRecipe2);
            apiActions.getDocument(recipeCollection, testRecipe.userID, 'test', function(data) {
                try {
                    assert.equal(data.length, 2);
                    done()
                } catch(e) {
                    done(e);
                }
            });
        });

        it('only get the specified users documents', function(done) {
            var testRecipe2 = {
                'recipeName': 'test recipe name2',
                'cookingTime':'test cooking time2',
                'ingredients': 'test ingredients2',
                'method': 'test method2',
                'userID': 'test user id2'
            };

            apiActions.addDocument(recipeCollection, testRecipe);
            apiActions.addDocument(recipeCollection, testRecipe2);
            apiActions.getDocument(recipeCollection, testRecipe.userID, 'test', function(data) {
                try {
                    assert.equal(data.length, 1);
                    done()
                } catch(e) {
                    done(e);
                }
            });
        });
    });

    describe('get document by title', function() {
        it('return correct document', function(done) {
            apiActions.addDocument(recipeCollection, testRecipe);

            apiActions.getDocumentByTitle(recipeCollection, testRecipe.userID, 'test recipe name', function(data) {
                try {
                    assert.equal(data[0].method, 'test method');
                    assert.equal(data.length, 1);
                    done()
                } catch(e) {
                    done(e);
                }    
            })
        });
        
        it('return document with underscored titles from normal query', function(done) {
            var underscoreRecipe = {
                'recipeName': 'test_recipe_name',
                'cookingTime':'test cooking time',
                'ingredients': 'test ingredients',
                'method': 'test method',
                'userID': 'test underscore recipe id'
            };
            
            apiActions.addDocument(recipeCollection, underscoreRecipe);

            apiActions.getDocumentByTitle(recipeCollection, underscoreRecipe.userID, 'test recipe name', function(data) {
                try {
                    assert.equal(data[0].method, 'test method');
                    assert.equal(data.length, 1);
                    done()
                } catch(e) {
                    done(e);
                }
            })
        });
    });
    
    describe('register user', function() {
        it('create user object', function(done) {
            apiActions.registerUser(userCollection, testUser, function(user) {
                try {
                    assert.equal(user.username, 'test username');
                    done();
                } catch(e) {
                    done(e);
                }
            })
        });
    });
    
    describe('get user id', function() {
        it('get user id from username', function(done) {
            apiActions.registerUser(userCollection, testUser);

            apiActions.getUserID(userCollection, 'test username', function (userID) {
                try {
                    assert.isTrue(userID !== null);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        })
    });

    describe('get user information', function() {
        it('return all user info and id', function(done) {
            apiActions.registerUser(userCollection, testUser);

            apiActions.getUserID(userCollection, 'test username', function(userID) {
                apiActions.getUserInfo(userCollection, userID, function(userDetails) {
                    try {
                        assert.equal(userDetails.username, 'test username');
                        assert.equal(userDetails.firstname, 'test firstname');
                        assert.equal(userDetails.lastname, 'test lastname');
                        assert.equal(userDetails.password, 'test password');
                        done();
                    } catch(e) {
                        done(e);
                    }
                })
            })
        })
    })
});