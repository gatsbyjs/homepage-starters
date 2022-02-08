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

  actions.createFieldExtension({
    name: "urlSchema",
    extend(options) {
      const schemaRE = /^\/\//
      const addURLSchema = (str) => {
        if (schemaRE.test(str)) return `https:${str}`
        return str
      }
      return {
        resolve(source) {
          return addURLSchema(source.file.url)
        },
      }
    },
  })

  actions.createTypes(`
    type ContentfulAsset implements Node & Image {
      id: ID!
      alt: String @proxy(from: "title")
      gatsbyImageData: JSON
      url: String @urlSchema
      file: JSON
      title: String
    }

    type contentfulBlogPostExcerptTextNode implements Node {
      id: ID!
      excerpt: String!
      # determine if markdown is required for this field type
    }

    type ContentfulBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String! @contentfulRichText
      body: String!
      date: Date!
      excerpt: String! @proxy(from: "contentfulExcerpt.excerpt")
      contentfulExcerpt: contentfulBlogPostExcerptTextNode @link
      image: Image @link(from: "image___NODE")
    }
  `)
}
