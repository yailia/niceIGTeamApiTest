const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const webpack = require("webpack-stream");
const fileinclude = require('gulp-file-include');
const browserSync = require("browser-sync").create();

gulp.task("scss", function() {
  return gulp.src("./src/scss/*.scss")
    .pipe(sass({outputStyle: "expanded", sourceMap: true}))
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
  });

  gulp.task("html", function() {
    return gulp.src("./src/html/index.html")
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(concat("index.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
  });
  
  gulp.task("js", function() {
    return gulp.src("./src/scripts/*.js")
      .pipe(webpack({
        mode: "production",
        output: {
          filename: "index.js"
        }
      }))
      // .pipe(uglify())
      .pipe(gulp.dest("./dist/"))
      .pipe(browserSync.stream());
  });
gulp.task("fonts", function() {
  return gulp.src("./src/fonts/**/*")
    .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("./src/scss/*.scss", gulp.parallel("scss"));
  gulp.watch("./src/html/*.html", gulp.parallel("html"));
  gulp.watch("./src/scrips/*.js", gulp.parallel("js"));
});

gulp.task("build:prod", gulp.parallel("scss", "html", "js", "fonts"));
gulp.task("build:dev", gulp.parallel("scss", "html", "js", "fonts", "serve"));
