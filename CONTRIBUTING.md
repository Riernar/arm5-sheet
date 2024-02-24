# Contributing

This document only deals with the specific setup of the Ars Magica 5th sheet. For general
consideration of Roll20 sheet development, including how it works, see:

- The [Character Sheet Development][r20wiki-sheet-development] of the community's Roll20
  wiki
- GiGs' [tutorial][gigs-sheet-tutorial]
- The `#custom-charsheet` channel of the [Unofficial Roll20
  Discord][roll20-discord-unofficial]

[r20wiki-sheet-development]: https://wiki.roll20.net/Building_Character_Sheets
[gigs-sheet-tutorial]: https://cybersphere.me/roll20-sheet-author-master-list/
[roll20-discord-unofficial]: https://discordapp.com/invite/sMsv5KD

> [!WARNING]  
> Development takes place in the [sheet's dedicated repository][sheet-repository]. Please
> use this repository for development.

[sheet-repository]: https://github.com/Riernar/arm5-sheet

## Table of Content

- [Contributing](#contributing)
  - [Table of Content](#table-of-content)
  - [Tools](#tools)
  - [Repository content](#repository-content)
  - [Development environment](#development-environment)
    - [Setup](#setup)
    - [Building the sheet](#building-the-sheet)
  - [Making a Pull Request](#making-a-pull-request)
  - [File organization and naming scheme](#file-organization-and-naming-scheme)
    - [Legacy code](#legacy-code)
    - [New PUG code](#new-pug-code)
  - [Advanced techniques used in the sheet](#advanced-techniques-used-in-the-sheet)
    - [Importing javascript into PUG runtime](#importing-javascript-into-pug-runtime)
    - [Deferred attribute lookup](#deferred-attribute-lookup)

## Tools

The Ars Magica 5th edition is developed with:

- [markdown](https://commonmark.org/), to write the documentation
- [PUG](https://pugjs.org/api/getting-started.html), a templating engine for HTML
- [SCSS](https://sass-lang.com/documentation/syntax), an improvement other CSS
- [node.js](https://nodejs.org/en/), a javascript runtime, which we use to compile the PUG
  and SCSS to actual HTML and CSS for Roll20.
- [k-scaffold](https://kurohyou-studios.github.io/k-scaffold/), a node.js package which is
  a framework for building Roll20's Character sheet, made by Scott Casey. It contains many
  pre-built systems and PUG mixins tailored toward Roll20 sheets.

> [!NOTE]
>
> We do not use [prepros](https://prepros.io/) because we use k-scaffold for compilation.
> We also need to pass node.js packages (such as `markdown-it`) to the PUG compilation
> environment, which prepros cannot do.

## Repository content

- `source/`: source files of the sheet
- `images/`: images used in the sheet
- `translations/`: Translation files for other languages

> [!CAUTION]  
> Do NOT edit `translations/` folder. Translations are managed by Roll20 using Crowdin,
> see the [wiki](https://wiki.roll20.net/Translation).

## Development environment

### Setup

You'll need:

- A Roll20 Pro subscription and
  [a sheet sandbox](https://wiki.roll20.net/Sheet_Author_Tips#Sheet_Sandbox)
- [Optional, Recommended] A unix terminal
  - If you are using Linux or MacOS, the standard terminal is already a unix shell
  - If you are using Windows, consider using the
    [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install)
- The [git](https://git-scm.com/) version control system
- An Integrated Development Environment (IDE)
  - We use [VSCode](https://code.visualstudio.com/). It can seamlessly integrate the WSL
    as VSCode's integrated terminal, so that developing on unix or windows has the same
    interface.
- An installation of `npm` and `node`.
  - You can use [`mise`](https://mise.jdx.dev/) to install `node.js`. It supports
    installing many other tools and can handle several version of a tool at a time. It is
    like NVM for all tools.
- [Optional, Recommended] A Chromium-based browser with the [Roll20 API and Sheet
  Autouploader][autouploader-extension] extension, to make development easier.

[autouploader-extension]:
  https://chrome.google.com/webstore/detail/roll20-api-and-sheet-auto/hboggmcfmaakkifgifjbccnpfmnegick

Build the development environment by installing the required NPM packages:

```bash
npm install
```

### Building the sheet

The sheet is built by K-Scaffold using script registered in `packages.json`. In a
terminal, use the commands:

- `npm run start`: start monitoring the source files for change, and rebuild the sheet
  continuously as necessary.
- `npm run build`: build the sheet once.

## Making a Pull Request

Contribution to the sheet must be made by a Pull Request on the [sheet's dedicated
repository][sheet-repository]. When making git commits and PR, please follow the following
rules:

- Commit message must conform to the
  [Angular header format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header)  
  We support the following types:
  - **chores**: Change that do not affect the sheet per se, like updating repository
    settings or .gitignore
  - **build**: Changes that affect the build system or external dependencies (k-scaffold,
    ...)
  - **ci**: Changes to our CI configuration files and scripts
  - **docs**: Documentation only changes
  - **feat**: A new feature
  - **fix**: A bug fix
  - **perf**: A code change that improves performance
  - **refactor**: A code change that neither fixes a bug nor adds a feature
  - **test**: Adding missing tests or correcting existing tests
- [github issue/PR reference](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls#issues-and-pull-requests)
  must explicitly reference the Org/Repo to avoid broken references when merging back to
  the Roll20 repository.

This allows to keep the git history clean, and to generate a clean changelog from the git
history.

The contribution process is as follows:

- Open an issue in [Riernar/arm5-sheet][sheet-repository] to discuss the change before
  coding. The change might alrady be planned, affect other things in the sheet, etc...
- Fork [Riernar/arm5-sheet][sheet-repository]
- Checkout a new branch
- Develop your contribution in the branch
  - Be careful that each commit message must follow angular's format
- Open a Pull Request (PR) in [Riernar/arm5-sheet][sheet-repository]
  - Be careful that the _title_ of the PR must follow angular's format, as it will become
    a commit in the main branch

## File organization and naming scheme

All the source files are in `source/`. The compiled files will be produced in the root
folder. All PUG and SCSS files _not_ starting with a leading underscore `_` will be
compiled by K-Scaffold.

### Legacy code

This sheet is currently being ported from raw HTML/CSS with a python layer, to PUG/SCSS,
k-scaffold and javascript. The last generated version of the sheet using the old tools is
found in `source/legacy/`, splitted and formatted appropriately so that it may be injected
in PUG. This let us update parts of the sheet in an incremental fashion. The original
source files for this generation are in `source/legacy/source` for reference only.

### New PUG code

All the source files are in `source/`. There are 4 kind of source files:

- `.pug` files are for generating HTML with PUG
- `.scss` files are for generating CSS with Sass
- `.js` files are included in pug to produce helpers, and also contain sheetworkers (
  javascript that ends up as-is in the sheet and will be run inside the VTT).
- `.md` files are Markdown files wich are rendered to HTML by PUG. They are used to write
  simple HTML, and also have files that can be viewed directly in github. Examples include
  the sheet [documentation](documention.md) and the [changelog](changelog.md).

For javascript files, there are actually two javascript runtimes involved in that sheet:

- At **build** time, that is when the `node.js` package `pug` is rendering the `.pug`
  files to HTML. PUG is written in javascript and allows javascript code inside the `.pug`
  files to run to generate the sheet. This makes it very powerful. Javascript files that
  are used at sheet generation time end in `.pug.js` to make it clear when the javascript
  code is used.
- At **game** time, when the sheet is loaded and running inside Roll20. This is typically
  known as _sheetworkers_: javascript that runs inside the VTT. Javascritp files which are
  included in the sheet to be sheetworker are named `.sheet.js` to make it clear when the
  javascript code is used.

## Advanced techniques used in the sheet

### Importing javascript into PUG runtime

When compiling PUG into HTML, we pass custom values into the PUG runtime with
`generate.js`. In particular, we pass node's `require` function, allowing us to load node
packages or our own `.js` files into the PUG runtime.

### Deferred attribute lookup

> **Note**
>
> The technique below pre-dates Custom Roll Parsing and could be replaced by CRP.

The sheet uses deferred attribute lookup for spells and abilities. This is simply a clever
way of writing roll20's rolls, so that you fetches the value of an attribute named
according to another attribute value. That is, if your spell's art is Creo, you store the
value 'creo' in the attribute linked to the spell (so that you can use the name, e.g. for
inline labels), but you're able to lookup the `Creo_Score` attribute for the roll.

The Roll20 dice engine accepts up to 99-levels of nested attributes lookup (using the
`@{attr_name}` syntax). If you use adjacent attributes lookup that, when resolve, yields a
new attribute lookup, the next pass will resolve that attribute lookup normally. This is
exactly like having an attribute lookup inside another, but the inner lookup is spread
into several attributes. The important things is that all parts are resolved during the
same pass.

> **Example**
>
> An example and a table makes things easier to understand. The "system" attributes used
> to build the query have the same name as they do in the sheet. We use "NAME" as a
> placeholder for the character's name.
>
> Initial roll formula:
> `@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk}`
>
> **First Pass**
>
> Input: `@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk}`
>
> |       | @{sys_at} | @{character_name} | @{sys_pipe} | @{spell_tech_name} | \_Score | @{sys_rbk} |
> | :---: | :-------: | :---------------: | :---------: | :----------------: | :-----: | :--------: |
> | VALUE |    @{     |       NAME        |     \|      |        Creo        | \_Score |     }      |
>
> Output: `@{NAME|Creo_Score}`
>
> **Second Pass**
>
> Input: `@{NAME|Creo_Score}`
>
> Output: the character's score in Creo

This makes it possible to use inline labels that shows the name of the attribute that was
looked up, e.g.

```
@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk} [@{spell_tech_name}]
```

Assuming you have a Creo score of 3, this yields `3 [Creo]`, which tells you where that +3
comes from. The sheet pushes this further, as the inline labels use the same deferred
attribute lookup technique, to translate the labels to you local langages: a sheet worker
creates attributes ending in `_i18n` (short for internationalization) -- such as
`Creo_i18n` -- that contain the local translation of the word. It then uses deferred
attribute lookup to translate the inline label.

While this is not very useful for Arts since many langage just use the Latin word, it is
indeed useful for translating characteristics names in ability rolls, or words & gestures
in spell rolls etc.
