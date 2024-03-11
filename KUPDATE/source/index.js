// This file is a trick to get a node.js `require()` function that starts at the root file
// of the sources, and pass it into the PUG runtime.
// This is useful to load component's PUG-runtime javascript from dedicated JS files.
//
// See the top-level compile-sheet.js.

module.exports = { require }