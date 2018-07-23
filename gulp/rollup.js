import path from "path";

import gulp from "gulp";
import {rollup} from 'rollup';
import alias from "rollup-plugin-alias";
import svelte from "rollup-plugin-svelte";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import buble from "rollup-plugin-buble";
// import {uglify} from "rollup-plugin-uglify";
import {terser} from "rollup-plugin-terser";

import pkg from "../package.json";
import {makeBuildSubpath} from "./index";
import options from "./options";

const {makeResolveAliases} = require("../src/utils/buildUtils");

const resolveAliases = makeResolveAliases(path.resolve(__dirname, "../"));

const makeBuildConfig = (appConfig, isProduction) => {
    const {withNestaFooter} = appConfig;

    const buildPath = withNestaFooter
        ? makeBuildSubpath("fullscreen")
        : makeBuildSubpath("embedded");

    console.log("isProduction", isProduction);

    return {
        bundleOpts: {
            input: "src/app/main.js",
            plugins: [
                replace({
                    include: "src/app/main.js",
                    values: {
                        WITH_NESTA_FOOTER: withNestaFooter
                    }
                }),
                alias(resolveAliases({
                    "@utils": "src/utils",
                    "@vendor": "src/vendor"
                })),
                svelte({
                    // opt in to v3 behaviour today
                    skipIntroByDefault: true,
                    nestedTransitions: true,
                    dev: !isProduction,

                    // we"ll extract any component CSS out into
                    // a separate file — better for performance
                    css: css => {
                        css.write(`${buildPath}/bundle.css`);
                    }
                }),

                resolve(),
                commonjs(),

                // isProduction && buble({
                // buble({
                //     include: [
                //         "src/**",
                //         "node_modules/svelte/shared.js"
                //     ]
                // }),
                isProduction && terser()
            ]
        },
        outputOpts: {
            file: `${buildPath}/bundle.js`,
            format: "iife",
            name: pkg.name,
            sourcemap: true,
        }
    }
}

gulp.task("rollup.fullscreen", async function (done) {
    const {bundleOpts, outputOpts} = makeBuildConfig(
        {withNestaFooter: true},
        process.env.PRODUCTION_BUILD
    );

    const bundle = await rollup(bundleOpts);
    await bundle.write(outputOpts);

    done();
});

gulp.task("rollup.embedded", async function (done) {
    const {bundleOpts, outputOpts} = makeBuildConfig(
        {withNestaFooter: false},
        process.env.PRODUCTION_BUILD
    );

    const bundle = await rollup(bundleOpts);
    await bundle.write(outputOpts);

    done();
});

gulp.task("rollup", gulp.parallel(
    "rollup.embedded",
    "rollup.fullscreen"
));

// gulp.task("rollup", () => {
//     const rollups = ["rollup.embedded"];
//     if (options.f) {
//         _.appendTo(rollups, "rollup.fullscreen")
//     };
//
//     console.log(rollups);
//
//     gulp.parallel(...rollups);
//     done();
// });

gulp.task("watch.src", done => {
    gulp.watch("src/**/*", gulp.series("rollup"));

    done();
});
