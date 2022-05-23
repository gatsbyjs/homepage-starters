require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://gatsbycontentfulhomepage.gatsbyjs.io/",
    title: "Gatsby Kontent Homepage Starter",
    author: `Gatsby`,
    description: "A Gatsby Starter for building homepages with Kontent",
  },
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        projectId: process.env.KONTENT_PROJECT_ID,
        languageCodenames: [`en-US`],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Starter Kontent Homepage",
        short_name: "Gatsby",
        start_url: "/",
        background_color: "#F05A22",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
  ],
}
