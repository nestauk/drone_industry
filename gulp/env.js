import gulp from "gulp";
import env from "gulp-env";

import options from "./options";

gulp.task("setEnvFromTerminal", done => {
    env.set({
        PRODUCTION_BUILD: options.p ? true : false
    });

    done();
});

gulp.task("setEnvProduction", done => {
    env.set({PRODUCTION_BUILD: true});

    done();
});
