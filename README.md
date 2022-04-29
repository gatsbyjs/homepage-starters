# Gatsby Homepage Starters

Development setup for homepage starters with various CMS backends

To use these starters for a new Gatsby site, use one of the following:

- https://github.com/gatsbyjs/gatsby-starter-contentful-homepage
- https://github.com/gatsbyjs/gatsby-starter-datocms-homepage
- https://github.com/gatsbyjs/gatsby-starter-drupal-homepage
- https://github.com/gatsbyjs/gatsby-starter-wordpress-homepage
- https://github.com/gatsbyjs/gatsby-starter-sanity-homepage

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
│   ├── drupal-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   └── wordpress-plugin
│       ├── gatsby-config.js
│       ├── gatsby-node.js
│       └── package.json
├── src
│   ├── components
│   └── pages
│       └── index.js
```

### Getting started

1. This repo is set up as a [Yarn Workspace][]. Run `yarn` in the root directory to install dependencies.

   ```sh
   yarn
   ```

1. Add a `.env.development` file to the root directory and populate environment variables for each CMS you'll be developing against.

   ```sh
   # example .env.development
   CONTENTFUL_SPACE_ID=""
   CONTENTFUL_ACCESS_TOKEN=""
   DATOCMS_API_TOKEN=""
   DATOCMS_ENVIRONMENT=""
   DRUPAL_BASE_URL=""
   DRUPAL_BASIC_AUTH_USERNAME=""
   DRUPAL_BASIC_AUTH_PASSWORD=""
   WPGRAPHQL_URL=""
   ```

1. Edit the root `gatsby-config.js` and comment or uncomment the CMS plugin that you're developing against.
1. To start the development server, run:

   ```sh
   yarn start
   ```

[yarn workspace]: https://classic.yarnpkg.com/lang/en/docs/workspaces/

### Making changes to the front-end

To make changes on the front-end for _all_ starters, edit the files in the root `src` directory.
These components use [Vanilla Extract][] for styling.

- `src/styles.css.ts` - global styles for `body` and `box-sizing` (generally this should not need to be updated)
- `src/theme.css.ts` - shared theme values used in other styles
- `src/favicon.png` - the favicon used for all starters
- `src/colors.css.ts` - the fallback colors used for development – Each starter has its own colors and this file is overwritten during publish
- `src/pages` - includes the homepage, 404, about page, and template for rich text pages like Privacy Policy and Terms
- `src/components` - all components used to render pages

**Notable components**

- `src/components/ui.js` - contains multiple general-purpose, styled UI components that section components use for styling
- `src/sections.js` - the main export module for all section/block components used in the homepage and about page
- `src/layout.js` - the wrapping layout component for all pages
- `src/brand-logo.js` - fallback logo for development; this is overwritten during publish

[vanilla extract]: https://vanilla-extract.style/documentation/

### Making data model changes

To make changes to the data model, changes will need to be made for each CMS starter's plugin directory.
Specifically, most changes will be in each directory's `gatsby-node.js` file.

- `plugins/contentful-plugin/gatsby-node.js`
- `plugins/datocms-plugin/gatsby-node.js`
- `plugins/drupal-plugin/gatsby-node.js`
- `plugins/wordpress-plugin/gatsby-node.js`

## Adding support for another CMS

To create a new Homepage Starter for another CMS, see [Creating a New Starter](docs/creating-a-new-starter.md).

## Publishing

To publish changes to these starters, you must have access to push to their repos.

Ensure you have HTTPS access to push to GitHub from your command line.
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

**`::include{file=docs/some-file.md}`**

Use the `::include` directive to render markdown content from a file in the starter's directory.
For example, `::include{file=docs/custom-sections.md}` will render the content from `plugins/[starter-plugin]/docs/custom-sections.md`.

The `::include` directive can also be used to render content from other filetypes as a code fence.

For example, `::include{file=src/colors.css.ts}` will render:

````md
```ts
// src/colors.css.ts
export const colors = {
  background: "#ffe491",
  text: "#004ca3",
  primary: "#004ca3",
  muted: "#f2d98a",
  active: "#001d3d",
  black: "#000",
}
```
````

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

The `repo` variable is used to replace the `$` in the code snippet. Currently this is a simple call to `String.replace` and will not work if the code snippet includes the `$` symbol.

### Generating new README.md files

If you've made changes to the docs, update each starter's `README.md` file by running this npm script in the root directory:

```sh
yarn create-readmes
```
