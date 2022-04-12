#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import remarkDirective from "remark-directive"
import { visit } from "unist-util-visit"
import starters from "./data.js"

/* This script generates README.md files for each starter.
 * See this repo's README.md for more information.
 */

/** example usage in markdown

    Replace inline text with the CMS's name:

      # Hello Gatsby Starter :var[cms] Homepage

    Replace a link's URL with a variable:

      :link[demoURL]{text=View the Demo}


    Include a markdown file from the plugin's `/docs` directory:

      ::include{file=quick-start-intro.md}

    Replace `$` in a code snippet with the `command` variable:

      ```sh command
      npx bleep new $
      ```
*/

const stringifyOptions = {
  bullet: "-",
  incrementListMarker: false,
  listItemIndent: "one",
  rule: "-",
  emphasis: "_",
  tightDefinitions: true,
}

function variablePlugin(opts) {
  return (tree) => {
    visit(tree, async (node) => {
      if (node.type === "textDirective" || node.type === "leafDirective") {
        if (node.name !== "var" && node.name !== "link") return
        const key = node.children?.[0]?.value
        const val = opts[key]
        if (!val) {
          throw new Error(`No defined value found for :var[${key}]`)
        }
        if (node.name === "var") {
          node.type = "text"
          node.value = val
        } else if (node.name === "link") {
          node.type = "link"
          node.url = val
          const text = node.attributes?.text

          // Handle edge case for Deploy to Gatsby button
          if (text === "Deploy to Gatsby") {
            node.children = [
              {
                type: "image",
                url: "https://www.gatsbyjs.com/deploynow.png",
                title: "Deploy to Gatsby",
                alt: "Deploy to Gatsby",
              },
            ]
          } else {
            node.children = [
              {
                type: "text",
                value: text,
              },
            ]
          }
        }
      }

      if (node.type === "code") {
        const { meta } = node
        if (!meta) return
        const vars = meta.split(",")
        vars.forEach((key) => {
          const n = opts[key]
          if (!n) {
            throw new Error(`No defined value found for '${key}'`)
          }
          node.value = node.value.replace("$", n)
        })
      }

      // support variable file name extensions in inline code
      if (node.type === "inlineCode") {
        if (!opts.fileExt) {
          throw new Error(
            `Inline Code has variable file extension but variable value was not provided`
          )
        }
        node.value = node.value.replace("$fileExt", opts.fileExt)
      }
    })
  }
}

function includePlugin({ basedir = process.cwd() }) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify, stringifyOptions)

  return async (tree) => {
    visit(tree, async (node) => {
      if (node.type === "leafDirective") {
        if (node.name !== "include") return
        const { file } = node.attributes
        if (!file) return

        node.data = node.data || {}
        const filename = path.join(basedir, file)
        const ext = path.extname(file)
        console.log("Including: ", filename)
        let raw
        try {
          raw = fs.readFileSync(filename, "utf8")
        } catch (e) {
          throw new Error(
            `The ::include file path at '${file}' ('${filename}') was not found.`
          )
        }

        if (ext !== ".md") {
          node.type = "code"
          node.value = `// ${file}\n${raw}`
          node.lang = ext
          return
        }

        const ast = await processor.parse(raw)

        node.type = "root"
        node.children = processor.runSync(ast, raw).children
      }
    })
  }
}

const buildMarkdown = async (md, opts) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(variablePlugin, {
      ...opts.vars,
    })
    .use(includePlugin, {
      basedir: opts.basedir,
    })
    .use(remarkStringify, stringifyOptions)

  const data = await processor.process(md)
  return data.toString()
}

const template = fs.readFileSync("docs/readme-template.md", "utf8")
const blogTemplate = fs.readFileSync("docs/adding-a-blog.md", "utf8")

Object.keys(starters).forEach(async (key, i) => {
  const starter = starters[key]
  const isTS = key.includes("-ts")
  const outdir = path.join(process.cwd(), "plugins", starter.dirname)
  const opts = {
    basedir: path.join(process.cwd(), "plugins", starter.dirname),
    vars: {
      ...starter,
      fileExt: isTS ? "tsx" : "js",
      repoType: isTS ? "TypeScript" : "JavaScript",
      altRepoType: isTS ? "JavaScript" : "TypeScript",
      altRepoUrl: starters[isTS ? key.replace("-ts", "") : `${key}-ts`].repo,
    },
  }
  const readme = await buildMarkdown(template, opts)
  fs.writeFileSync(path.join(outdir, `${isTS ? "TS-" : ""}README.md`), readme)
  if (starter.blogTheme) {
    const blogDocs = await buildMarkdown(blogTemplate, opts)
    fs.writeFileSync(path.join(outdir, "docs", `adding-a-blog.md`), blogDocs)
    console.log(`Blog theme docs written for ${key}`)
  }
  console.log(`README.md written for ${key}`)
})
