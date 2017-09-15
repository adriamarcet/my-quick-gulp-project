/* 	============================================
	Requires
================================================ */
const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const browserSync 	= require('browser-sync').create();
const useref 		= require('gulp-useref');
const uglify 		= require('gulp-uglify');
const gulpIf 		= require('gulp-if');
const cssnano 		= require('gulp-cssnano');
const imagemin 		= require('gulp-imagemin');
const cache 		= require('gulp-cache');





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

// Useref
	// it builds in one file different from many locations
	// it will look for the html tag <!-- build --> and <!-- endbuild -->
gulp.task('useref', function () {
	return gulp.src('app/*.html') // get source files
		.pipe(useref() ) // send it to gulp plugin

		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify() ) ) 
		
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		// output folder
		.pipe(gulp.dest('dist')) 
});

// Images
gulp.task('images', function () {
	return gulp.src('app/images/**/*.+(jpg|png|svg|gif)') // get source files
		.pipe(

			cache( 

				imagemin({
					interlaced: true,
					progressive: true,
					optimizationLevel: 5,
					svgoPlugins: [{removeViewBox: true}]
				}) // optimize images
			) // cache the task
		) // send it to gulp plugin
		.pipe(gulp.dest('dist/images')) // output folder
});
