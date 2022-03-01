const path = require("path")
const dato = require("datocms-structured-text-to-html-string")

exports.createSchemaCustomization = async ({ actions }) => {
  // todo: determine if field extension already exists
  actions.createFieldExtension({
    name: "datocmsRichText",
    extend(options) {
      return {
        resolve(source, args, context, info) {
          const body = source.entityPayload.attributes.body
          const html = dato.render(body)
          return html
        },
      }
    },
  })

  actions.createTypes(`
    type DatoCmsAsset implements Node & Image {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      originalId: String
      entityPayload: JSON
      url: String
    }

    type DatoCmsBlogpost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      body: String!
      html: String! @datocmsRichText
      excerpt: String!
      image: Image
      date: Date!
    }
  `)
}
