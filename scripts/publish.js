#!/usr/bin/env node
const fs = require("fs-extra")
const path = require("path")
const debug = require("debug")
const SimpleGit = require("simple-git")
const data = require("./data")

/*
 * This script clones the remote starter repos, removes their contents,
 * and builds new starters based on the source code in this repo.
 * This requires a GITHUB_TOKEN environment variable to be available when running.
 *
 * This is based on prior art in gatsbyjs/gatsby/scripts/publish-starters.sh
 * https://github.com/gatsbyjs/gatsby/blob/master/scripts/publish-starters.sh
 */

const dryRun = process.argv.length > 2 && process.argv[2] === "--dry-run"

debug.enable("simple-git:output:*")

let commitMessage
const dir = {
  plugins: path.join(__dirname, "..", "plugins"),
  dist: path.join(__dirname, "..", "dist"),
}

const repos = Object.keys(data)
  .map((key) => ({ [key]: data[key].repo }))
  .reduce((a, b) => ({ ...a, ...b }), {})

// make dist & clean up
if (!fs.existsSync(dir.dist)) {
  fs.mkdirSync(dir.dist)
}

fs.readdirSync(dir.dist).map((dirname) => {
  console.log("Deleting: ", path.join(dir.dist, dirname))
  fs.rmdirSync(path.join(dir.dist, dirname), {
    recursive: true,
  })
})

const createStarterDist = async (basename) => {
  const repo = repos[basename]
  if (!repo) {
    console.warn(`No repo configured for ${basename}`)
    return
  }
  const dirname = `${basename}-plugin`

  const name = repo.substring(repo.lastIndexOf("/") + 1)

  console.log("Cloning repo:", repo)
  await SimpleGit({
    baseDir: dir.dist,
  }).clone(repo, ["--depth", 1])

  // Delete all files in clone
  fs.readdirSync(path.join(dir.dist, name)).forEach((file) => {
    if (file == ".git") return
    const filepath = path.join(dir.dist, name, file)
    console.log("Removing file in clone:", filepath)
    fs.removeSync(filepath)
  })

  // Copy source files to clone
  const ignore = [
    "node_modules",
    "public",
    ".cache",
    ".env.development",
    ".env.production",
  ]

  // copy root files
  const rootFiles = [".gitignore", "src", "gatsby-browser.js", "LICENSE"]
  rootFiles.forEach((file) => {
    const dest = path.join(dir.dist, name, file)
    console.log(`Copying '${file}' to '${dest}'`)
    fs.copySync(file, dest, {
      filter: (n) => !ignore.includes(n),
    })
  })

  // copy cms-specific files
  const files = [
    ".env.EXAMPLE",
    "gatsby-config.js",
    "gatsby-node.js",
    "package.json",
    "README.md",
    "src",
    "scripts",
    "content.xml",
  ]
  files.forEach((file) => {
    const src = path.join(dir.plugins, dirname, file)
    const dest = path.join(dir.dist, name, file)
    console.log(`Copying '${file}' to '${dest}'`)
    if (!fs.existsSync(src)) return
    fs.copySync(src, dest)
  })

  const json = createPackageJSON(name)
  fs.writeFileSync(path.join(dir.dist, name, "package.json"), json, "utf8")

  // Check if repo has changes
  let hasChanges = false
  await SimpleGit({
    baseDir: path.join(dir.dist, name),
  }).status(["--porcelain"], (err, result) => {
    hasChanges = result.modified.length > 0
  })

  if (!hasChanges) {
    console.log(`No changes to commit for ${name}`)
    return
  } else if (dryRun) {
    console.log(
      "This was a dry run — no changes being committed nor pushed to remote"
    )
    return
  } else {
    console.log("Committing changes and pushing to remote")
  }

  // push changes to remote
  await SimpleGit({
    baseDir: path.join(dir.dist, name),
  })
    .add(".")
    .commit(commitMessage)
    .push("origin", "main")
}

const createPackageJSON = (name) => {
  console.log("Creating package.json for", name)
  const root = require("../package.json")
  const pkg = require(path.resolve(dir.dist, name, "package.json"))
  pkg.name = name
  pkg.private = true
  Object.entries(root.dependencies).forEach(([key, val]) => {
    pkg.dependencies[key] = val
  })
  pkg.scripts = {
    start: "gatsby develop",
    develop: "gatsby develop",
    build: "gatsby build",
    serve: "gatsby serve",
    clean: "gatsby clean",
    ...(pkg.scripts || {}),
  }
  const json = JSON.stringify(pkg, null, 2)
  return json
}

const publish = async () => {
  const starters = fs
    .readdirSync(dir.plugins)
    .map((name) => name.replace(/\-plugin/, ""))

  console.log(`Preparing ${starters.length} starters for publishing...`)

  // get last commit message from this repo
  await SimpleGit().log(["-1", "--pretty=%B"], (err, result) => {
    commitMessage = result.latest.hash
  })

  console.log(`Created ${starters.length} starters`)

  for (let i = 0; i < starters.length; i++) {
    await createStarterDist(starters[i])
  }

  console.log("Done")
}

publish()
