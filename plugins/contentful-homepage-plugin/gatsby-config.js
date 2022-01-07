module.exports = (opts) => ({
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        ...opts,
      }
    },
  ]
})
