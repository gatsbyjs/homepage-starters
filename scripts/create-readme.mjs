import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkDirective from 'remark-directive'
import { visit } from 'unist-util-visit'
import starters from './data.js'

const demo = `
# Hello Gatsby Starter :var[cms] Homepage

::def[demoURL]{#demo}

This is test markdown.

::include{file=quick-start-intro.md}

\`\`\`sh beep-boop,slip-slap
npx bleep new $ && yarn $
\`\`\`
`

const stringifyOptions = {
  bullet: '-',
  incrementListMarker: false,
  listItemIndent: 'one',
  rule: '-',
  emphasis: '_',
  tightDefinitions: true,
}

function variablePlugin(opts) {
  return (tree) => {
    visit(tree, async (node) => {
      if (
        node.type === 'textDirective'
        || node.type === 'leafDirective'
      ) {
        if (node.name !== 'var' && node.name !== 'def') return
        const key = node.children?.[0]?.value
        const val = opts[key]
        if (!val) {
          throw new Error(`No defined value found for :var[${key}]`)
        }
        if (node.name === 'var') {
          node.type = 'text'
          node.value = val
        } else if (node.name === 'def') {
          node.type = 'definition'
          node.identifier = node.attributes.id
          node.url = val
        }
      }

      if (node.type === 'code') {
        const { meta } = node
        if (!meta) return
        const vars = meta.split(',')
        vars.forEach(v => {
          node.value = node.value.replace('$', v)
        })
      }
    })
  }
}

function includePlugin({
  basedir = process.cwd(),
}) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify, stringifyOptions)

  return async (tree) => {
    visit(tree, async (node) => {
      if (
        node.type === 'leafDirective'
      ) {
        if (node.name !== 'include') return
        const { file } = node.attributes
        if (!file) return

        node.data = node.data || {}
        const filename = path.join(basedir, file)
        let raw
        try {
          raw = fs.readFileSync(filename, 'utf8')
        } catch (e) {
          throw new Error(
            `The ::include file path at '${file}' ('${filename}') was not found.`
          )
        }

        const ast = await processor.parse(raw)

        node.type = 'root'
        node.children = processor.runSync(ast, raw).children
      }
    })
  }
}

const buildMarkdown = async (md, opts) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(includePlugin, {
      basedir: opts.basedir,
    })
    .use(variablePlugin, {
      ...opts.vars,
    })
    .use(remarkStringify, stringifyOptions)

  const data = await processor.process(md)
  return data.toString()
}

const template = fs.readFileSync('docs/readme-template.md', 'utf8')

Object.keys(starters).forEach(async (key, i) => {
  const starter = starters[key]
  const name = starter.repo.substring(repo.lastIndexOf("/") + 1)
  const outdir = path.join(process.cwd(), 'dist', name)
  const readme = await buildMarkdown(template, {
    basedir: path.join(process.cwd(), 'plugins', starter.dirname, 'docs'),
    vars: starter,
  })
  console.log(readme)
})
