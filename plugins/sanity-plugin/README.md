<a href="https://www.gatsbyjs.com">
  <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
</a>

# Gatsby Starter Sanity Homepage

Create a homepage using Gatsby and Sanity. This starter demonstrates how to use Sanity to build a homepage and can be customized to match your own visual branding.

[View the Demo](https://gatsbysanityhomepage.gatsbyjs.io/)

**Note:**
This version of the Sanity homepage starter is written in JavaScript. If you want to use Sanity but TypeScript is more your style, there is also a TypeScript version maintained on [GitHub](https://github.com/gatsbyjs/gatsby-starter-sanity-homepage-ts).

## Quick start

You will need a Sanity account to use this starter. You can create a new account or use an existing one.

1. **Create a Gatsby site**

   Use the Gatsby CLI to get started locally:

   ```sh repo
   npx gatsby new my-homepage https://github.com/gatsbyjs/gatsby-starter-sanity-homepage
   ```

1. **Set up Sanity Studio**

   1. In the `studio` directory, install dependencies for Sanity Studio:

      ```sh
      yarn
      ```

   1. Create a new Sanity project by running:

      ```sh
      yarn sanity-init
      ```

      This will prompt you to log in if this is your first time using Sanity CLI.

   1. Deploy the Sanity GraphQL API for your new project:

      ```sh
      yarn deploy
      ```

   1. Optionally, to import the demo content for this starter run:

      ```sh
      yarn sanity-import
      ```

   1. Start the Sanity Studio development server to start editing content:

      ```sh
      yarn start
      ```

   1. In your _Gatsby site's directory_, to create `.env.development` and `.env.production` files with configuration for your Sanity project, run:

      ```sh
      yarn & yarn setup
      ```

1. **Start developing**

   In your site directory, start the development server:

   ```sh
   yarn start
   ```

   Your site should now be running at <http://localhost:8000>

1. **Open the source code and start editing**

## Deploy your site

Once your content is available in Sanity, deploy your site to [Gatsby Cloud](https://gatsbyjs.com/products/cloud):

1. Push your local site to a new repo in either GitHub, GitLab, or Bitbucket
1. Log into your [Gatsby Cloud Dashboard][] and click on **Add a site**
1. Use the **Import from a Git repository** option to find your site
1. Add the environment variables from your `.env.production` file to Gatsby Cloud during setup
1. Click **Build site** and your site should start building

For a more detailed walkthrough, see the tutorial on how to [build your site with Gatsby Cloud][tutorial].

[gatsby cloud dashboard]: https://gatsbyjs.com/dashboard
[tutorial]: https://www.gatsbyjs.com/docs/tutorial/part-1/#build-your-site-with-gatsby-cloud

### Deploy without using the CLI

Alternatively, you can deploy this starter directly to Gatsby Cloud.
Note that you will need to set up your content in Sanity manually.

[![Deploy to Gatsby](https://www.gatsbyjs.com/deploynow.png "Deploy to Gatsby")](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-sanity-homepage)

## Setting up Gatsby Cloud Preview

To use Gatsby Cloud Preview with this site, see the documentation for
[Connecting to Sanity via Quick Connect][].

[connecting to sanity via quick connect]: https://support.gatsbyjs.com/hc/en-us/articles/360052324694-Connecting-to-Sanity-via-Quick-Connect

## What's included?

```sh
├── README.md
├── gatsby-config.js
├── gatsby-node.js
├── src
│   ├── components
│   ├── pages
│   ├── colors.css.ts
│   ├── styles.css.ts
│   └── theme.css.ts
└── .env.EXAMPLE
```

1. **`gatsby-config.js`**: [Gatsby config][] file that includes plugins required for this starter.
1. **`gatsby-node.js`**: [Gatsby Node][] config file that creates an abstract data model for the homepage content.
1. **`src/`**: The source directory for the starter, including pages, components, and [Vanilla Extract][] files for styling.

[gatsby config]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
[gatsby node]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
[vanilla extract]: https://vanilla-extract.style/

## How to

### Update the color theme

To update the colors used in this starter, edit the `src/colors.css.ts` file.

```.ts
// src/colors.css.ts
export const colors = {
  background: "#f03e2f",
  text: "#000000",
  primary: "#000000",
  muted: "#f14e41",
  active: "#e6e6e6",
  black: "#000",
}

```

If you'd like to add additional colors, add additional keys to this object.
This file is imported into `src/theme.css.ts` and creates CSS custom properties, that can be imported and used in other `.css.ts` files.

The UI components file `src/components/ui.js` imports styles from `src/components/ui.css.ts`. You can see how the theme and color values are being used in this file.

### Add your logo

![Logo](./docs/images/logo.png)

Replace the `src/components/brand-logo.js` component with your own brand logo.
If you have an SVG version, it can be rendered inline as a React component, following the example in this file. Note that SVG attributes will need to be camel cased for JSX.

Using an inline SVG for the logo allows it to pick up the colors used in CSS, which is how the logo colors are inverted for the mobile menu.

If you prefer to use an image, use the [`StaticImage`](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#staticimage) component from `gatsby-plugin-image` in place of the SVG in this file.

### Customize headings, buttons, and other styles

![Headings & Buttons](./docs/images/headings-buttons.png)

To further customize the look and feel of the homepage, edit the UI components in `src/components/ui.js` and styles in `src/components/ui.css.ts`.

### Customize section components

To customize any of the sections of the homepage, edit the relevant component in `src/components`.
Most of the styles for these components are handled with shared UI components in `src/components/ui.js`.

### Create custom section components

To create a new type of section in your homepage, you'll want to create a new section component, using the existing components as an example.
For this example, we'll create a new "Banner" component.

1. First, update your schema in the Sanity Studio.

   1. In the `studio` directory, create a new file in the `schema` directory for your new section. For this example, name it `homepageBanner.js`

      ```js
      // studio/schema/homepageBanner.js
      export default {
        name: "homepageBanner",
        title: "Homepage Banner",
        type: "document",
        fields: [
          { title: "Heading", name: "heading", type: "string" },
          { title: "Text", name: "text", type: "string" },
        ],
      }
      ```

   1. Add this module to the schema.

      ```js
      // studio/schema/schema.js
      // ...
      import homepageBanner from "./homepageBanner"

      export default createSchema({
        name: "default",
        types: schemaTypes.concat([
          // ...
          homepageBanner,
        ]),
      })
      ```

   1. Add this new section type to the schema in `studio/schema/homepage.js`

      ```js
      // studio/schema/homepage.js
      export default {
        name: "homepage",
        title: "Homepage",
        type: "document",
        fields: [
          { title: "Title", name: "title", type: "string" },
          { title: "Description", name: "description", type: "string" },
          { title: "Image", name: "image", type: "image" },
          {
            title: "Content",
            name: "content",
            type: "array",
            of: [
              {
                type: "reference",
                to: [
                  { type: "homepageHero" },
                  { type: "homepageFeature" },
                  { type: "homepageFeatureList" },
                  { type: "homepageCta" },
                  { type: "homepageLogoList" },
                  { type: "homepageTestimonialList" },
                  { type: "homepageBenefitList" },
                  { type: "homepageStatList" },
                  { type: "homepageProductList" },
                  // Add the new section
                  { type: "homepageBanner" },
                ],
              },
            ],
          },
        ],
      }
      ```

   1. In the `studio` directory, start Sanity Studio by running:

      ```sh
      yarn start
      ```

   1. Navigate to the Homepage and add a new section with this new _Homepage Banner_ section.

   1. Deploy the updated GraphQL API by running:

      ```sh
      yarn deploy
      ```

1. Update `gatsby-node.js`

   Edit your site's `gatsby-node.js` file, adding an interface for `HomepageBanner` that matches the schema in Sanity Studio.
   This allows the homepage to query the abstract `HomepageBanner` type.

   ```js
   // in gatsby-node.js
   exports.createSchemaCustomization = async ({ actions }) => {
     // ...
     actions.createTypes(`
       interface HomepageBanner implements Node & HomepageBlock {
         id: ID!
         blocktype: String
         heading: String
         text: String
       }
     `)
     // ...
     actions.createTypes(`
       type SanityHomepageBanner implements Node & HomepageBanner & HomepageBlock @dontInfer {
         id: ID!
         blocktype: String @blocktype
         heading: String
         text: String
       }
     `)
     // ...
   }
   ```

1. Next, create the Banner component:

   ```jsx fileExt
   // src/components/banner.js
   import * as React from "react"
   import { graphql } from "gatsby"
   import { Section, Container, Heading, Text } from "./ui"

   export default function Banner(props) {
     return (
       <Section>
         <Container>
           <Heading>{props.heading}</Heading>
           <Text>{props.text}</Text>
         </Container>
       </Section>
     )
   }

   export const query = graphql`
     fragment HomepageBannerContent on HomepageBanner {
       id
       heading
       text
     }
   `
   ```

1. Export the component from `src/components/sections.js`

   ```js fileExt
   // src/components/sections.js
   export { default as HomepageHero } from "./hero"
   export { default as HomepageFeature } from "./feature"
   export { default as HomepageFeatureList } from "./feature-list"
   export { default as HomepageLogoList } from "./logo-list"
   export { default as HomepageBenefitList } from "./benefit-list"
   export { default as HomepageTestimonialList } from "./testimonial-list"
   export { default as HomepageStatList } from "./stat-list"
   export { default as HomepageCta } from "./cta"
   export { default as HomepageProductList } from "./product-list"

   // add export for new component
   export { default as HomepageBanner } from "./banner"
   ```

1. Add the GraphQL query fragment to the query in `src/pages/index.js`

   ```js fileExt
   // in src/pages/index.js
   export const query = graphql`
     {
       homepage {
         id
         title
         description
         image {
           id
           url
         }
         blocks: content {
           id
           blocktype
           ...HomepageHeroContent
           ...HomepageFeatureContent
           ...HomepageFeatureListContent
           ...HomepageCtaContent
           ...HomepageLogoListContent
           ...HomepageTestimonialListContent
           ...HomepageBenefitListContent
           ...HomepageStatListContent
           ...HomepageProductListContent
           # New component fragment
           ...HomepageBannerContent
         }
       }
     }
   `
   ```

## Troubleshooting

### Errors after making changes to the schema

If you've made changes to the `gatsby-node.js` file or changes to the Sanity data model, clear the Gatsby cache before running the develop server:

```sh
yarn clean && yarn start
```

---

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.
- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).**

## 💫 Deploy

[Build, Deploy, and Host On The Only Cloud Built For Gatsby](https://www.gatsbyjs.com/cloud/)

Gatsby Cloud is an end-to-end cloud platform specifically built for the Gatsby framework that combines a modern developer experience with an optimized, global edge network.
