const gulp = require('gulp');
const pug = require('gulp-pug');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const fs = require('fs');
const exec = require('child_process').exec;
const tsProject = ts.createProject('tsconfig.json');

function cleanTask() {
    if (!fs.existsSync("./build")) fs.mkdirSync("./build");
    return gulp.src("build/*")
        .pipe(clean());
}

function typescriptTask() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('build'));
}

function pugTask() {
    return gulp.src('src/main/*.pug')
        .pipe(pug({
            basedir: "./"
        }))
        .pipe(gulp.dest('build'));
}

function packageJsonTask() {
    return gulp.src("package.json")
        .pipe(gulp.dest("./build/"))
}

function distTask() {
    if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");
    return exec("electron-packager ./build --out ./dist")
}

exports.default = gulp.series(cleanTask, packageJsonTask, pugTask, typescriptTask);
exports.myDist = gulp.series(cleanTask, packageJsonTask, pugTask, typescriptTask, distTask);