/**
 * Created by chasekitteridge on 4/1/16.
 */

(function () {
  "use strict";

  // Load plugins
  var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

  // Index
  gulp.task('index', function () {
    return gulp.src('app/index.jade')
      .pipe(jade())
      .pipe(gulp.dest('dist'))
      .pipe(notify({message: 'Index task complete'}));
  })
  // Templates
  gulp.task('templates', function () {
    return gulp.src('app/templates/**/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('dist/html'))
      .pipe(notify({message: 'Templates task complete'}));
  });

  // Styles
  gulp.task('styles', function () {
    return sass('app/sass/main.sass', {style: 'expanded'})
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
      .pipe(notify({message: 'Styles task complete'}));
  });

  // Scripts
  gulp.task('scripts', function () {
    return gulp.src('app/js/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(notify({message: 'Scripts task complete'}));
  });

  // Images
  gulp.task('images', function () {
    return gulp.src('app/images/**/*')
      .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
      .pipe(gulp.dest('dist/img'))
      .pipe(notify({message: 'Images task complete'}));
  });

  // Clean
  gulp.task('clean', function () {
    return del(['dist/html', 'dist/css', 'dist/js', 'dist/img']);
  });

  // Default task
  gulp.task('default', ['clean'], function () {
    gulp.start('index', 'styles', 'scripts', 'images');
  });

  // Watch
  gulp.task('watch', function () {
    // Create LiveReload server
    livereload.listen();

    // Watch jade files
    gulp.watch('app/**/*.jade', ['index', 'templates']);

    // Watch .sass files
    gulp.watch('app/sass/**/*.sass', ['styles']);

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
  });


})();