1. First, update your custom fields in WordPress to support the new component

   Under the _Custom Fields_ tab, create a new _Field Group_ and call it "Homepage Banner."
   For this example, add two text fields: `banner_heading` and `banner_text`.
   In the _Location_ rules, be sure to show the field group in _Page_ post types.
   Also ensure that the _Show in GraphQL_ option is enabled for this field.

   Navigate to the _Pages_ tab and edit the Homepage and add content for the new Banner component.

1. Update `gatsby-node.js`

   Edit your site's `gatsby-node.js` file, adding a type for `HomepageBanner` that matches your custom fields in WordPress.
   This allows the homepage to query the abstract `HomepageBanner` type.

   ```js
   // in gatsby-node.js
   exports.createSchemaCustomization = async ({ actions }) => {
     // ...
     actions.createTypes(`
       type HomepageBanner implements Node & HomepageBlock {
         id: ID!
         blocktype: String
         heading: String
         text: String
       }
     `)
     // ...
   }
   // ...
   exports.onCreateNode = ({ actions, node, createNodeId, createContentDigest }) => {
   }
     // ...
     switch (node.internal.type) {
       case "WpPage":
         if (node.slug !== "homepage") return
         const {
           homepageHero,
           homepageCta,
           statList,
           testimonialList,
           productList,
           logoList,
           featureList,
           benefitList,
           // add the new custom field group here
           homepageBanner,
         } = node

         const heroID = createNodeId(`${node.id} >>> HomepageHero`)
         // create an node id for the field group
         const bannerID = createNodeId(`${node.id} >>> HomepageBanner`)
         // ...

         // create a new node for this field group
         actions.createNode({
           id: bannerID,
           internal: {
             type: "HomepageBanner",
             contentDigest: createContentDigest(JSON.stringify(homepageBanner)),
           },
           parent: node.id,
           blocktype: "HomepageBanner",
           heading: homepageBanner.bannerHeading,
           text: homepageBanner.bannerText,
         })
         // ...
         actions.createNode({
           ...node,
           id: createNodeId(`${node.id} >>> Homepage`),
           internal: {
             type: "Homepage",
             contentDigest: node.internal.contentDigest,
           },
           parent: node.id,
           blocktype: "Homepage",
           image: node.featuredImageId,
           content: [
             heroID,
             logosID,
             // add your banner content in the postion you would like it to appear on the page
             bannerID,
             productsID,
             featuresID,
             benefitsID,
             statsID,
             testimonialsID,
             ctaID,
           ],
         })
         // ...
     }
   }
   ```
