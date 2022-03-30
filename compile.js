const pug = require("pug");
const fs = require("fs");

function get_suffix(filepath) {
    return filepath.substring(filepath.lastIndexOf('.'), filepath.length) || filepath;
}

function with_stem(filepath, suffix) {
    const path = filepath.substring(0, filepath.lastIndexOf('/') + 1) || "";
    const filename = filepath.substring(filepath.lastIndexOf('/') + 1, filepath.length) || filepath;
    const stem = filename.substring(0, filename.lastIndexOf('.')) || filename;
    // const suffix = filename.substring(filename.lastIndexOf('.'), filename.length) || "";
    return `${path}${stem}.${suffix}`
}

const files = fs.readdirSync(".").filter(filename => get_suffix(filename) == ".pug");
files.forEach(filename => fs.writeFileSync(
    with_stem(filename, ".html"),
    pug.renderFile(filename)
));