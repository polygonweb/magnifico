var gulp = require('gulp'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch'),
	swig = require('gulp-swig'),
	// jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	autoprefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;


// path config
var path = {
	build: {
		root: './build/',
		templates: './build/',
		styles: './build/css',
		scripts: './build/js',
		img: './build/img/',
		fonts: './build/fonts/'
	},
	src: {
		templates: './src/templates/',
		scripts: './src/scripts/',
		styles: './src/styles/',
		stylesMain: './src/styles/main.*',
		img: './src/img/',
		fonts: './src/fonts/'
	},
	watch: {
		templates: './src/templates/**/*.*',
		scripts: './src/scripts/**/*.*',
		styles: './src/styles/**/*.*',
		img: './src/img/**/*.*',
		fonts: './src/fonts/**/*.*'
	},
	clean: './build'
};


// browserSync config
var bsConfig = {
	server: {
		baseDir: path.build.root
	},
	host: 'localhost',
	port: 8000
};


function errorHandler(error) {
	gutil.log([
		(error.name + ' in ' + error.plugin).bold.red,
		'',
		error.message,
		''
	].join('\n'));
//	this.end();
};


// browser sync server
gulp.task('webserver', function () {
	browserSync.init(bsConfig);
});


gulp.task('reload', function () {
	reload({stream: true});
});


// swig templates
gulp.task('swig', function () {

	var data = require(path.src.templates + 'template-data.json');

	gulp
		.src([path.src.templates + '*.swig'])
		.pipe(swig({
			load_json: true,
			defaults: {
				cache: false,
				locals: data || {}
			}
		}))
		.on('error', errorHandler)
		.pipe(gulp.dest(path.build.templates))
		.pipe(reload({stream: true}));
});


// jade templates
// gulp.task('jade', function () {

// 	var data = require(path.src.templates + 'template-data.json');

// 	gulp
// 		.src([path.src.templates  + '*.*'])
// 		.pipe(jade({
// 			pretty: '\t',
// 			locals: data || {}
// 		}))
// 		.on('error', errorHandler)
// 		.pipe(gulp.dest(path.build.templates))
// 		.pipe(reload({stream: true}));
// });


// stylus
gulp.task('stylus', function () {
	gulp
		.src(path.src.stylesMain)
		.pipe(stylus({
			sourcemap: false,
			compress: false,
			'include css': true
		}))
		.on('error', errorHandler)
		.pipe(autoprefix({
			browsers: ['last 4 versions', '> 1%', "Firefox ESR", "Opera 12.1"],
			cascade: true
		}))
		.pipe(gulp.dest(path.build.styles))
		.pipe(reload({stream: true}));
});


gulp.task('scripts', function() {
	gulp
		.src(path.src.scripts + '**/*.*')
		.pipe(gulp.dest(path.build.scripts))
		.pipe(reload({stream: true}));
});


gulp.task('fonts', function() {
	gulp
		.src(path.src.fonts + '**/*.*')
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({stream: true}));
});

gulp.task('images', function() {
	gulp
		.src(path.src.img + '**/*.*')
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});


gulp.task('templates', ['swig']);
gulp.task('styles', ['stylus']);
gulp.task('build', ['templates', 'styles', 'scripts','images', 'fonts']);


gulp.task('watch', function() {

	// standart gulp watch
	// gulp.watch(path.watch.templates, ['templates']);
	// gulp.watch(path.watch.styles, ['styles']);
	// gulp.watch(path.watch.fonts, ['fonts']);
	// gulp.watch(path.watch.img, ['images']);
	// gulp.watch(path.watch.scripts, ['scripts']);
	// gulp.watch([path.src + 'templates/**/*.jade', './template-data.json'], ['jade']);

	// watch gulp plugin
	watch([path.watch.templates], function(event, cb) {
		gulp.start('templates');
	});
	watch([path.watch.styles], function(event, cb) {
		gulp.start('styles');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('images');
	});
	watch([path.watch.scripts], function(event, cb) {
		gulp.start('scripts');
	});

});


gulp.task('default', ['build', 'webserver', 'watch']);