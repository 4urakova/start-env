var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    concat = require('gulp-concat');

var pathConfig = {
    srcPath: 'src',
    outPath: 'public'
};
var params ={
    srcPath: pathConfig.srcPath,
    outPath: pathConfig.outPath,

    srcCss: pathConfig.srcPath+'/css',
    srcJs: pathConfig.srcPath+'/js',
    srcImg: pathConfig.srcPath+'/img',
    srcFont: pathConfig.srcPath+'/fonts',

    outCss: pathConfig.outPath+'/css',
    outJs: pathConfig.outPath+'/js',
    outImg: pathConfig.outPath+'/img',
    outFont: pathConfig.outPath+'/fonts'
};

gulp.task('default', ['prod']);
gulp.task('dev', ['server', 'buildDev']);
gulp.task('prod', ['buildProd']);

gulp.task('server', function() {
    browserSync.init({
        server: params.outPath
    });

    gulp.watch(params.srcPath+'/**/*.html', ['html'])
        .on("change", reload);
    gulp.watch(params.srcJs+'/**/*.js', ['js']);
    gulp.watch(params.srcCss+'/**/*.scss', ['css']);
    gulp.watch(params.srcImg+'/*', ['img']);
});

gulp.task('buildDev', ['html', 'js', 'img', 'fonts', 'css']);
//gulp.task('buildProd', ['js', 'img', 'fonts', 'css']);
gulp.task('buildProd', ['html', 'js', 'img', 'fonts', 'css']);


gulp.task('html', function () {
    gulp.src([params.srcPath+'/**/*.html'])
        .pipe(gulp.dest( params.outPath ))
        .pipe(browserSync.stream());
});
gulp.task('js', function () {
    gulp.src([params.srcJs+'/**/*.js'])
        .pipe(gulp.dest( params.outJs ))
        .pipe(browserSync.stream());
});
gulp.task('img', function () {
    gulp.src(
        [
            params.srcImg+'/**/*.jpg',
            params.srcImg+'/**/*.png',
            params.srcImg+'/**/*.svg',
            params.srcImg+'/**/*.gif'
        ])
        .pipe(gulp.dest( params.outImg ))
        .pipe(browserSync.stream());
});
gulp.task('fonts', function () {
    gulp.src(
        [
            params.srcFont+'/**/*.svg',
            params.srcFont+'/**/*.otf',
            params.srcFont+'/**/*.eot',
            params.srcFont+'/**/*.ttf',
            params.srcFont+'/**/*.woff',
            params.srcFont+'/**/*.woff2'
        ])
        .pipe(gulp.dest( params.outFont ));
});

gulp.task('css', function () {
    var postcss = require('gulp-postcss');

    var processors = [
        require('precss'), // sass syntax
        require('postcss-short'),
        require('postcss-animation'), // paste animate.css animation
        require('postcss-cssnext')({ // css next
            browsers: ['last 2 versions', 'Chrome >= 42', 'Firefox >= 38', 'iOS >= 7', 'Android >= 4']
        }),
        require('lost'), // grid
        require('postcss-svg')({ // inline svg
            paths: [params.srcImg],
            svgo: true
        }),
        require('css-mqpacker')
    ];

    gulp.src([params.srcCss+'/styles.scss'])
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(params.outCss))
        .pipe(browserSync.stream());
});
