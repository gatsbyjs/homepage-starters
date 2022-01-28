const path = require("path")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "proxyHtml",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          // const type = info.schema.getType("MarkdownRemark")
          const type = info.schema.getType("ContentfulBlogPost")

          console.log({ source })
          // const body = context.nodeModel.getNodeById(source.children[0])
          const bodyResolver = type.getFields().body.resolve
          const body = await bodyResolver(source, args, context, info)
          console.log({ body })
          return null
          const markdown = context.nodeModel.getNodeById(body.children[0])
          console.log(markdown)
          const resolver = type.getFields().html.resolve
          if (!resolver) return null
          return await resolver(markdown, args, context, info)
        },
      }
    },
  })

  actions.createTypes(`
    # interface BlogPostBody implements Node {
    #   id: ID!
    #   childMarkdownRemark: MarkdownRemark
    # }

    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      html: String!
      # body: BlogPostBody!
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
