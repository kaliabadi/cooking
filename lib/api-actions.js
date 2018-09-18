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
    getDocumentsByQuery: function(collection, queryKey, queryValue, next) {
        var query = { };
        query[queryKey] = queryValue;

        collection.find(query, {}, function(e, docs) {
            next(docs);
        })
    }
};

module.exports = actions;