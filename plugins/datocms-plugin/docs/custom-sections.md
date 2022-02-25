1. First, update your content model in DatoCMS

   1. In your DatoCMS project, go to Settings > Blocks Library to create a new block called "Banner."

      <img src="./docs/images/step-1.png" alt="Step 1" width="300" />

   2. For this example, add two Text fields to your new block type: `heading` and `text` – these can be _Single-line string_ types.

      <img src="./docs/images/step-2.png" alt="Step 2" width="300" />
      <img src="./docs/images/step-3.png" alt="Step 3" width="300" />
      <img src="./docs/images/step-4.png" alt="Step 4" width="300" />
      <img src="./docs/images/step-5.png" alt="Step 5" width="300" />

   3. After saving the new block type, navigate to Settings > Models and edit the _Homepage_ model.

      <img src="./docs/images/step-6.png" alt="Step 6" width="500" />

   4. Edit the _Content_ field and under _Validations_, add the _Banner_ to the list of allowed blocks.

      <img src="./docs/images/step-7.png" alt="Step 7" width="300" />

   5. Go to the _Content_ tab in your project select Homepage, scroll to the bottom and click _Create new_ to add content for your Banner, then save the _Homepage_.

      <img src="./docs/images/step-8.png" alt="Step 8" width="500" />

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
