/* 	============================================
	Require
================================================ */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


/* 	============================================
	Tasks
================================================ */

// Sass
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files sass files in app/scss and children dirs
		.pipe(sass()) // send it to gulp plugin
		.pipe(gulp.dest('app/css')) // output folder
		.pipe(browserSync.reload({ // inject changes with browserSyncs when sass is ran
			stream: true
		}))
});

// Watch with BrowserSync and SASS as arguments
gulp.task('watch', ['browserSync', 'sass'], function () {
	// watch sass
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// watch html
	gulp.watch('app/*.html', browserSync.reload); 
	// watch JS
	 gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// BrowserSync
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

