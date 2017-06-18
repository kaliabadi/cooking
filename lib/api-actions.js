var actions = {
    addDocument: function(collection, document, next) {
        collection.insert(document, function() {
            next();
        })
    }
};

module.exports = actions;