import gulp from "gulp";
import BrowserSync from "browser-sync";

const browserSync = BrowserSync.create();

gulp.task("serve", done => {
    browserSync.init({
        server: {
            baseDir: "./build",
        },
        // https: true,
        port: 7000,
        open: false,
        reloadOnRestart: true,
        notify: false,
        ghostMode: false,

        // watch & inject
        watch: true,
        files: [
            "build/fullscreen/bundle.css",
            "build/fullscreen/bundle.js",
            "build/fullscreen/index.html",
            "build/embedded/bundle.css",
            "build/embedded/bundle.js",
            "build/embedded/index.html",
        ],
        ignore: [
            "build/fullscreen/bundle.css.map",
            "build/fullscreen/bundle.js.map",
            "build/embedded/bundle.css.map",
            "build/embedded/bundle.js.map",
        ],

        logPrefix: "Drone Industry"
    });

    done();
});
