#!/usr/bin/env node
const fs = require("fs-extra")
const path = require("path")
const debug = require("debug")
const SimpleGit = require("simple-git")
const ts = require("typescript")
const prettier = require("prettier")
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

// ignore files in nested packages like sanity studio
const ignoreRegEx = /node_modules|dist/

const createStarterDist = async (basename, isTypescript = false) => {
  const repoName = `${basename}${isTypescript ? "-ts" : ""}`
  const repo = repos[repoName]
  if (!repo) {
    console.warn(`No repo configured for ${repoName}`)
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
    "dist",
  ]

  // copy root files
  const rootFiles = [
    ".nvmrc",
    ".gitignore",
    "gatsby-browser.js",
    "LICENSE",
    "yarn.lock",
    ".prettierrc.json",
    ".prettierignore",
  ]
  // if destination repo is Typescript add "src"
  if (isTypescript) {
    rootFiles.push("src")
    rootFiles.push("tsconfig.json")
  }
  rootFiles.forEach((file) => {
    const dest = path.join(dir.dist, name, file)
    console.log(`Copying '${file}' to '${dest}'`)
    fs.copySync(file, dest, {
      filter: (n) => !ignore.includes(n),
    })
  })

  // otherwise if destination repo is not Typescript, handle transpilation
  if (!isTypescript) {
    // array to contain all directories found inside src, seeded with src to begin with
    const srcDirectories = ["src"]
    // function to traverse src directory and collect array of all filenames within
    const getAllSrcFiles = (dirPath = "src", filesArray = []) => {
      fs.readdirSync(dirPath).forEach((file) => {
        const filePath = path.join(dirPath, file)
        if (fs.statSync(filePath).isDirectory()) {
          srcDirectories.push(filePath)
          filesArray = getAllSrcFiles(filePath, filesArray)
        } else {
          filesArray.push(filePath)
        }
      })
      return filesArray
    }

    const srcFiles = getAllSrcFiles()
    // create any directories needed
    srcDirectories.forEach((directory) => {
      const destDirectory = path.join(dir.dist, name, directory)
      console.log(`Copying '${directory}' to '${destDirectory}'`)
      fs.mkdirSync(destDirectory)
    })
    // transpile typescript src files
    srcFiles.forEach((srcFilename) => {
      const extension = path.extname(srcFilename)
      // we want to skip over the .css.ts files (vanilla-extract styles)
      // and only transpile .ts/.tsx
      if (
        (extension === ".ts" || extension === ".tsx") &&
        !srcFilename.includes(".css.ts")
      ) {
        console.log(`Transpiling '${srcFilename}'`)
        const { outputText } = ts.transpileModule(
          // replace new lines with a code comment to ensure new line preservation
          fs
            .readFileSync(srcFilename)
            .toString()
            .replace(/\n\n/g, "\n/* :newline: */"),
          {
            compilerOptions: {
              jsx: "preserve",
              target: "esnext",
              newLine: "lf",
              removeComments: false,
            },
          }
        )
        const dest = path.join(
          dir.dist,
          name,
          srcFilename.replace(extension, ".js")
        )
        console.log(
          `Copying transpiled version of '${srcFilename}' to '${dest}`
        )
        // write transpiled code to file, restoring new lines
        fs.writeFileSync(
          dest,
          prettier.format(outputText.replace(/\/\* :newline: \*\//g, "\n"), {
            semi: false,
            parser: "babel",
          })
        )
      } else {
        // copy over src files that don't require transpilation
        const dest = path.join(dir.dist, name, srcFilename)
        console.log(`Copying '${srcFilename}' to '${dest}'`)
        fs.copySync(srcFilename, dest, {
          filter: (n) => !ignore.includes(n),
        })
      }
    })
  }

  // copy cms-specific files
  const files = [
    ".env.EXAMPLE",
    "gatsby-config.js",
    "gatsby-node.js",
    "package.json",
    "scripts",
    "docs/images",
    "docs/adding-a-blog.md",
    "data",
    "src/colors.css.ts",
    "studio", // sanity studio
  ]
  // push cms-specific TS/JS files conditionally to files array
  if (isTypescript) {
    files.push("TS-README.md")
    files.push("src/components/brand-logo.tsx")
    files.push("src/components/footer.tsx")
    files.push("src/components/header.tsx")
  } else {
    files.push("README.md")
    files.push("src/components/brand-logo.js")
    files.push("src/components/footer.js")
    files.push("src/components/header.js")
  }
  // push alternative About page for Contentful due to content type limit for free spaces
  if (basename === "contentful") {
    if (isTypescript) {
      files.push("src/pages/about.tsx")
    } else {
      files.push("src/pages/about.js")
    }
  }

  files.forEach((file) => {
    const src = path.join(dir.plugins, dirname, file)
    const dest = path.join(dir.dist, name, file)
    console.log(`Copying '${file}' to '${dest}'`)
    if (!fs.existsSync(src)) return
    fs.copySync(src, dest, {
      filter: (n) => {
        if (ignoreRegEx.test(n)) {
          return false
        }
        return !ignore.includes(n)
      },
    })
    // if we copied over the TS version of the readme, rename it
    if (file === "TS-README.md") {
      fs.renameSync(dest, path.join(dir.dist, name, "README.md"))
    }
    // if we copied over the gatsby-node file, append type-conditional slices config
    if (file === "gatsby-node.js") {
      fs.appendFileSync(
        dest,
        `
exports.createPages = ({ actions }) => {
  const { createSlice } = actions
  createSlice({
    id: "header",
    component: require.resolve("./src/components/header${
      isTypescript ? ".tsx" : ".js"
    }"),
  })
  createSlice({
    id: "footer",
    component: require.resolve("./src/components/footer${
      isTypescript ? ".tsx" : ".js"
    }"),
  })
}
      `
      )
    }
  })

  // Copy pull request template to target repos
  fs.copySync(
    "docs/pr-template.md",
    path.join(dir.dist, name, "pull_request_template.md")
  )

  const json = createPackageJSON(name, isTypescript)
  fs.writeFileSync(path.join(dir.dist, name, "package.json"), json, "utf8")

  // Remove the about page from WordPress because it is not used
  if (basename === "wordpress") {
    const filepath = path.join(
      dir.dist,
      name,
      "src",
      "pages",
      `about.${isTypescript ? "tsx" : "js"}`
    )
    fs.removeSync(filepath)
  }

  // Check if repo has changes
  let hasChanges = false
  await SimpleGit({
    baseDir: path.join(dir.dist, name),
  }).status(["--porcelain"], (err, result) => {
    hasChanges =
      result.modified.length > 0 ||
      result.not_added.length > 0 ||
      result.deleted.length > 0
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

const createPackageJSON = (name, isTypescript = false) => {
  console.log("Creating package.json for", name)
  const root = require("../package.json")
  const pkg = require(path.resolve(dir.dist, name, "package.json"))
  pkg.name = name
  Object.entries(root.dependencies).forEach(([key, val]) => {
    pkg.dependencies[key] = val
  })
  pkg.devDependencies = pkg.devDependencies || {}
  // prettier dev dependencies
  const devDeps = ["prettier", "husky", "lint-staged"]
  devDeps.forEach((devDep) => {
    pkg.devDependencies[devDep] = root.devDependencies[devDep]
  })
  // optional TS dev dependency
  if (isTypescript) {
    pkg.devDependencies["typescript"] = root.devDependencies["typescript"]
  }
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

  console.log(`Preparing ${starters.length * 2} starters for publishing...`)

  // get last commit message from this repo
  await SimpleGit().log(["-1", "--pretty=%B"], (err, result) => {
    commitMessage = result.latest.hash
  })

  console.log(`Creating ${starters.length * 2} starters`)

  for (let i = 0; i < starters.length; i++) {
    // create JS version
    await createStarterDist(starters[i])
    // create TS version
    await createStarterDist(starters[i], true)
  }

  console.log("Done")
}

publish()
