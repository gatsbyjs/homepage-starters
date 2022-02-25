# Creating a new starter

This development repo is set up to reuse front-end code for several different starters that source content from different CMSs.
This repo should not be used as a starter on its own and includes scripts to generate starters in separate repos.

If you'd like to create a new Homepage Starter for a CMS that isn't currently supported, follow this guide.

## Initial Setup

Be sure to create an empty project in the CMS that you are building for and consult the documentation for its Gatsby source plugin.

1. Create a new directory in `plugins` that follows the naming convention of `<CMS>-plugin`.
1. In this new directory, create a `package.json` file and ensure the `name` field is updated to be the lowercase version of the CMS.
1. In the root of this repo, run `yarn` to add this new package to the workspace.
1. In the new `<CMS>-plugin` directory, install any Gatsby source plugins required for the CMS.
1. Determine what environment variables are required for the source plugin and add a `.env.EXAMPLE` file. Do NOT check in API keys or other secrets. Only include the name of the keys required in this file.

## Gatsby Config

Add a `gatsby-config.js` file to the plugin directory.
Add the source plugin and pass environment variables to the plugin's options.
Also be sure to include the other plugins that the starter will require.

```js
// example gatsby-config.js
// Replace `gatsby-source-contentful` with the CMS that your are using.
// Be sure to update the options for gatsby-plugin-manifest as well.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Starter Contentful Homepage",
        short_name: "Gatsby",
        start_url: "/",
        background_color: "#ffe491",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
  ],
}
```

## Gatsby Node Config

The bulk of the configuration is in the `gatsby-node.js` file for the starter, which defines GraphQL interfaces for use in the front end, and provides type definitions for the CMS content using [Schema Customization][]. You can use the related files in `plugins/contentful-plugin` and `plugins/datocms-plugin` as examples when building this out, but every CMS will have its own specific implementation details here.

First, use the [Schema Customization][] API to create interfaces. These are what the front-end components use to query data via [Queryable Interfaces][].

```js
// gatsby-node.js
exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      url: String
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    # example abbreviated...
  `)
}
```

Reference one of the existing plugin directories for a full list of the interfaces required for the starter, e.g. [Contentful's `gatsby-node.js`](../plugins/contentful-plugin/gatsby-node.js).

Once all the interfaces are defined, use these interfaces to create custom type definitions for the GraphQL nodes sourced from the CMS's plugin.

```js
// example type definition
actions.createTypes(`
  type ContentfulHomepageLink implements Node & HomepageLink {
    id: ID!
    href: String
    text: String
  }
`)
```

Some type definitions must also implement the `HomepageBlock` interface. Reference an existing implementation to ensure the schema matches what's expected on the front-end.

```js
// example type definition for a HomepageBlock
actions.createTypes(`
  interface HomepageHero implements Node & HomepageBlock {
    id: ID!
    blocktype: String
    heading: String!
    kicker: String
    subhead: String
    image: HomepageImage
    text: String
    links: [HomepageLink]
  }
`)
```

### Using GraphiQL for development

Once you've started working on the GraphQL type definitions in `gatsby-node.js` it can be useful to start up
the Gatsby develop server's [GraphiQL][] to check that the nodes can be queried correctly.
Even if the entire schema isn't fully defined, Gatsby develop should be able to start up and will log any errors that the site might encounter
with the incomplete schema.

To start the Gatsby develop server using this new plugin, navigate to the root of the directory and edit its `gatsby-config.js` file.
Add the name of the new plugin to the `plugins` array and comment out any other local plugins.

```js
// gatsby-config.js (in root directory)
module.exports = {
  plugins: [
    // Comment and uncomment the desired CMS/backend plugin to switch between data sources
    // "datocms-plugin",
    // "drupal-plugin",
    // "contentful-plugin",
    // "datocms-plugin",
    // "wordpress-plugin",

    // Add the name of the new local plugin here
    "<CMS>-plugin",
  ],
}
```

Then start up the develop server by running:

```sh
yarn start
```

If there are issues with the schema, you might see errors and the site itself might not be viewable, but GraphiQL should start up.
Navigate to <http://localhost:8000/___graphql> in your browser to inspect and query the nodes that you've defined in your `gatsby-node.js`.

If you're dealing with linked nodes, it can be helpful to ensure the lower-level nodes can be queried then move onto the type definitions for the nodes that link to those nodes. For example, make sure that you can query `allHomepageLink` and `allHomepageImage` first, then check to make sure that you can query `allHomepageHero`, which includes an image and links.

[schema customization]: https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/
[queryable interfaces]: https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#queryable-interfaces
[graphiql]: https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/

## Color theme and logo

To customize the colors and logo used for this new starter, add a `src` and `src/components` directories. And add the following files, updating them for your specific CMS.

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

```js
// src/components/brand-logo.js
// Replace the contents of this file with an inline SVG logo in JSX format
import * as React from "react"

