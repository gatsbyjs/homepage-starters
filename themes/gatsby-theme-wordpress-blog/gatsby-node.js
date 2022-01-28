const path = require("path")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    ## consider body: String as HTML
    interface BlogPostBody implements Node {
      id: ID!
      childMarkdownRemark: MarkdownRemark
    }

    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      body: BlogPostBody!
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

// TODO split into separate file & consider sharing functionality
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
      `There was an error sourcing blog posts`,
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
