// gulpfile.js

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

const paths = {
  scss: {
    src: "./src/scss/nhsuk.scss",
    dest: "./public/css",
  },
};

/*
const paths = {
    scss: {
        src: './src/scss/styles.scss',
        dest: './public/css'
    }
};
*/

function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.scss.dest));
}

function watch() {
  gulp.watch(paths.scss.src, styles);
}

exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
