const path = require("path")

// for theming development
exports.onCreateWebpackConfig = ({ actions, store }) => {
  // redux state to check which plugin is used
  const state = store.getState()
  const plugins = state.config.plugins.map((plugin) => plugin.resolve)
  const plugin = plugins.reduce((a, b) => {
    if (a) return a
    switch (b) {
      case "gatsby-source-contentful":
        return "contentful-homepage-plugin"
      case "gatsby-source-wordpress":
        return "wordpress-homepage-plugin"
      case "gatsby-source-datocms":
        return "datocms-homepage-plugin"
    }
    return null
  }, null)

  // skip creating an alias if it hasn't been included in the list above
  if (!plugin) return

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "./colors.css.ts": path.resolve(
          __dirname,
          "plugins",
          plugin,
          "colors.css.ts"
        ),
        "../brandLogo": path.resolve(
          __dirname,
          "plugins",
          plugin,
          "brandLogo.js"
        ),
      },
    },
  })
}
