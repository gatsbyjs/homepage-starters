const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const homepagePlugins = {
  yaml: {
    resolve: 'yaml-homepage-plugin',
    options: {
      // TODO consider moving this to root
      path: path.join(__dirname, '.', 'plugins', 'yaml-homepage-plugin', 'data'),
      assetsPath: path.join(__dirname, '.', 'plugins', 'yaml-homepage-plugin', 'assets'),
    },
  },
  datocms: {
    resolve: 'datocms-homepage-plugin',
    options: {
      apiToken: process.env.DATOCMS_API_TOKEN,
      environment: process.env.DATOCMS_ENVIRONMENT,
    },
  },
  contentful: {
    resolve: 'contentful-homepage-plugin',
    options: {
      downloadLocal: true,
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    },
  },
}

module.exports = {
  plugins: [
    // Comment and uncomment the desired CMS/backend plugin to switch between data sources
    // homepagePlugins.yaml,
    homepagePlugins.datocms,
    // homepagePlugins.contentful,

    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
  ]
}
