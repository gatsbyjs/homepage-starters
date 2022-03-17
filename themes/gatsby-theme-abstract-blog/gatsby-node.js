const path = require("path")

// This core theme expects a src/template/blog-post.js
// and src/template/blog-index.js in the host site
// as well as an abstract BlogPost interface in GraphQL

const defaults = {
  postPath: "src/templates/blog-post.js",
  indexPath: "src/templates/blog-index.js",
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface Image implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      url: String
    }

    interface BlogAuthor implements Node {
      id: ID!
      name: String
      avatar: Image
    }

    interface BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      html: String!
      excerpt: String!
      image: Image
      date: Date! @dateformat
      author: BlogAuthor
      category: String
    }
  `)
}

exports.createPages = async ({ actions, graphql, reporter }, _opts = {}) => {
  const components = {}
  const opts = {
    postPath: _opts.postPath || defaults.postPath,
    indexPath: _opts.indexPath || defaults.indexPath,
  }

  try {
    components.post = path.join(global.__GATSBY.root, opts.postPath)
    components.index = path.join(global.__GATSBY.root, opts.indexPath)
    require.resolve(components.post)
    require.resolve(components.index)
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

  actions.createPage({
    path: "/blog/",
    component: components.index,
    context: {},
  })

  posts.forEach((post, i) => {
    const previous = posts[i - 1]?.slug
    const next = posts[i + 1]?.slug

    actions.createPage({
      path: `/blog/${post.slug}`,
      component: components.post,
      context: {
        id: post.id,
        slug: post.slug,
        previous,
        next,
      },
    })
  })
}
