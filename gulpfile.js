// TERMINAL ACTIONS:
// Start with npm init
// npm install gulp plug-ins required

// All gulp packages must be named in require() as the plugin is named
var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync'),
		eslint = require('gulp-eslint'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cssnano = require('gulp-cssnano'),
		prettyerror = require('gulp-prettyerror');

// the default task runs the tasks listed in the array
gulp.task('default', ['watch', 'browser-sync']);

// compiles scss to css
gulp.task('sass', function() {
	gulp.src('./sass/style.scss')
		// .pipe() is a node method (and general computing concept)	
		.pipe(prettyerror())
		.pipe(sass())
		.pipe(autoprefixer({
			browers: ['last 2 versions']
		}))
		.pipe(cssnano())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./build/css'))
});

// define task to uglify and move js files to build dir
gulp.task('scripts', ['lint'], function() {
	// *.js ensures that all the .js files are pulled
	gulp.src('./js/*.js')
		.pipe(uglify())
		// takes js files and renames
		.pipe(rename({ extname: '.min.js' }))
		// need to place new files in specific newly created dir
		.pipe(gulp.dest('./build/js'))
});

// runs eslint to see if code follows rules
gulp.task('lint', function() {
	return gulp.src(['./js/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// define task to watch for changes to a file
gulp.task('watch', function() {
	// 1st argument: where we want to watch
	// 2nd argument: what to do when things change
	gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./sass/*.scss', ['sass']);
});

// define task to refresh browser automatically
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch(['./build/js/*.js', './build/css/*.css']).on('change', browserSync.reload);
});