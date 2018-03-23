exports.config = {

    specs: [
       './test/specs/**/*.js'
        // './test/specs/homepage.spec.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome'
    }],

    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:3000/',
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    services: ['selenium-standalone', 'chromedriver'],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-register'],
        timeout: 99999999
    },

    before: function () {
        global.expect = require('chai').expect;
    }
}
