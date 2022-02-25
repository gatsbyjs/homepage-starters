1. First, update your content model in Contentful

   1. In your Contentful space, create a new content type and call it "Homepage Banner."

      <img src="./docs/images/step-1.png" alt="Step 1" width="300" />

   1. For this example, add two fields to your new content type: `heading` and `text` – these can be _Short text_ types.

      <img src="./docs/images/step-2.png" alt="Step 2" width="300" />
      <img src="./docs/images/step-3.png" alt="Step 3" width="300" />
      <img src="./docs/images/step-4.png" alt="Step 4" width="300" />

   1. Find the content type for _Homepage_ in Contentful and edit the settings for the _Content_ field. Under _Validation_, ensure that the new _Homepage Banner_ type is checked to make it available as a content type on the Homepage.

      <img src="./docs/images/step-5.png" alt="Step 5" width="500" />
      <img src="./docs/images/step-6.png" alt="Step 6" width="500" />
      <img src="./docs/images/step-7.png" alt="Step 7" width="500" />

   1. Navigate to the _Content_ tab to edit the _Homepage_ and add a section with this new _Homepage Banner_ content type.

      <img src="./docs/images/step-8.png" alt="Step 8" width="500" />
      <img src="./docs/images/step-9.png" alt="Step 9" width="500" />

1. Update `gatsby-node.js`

   Edit your site's `gatsby-node.js` file, adding an interface for `HomepageBanner` that matches your content model in Contentful.
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
       type ContentfulHomepageBanner implements Node & HomepageBanner & HomepageBlock @dontInfer {
         id: ID!
         blocktype: String @blocktype
         heading: String
         text: String
       }
     `)
     // ...
   }
   ```
