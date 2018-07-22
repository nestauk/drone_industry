import gulp from "gulp";

gulp.task("build", gulp.parallel(
    "copy.assets",
    "copy.data",
    "copy.mapboxgl.css",
    "copy.html.embedded",
    "copy.html.fullscreen",
    "rollup"
));

gulp.task("envbuild", gulp.series(
    "setEnvFromTerminal",
    "build",
));
