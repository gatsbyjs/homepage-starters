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

// WordPress does not use layout types and uses
// a custom header and footer with hard-coded values.
// This is a shim to prevent errors in the development repo
exports.createSchemaCustomization = async ({ actions, store }) => {
  const state = store.getState()
  const plugins = state.config.plugins.map((plugin) => plugin.resolve)
  if (!plugins.includes("gatsby-source-wordpress")) return

  actions.createTypes(/* GraphQL */ `
    interface HeaderNavItem implements Node {
      id: ID!
      originalId: String
      navItemType: String
    }

    type NavItem implements Node & HeaderNavItem {
      id: ID!
      originalId: String
      navItemType: String
      href: String
      text: String
      icon: HomepageImage @link
      description: String
    }

    type NavItemGroup implements Node & HeaderNavItem {
      id: ID!
      originalId: String
      navItemType: String
      name: String
      navItems: [NavItem] @link(by: "originalId")
    }

    type LayoutHeader implements Node {
      id: ID!
      layoutType: String
      navItems: [HeaderNavItem] @link(by: "originalId")
      cta: HomepageLink @link
    }

    enum SocialService {
      TWITTER
      FACEBOOK
      INSTAGRAM
      YOUTUBE
      LINKEDIN
      GITHUB
      DISCORD
      TWITCH
    }

    type SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    type LayoutFooter implements Node {
      id: ID!
      layoutType: String
      links: [HomepageLink] @link
      meta: [HomepageLink] @link
      socialLinks: [SocialLink] @link(by: "originalId")
      copyright: String
    }

    type Layout implements Node {
      id: ID!
      header: LayoutHeader @link(by: "layoutType")
      footer: LayoutFooter @link(by: "layoutType")
    }
  `)
}
