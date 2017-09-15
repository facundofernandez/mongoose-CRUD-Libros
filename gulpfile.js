const 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    pug = require('gulp-pug');

gulp.task('font',function(){
    let stream = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./'));

    return stream;
})

gulp.task('sass',function(){
    let stream = gulp.src('sass/main.scss')
        .pipe( sass().on('error', sass.logError ) )
        .pipe( autoprefixer( 'last 2 version' ) )
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
    
    return stream;
});




gulp.task('server',function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch('views/*.pug').on('change', reload);
    gulp.watch('sass/*.*',['sass']);
})

gulp.task('default', ['server','sass'])