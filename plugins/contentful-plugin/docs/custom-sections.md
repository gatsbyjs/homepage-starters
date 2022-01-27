1. First, update your content model in Contentful

    In your Contentful space, create a new content type and call it "Homepage Banner."
    For this example, add two fields to your new content type: `heading` and `text` – these can be *Short text* types.

    Find the content type for *Homepage* in Contentful and edit the settings for the *Content* field. Under *Validation*, ensure that the new *Homepage Banner* type is checked to make it available as a content type on the Homepage.

    Navigate to the *Content* tab to edit the *Homepage* and add a section with this new *Homepage Banner* content type.

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
