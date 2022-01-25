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

---
