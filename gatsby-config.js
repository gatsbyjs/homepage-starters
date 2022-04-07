module.exports = {
  plugins: [
    // Comment and uncomment the desired CMS/backend plugin to switch between data sources
    "contentful-plugin",
    // "datocms-plugin",
    // "drupal-plugin",
    // "wordpress-plugin",

    // optional blog themes
    {
      resolve: "gatsby-theme-contentful-blog",
      options: {
        customQueries: true,
      },
    },
    // "gatsby-theme-datocms-blog",
    // "gatsby-theme-wordpress-blog",
  ],
}
