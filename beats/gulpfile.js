const { src, dest, task, series, watch, parallel } = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require("node-sass");

const styles = [
    "node_modules/normalize.css/normalize.css",
    "/src/styles/main.scss"
]

task("clean", () => {
    return src('dist/**/*', {read: false})
        .pipe(clean());
});

task("copy:html", () => {
    return src("src/*.html").pipe(dest("dist"));
});

task("styles", () => {
    return src(styles)
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest('dist'));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task("watch", () => {
    watch('.src/styles/**/*.scss', series('styles'));
    watch('*.html', series('styles'));
})

task("build", series ("clean", parallel("copy", "styles")));
task("default", series ("clean", parallel("copy", "styles"), parallel("server", "watch"))); //npm run gulp