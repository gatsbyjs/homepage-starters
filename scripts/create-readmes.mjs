#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import remarkDirective from "remark-directive"
import { visit } from "unist-util-visit"
import starters from "./data.js"

/**
 * TODO
 * - add docs for this script
 * - clean up examples
 * - include colors from each starter
 */

/** example of usage of these remark plugins
const demo = `

Replace inline text with the CMS's name:

# Hello Gatsby Starter :var[cms] Homepage

:link[demoURL]{text=View the Demo}

      Replace a definition with a variable:

      ::def[demoURL]{#demo}

      This will yield:

      [demo]: http://example.com/demourl

Include a markdown file from the plugin's `/docs` directory:

::include{file=quick-start-intro.md}

Replace `$` in a code snippet with the `command` variable:

\`\`\`sh command
npx bleep new $
\`\`\`
`
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
        console.log("Including: ", filename)
        let raw
        try {
          raw = fs.readFileSync(filename, "utf8")
        } catch (e) {
          throw new Error(
            `The ::include file path at '${file}' ('${filename}') was not found.`
          )
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

Object.keys(starters).forEach(async (key, i) => {
  const starter = starters[key]
  const outdir = path.join(process.cwd(), "plugins", starter.dirname)
  const readme = await buildMarkdown(template, {
    basedir: path.join(process.cwd(), "plugins", starter.dirname, "docs"),
    vars: starter,
  })
  fs.writeFileSync(path.join(outdir, "README.md"), readme)
  console.log(`README.md written for ${key}`)
})
