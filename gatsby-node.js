const path = require("path")

const localPlugins = [
  "contentful-plugin",
  "datocms-plugin",
  "drupal-plugin",
  "sanity-plugin",
  "wordpress-plugin",
]

// for theming development
exports.onCreateWebpackConfig = ({ actions, store }) => {
  // redux state to check which plugin is used
  const state = store.getState()
  const plugins = state.config.plugins.map((plugin) => plugin.resolve)
  const plugin = plugins.reduce((a, b) => {
    if (a) return a
    if (localPlugins.includes(b)) return b
    return null
  }, null)

  // skip creating an alias if it hasn't been included in the list above
  if (!plugin) return

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "./colors.css": path.resolve(
          __dirname,
          "plugins",
          plugin,
          "src",
          "colors.css"
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
            "header.tsx"
          ),
          "./header.css": path.resolve(
            __dirname,
            "src",
            "components",
            "header.css"
          ),
          "./footer": path.resolve(
            __dirname,
            "plugins",
            plugin,
            "src",
            "components",
            "footer.tsx"
          ),
          "./ui": path.resolve(__dirname, "src", "components", "ui.tsx"),
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
  if (!plugins.includes("wordpress-plugin")) return

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

// WordPress does not include the about page
// This type is to shim the GraphQL layer for development
exports.sourceNodes = ({
  actions,
  store,
  createNodeId,
  createContentDigest,
}) => {
  const state = store.getState()
  const plugins = state.config.plugins.map((plugin) => plugin.resolve)
  if (!plugins.includes("wordpress-plugin")) return
  actions.createNode({
    id: createNodeId(`Shim AboutPage`),
    internal: {
      type: "AboutPage",
      contentDigest: createContentDigest(""),
    },
    title: "About",
    content: [],
  })
}
