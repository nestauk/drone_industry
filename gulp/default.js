import gulp from "gulp";

gulp.task("default", gulp.series(
    "envbuild",
    "serve",
    gulp.parallel(
        "watch.assets",
        "watch.data",
        "watch.html",
        "watch.src"
    )
));
