var gulp = require('gulp');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tscOptions = require('../typescript-options');
var paths = require('../paths');
var to5 = require('gulp-babel');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');
var through2 = require('through2');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var tools = require('aurelia-tools');
//var dbg = require('gulp-debug');

gulp.task('build-index-and-dts', function () {
  var tscOut = gulp.src(paths.source)
    .pipe(ts(assign({}, tscOptions, {target:'es6',typescript: require('typescript')})));

  var js = tscOut.js
    .pipe(through2.obj(function(file, enc, callback) {
      file.contents = new Buffer(tools.extractImports(file.contents.toString("utf8")));
      this.push(file);
      return callback();
    }))
    .pipe(concat('index.js'));
  
  var dts = tscOut.dts //.pipe(dbg())
    .pipe(through2.obj(function(file, enc, callback) {
      file.contents = new Buffer(tools.extractImports(file.contents.toString("utf8")));
      this.push(file);
      return callback();
    }))
    .pipe(concat(paths.packageName+'.d.ts'))
    .pipe(through2.obj(function(file, enc, callback) {
      file.contents = new Buffer("declare module '" + paths.packageName + "' {\n\n" + tools.extractImports(file.contents.toString("utf8") + "}\n"));
      this.push(file);
      return callback();
    }));

  return merge([
    dts.pipe(gulp.dest(paths.output))
      .pipe(gulp.dest(paths.output + 'es6'))
      .pipe(gulp.dest(paths.output + 'commonjs'))
      .pipe(gulp.dest(paths.output + 'amd')),
    js.pipe(gulp.dest(paths.output))
    ]);
});

gulp.task('build-es6', function () {
  return gulp.src(paths.output + 'index.js')
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-commonjs', function () {
  return gulp.src(paths.output + 'index.js')
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function () {
  return gulp.src(paths.output + 'index.js')
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-index-and-dts',
    ['build-es6', 'build-commonjs', 'build-amd'],
    callback
  );
});
