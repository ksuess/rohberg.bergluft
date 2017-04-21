/* Execute Gulp-task with
$ gulp watch
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var dir_watch = './src/rohberg/bergluft/theme';

/* Compile scss-Files once with
$ gulp sass-now */
gulp.task('sass-now', function() {
	gulp.src(dir_watch + '/sass/**/*.scss')
    	.pipe(sass())
        .pipe(gulp.dest(dir_watch + '/css'));
});



// gulp watch
gulp.task('sass', function() {
  return gulp.src(dir_watch + '/sass/**/*.scss') // Gets all files ending with .scss in ./theme/sass
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dir_watch + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync.init({
	proxy: 'localhost:10580/rohberg'
  })
})


gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch(dir_watch + '/sass-bootstrap/_custom*.scss', ['sass']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch(dir_watch + '/*.html', browserSync.reload); 
	gulp.watch(dir_watch + '/js/**/*.js', browserSync.reload); 
	gulp.watch(dir_watch + '/rules.xml', browserSync.reload); 
});