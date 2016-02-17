var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

//Para ambientes de produção de acordo com o Server da aplicação
gulp.task('default',['clean', 'concatCss', 'concatLibsJs', 'concatApp', 'copyImages', 'copyFonts']);

gulp.task('clean', function () {
	 return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('concatCss', function() {
		var css = [
		'node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css',
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'assets/css/app.css'
		];
		return gulp.src(css)
				.pipe(concat('app.css'))
				.pipe(cssnano())
				.pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('concatLibsJs', function() {
	var libs = [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/moment/min/moment.min.js',
		'bower_components/moment/min/locale/pt-br.js',
		'node_modules/angular-youtube-embed/dist/angular-youtube-embed.min.js',
		'node_modules/perfect-scrollbar/dist/js/min/perfect-scrollbar.min.js'
	];
	return gulp.src(libs)
				.pipe(concat('libs.min.js'))
				.pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('concatApp', function() {
	return gulp.src('app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/app'));
});

gulp.task('copyImages', function() {
	return gulp.src('assets/images/**/*')
		.pipe(gulp.dest('dist/assets/images'));
});

gulp.task('copyFonts', function() {
	return gulp.src('bower_components/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts'))
});
