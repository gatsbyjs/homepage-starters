# Gatsby Homepage Starters

Development setup for homepage starters with various CMS backends

To use these starters for a new Gatsby site, use one of the following:

- https://github.com/gatsbyjs/gatsby-starter-contentful-homepage
- https://github.com/gatsbyjs/gatsby-starter-datocms-homepage
- https://github.com/gatsbyjs/gatsby-starter-wordpress-homepage

## Local development

This repo is set up with local plugins for each CMS/backend.
All starters share the same source code in the root of this repo and its `src` directory.

All components and styles should be kept in the root `src` (or `static`, when relevant) directory.
Code and functionality that is specific to a particular source plugin should be kept in its relative `plugins` directory.

```sh
├── README.md
├── gatsby-config.js
├── package.json
├── plugins
│   ├── contentful-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   ├── datocms-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   ├── wordpress-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   └── yaml-plugin
│       ├── gatsby-config.js
│       ├── gatsby-node.js
│       └── package.json
├── src
│   ├── components
│   └── pages
│       └── index.js
```

## Publishing

To publish changes to these starters, you must have access to push to their repos.

Ensure you have a `GITHUB_TOKEN` variable defined with a personal access token from GitHub.
In the root directory, on the `main` branch with no unstaged changes, run `yarn && yarn publish-starters`.
This will clone the remote starters, update their contents with files from this repo, commit changes, and push those changes to the remotes.
The script will log progress so be sure to confirm that it successfully publishes with no errors.

## Editing starter READMEs

**Do NOT edit the `README.md` files in the plugins directory.**
Any changes made to these files will be overwritten by the `create-readmes` script.

The `README.md` file published with each starter is generated from a script and template that replaces variables for URLs and the names of the relevant CMS and has markdown file includes for sections that deal with specific CMS features.

The following files are responsible for generating the README in each starter:

- `scripts/create-readmes.mjs` -- ESM Node.js script that uses Remark and remark-directive for templating
- `scripts/data.js` -- variables and metadata for each starter
- `docs/readme-template.md` -- the main template for the starter READMEs; this template uses Remark directives for CMS name, demo URL, and more.
- **Starter-specific files** -- each starter _must_ have these files in order to generate the README.md
  - `plugins/[plugin-name]/docs/quick-start-intro.md` -- an intro blurb about CMS requirements that is included in the _Quick start_ section
  - `plugins/[plugin-name]/docs/custom-sections.md` -- the first two list items in the _Create custom section components_ that has CMS-specific information

To edit the content for all starters' READMEs, edit the `readme-template.md` file.
To edit content that is specific for a particular CMS starter, edit or add markdown files to the relevant `docs` directory for that starter.

### Remark Directives

The template supports the following directives:

**`::include{file=some-file.md}`**

Use the `::include` directive to render markdown content from a file in the starters' `docs` directory.
For example, `::include{file=custom-sections.md}` will render the content from `plugins/[starter-plugin]/docs/custom-sections.md`.

**`:var[some-var]`**

Use the `:var` directive to replace words that are unique to the starter.
For example `:var[cms]` will render `Contentful`, `DatoCMS`, and `WordPress` for each starter.

**`:link[some-url-var]{text="Link text"}`**

Use the `:link` directive to create a link with generic text, but a starter-unique URL.
For example, `:link[demoURL]{text="View the Demo"}` will render `[View the demo](https://gatsbycontentfulhomepage.gatsbyjs.io/)` for the Contentful starter.

To add new variables to the template, add the values to the `scripts/data.js` object for each starter.

**Fenced code blocks**

Fenced code blocks can also use variables with the meta string.

For example, the following codeblock:

````md
```sh repo
npx gatsby new my-homepage $
```
````

Will render:

````md
```sh repo
npx gatsby new my-homepage https://github.com/gatsbyjs/gatsby-starter-contentful-homepage
```
````

The `name` variable is used to replace the `$` in the code snippet. Currently this is a simple call to `String.replace` and will not work if the code snippet includes the `$` symbol.

### Generating new README.md files

If you've made changes to the docs, update each starter's `README.md` file by running this npm script in the root directory:

```sh
yarn create-readmes
```
