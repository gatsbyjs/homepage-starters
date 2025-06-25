const fs = require("fs")
const path = require("path")

console.log(`
  To set up this project you will need your Contentful Space ID
  and API access tokens. Please use an empty Contentful space for this.
  You can find all the needed information in your Contentful space under:
  ${chalk.yellow(
    `app.contentful.com ${chalk.red("->")} Space Settings ${chalk.red(
      "->"
    )} API keys`
  )}
  The ${chalk.green("Content Management API Token")}
    will be used to import and write data to your space.
  The ${chalk.green("Content Delivery API Token")}
    will be used to ship published production-ready content in your Gatsby app.

  Ready? Let's do it! 🎉
`)

// const fileContents = [
//   `[template.environment]`,
//   `DATOCMS_API_TOKEN = "DatoCMS Read-only API token"`,
//   `DATOCMS_ENVIRONMENT = "Environment name"`,
// ]
//   .filter(Boolean)
//   .join("\n")

//   fs.appendFileSync(
//     ".env.development",
//     '\n# To enable previews locally, uncomment the next line:\n# CONTENTFUL_HOST="preview.contentful.com"'
//   )
