module.exports = (opts) => {
  console.log('YAML OPTIONS', opts)
  return {
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: opts.path,
          name: 'yaml-homepage',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: opts.assetsPath,
          name: 'yaml-homepage-assets',
        },
      },
      'gatsby-transformer-yaml',
    ]
  }
}
