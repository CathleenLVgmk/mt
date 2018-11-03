var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var url = require('url');
var path = require('path');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var fs = require('fs');
var json = require('./src/data.json');
var server = require('gulp-webserver');
gulp.task('default', function() {
    return gulp.src('./src/scss/demo.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'));
})
gulp.task('uglify', function() {
    return gulp.src('./src/js/demo.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
})
gulp.task('watch', function() {
    return gulp.watch(['./src/scss/demo.scss', './src/js/demo.js'], gulp.series('default', 'uglify'))
})

gulp.task('ser', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                //是文件
                var paths = path.join('src', pathname);
                if (path.extname(pathname) != '') {
                    if (pathname == 'favicon.ico') {
                        return res.end();
                    } else {
                        if (fs.existsSync(paths)) {
                            res.end(fs.readFileSync(paths));
                        }

                    }
                } else {
                    //是接口
                    if (pathname == '/') {
                        res.end(fs.readFileSync('src/index.html'));
                    } else {
                        if (pathname == '/api/data') {
                            res.end(JSON.stringify({
                                code: 0,
                                data: json
                            }))
                        }
                    }
                }
            }
        }))
})

gulp.task('dev', gulp.series('default', 'ser', 'watch'));