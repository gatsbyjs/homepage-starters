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
        return "contentful-plugin"
      case "gatsby-source-wordpress":
        return "wordpress-plugin"
      case "gatsby-source-datocms":
        return "datocms-plugin"
      case "gatsby-source-drupal":
        return "drupal-plugin"
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
          "src",
          "colors.css.ts"
        ),
        "./brand-logo": path.resolve(
          __dirname,
          "plugins",
          plugin,
          "src",
          "components",
          "brand-logo.js"
        ),
      },
    },
  })

  if (plugin == "wordpress-plugin") {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          // WordPress uses a hard-coded header & footer
          "./header": path.resolve(
            __dirname,
            "plugins",
            plugin,
            "src",
            "components",
            "header.js"
          ),
          "./header.css.ts": path.resolve(
            __dirname,
            "src",
            "components",
            "header.css.ts"
          ),
          "./footer": path.resolve(
            __dirname,
            "plugins",
            plugin,
            "src",
            "components",
            "footer.js"
          ),
          "./ui": path.resolve(__dirname, "src", "components", "ui.js"),
        },
      },
    })
  }
}
