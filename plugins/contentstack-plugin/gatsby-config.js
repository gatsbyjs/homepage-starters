require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-contentstack",
      options: {
        api_key: process.env.CONTENTSTACK_API_KEY,
        delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
        cdn: process.env.CONTENTSTACK_CDN ? process.env.CONTENTSTACK_CDN : "",
        // Optional: expediteBuild set this to either true or false
        expediteBuild: true,
        // Optional: Specify true if you want to generate custom schema
        enableSchemaGeneration: true,
        // Optional: Specify a different prefix for types.
        // This is useful in cases where you have multiple instances
        // of the plugin to be connected to different stacks.
        type_prefix: "Contentstack", // (default)
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
        name: "Gatsby Starter Contentstack Homepage",
        short_name: "Gatsby",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#7c4dff",
        icon: "src/favicon.png",
      },
    },
  ],
}
