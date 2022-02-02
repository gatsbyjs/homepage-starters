const path = require("path")

// This core theme expects a src/template/blog-post.js
// and src/template/blog-index.js in the host site
// as well as an abstract BlogPost interface in GraphQL

exports.createPages = async ({ actions, graphql, reporter }) => {
  let component
  try {
    postComponent = path.resolve("./src/templates/blog-post.js")
    // indexComponent = path.resolve("./src/templates/blog-index.js")
    require.resolve(postComponent)
    // require.resolve(indexComponent)
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

  /*
  actions.createPage({
    path: '/blog/',
    component: indexComponent,
    context: {
    },
  })
  */

  posts.forEach((post, i) => {
    const previous = posts[i - 1]?.slug
    const next = posts[i + 1]?.slug

    actions.createPage({
      path: `/blog/${post.slug}`,
      component: postComponent,
      context: {
        id: post.id,
        slug: post.slug,
        previous,
        next,
      },
    })
  })
}
