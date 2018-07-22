import parseArgs from "minimist";

export default parseArgs(process.argv.slice(2), {
    boolean: [
        // "f", // with footer?
        "p", // production build?
    ],
    default: {
        // f: false,
        p: false,
    }
});
