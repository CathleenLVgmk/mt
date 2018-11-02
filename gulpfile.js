var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
gulp.task('default', function() {
    return gulp.src('./src/scss/demo.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'));
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/demo.scss', gulp.series('default'))
})
gulp.task('dev', gulp.series('default', 'watch'));