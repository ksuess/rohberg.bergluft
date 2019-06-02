/* Execute Gulp-task with
$ gulp watch
*/

var dir_watch = './src/rohberg/bergluft/theme';

// ************ gulp 4.0

// const { series } = require('gulp');
// const { src, dest } = require('gulp');
// const uglify = require('gulp-uglify');
const autoprefixer = require("autoprefixer");
const browsersync = require('browser-sync').create();
const cssnano = require("cssnano");
const gulp = require("gulp");
const plumber = require('gulp-plumber');
const postcss = require("gulp-postcss");
const rename = require('gulp-rename');
const sass = require("gulp-sass");

// BrowserSync
function browserSync(done) {
  browsersync.init({
      proxy: 'localhost:10580/rohberg'
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function sassTask () {
    return (
        gulp
            .src(dir_watch + '/sass/**/*.scss') // compile only scss in theme/sass
            .pipe(plumber())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(gulp.dest(dir_watch + '/css/'))

            .pipe(rename({ suffix: ".min" }))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(gulp.dest(dir_watch + '/css/'))
            .pipe(browsersync.stream())
    );
}

function watchFiles() {
    return (
        gulp
            .watch(dir_watch + '/**/*.scss', gulp.series(sassTask, browserSyncReload)) //watch all scss in theme
        );
}

const watch = gulp.series(browserSync, watchFiles);

exports.sass = sassTask;
exports.watch = watch;
exports.default = watch;


// TODO reload browser
// gulp.series(jekyll, browserSyncReload)
