var gulp = require('gulp');
var less = require('gulp-less'); 
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
 
 
// Task to compile less
gulp.task('compile-less', function() {  
  gulp.src('./less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
}); 

// Task to watch less files
gulp.task('watch-less', function() {  
  gulp.watch('./less/*.less' , ['compile-less']);
});

// Task to minify images
gulp.task('minify-images', function () {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/resized-images'))
});

// Task to sync broweser and watch files
gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    }); 
    gulp.watch("./dist/css/*.css").on("change", reload);
    gulp.watch("./dist/*.html").on("change", reload);
});
 
// Default gulp Task
gulp.task('default', ['watch-less', 'minify-images', 'sync']);