var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  bump = require('gulp-bump'),
  gutil = require('gulp-util'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify');

gulp.task('lint', function () {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

var DEST = './dist/';

gulp.task('compress', function () {

  var b = browserify({
    entries: './src/valfor.js',
    standalone: 'valfor'
  });
  return b.bundle()
    .pipe(source('valfor.js'))
    .pipe(buffer())
    .pipe(gulp.dest(DEST))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify({compress:{unsafe:true}}))
    .on('error', gutil.log)
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

gulp.task('bump', function () {
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});
gulp.task('default', ['lint'])
