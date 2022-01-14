const path = require('path')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'yaml-homepage',
        path: path.join(__dirname, '.', 'data'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'yaml-homepage-assets',
        path: path.join(__dirname, '.', 'assets'),
      },
    },
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-vanilla-extract',
  ]
}
