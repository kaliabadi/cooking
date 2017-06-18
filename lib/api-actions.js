var actions = {
    addDocument: function(collection, document, next) {
        collection.insert(document, function(e) {
            next();
        })
    },
    removeDocument: function(collection, id, next) {
        collection.remove({_id: id}, {}, function(e) {
            next();
        })
    },
    getDocumentsByTitle: function(collection, title, next) {
        collection.find({}, {}, function(e, docs) {
            next(docs);
        })
    }
};

module.exports = actions;