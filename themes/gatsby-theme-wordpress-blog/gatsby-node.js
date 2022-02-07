exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    type WpPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String! @proxy(from: "content")
    }
  `)
}
