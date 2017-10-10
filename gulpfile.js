var gulp = require('gulp'),
minifyCSS = require('gulp-minify-css'),
concat = require('gulp-concat')
rename = require('gulp-rename')
uglify = require('gulp-uglify');

// Minifies JS
gulp.task('compactJs', function(){
    return gulp.src(['vendor/*.js', 'src/*.js'])
    .pipe(uglify())
    .pipe(concat('lottery.compact.min.js'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('minJs', function(){
    return gulp.src('src/lottery.js')
    .pipe(uglify())
    .pipe(rename('lottery.min.js'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('styles', function(){
    return gulp.src('src/*.css')
    .pipe(minifyCSS())
    .pipe(concat('lottery.min.css'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['styles', 'minJs', 'compactJs']);