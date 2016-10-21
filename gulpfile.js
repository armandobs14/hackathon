/* eslint-disable no-console, angular/log */
var fs = require('fs');
var rev = require('gulp-rev');
var del = require('del');
var exec = require('child_process').exec;
var path = require('path');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var include = require('gulp-include');
var ngAnnotate = require('gulp-ng-annotate');
var serveStatic = require('serve-static');
var runSequence = require('gulp-run-sequence');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

var pkg = require('./package.json');

// Indicates if a build is being done for deployment or development.
var PRODUCTION;

// This is the configuration file for when your app run in development mode
var FIREBASECONFIG_DEVELOPMENT = {
    apiKey: "AIzaSyBfV9JT_1GRnQ7z_05g0ssEbKYJzQ06eQE",
    authDomain: "hackathon-9d78b.firebaseapp.com",
    databaseURL: "https://hackathon-9d78b.firebaseio.com",
    storageBucket: "hackathon-9d78b.appspot.com",
    messagingSenderId: "905224858709"
  };

var FIREBASECONFIG_PRODUCTION = FIREBASECONFIG_DEVELOPMENT;

var buildPaths = {
  js: ['./source/*.js'],
  pug: ['./source/*.pug'],
  scss: ['./source/*.scss'],
  images: ['./source/images/**/*.*'],
  misc: ['./source/misc/**/*.*']
};

var watchPaths = {
  js: ['./source/**/*.js'],
  pug: ['./source/**/*.pug'],
  scss: ['./source/scss/**/*.scss'],
  images: ['./source/images/**/*.*'],
  misc: ['./source/misc/**/*.*']
};

/**
 * Builds Js files
 */

gulp.task('js', function () {
  return gulp.src(buildPaths.js)
    .pipe(include({
      includePaths: [
        path.join(__dirname, '/bower_components'),
        path.join(__dirname, '/source/states'),
      ]
    }))
    .on('error', console.error) // eslint-disable-line
    .pipe(ngAnnotate())
    .pipe(gulpif(PRODUCTION, uglify({ mangle: true })))
    .pipe(rev())
    .pipe(rename({ dirname: '/js', extname: PRODUCTION ? '.min.js' : '.js' }))
    .pipe(gulp.dest('./public/'))
    .pipe(rev.manifest('source/rev-manifest.json', { merge: true }))
    .pipe(gulp.dest(''));
});

/**
 * Builds Css files
 */
gulp.task('scss', function () {
  return gulp.src(buildPaths.scss)
    .pipe(sass({ outputStyle: PRODUCTION ? 'compressed' : 'expanded', errLogToConsole: true }))
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(rev())
    .pipe(rename({ dirname: '/css', extname: PRODUCTION ? '.min.css' : '.css' }))
    .pipe(gulp.dest('./public/'))
    .pipe(rev.manifest('source/rev-manifest.json', { merge: true }))
    .pipe(gulp.dest(''));
});

/**
 * Copies Image files
 */
gulp.task('image', function () {
  return gulp.src(buildPaths.images)
    .pipe(gulp.dest('./public/images/'));
});

/**
 * Copies Other files
 */
gulp.task('misc', function () {
  return gulp.src(buildPaths.misc)
    .pipe(gulp.dest('./public/misc/'));
});

/**
 * Builds Html files
 */
gulp.task('pug', function () {
  if (PRODUCTION) {
    console.log('Compilando pug para produção...'); // eslint-disable-line
  }
  var manifest = JSON.parse(fs.readFileSync('./source/rev-manifest.json', 'utf8'));

  return gulp.src(buildPaths.pug)
    .pipe(pug({
      pretty: !PRODUCTION,
      locals: {
        // eslint-disable-next-line
        manifest: manifest || {},
        production: PRODUCTION,
        version: pkg.version,
        firebaseConfig: PRODUCTION ? FIREBASECONFIG_PRODUCTION : FIREBASECONFIG_DEVELOPMENT
      }
    }))
    .on('error', console.error) // eslint-disable-line
    .pipe(gulp.dest('./public/'));
});

/**
 * Deletes the public folder
 */
gulp.task('clean', function () { return del(['./public/']); });

/**
 * Cleans then builds everything
 */
gulp.task('build', function (done) {
  return runSequence('clean', ['js', 'scss', 'image', 'misc'], 'pug', done);
});

/**
 * Serves the public folder
 */
gulp.task('serve', function () {
  return browserSync.init({ server: {
    baseDir: './public/',
    middleware: [serveStatic('./public/', { extensions: ['html'] })]
  } });
});

/**
 * Reloads the browser
 */
gulp.task('reload', function () { return browserSync.reload(); });

/**
 * Watches file changes and runs watch tasks
 */
gulp.task('watch', function () {
  gulp.watch(watchPaths.js, ['watch-js']);
  gulp.watch(watchPaths.scss, ['watch-scss']);
  gulp.watch(watchPaths.pug, ['watch-pug']);
});

/**
 * Watch Tasks
 */
gulp.task('watch-js', function (done) { runSequence('js', 'pug', 'reload', done); });
gulp.task('watch-scss', function (done) { runSequence('scss', 'pug', 'reload', done); });
gulp.task('watch-pug', function (done) { runSequence('pug', 'reload', done); });

/**
 * Default Task - Runs build, serve, watch
 */
gulp.task('default', function (done) { runSequence('build', 'serve', 'watch', done); });

/**
 * Runs the 'firebase deploy' command line
 */
gulp.task('firebase-deploy', function (done) {
  exec('firebase deploy', function (err, stdout, stderr) {
    if (err) console.error(err);
    if (stderr) console.error(stderr);
    if (stdout) console.info(stdout);
    done();
  });
});

/**
 * Builds and uploads to Firebase
 */
gulp.task('deploy', function (done) {
  PRODUCTION = true;
  runSequence('build', 'firebase-deploy', done);
});

/**
 * Runs the 'firebase deploy --only database' command line
 */
gulp.task('deploy-database', function (done) {
  console.log('Iniciando Deploy...'); // eslint-disable-line no-console
  exec('firebase deploy --only database', function (err, stdout, stderr) {
    if (err) console.error(err);
    if (stderr) console.error(stderr);
    if (stdout) console.info(stdout);
    done();
  });
});
