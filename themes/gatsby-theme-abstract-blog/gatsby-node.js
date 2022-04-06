const fs = require("fs")
const path = require("path")
const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")

// This core theme expects a src/template/blog-post.js
// and src/template/blog-index.js in the host site
// as well as an abstract BlogPost interface in GraphQL

const defaults = {
  postPath: "src/templates/blog-post",
  indexPath: "src/templates/blog-index",
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "imagePassthroughArguments",
    extend(options) {
      const { args } = getGatsbyImageResolver()
      return {
        args,
      }
    },
  })

  actions.createTypes(`
    interface Image implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON @imagePassthroughArguments
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

exports.onCreateWebpackConfig = ({ actions }, _opts = {}) => {
  const components = {}
  const opts = {
    postPath: _opts.postPath || defaults.postPath,
    indexPath: _opts.indexPath || defaults.indexPath,
  }

  try {
    components.post = path.join(global.__GATSBY.root, opts.postPath)
    components.index = path.join(global.__GATSBY.root, opts.indexPath)

    if (fs.existsSync(components.post + ".js")) {
      components.post = components.post + ".js"
    } else if (fs.existsSync(components.post + ".tsx")) {
      components.post = components.post + ".tsx"
    } else {
      throw new Error(`No template found for ${opts.postPath}`)
    }

    if (fs.existsSync(components.index + ".js")) {
      components.index = components.index + ".js"
    } else if (fs.existsSync(components.index + ".tsx")) {
      components.index = components.index + ".tsx"
    } else {
      throw new Error(`No template found for ${opts.indexPath}`)
    }
  } catch (e) {
    reporter.warn(e)
    return
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@gatsby-theme-abstract-blog/post": path.resolve(components.post),
        "@gatsby-theme-abstract-blog/index": path.resolve(components.index),
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const components = {
    post: path.join(__dirname, "src/post.js"),
    index: path.join(__dirname, "src/index.js"),
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
