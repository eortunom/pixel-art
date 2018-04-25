var gulp = require('gulp');
var eslint = require('gulp-eslint');

var FILES = [
  'pixel-canvas.js',
];

gulp.task('eslint', function () {
  return gulp.src(FILES)
    .pipe(eslint())
    .pipe(eslint.format());
});
