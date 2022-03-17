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

    # custom type for blog posts
    type WpBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String!
      excerpt: String! @sanitizeHTML
      date: Date! @dateformat
      image: Image @link
      author: BlogAuthor @link(by: "parent.id")
      category: String
    }

    # custom type for blog theme implementation
    type WpBlogAuthor implements Node & BlogAuthor {
      id: ID!
      name: String
      avatar: Image @link
    }

    # custom type to handle WpUser gravatars
    type WpBlogAuthorAvatar implements Node & Image {
      id: ID!
      alt: String
      url: String
      gatsbyImageData: JSON
    }
  `)
}

exports.onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === "WpUser") {
    // create custom BlogAuthor type
    const avatarID = createNodeId(node.avatar.url)
    actions.createNode({
      id: avatarID,
      internal: {
        type: "WpBlogAuthorAvatar",
        contentDigest: createContentDigest(node.avatar.url),
      },
      url: node.avatar.url,
      alt: node.name,
      gatsbyImageData: null,
    })

    actions.createNode({
      id: createNodeId(`${node.id} >>> BlogAuthor`),
      internal: {
        type: "WpBlogAuthor",
        contentDigest: node.internal.contentDigest,
      },
      parent: node.id,
      name: node.name,
      avatar: avatarID,
    })
  }
  if (node.internal.type === "WpPost") {
    // create custom BlogPost type
    actions.createNode({
      ...node,
      id: createNodeId(`${node.id} >>> WpBlogPost`),
      internal: {
        type: "WpBlogPost",
        contentDigest: node.internal.contentDigest,
      },
      parent: node.id,
      html: node.content,
      image: node.featuredImage?.node?.id,
      author: node.author?.node?.id,
    })
  }
}
