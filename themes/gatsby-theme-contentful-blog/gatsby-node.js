const path = require("path")
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")

exports.createSchemaCustomization = async ({ actions }) => {
  // todo: check if field extension exists
  actions.createFieldExtension({
    name: "contentfulRichText",
    extend(options) {
      return {
        resolve(source, args, context, info) {
          const body = source.body
          const doc = JSON.parse(body.raw)
          const html = documentToHtmlString(doc)
          return html
        },
      }
    },
  })

  actions.createTypes(`
    type ContentfulBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String! @contentfulRichText
      body: String!
    }
  `)
}
