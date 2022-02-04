const path = require("path")

exports.createSchemaCustomization = async ({ actions }) => {
  /* TODO for datocms
  actions.createFieldExtension({
    name: "proxyHtml",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const markdownType = info.schema.getType("MarkdownRemark")
          const postType = info.schema.getType("ContentfulBlogPost")

          const [childID] = source.children
          const body = context.nodeModel.getNodeById({ id: childID })
          const [markdownID] = body.children
          const markdown = context.nodeModel.getNodeById({ id: markdownID })
          const resolver = markdownType.getFields().html.resolve

          if (!resolver) return null
          return await resolver(markdown, args, context, info)
        },
      }
    },
  })
  */

  actions.createTypes(`
    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      html: String!
      # TODO
      # date # image # author
    }
  `)

  actions.createTypes(`
    type DatocmsBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      body: String!
      html: String! @proxyHtml
    }

  `)
}