export default function BrandLogo() {
  return (
    <svg
      width="82"
      height="24"
      viewBox="0 0 82 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.333 0C5.73301 0 0.333008 5.4 0.333008 12C0.333008 18.6 5.73301 24 12.333 24C18.933 24 24.333 18.6 24.333 12C24.333 5.4 18.933 0 12.333 0ZM5.64729 18.6857C3.84729 16.8857 2.90444 14.4857 2.90444 12.1714L12.2473 21.4286C9.84729 21.3429 7.44729 20.4857 5.64729 18.6857ZM14.3902 21.1714L3.16158 9.94286C4.10444 5.74286 7.87587 2.57143 12.333 2.57143C15.5044 2.57143 18.2473 4.11429 19.9616 6.42857L18.6759 7.54286C17.2187 5.57143 14.9044 4.28571 12.333 4.28571C8.99015 4.28571 6.16158 6.42857 5.04729 9.42857L14.9044 19.2857C17.3902 18.4286 19.2759 16.2857 19.8759 13.7143H15.7616V12H21.7616C21.7616 16.4571 18.5902 20.2286 14.3902 21.1714Z"
        fill="currentColor"
      />
      <path
        d="M45.3128 8.6268C45.5081 8.43154 45.5081 8.11496 45.3128 7.9197L45.0799 7.68681C44.8846 7.49154 44.5681 7.49154 44.3728 7.68681L41.3532 10.7064C41.158 10.9016 40.8414 10.9016 40.6461 10.7064L37.6266 7.6868C37.4313 7.49154 37.1147 7.49154 36.9195 7.68681L36.6866 7.9197C36.4913 8.11496 36.4913 8.43154 36.6866 8.62681L39.7061 11.6464C39.9014 11.8416 39.9014 12.1582 39.7061 12.3535L36.6866 15.373C36.4913 15.5683 36.4913 15.8849 36.6866 16.0801L36.9195 16.313C37.1147 16.5083 37.4313 16.5083 37.6266 16.313L40.6461 13.2935C40.8414 13.0982 41.158 13.0982 41.3532 13.2935L44.3728 16.313C44.5681 16.5083 44.8846 16.5083 45.0799 16.313L45.3128 16.0801C45.5081 15.8849 45.5081 15.5683 45.3128 15.373L42.2932 12.3535C42.098 12.1582 42.098 11.8416 42.2932 11.6464L45.3128 8.6268Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M69.667 0C63.067 0 57.667 5.4 57.667 12C57.667 18.6 63.067 24 69.667 24C76.267 24 81.667 18.6 81.667 12C81.667 5.4 76.267 0 69.667 0ZM62.9813 18.6857C61.1813 16.8857 60.2384 14.4857 60.2384 12.1714L69.5813 21.4286C67.1813 21.3429 64.7813 20.4857 62.9813 18.6857ZM71.7241 21.1714L60.4956 9.94286C61.4384 5.74286 65.2098 2.57143 69.667 2.57143C72.8384 2.57143 75.5813 4.11429 77.2956 6.42857L76.0098 7.54286C74.5527 5.57143 72.2384 4.28571 69.667 4.28571C66.3241 4.28571 63.4956 6.42857 62.3813 9.42857L72.2384 19.2857C74.7241 18.4286 76.6098 16.2857 77.2098 13.7143H73.0956V12H79.0956C79.0956 16.4571 75.9241 20.2286 71.7241 21.1714Z"
        fill="currentColor"
      />
    </svg>
  )
}
```

## Testing the site

Once the above steps are complete, test the site out by navigating the root directory of this repo, adding your local plugin to the `gatsby-config.js` file and running:

```sh
yarn start
```

Ensure that the site works and that the content is being properly sourced from the CMS.

## Setup script

Each starter includes either a setup script or data export files to help with setting up the correct schema required for each CMS. Ensure there are instructions in the plugin's `docs/setup.md` file to explain how to populate the data model and content in your CMS.

## README and documentation

The READMEs are generated from a template in the root directory. Ensure that the new starter has Markdown partials for the relevant parts of the README in the plugin's `docs` directory then see this repo's [README](../README.md) for instructions on how to generate the starters' READMEs

## Configuration for publishing

To publish a new starter, it will need to be added to the `scripts/data.js` file in this repo and a new GitHub repo will need to be created as a target for publishing.
If you are not part of the `gatsbyjs` GitHub org, please ask for assistance in setting this repo up in your PR description.

Additionally, a demo site on Gatsby Cloud with environment variables set for a demo environment on the CMS should be set up once the starter is ready for publishing.
