var apiActions = require('../../lib/api-actions');
var config = require('../../config.json');
var db = require('monk')('localhost:27017/test');
var chai = require('chai');
var assert = chai.assert;

var recipeCollection = db.collection(config.recipes);
var userCollection = db.collection(config.recipes);

var testDocument = {
    'title': 'test title'
};

var testUser = {
    username: 'test user'
};

describe('api actions', function() {

    before(function() {
        db.create(config.recipes);
    });

    after(function() {
        recipeCollection.drop();
    });

    afterEach(function() {
        recipeCollection.remove()
    });

    describe('add a document', function() {
        it('documents added to the recipe collection should be retrievable', function(done) {

            apiActions.addDocument(recipeCollection, testDocument);

            recipeCollection.find({}, {}, function(e, docs) {
                try {
                    assert.equal(docs.length, 1);
                    assert.equal(docs[0].title, testDocument.title);
                    done();
                } catch (e) {
                    done(e);
                }
            })
        })
    });

    describe('get documents by title', function() {
        it('get document details from title', function(done) {
            apiActions.addDocument(recipeCollection, testDocument);

            recipeCollection.find({}, {}, function(e, docs) {
                try {
                    assert.equal(docs.length, 1);
                } catch (e) {
                    done(e);
                }
            });

            apiActions.getDocumentsByQuery(recipeCollection, 'title', testDocument.title, function (docs) {
                try{
                    assert.equal(docs[0].title, testDocument.title);
                    done();
                } catch(e) {
                    done(e);
                }
            })
        })
    });
    
    describe('remove a document', function() {
        it('documents should be removable', function(done) {

            apiActions.addDocument(recipeCollection, testDocument);
            
            apiActions.getDocumentsByQuery(recipeCollection, 'title', testDocument.title, function (docs) {
                try{
                    assert.equal(docs.length, 1);
                }catch (e) {
                    done(e);
                }

                apiActions.removeDocument(recipeCollection, docs[0]._id, function () {
                    recipeCollection.find({}, {}, function(e, docs) {
                        try {
                            assert.equal(docs.length, 0);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    })
                });
            });
        })    
    });

    describe('get user info', function() {
        it('retrieve user information from their ID', function(done) {
            apiActions.addDocument(userCollection, testUser);

            userCollection.find({username: testUser.username}, {}, function(e, docs) {
                apiActions.getDocumentsByQuery(userCollection, '_id', docs[0]._id, function(user) {
                    try{
                        assert.equal(user[0].username, testUser.username);
                        done();
                    } catch (e) {
                        done(e);
                    }
                })
            })
        })
    });

    describe('get user id', function() {
        it('retrieve user id from their username', function(done) {
            apiActions.addDocument(userCollection, testUser);

            apiActions.getDocumentsByQuery(userCollection, 'username', testUser.username, function(user) {
                try{
                    assert.isTrue(user[0]._id !== null)
                    done();
                } catch (e) {
                    done(e);
                }
            })
        })
    });
    
    describe('get documents for user', function() {
        it('get all documents for a user from their id', function(done) {
            apiActions.addDocument(userCollection, testUser);

            apiActions.getDocumentsByQuery(userCollection, 'username', testUser.username, function(user) {
                var testUserDocument = {
                    title: 'test user document',
                    userId: user[0]._id
                };
                
                apiActions.addDocument(recipeCollection, testUserDocument);
                
                apiActions.getDocumentsByQuery(recipeCollection, 'userId', user[0]._id, function(docs) {
                    try {
                        assert.equal(docs[0].title, 'test user document')
                        done();
                    } catch (e) {
                        done(e);
                    }
                })
            })
        })
    })
});