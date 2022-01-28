const path = require("path")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface BlogPostBody implements Node {
      id: ID!
      childMarkdownRemark: MarkdownRemark
    }

    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      html: String!
      # TODO
      # date # image # author
    }
  `)

  /*
  actions.createTypes(`
    type ContentfulBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      body: BlogPostBody! @link(by: "id", from: "body___NODE")
    }

    # type contentfulBlogPostBodyTextNode implements Node & BlogPostBody @derivedTypes @childOf(types: ["ContentfulBlogPost"]) {
    #   id: ID!
    #   body: String
    # }
  `)
  */
}
