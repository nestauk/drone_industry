import gulp from "gulp";
import ghPages from "gulp-gh-pages";
import env from "gulp-env";

/*
using the "gulp v3 way", returning the stream as otherwise this won't work:
https://github.com/shinnn/gulp-gh-pages/issues/95#issuecomment-232267036
but this packages is unmaintained it seems, had to apply this fix:
https://github.com/shinnn/gulp-gh-pages/issues/116#issuecomment-364959382
TODO, use gh-pages directly:
https://github.com/shinnn/gulp-gh-pages/issues/116#issuecomment-390199382
*/

gulp.task("publish", () => {

    return gulp.src("build/**/*")
    .pipe(ghPages());
});

gulp.task("deploy", gulp.series(
    "setEnvProduction",
    "build",
    "publish"
));
