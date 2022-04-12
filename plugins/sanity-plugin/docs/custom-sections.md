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
