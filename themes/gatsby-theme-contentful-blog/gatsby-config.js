module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        downloadLocal: true,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ]
}
