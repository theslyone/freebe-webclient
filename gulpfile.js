var babel = require('gulp-babel');
var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');

var clean = require('gulp-clean');
var gulpCopy = require('gulp-copy');

var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var rename = require('gulp-rename');

var cleanCSS = require('gulp-clean-css');

var JS_OUTPUT_DIR = 'dist/js'
var CSS_OUTPUT_DIR = 'dist/css'

var jsFiles = [
  'assets/plugins/form-jasnyupload/fileinput.min.js',
  'scripts/core/theme.js',
  'scripts/core/controllers/**/*.js',

  'scripts/core/directives/directives.js',
  'scripts/core/directives/**/*.js',

  'scripts/core/modules/*.js',

  'scripts/core/modules/panels/panels.js',
  'scripts/core/modules/**/*.js',

  'scripts/core/services/services.js',
  'scripts/core/services/**/*.js',

  'scripts/freebe/freebe.js',
  'scripts/freebe/controllers/**/*.js',
  'scripts/freebe/directives/**/*.js',
  'scripts/freebe/modules/**/*.js',

  'scripts/freebe/services/services.js',
  'scripts/freebe/services/**/*.js',

  'scripts/chart/**/*.js',
  'scripts/dashboard.js'
];

var cssFiles = [
  'assets/plugins/form-fseditor/fseditor.css',
  'assets/plugins/jcrop/css/jquery.Jcrop.min.css',
  'css/semantic-extended.css',
  'css/dashboard.css',
];

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('copy-css', function () {
  return gulp.src(['fonts/*'])
    .pipe(gulpCopy(CSS_OUTPUT_DIR));
});

gulp.task('minify-css', ['copy-css'], () => {
  return gulp.src(cssFiles)
    .pipe(cleanCSS({compatibility: 'ie8', rebaseTo: './'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(CSS_OUTPUT_DIR));
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(plumber())
		.pipe(concat('app.js', {newLine: ';'}))
		.pipe(ngAnnotate({add: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(JS_OUTPUT_DIR));
});

gulp.task('minify-js', ['js'], function() {
  return gulp.src(JS_OUTPUT_DIR + '/app.js')
    .pipe(plumber())
    .pipe(bytediff.start())
    .pipe(babel({
        presets: ['es2015']
    }))
		.pipe(uglify({mangle: true}).on('error', function(e){
        console.log(e);
     }))
		.pipe(bytediff.stop())
		.pipe(rename('app.min.js'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(JS_OUTPUT_DIR));
});

gulp.task('watch', ['minify-js', 'minify-css'], function () {
  return gulp.watch('scripts/**/*.js', ['minify-js']);
});

gulp.task('default', ['watch', 'js', 'css']);
gulp.task('production', ['clean', 'minify-js', 'minify-css']);
