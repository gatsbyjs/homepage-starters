const sanitizeHTML = require("sanitize-html")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "wpImageProxy",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp")
          const file = context.nodeModel.getNodeById(source.localFile)
          const image = context.nodeModel.getNodeById({
            id: file.children[0],
          })
          const resolver = imageType.getFields().gatsbyImageData.resolve
          if (!resolver) return null
          return await resolver(image, args, context, info)
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "sanitizeHTML",
    extend(options) {
      return {
        resolve(source, args, context, info) {
          const html = source[info.fieldName]
          const str = sanitizeHTML(html, {
            allowedTags: [],
          })
          return str
        },
      }
    },
  })

  actions.createTypes(`
    type WpMediaItem implements Node & Image {
      id: ID!
      alt: String @proxy(from: "altText")
      gatsbyImageData: JSON @wpImageProxy
      localFile: File
      url: String @proxy(from: "mediaItemUrl")
    }

    type WpPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String! @proxy(from: "content")
      excerpt: String! @sanitizeHTML
      date: Date!
      image: Image @link(by: "id", from: "featuredImage.node.id")
    }
  `)
}
