const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('compiler', () => {
    return gulp.src('./dev/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', "stage-3"]
        }))
        .pipe(concat('./index.js'))
        .pipe(sourcemaps.write('../dev/maps'))
        .pipe(gulp.dest('./src'));
});
gulp.task('watch',()=>{
    gulp.watch('./dev/**/*js', ['compiler']);
})