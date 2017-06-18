var apiActions = require('../../lib/api-actions');
var config = require('../../config.json');
var db = require('monk')('localhost:27017/test');
var chai = require('chai');
var assert = chai.assert;

var recipeCollection = db.collection(config.recipes);

var testDocument = {
    'title': 'test title'
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

            apiActions.getDocumentsByTitle(recipeCollection, testDocument.title, function (docs) {
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
            
            apiActions.getDocumentsByTitle(recipeCollection, testDocument.title, function (docs) {
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
    })
});