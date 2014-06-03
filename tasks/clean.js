var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean-api', function() {
    return gulp.src(['api', 'temp'], { read: false })
        .pipe(clean());
});

gulp.task('clean-build', function() {
    return gulp.src('build', { read: false })
        .pipe(clean());
});

gulp.task('clean-zip', function() {
    return gulp.src('*.zip', { read: false })
        .pipe(clean());
});