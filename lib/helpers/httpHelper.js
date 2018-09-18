'use strict';

var http = require('http');

var httpHelper = {
    get: function(httpDetails, next) {
        var options = {
            host: httpDetails.host,
            path: httpDetails.path + httpDetails.query
        };

        return http.get(options, function(res) {
            var body = '';

            if (res.statusCode !== 200) {
                console.log("Uh oh! Something has gone wrong!");
                return;
            }

            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function(){
                var parsed = JSON.parse(body);
                next({
                    parsed: parsed.recipes
                });
            });
        });
    }
};

module.exports = httpHelper;