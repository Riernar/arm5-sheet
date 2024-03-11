# Components

This folder contains single-file components (SFC): reusable pieces of code used to build
the sheet.

## Folder content

- [`_index.pug`](_index.pug): Index PUG file used to load the whole directory in a single
  `include` instruction.
- [`core/`](core/README.md): Core components that implement fundamental parts or systems
  of the sheet. Those could be moved to another sheet and further built upon, they
  typically aren't very specific to the current sheet.
