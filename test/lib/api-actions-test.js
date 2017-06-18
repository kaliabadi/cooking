var apiActions = require('../../lib/api-actions');
var config = require('../../config.json');
var db = require('monk')('localhost:27017/test');
var chai = require('chai');
var assert = chai.assert;

var recipeCollection = db.collection(config.recipes);

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
            var testDocument = {
                'title': 'test title'
            };

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
        
    })
});