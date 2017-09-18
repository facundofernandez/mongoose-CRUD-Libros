const 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('sass',function(){
    let stream = gulp.src('sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe( sass().on('error', sass.logError ) )
        .pipe( autoprefixer( 'last 2 version' ) )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
    
    return stream;
});

gulp.task('server',function(){
    browserSync.init({
        proxy: "localhost:8000",

        port: 8888,
        notify: true
    });

    gulp.watch('views/*.pug').on('change', reload);
    gulp.watch('sass/*.*',['sass']);
})

gulp.task('default', ['server','sass'])