var gulp = require('gulp');
var exec = require('child_process').exec
const Launcher = require('webdriverio/build/lib/launcher');
const path = require('path');
const wdio = new Launcher('wdio.conf.js');

gulp.task('mongodb', function() {
  exec('mongod --dbpath ./data', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('server', ['mongodb'], function() {
  exec('node ./bin/www', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('e2e', ['server'], function() {
  return wdio.run(code => {
    process.exit(code);
  }, error => {
    console.error('Launcher failed to run the test', error.stacktrace);
    process.exit(1);
  });
});

gulp.task('endserver', ['e2e'], () => {
  exec('killall node', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('endmongo', ['endserver'], () => {
  exec('mongo admin --eval "db.shutdownServer()";', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('test', ['endmongo'], () => {

})
