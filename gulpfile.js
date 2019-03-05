// @flow
const gulp = require("gulp");
const pug = require("gulp-pug");
const replace = require("gulp-replace");
const path = require("path");
const cssMin = require("gulp-css");
const plumber = require("gulp-plumber");

gulp.task("deploy-templates", () => {
  return gulp
    .src("./server/web/views/**/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        basedir: path.join("server/web/views"),
        client: true,
        verbose: true,
        cache: true,
        compileDebug: false,
      })
    )
    .pipe(
      replace("function template(locals)", "module.exports = function(locals)")
    )
    .pipe(gulp.dest("dist/server/web/views"));
});

gulp.task("deploy-css", () => {
  return gulp
    .src("./server/web/public/css/**/*.css", { ignoreInitial: false })
    .pipe(plumber())
    .pipe(cssMin())
    .pipe(gulp.dest("dist/server/web/public/css"));
});

gulp.task("deploy", () => {
  return gulp
    .src("./server/web/views/**/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        basedir: path.join("server/web/views"),
        client: true,
        verbose: true,
        cache: true,
        compileDebug: false,
      })
    ) // pipe to pug plugin
    .pipe(
      replace("function template(locals)", "module.exports = function(locals)")
    )
    .pipe(gulp.dest("dist/server/web/views")); // tell gulp our output folder
});
