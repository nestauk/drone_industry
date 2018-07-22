import gulp from "gulp";

const COMPANIES_PATH = "data/companies.tsv";

gulp.task("copy.data", done => {
    gulp.src(COMPANIES_PATH)
    .pipe(gulp.dest("build/data"));

    done();
});

gulp.task("watch.data", done => {
    gulp.watch(COMPANIES_PATH, gulp.series("copy.data"));

    done();
});
