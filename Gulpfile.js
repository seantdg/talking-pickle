const gulp = require('gulp');
const cucumber = require('gulp-cucumber');
const exec = require('child_process').exec;

gulp.task('test', function() {
    const options = {
        'steps': 'test/features/step_definitions/*.js'
    };

    return gulp.src('test/features/*')
        .pipe(cucumber(options));
});

gulp.task('build', function (cb) {
  exec('docker build -t talking-pickle/env .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

