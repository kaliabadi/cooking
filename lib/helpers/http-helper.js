'use strict';

var http = require('http');

var httpHelper = {
    get: function(httpDetails, next) {
        var options = {
            host: httpDetails.host,
            path: httpDetails.path + httpDetails.query
        };

        console.log('we are in the function1');

        return http.get(options, function (res) {
            var body = '';

            console.log('we are in the function2');

            if (res.statusCode !== 200) {
                console.log("Uh oh! Something has gone wrong!");
                return;
            }

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                console.log('end');
                var parsed = JSON.parse(body);
                next({ parsed: parsed.recipes });
            });
        });
    }
};

module.exports = httpHelper;