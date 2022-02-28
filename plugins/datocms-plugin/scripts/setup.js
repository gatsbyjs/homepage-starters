const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const chalk = require("chalk")
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const { argv } = yargs(hideBin(process.argv))

console.log(`
  To use this starter, you'll need to create a new project
  in DatoCMS that is cloned from the DatoCMS project backing
  the starter demo site and then provide the following environment variables:

    1. ${chalk.blue("Read-only API token")}
    2. ${chalk.blue("Environment name")}

  These can be found in your DatoCMS project's ${chalk.blue(
    "Settings"
  )} tab, under ${chalk.blue("API tokens")} and ${chalk.blue("Environments")}.

  The read-only token and environment name will be used to source content for your Gatsby site.
`)

// validate that API tokens are 30 alphanumeric characters
const tokenRE = /^[a-z0-9]{30}$/

inquirer
  .prompt([
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
  .then(async ({ apiToken, environment }) => {
    // write env vars to .env.development & .env.production
    const dotenv = [
      `# All environment variables will be sourced`,
      `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
      `# Do NOT commit this file to source control`,
      `DATOCMS_API_TOKEN="${apiToken}"`,
      `DATOCMS_ENVIRONMENT="${environment}"`,
    ].join("\n")
    const configFiles = [".env.development", ".env.production"]
      .map((name) => path.join(__dirname, "..", name))
      .forEach((filename) => {
        fs.writeFileSync(filename, dotenv, "utf8")
      })
    console.log(`.env files written`)
  })
  .catch((err) => {
    console.error(err)
  })
