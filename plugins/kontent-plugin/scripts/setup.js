const chalk = require("chalk")
const argv = require("yargs-parser")(process.argv.slice(2))
const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const { ImportService, ZipService } = require("@kentico/kontent-backup-manager")
const {
  FileService,
} = require("@kentico/kontent-backup-manager/dist/cjs/lib/node")
const { cwd, chdir } = require("process")

const importData = async (projectId, managementApiKey) => {
  const fileService = new FileService({
    enableLog: true,
  })

  const current_directory = cwd()

  try {
    chdir(__dirname)

    const zipFile = await fileService.loadFileAsync("data")
    const zipService = new ZipService({
      context: "node.js",
      enableLog: true,
    })

    const importService = new ImportService({
      onImport: (item) => {
        console.log(`Imported: ${item.title} | ${item.type}`)
      },
      canImport: {
        asset: (item) => true,
        contentType: (item) => true,
        assetFolder: (item) => true,
        contentItem: (item) => true,
        contentTypeSnippet: (item) => true,
        language: (item) => true,
        languageVariant: (item) => true,
        taxonomy: (item) => true,
      },
      enablePublish: true,
      projectId: projectId,
      apiKey: managementApiKey,
      enableLog: true,
      fixLanguages: true,
    })

    const importData = await zipService.extractZipAsync(zipFile)

    await importService.importFromSourceAsync(importData)
  } catch (exception) {
    console.log(`An error occurred: ${exception}`)
  } finally {
    chdir(current_directory)
  }
}

console.log(`
  To use this starter, please create a new project in app.kentico.ai
  and provide us with credentials need to set it up.
  The required keys can be found in Project settings -> API KEYS and
  you will need:

    1. ${chalk.blue("Project ID")}
    2. ${chalk.blue(
      "API Management key"
    )} needed for importing the content into the project

  Everything ready? Let's do it!
`)

const questions = [
  {
    name: "projectId",
    message: "Project ID",
    when: !argv.projectId && !process.env.KONTENT_PROJECT_ID,
  },
  {
    name: "managementApiKey",
    when: !argv.managementApiKey,
    message: "Your Content Management API access token",
  },
]

inquirer
  .prompt(questions)
  .then(({ projectId, managementApiKey }) => {
    // write env vars to .env.development & .env.production
    const dotenv = [
      `# All environment variables will be sourced`,
      `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
      `# Do NOT commit this file to source control`,
      `KONTENT_PROJECT_ID="${projectId}"`,
    ].join("\n")

    const configFiles = [".env.development", ".env.production"]
      .map((name) => path.join(__dirname, "..", name))
      .forEach((filename) => {
        fs.writeFileSync(filename, dotenv, "utf8")
      })

    console.log(`.env files written`)

    return { projectId, managementApiKey }
  })
  .then(({ projectId, managementApiKey }) => {
    return importData(projectId, managementApiKey)
  })
  .then((_, error) => {
    console.log(
      `All set! You can now run ${chalk.yellow(
        "yarn start"
      )} to see it in action.`
    )
  })
  .catch((err) => {
    console.error(err)
  })
