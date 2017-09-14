Setting up a Gulp project with the guidelines in here: https://goo.gl/MKRPA1

This Gulp frontend workflow will:
- Handle our CSS
	- Compile our SCSS to CSS using cache to make it faster
	- Auto-prefix the output CSS
	- Creates sourcemap file
	- pulls in CSS from third-party modules
	- combines and minifies all the CSS
- Handle our JS
	- From ES6 to something browser safe
	- Pulls in third party JS code
	- Uglifies the JS
	- Pulls in JS inlined to our HTML if needed
- Handle Live Reloading
	- CSS/SCSS changes trigger browser reload
	- JS changes trigger browser reload
	- Changes to HTML trigger browser reload
- Generates critical CSS
- Runs accessibilitu audit
- Generates custom icon font using only glyphs via Fontello
- Generates favicons for our website from a single source image
- Minimizes the images via imagemin



From first steps with Gulp: https://css-tricks.com/gulp-for-beginners/

Project structure
app/
	will be used for development purposes
	all our code will be placed here
dist/
	used to optimize files for production site

gulpfile.js
	this contains all gulp tasks configurations
	
