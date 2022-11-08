1. First, update your content type in Kontent.ai project

   1. In `Content model` section create a new content type and name it "Homepage Banner."

      <img src="./docs/images/step-1.png" alt="Step 1" width="700" />

   1. Add two fields to your freshly created content type: `Heading` and `Text` – these can be _Text_ types.

      <img src="./docs/images/step-2.png" alt="Step 2" width="700" />

   1. Find the content type for _Homepage_ in Kontent.ai and adjust the settings for the _Content_ element. Click on settings icon to show configuration for the given element. Under _Allowed content types_, ensure that the _Homepage Banner_ type is checked to make it available as a content type on the Homepage.

      <img src="./docs/images/step-3.png" alt="Step 3" width="700" />
      <img src="./docs/images/step-4.png" alt="Step 4" width="700" />

   1. Navigate to the _Content & assets_ tab to edit the _Homepage_, start a new version of your item and add create a new item with new _Homepage Banner_ content type.

      <img src="./docs/images/step-5.png" alt="Step 5" width="500" />
      <img src="./docs/images/step-6.png" alt="Step 6" width="500" />
      <img src="./docs/images/step-7.png" alt="Step 7" width="500" />

1. Update `gatsby-node.js`

   Edit your site's `gatsby-node.js` file, adding an interface for `HomepageBanner` and a type that matches your content type in Kontent.ai.
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
       type kontent_item_homepage_banner implements Node & HomepageBanner & HomepageBlock @dontInfer {
         id: ID!
         blocktype: String @blocktype
         heading: String @proxy(from: "elements.heading.value")
         text: String @proxy(from: "elements.text.value")
       }
     `)
     // ...
   }
   ```
