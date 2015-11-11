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
    .pipe(concat())
    .pipe(minifyCss())
    .pipe(gulp.dest('dest/folder/output'));
});
```

### AFTER

__gulpfile.js__

```javascript
var gulp = require('gulp');
var gulpchain = require('gulp-chainize')(gulp, {
  minify: require('gulp-minify-css')
});
gulp.task('task',function(){
  gulpchain.src('some/folder/css/*.css')
    .minify()
    .dest('dest/folder/output');
});
```

or, using __gulp-load-plugins__:

__gulpfile.js__

```javascript
var gulp = require('gulp');
var pkgs = require('gulp-load-plugins')();
var gulpchain = pkgs.chainize(gulp, pkgs, {
  someplugin: require('gulp-plugin-out-of-package.js'),
  ...
  ...
});
gulp.task('task',function(){
  gulpchain.src('some/folder/file/*.ext')
    .pluinInPackageJs()
    .someplugin()
    .dest('dest/folder/output');
});
```

`.src()` , `.pipe()` and `dest()` is reserved.
 
 
LICENSE
-------
 
(MIT License)
 
Copyright (c) 2015 44kana