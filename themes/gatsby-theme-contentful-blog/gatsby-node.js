const path = require("path")

exports.createSchemaCustomization = async ({ actions }) => {
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
    type ContentfulBlogPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      body: contentfulBlogPostBodyTextNode! @link(by: "id", from: "body___NODE")
      html: String! @proxyHtml
    }

    type contentfulBlogPostBodyTextNode implements Node @derivedTypes @childOf(types: ["ContentfulBlogPost"]) {
      id: ID!
      body: String
    }
  `)
}

/** pages are created in gatsby-theme-abstract-blog
exports.createPages = async ({ actions, graphql, reporter }) => {
  let component
  try {
    component = path.resolve("./src/templates/blog-post.js")
    require.resolve(component)
  } catch (e) {
    reporter.warn("No templates found for blog theme in host site")
    return
  }

  const result = await graphql(`
    {
      posts: allBlogPost {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error sourcing blog posts from Contentful`,
      result.errors
    )
  }

  const posts = result.data.posts.nodes

  if (posts.length < 1) return

  posts.forEach((post, i) => {
    const previous = posts[i - 1]?.slug
    const next = posts[i + 1]?.slug

    actions.createPage({
      path: `/blog/${post.slug}`,
      component,
      context: {
        id: post.id,
        slug: post.slug,
        previous,
        next,
      },
    })
  })
}
*/
