const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const chalk = require("chalk")
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")
const importContent = require("./import")

const { argv } = yargs(hideBin(process.argv))

console.log(`
  To use this starter, you'll need to create a new project
  in DatoCMS.

  To set up the data model for this starter in DatoCMS,
  you will need:

    1. ${chalk.blue("Full-access API token")}
    2. ${chalk.blue("Read-only API token")}
    3. ${chalk.blue("Environment name")}

  These can be found in your DatoCMS project's ${chalk.blue(
    "Settings"
  )} tab, under ${chalk.blue("API tokens")} and ${chalk.blue("Environments")}.

  The full-access token will be used to create the data model
  with this setup script, and the read-only token will be used to
  source content for your Gatsby site.
`)

// validate that API tokens are 30 alphanumeric characters
const tokenRE = /^[a-z0-9]{30}$/

inquirer
  .prompt([
    {
      name: "fullAPIToken",
      message: "DatoCMS Full-access API token",
      when: !argv.fullAccessToken && !process.env.DATOCMS_FULL_ACCESS_TOKEN,
      validate: (input) =>
        tokenRE.test(input) ||
        "Access token should be 30 alphanumeric characters",
    },
    {
      name: "apiToken",
      message: "DatoCMS Read-only API token",
      when: !argv.apiToken && !process.env.DATOCMS_API_TOKEN,
      validate: (input) =>
        tokenRE.test(input) ||
        "Access token should be 30 alphanumeric characters",
    },
    {
      name: "environment",
      message: "Environment name",
      when: !argv.environment && !process.env.DATOCMS_ENVIRONMENT,
    },
  ])
  .then(async ({ fullAPIToken, apiToken, environment }) => {
    // write env vars to .env.development & .env.production
    const dotenv = [
      `# All environment variables will be sourced`,
      `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
      `# Do NOT commit this file to source control`,
      `DATOCMS_API_TOKEN=""`,
      `DATOCMS_ENVIRONMENT=""`,
    ].join("\n")
    const configFiles = [".env.development", ".env.production"]
      .map((name) => path.join(__dirname, "..", name))
      .forEach((filename) => {
        fs.writeFileSync(filename, dotenv, "utf8")
      })
    console.log(`.env files written`)
    // import data model
    const errors = await importContent(fullAPIToken)
    if (errors) {
      console.error(
        `Could not import data model. See datocms-errors.log for details.`
      )
      process.exit()
    }
    console.log(
      `Successfully imported data model to your DatoCMS project!`,
      `Run ${chalk.blue("yarn start")} to start developing your site`
    )
  })
  .catch((err) => {
    console.error(err)
  })
