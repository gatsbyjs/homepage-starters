module.exports = (opts) => ({
  plugins: [
    {
      resolve: 'gatsby-source-datocms',
      options: {
        ...opts,
      }
    },
  ]
})
