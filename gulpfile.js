const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function css() {
    return src('./src/sass/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('./public/css'), { sourcemaps: true })
        .pipe(browserSync.stream());
}

function js() {
    return src('./src/js/*.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(webpack())
        .pipe(concat('script.min.js'))
        .pipe(dest('./public/js', { sourcemaps: true }))
}

function build() {
    return series(css, js);
}

function browser(){

    browserSync.init({
        server: {
			baseDir: '../datepicker'
		}
    });

    watch('./src/sass/*.scss', css);
    watch('./src/js/*.js', js).on('change', browserSync.reload);
    watch('./*.html').on('change', browserSync.reload);

}

exports.build = series(css, js);
exports.default = browser;