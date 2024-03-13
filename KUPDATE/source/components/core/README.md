# Core components

Reusable single-file components (SFC) that implement fundamental parts or systems of the
sheet. Those could be moved to another sheet and further built upon, they typically aren't
very specific to the current sheet.

## Content of this directory

- `_index.pug`: Index PUG file to load the folder in a single `include` statement.
- [`utils/`](utils/_utils.pug): Various shared javascript utilities used throught the core
  components and the sheet. Those contains both PUG-runtime utilities, sheetworker-runtime
  utilities and code shared between both runtimes.
- `_links.pug`: Construct for external links in a Roll20 sheet: those are blocked, and
  thus we print the link to the chat instead.
- `_markdown.pug`: Mixins to load & render markdown files in the sheet. Useful to embed
  CHANGELOG.md, documentation, etc...
- [`callouts/`](callouts/_callouts.pug): Callouts (aka. Alerts) like found in GitHub
  markdown or Obsidian. Typically useful to communicate back to the player from
  sheetworkers, if necessary.
