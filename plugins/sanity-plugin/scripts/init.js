#!/usr/bin/env node
const fs = require("fs-extra")
const path = require("path")

const Configstore = require("configstore")
const sanityClient = require("@sanity/client")
const execa = require("execa")

const ci = require("ci-info")
const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

require("dotenv").config()

const args = yargs(hideBin(process.argv)).argv

// get Sanity token when already logged in
const sanityConfig = new Configstore(
  "sanity",
  {},
  {
    globalConfigPath: true,
  }
)
const sanityToken = sanityConfig.get("authToken")

const API_VERSION = "2022-03-30"
const env = process.env.NODE_ENV
const isCloud = process.env.GATSBY_CLOUD

const createProject = async (opts = {}) => {
  const token = opts.token || process.env.SANITY_TOKEN || sanityToken
  const dirname = path.join(process.cwd(), opts.path)
  let config, client

  const configFile = path.join(dirname, "sanity.json")
  try {
    config = require(configFile)
  } catch (e) {
    console.log(`Failed to get sanity.json config in ${dirname}`)
    process.exit(1)
  }

  config.api = config.api || {}

  try {
    client = sanityClient({
      apiVersion: API_VERSION,
      token,
      useProjectHostname: false,
      useCdn: false,
    })
  } catch (e) {
    console.log(`Failed to create Sanity API client ${e}`)
    process.exit(1)
  }

  console.log("Creating new Sanity project")

  // TODO: clean this up when using prompt
  const displayName =
    opts.displayName || config.project?.name || "New Sanity Project"
  const datasetName = opts.dataset || config.api?.dataset || "production"
  const envVars = []

  try {
    const project = await client.request({
      method: "POST",
      uri: "/projects",
      body: {
        displayName,
      },
    })

    config.api.projectId = project.id
    envVars.push(`SANITY_PROJECT_ID="${project.id}"`)

    const dataset = await client.request({
      method: "PUT",
      uri: `/projects/${project.id}/datasets/${datasetName}`,
    })

    config.api.dataset = dataset.datasetName
    envVars.push(`SANITY_DATASET="${dataset.datasetName}"`)
  } catch (e) {
    console.log(`Failed to create new Sanity project ${e}`)
    process.exit(1)
  }

  if (!isCloud && !ci.isCI) {
    console.log("Updating sanity.json")
    fs.outputJson(configFile, config, {
      spaces: 2,
    })

    if (fs.existsSync(".env")) {
      console.log("Updating .env file")
      fs.appendFileSync(".env", envVars.join("\n"))
    }
  }

  await deployGraphQL()

  console.log("Sanity project successfully created")
}

const deployGraphQL = async (dirname) => {
  console.log("Deploying Sanity GraphQL API")
  try {
    // Use @sanity/cli for deploying due to lack of Node.js API
    const proc = await execa("npx", ["@sanity/cli", "deploy"], {
      cwd: dirname,
    })
    console.log(proc.stdout)
  } catch (e) {
    console.log(`Failed to deploy Sanity GraphQL API ${e}`)
    process.exit(1)
  }
}

// Show prompt in local dev
if (env !== "production" && !isCloud && !ci.isCI) {
  const inquirer = require("inquirer")
  inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"))
  const defaults = {
    token: process.env.SANITY_TOKEN || args.token || sanityToken,
    path: args.path,
    displayName: args.name,
    dataset: process.env.SANITY_DATASET || args.dataset,
  }

  const questions = [
    {
      name: "token",
      message: "Sanity API Token",
      when: !sanityToken && !args.token && !process.env.SANITY_TOKEN,
      default: defaults.token,
    },
    {
      type: "fuzzypath",
      name: "path",
      message: "Path to local Sanity Studio directory",
      when: !args.path,
      default: defaults.path,
    },
    {
      name: "displayName",
      message: "Project Name",
      when: !args.name,
      default: defaults.displayName,
    },
    {
      name: "dataset",
      message: "Dataset Name",
      default: "production",
      when: !args.dataset && !process.env.SANITY_DATASET,
      default: defaults.dataset,
    },
  ]
  inquirer
    .prompt(questions)
    .then((res) => {
      const opts = { ...defaults, ...res }
      console.log({ opts })
      createProject(opts)
    })
    .catch((err) => console.error(err))
} else {
  createProject(args)
}
