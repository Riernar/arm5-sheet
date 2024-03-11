const k = require('@kurohyou/k-scaffold');
const path = require('path');
const sass = require('sass-embedded');
const url = require('node:url');
const util = require('node:util');


const config = {
    options: {
        watch: {
            type: "boolean",
            default: false,
        },
        assets: {
            type: "string",
        },
        source: {
            type: "string",
            default: "./source"
        },
        dest: {
            type: "string",
            default: "./build"
        }
    },
    strict: true,
};
const args = util.parseArgs(config).values;
if (args.assets == null) {
    throw new Error("Missing argument --assets.");
}
const assetPrefix = new url.URL(args.assets);
const sourceRequire = require(path.resolve(args.source, "index.js")).require;

const kOptions = {
    "source": args.source,
    "destination": args.dest,
    "testDestination": "./__tests__",
    "templates": args.source,
    "sfc": true,
    "watch": args.watch,
    "pugOptions": {
        "suppressStack": true,
        "modules": {
            // This extract the require from source/index.js,
            // to be able to import relative to sources
            "require": sourceRequire,
            "fs": sourceRequire('fs'),
            "path": sourceRequire('path'),
            "markdown-it": sourceRequire('markdown-it'),
        }
    },
    "scssOptions": {
        "functions": {
            'asset($suffix)': function (args) {
                const suffix = args[0].assertString("suffix");
                const target = new url.URL(suffix.text, assetPrefix);
                return new sass.SassString(target.toString());
            }
        }
    }
};
k.all(kOptions);

