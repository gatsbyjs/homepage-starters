1. First, update your content model in Drupal

   In your Drupal website, create a new content type and call it `"Homepage Banner"`.

   <img src="./docs/images/step-1.png" alt="Step 1" width="300" />

   For this example, change the `Title` field's name to `Heading` in when creating your new content type. Remove any fields that are added dy default and create a new field called `text` this should be of `Text (plain, long)` data type or use an existing field with the same type and field name.

   <img src="./docs/images/step-2.png" alt="Step 2" width="400" />

   <img src="./docs/images/step-3.png" alt="Step 3" width="400" />

   Find the content type for `Homepage` click `Manage fields` and edit the settings for the `content` field. Under `Reference Type -> Content Type`, ensure that the new `Homepage Banner` type is checked to make it available as a content type on the Homepage.

   <img src="./docs/images/step-4.png" alt="Step 4" width="400"/>

   <img src="./docs/images/step-5.png" alt="Step 5" width="400"/>

   Create a new `Homepage Banner` entry then navigate back to the `Content` page to edit the `Homepage` entry and insert a section with this new `Homepage Banner` by appending it to the list.

   <img src="./docs/images/step-6.png" alt="Step 6" width="400"/>

1. Update `gatsby-node.js`

   Edit your site's `gatsby-node.js` file, adding an interface for `HomepageBanner` that matches your content model in Drupal.
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
       type node__homepage_banner implements Node & HomepageBanner & HomepageBlock @dontInfer {
         id: ID!
         blocktype: String @blocktype
         heading: String
         text: String
       }
     `)
     // ...
   }
   ```
