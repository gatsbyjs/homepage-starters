module.exports = (options) => ({
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        environment: process.env.DATOCMS_ENVIRONMENT,
      },
    },
    {
      resolve: "gatsby-theme-abstract-blog",
      options,
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
})
