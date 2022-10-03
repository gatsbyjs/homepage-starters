const fs = require("fs")
const path = require("path")
const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")

// This core theme expects a src/template/blog-post.js
// and src/template/blog-index.js in the host site

const defaults = {
  postPath: "src/templates/blog-post",
  indexPath: "src/templates/blog-index",
  customQueries: false,
}

const pluginState = {}

exports.onPluginInit = ({ reporter }, _opts = {}) => {
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
      delete components.post
      reporter.warn(
        `[gatsby-theme-abstract-blog] No template found for ${opts.postPath}`
      )
      return
    }

    if (fs.existsSync(components.index + ".js")) {
      components.index = components.index + ".js"
    } else if (fs.existsSync(components.index + ".tsx")) {
      components.index = components.index + ".tsx"
    } else {
      delete components.index
      reporter.warn(
        `[gatsby-theme-abstract-blog] No template found for ${opts.indexPath}`
      )
    }
  } catch (e) {
    reporter.warn(`[gatsby-theme-abstract-blog] ${e}`)
    return
  }

  pluginState.components = components
}

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    postPath: Joi.string().description("File path to blog post template"),
    indexPath: Joi.string().description(
      "File path to blog index page template"
    ),
    customQueries: Joi.boolean().description(
      "Use blog templates as page components with custom GraphQL queries"
    ),
  })
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

  actions.createTypes(/* GraphQL */ `
    interface Image implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData @imagePassthroughArguments
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

exports.onCreateWebpackConfig = ({ actions, reporter }, _opts = {}) => {
  const components = pluginState.components

  if (!components || !components.post || !components.index) {
    // fallback components to prevent breaking builds
    reporter.warn("[gatsby-theme-abstract-blog] Using fallback components")
    components.post = path.join(__dirname, "src/fallback.js")
    components.index = path.join(__dirname, "src/fallback.js")
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

exports.createPages = async ({ actions, graphql, reporter }, _opts = {}) => {
  const components = pluginState.components
  if (!components || !components.post || !components.index) return
  const opts = { ...defaults, ..._opts }

  reporter.info("[gatsby-theme-abstract-blog] creating pages")

  const templates = opts.customQueries
    ? components
    : {
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
      `[gatsby-theme-abstract-blog] There was an error sourcing blog posts`,
      result.errors
    )
  }

  const posts = result.data.posts.nodes

  if (posts.length < 1) return

  actions.createPage({
    path: "/blog/",
    component: templates.index,
    context: {},
  })

  posts.forEach((post, i) => {
    const previous = posts[i - 1]?.slug
    const next = posts[i + 1]?.slug

    actions.createPage({
      path: `/blog/${post.slug}`,
      component: templates.post,
      context: {
        id: post.id,
        slug: post.slug,
        previous,
        next,
      },
    })
  })
}
