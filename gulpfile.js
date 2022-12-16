const { src, dest, task, series, watch, parallel } = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('node-sass'));
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require("node-sass");

const styles = [
    "node_modules/normalize.css/normalize.css",
    "src/styles/main.scss"
];

const images = [
    "src/**/*.png",
    "src/**/*.svg"
];

task("clean", () => {
    return src('dist', {read: false})
        .pipe(clean());
});

task("copy:html", () => {
    return src("src/*.html").pipe(dest("dist"));
});

task("copy:img", () => {
    return src(images).pipe(dest('dist'));
});

task("copy:svg", () => {
    return src("src/*.svg").pipe(dest("dist"));
});

task("copy:video", () => {
    return src("src/**/*.mp4").pipe(dest("dist"));
});

task("copy:scripts", () => {
    return src("src/**/*.js").pipe(dest('dist/'));
});

task("scripts", () => {
    return src("src/js/*.js").pipe(gulpif(env == 'prod', babel({presets: ["@babel/env"]}))).pipe(dest("dist"));
});

task("styles", () => {
    return src(styles)
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env == 'prod', cleanCSS()))
        .pipe(gulpif(env == 'dev', sourcemaps.write()))
        .pipe(dest('dist/css'));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task("watch", () => {
    watch('src/styles/**/*.scss', series('styles'));
    watch('src/*.html', series('styles'));
})

task("default", series ("clean", parallel("copy:html", "copy:img", "copy:svg", "copy:scripts", "copy:video", "styles"), parallel("watch", "server"))); //npm run gulp
task("build", series ("clean", parallel("copy:html", "copy:img", "copy:svg", "copy:scripts", "copy:video", "styles")));