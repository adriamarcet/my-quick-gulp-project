/* 	============================================
	Requires
================================================ */
const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const sourcemaps 	= require('gulp-sourcemaps');
const browserSync 	= require('browser-sync').create();
const useref 		= require('gulp-useref');
const uglify 		= require('gulp-uglify');
const gulpIf 		= require('gulp-if');
const cssnano 		= require('gulp-cssnano');
const imagemin 		= require('gulp-imagemin');
const cache 		= require('gulp-cache');
const del 			= require('del');
const runSequence 	= require('run-sequence');
const autoprefixer 	= require('gulp-autoprefixer');
const uncss 		= require('gulp-uncss');



/* 	============================================
	Tasks
================================================ */

// Sass
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files sass files in app/scss and children dirs
		.pipe( sourcemaps.init() ) // initialize sourcemap plugin
		.pipe( sass({
			// output style: nested, expanded, compact, compressed
			outputStyle: 'compact',
			precision: 15
		})) // send it to gulp plugin
		.pipe(uncss({
			// html: ['index.html', 'dist/**/*.html', 'http://example.com']
			html: ['index.html', 'dist/**/*.html']
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('app/css') ) // output folder
		.pipe( browserSync.reload({ // inject changes with browserSyncs when sass is ran
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
	return gulp.src('app/images/**/*.+(jpg|jpeg|png|svg|gif)') // get source files
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


// Fonts: copy fonts from dev to dist
gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*') // get source files
		.pipe(gulp.dest('dist/fonts')) // output folder
});

// Del: Cleaning up generated files automatically
// The del function takes in an array of node globs which tells it what folders to delete.
gulp.task('clean:dist', function () {
	return del.sync('dist');
});

// Clear Cache: for the project
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
});

// Run tasks in run-sequence
gulp.task('build', function(callback) {
	runSequence(
		'clean:dist', 
		['sass','useref','images','fonts'], 
		callback
	)
});
// when you have a task named default, you can run it simply by typing the gulp command
gulp.task('default', function (callback) {
	runSequence(
		[ 'build','sass','browserSync', 'watch'],
		callback
	)
});

/* 	============================================
	To Implement
================================================ */

// "favicons-generate"
// to the scss .pipe($.size({gzip: true, showFiles: true}))
// to the css
/*
.pipe($.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        */

  // gulp.task("favicons-generate",