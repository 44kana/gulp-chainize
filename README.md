gulp-chainize
=======
A plugin remove `.pipe()` .

Usage
-------

### BEFORE

__gulpfile.js__

```javascript
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
gulp.task('task',function(){
  gulp.src('some/folder/css/*.css')
    .pipe(concat('out.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dest/folder/output'));
});
```

### AFTER

__gulpfile.js__

```javascript
var gulp = require('gulp');
var gulpchain = require('gulp-chainize')(gulp, {
  minify: require('gulp-minify-css'),
  concat: require('gulp-concat')
});
gulp.task('task',function(){
  gulpchain.src('some/folder/css/*.css')
    .concat('out.css')
    .minify()
    .dest('dest/folder/output');
});
```

or, using [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins "gulp-load-plugins"):

__gulpfile.js__

```javascript
var gulp = require('gulp');
var pkgs = require('gulp-load-plugins')();
var gulpchain = pkgs.chainize(gulp, pkgs, {
  someplugin: require('gulp-plugin-out-of-package'),
  anotherplugin: require('./gulp-plugin-from-local-script.js'),
  ...
  ...
});
gulp.task('task',function(){
  gulpchain.src('some/folder/file/*.ext')
    .pluinInPackageJs()
    .someplugin()
    .anotherplugin()
    // @npm-scoped/plugin from gulp-load-plugins or
    // with readableStream.pipe() option must be
    // used in conjunction with .pipe() .
    .pipe(pkgs.npmScoped.plugin())
    .dest('dest/folder/output');
});
```

`.src()` , `.dest()` and `.pipe()` is reserved, they are internally call [gulp.src()](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options "gulp.src(globs[, options])"), [gulp.dest()](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options "gulp.dest(path[, options])"), [readableStream.pipe()](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options "readable.pipe(destination[, options])") .


LICENSE
-------

(MIT License)  
Brought to You by Google Translate  
Copyright (c) 2015 44kana
