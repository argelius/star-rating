const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

gulp.task('build', () => {
    return gulp.src('star-rating.es6')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['star-rating.js', 'star-rating.html'], function() {
    browserSync.reload();
  });

  gulp.watch('star-rating.es6', ['build']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: __dirname,
      directory: false
    },
    ghostMode: false,
    notify: false,
    debounce: 200,
    index: 'index.html'
  });
});
