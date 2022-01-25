exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
    }
  `)

  // actions.createTypes(`
  // `)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const component = path.resolve('./src/templates/blog-post.js')
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
    reporter.panicOnBuild(`There was an error sourcing blog posts from Contentful`, errors)
  }

  const posts = result.data.posts.nodes

  if (posts.length < 1) return;

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
