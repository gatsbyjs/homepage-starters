1. First, update your content model in Drupal

   In your Drupal website, create a new content type and call it "Homepage Banner."
   For this example, change the `Title` field's name to `Heading` in when creating your new content type. Remove any fields that are added dy default and create a new field called `text` this should be of `Text (plain, long)` data type.

   Find the content type for _Homepage_ in Drupal and edit the settings for the _Content_ field. Under `Reference Type -> Content Type`, ensure that the new _Homepage Banner_ type is checked to make it available as a content type on the Homepage.

   Navigate to the _Content_ page to edit the _Homepage_ and add a section with this new _Homepage Banner_ content type.

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
