var gulp = require('gulp');
var exec = require('child_process').exec;
var gls = require('gulp-live-server');
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher('wdio.conf.js');

let server;

gulp.task('mongodb', function() {
  exec('mongod --dbpath ./data', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('http', ['mongodb'], function(done) {
    server = gls.new('./bin/www');
    server.start();
    return wdio.run(code => {
      process.exit(code);
    }, error => {
      console.error('Launcher failed to run the test', error.stacktrace);
      process.exit(1);
    });
});

gulp.task('stopmongo', ['http'], () => {
  exec('mongo admin --eval "db.shutdownServer()";', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('test', ['stopmongo'], () => {
  server.stop();
});
