// First step is to require GULP into this project
// this command tells node to look for gulp into node_modules folder
// once is found we attach its content to the gulp variable
var gulp = require('gulp');

// we can now write gulp tasks with this variable
// like wise: gulp.task('task-name', function(){});
// you can also call the task in the terminal typing: gulp task-name
gulp.task( 'hello', function(){
	console.log("hello there");
});

// A task takes 2 additional methos: 
// gulp.src - tells the task what files to use
// gulp.dest - tells gulp where to output the files once the task is completed

// Example of a gulp task with some plugins and its methods
/*
gulp.task( 'task-name', function(){
	return gulp.src('source-files') // Get  source files with gulp.src
	.pipe(aGulpPlugin()) // Sends it through a gulp plugin
	.pipe( gulp.dest('destination') ) // Outputs the file in destination folder
});
*/


// Require sass plugin
var sass = require('gulp-sass');

// FYI: Gulp-sass uses LibSass to convert Sass into CSS. 
// It's much quicker than Ruby-based methods. 
// If you want, you can still use Ruby methods with Gulp by using gulp-ruby-sass 
// or gulp-compass instead.
gulp.task('sass', function () {
	return gulp.src('app/scss/project.scss') // get source files
		.pipe(sass()) // send it to gulp plugin
		.pipe(gulp.dest('dist/css')) // output folder
});

// Globbing
// We can use globs like regular expressions to match different files
//-  * : matches any pattern in the current directory, like: scss/*.scss
//- **/* : matches any file anding with the specified extension in the root and chil folders
// as an example: **/*.scss
//- !not-me.scss: The ! sign indicates exclude the matched file
//- *.+(scss|sass): The + sign and () matches multiple patterns separetd by |
// in this case gulp will match any file ending with .scss or .scss
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // send it to gulp plugin
		.pipe(gulp.dest('dist/css')) // output folder
});
// If a sass file starts with _ character this will be ignored. 
// As an example _test.scss will be ignore by sass task


// Syntaxis for the watch task
gulp.watch('files-to-watch', ['tasks', 'to', 'run']); 



/* 	============================================
	Browser Reloading with Gulp
================================================ */
/*
Browser Sync spins up a web server to easy config live reloading on our browser.
It has more features like sync on different devices as well.
*/
// Creating the task for browserSyng
// BrowserSync
gulp.task('browserSync', function () {

	browserSync.init({ // initialize the server
		
		server: {
			baseDir: 'app' // indicate the root folder of the server
		}
	})
});

/*
We also have to change our sass task slightly so Browser Sync can inject new CSS styles 
(update the CSS) into the browser whenever the sass task is ran.
*/
// to be added to the sass task
.pipe(browserSync.reload({
    stream: true
}))


/* 	============================================
	Run tasks in sequence
================================================ */
/*
When task-name is called, Gulp will run task-one first. When task-one finishes, Gulp will automatically start task-two. Finally, when task-two is complete, Gulp will run task-three.

Run Sequence also allows you to run tasks simultaneously if you place them in an array:

gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
*/
