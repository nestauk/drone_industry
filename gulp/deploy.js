import gulp from "gulp";
import ghPages from "gulp-gh-pages";
import env from "gulp-env";

gulp.task("publish", done => {
    gulp.src("build/**/*")
    .pipe(ghPages());

    done();
});

gulp.task("deploy", gulp.series(
    "setEnvProduction",
    "build",
    "publish"
));
