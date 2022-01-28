1. First, update your content model in DatoCMS

    In your DatoCMS project, go to Settings > Blocks Library to create a new block called "Banner."
    For this example, add two Text fields to your new block type: `heading` and `text` – these can be *Single-line string* types.
    After saving the new block type, navigate to Settings > Models and edit the *Homepage* model.
    Edit the *Content* field and under *Validations*, add the *Banner* to the list of allowed blocks.

    Go to the *Content* tab in your project and click *Create new* to add content for your Banner, then save the *Homepage*.

1. Update `gatsby-node.js`

    Edit your site's `gatsby-node.js` file, adding an interface for `HomepageBanner` that matches your content model in DatoCMS.
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
        type DatoCmsBanner implements Node & HomepageBanner & HomepageBlock @dontInfer {
          id: ID!
          blocktype: String @blocktype
          heading: String
          text: String
        }
      `)
      // ...
    }
    ```
