import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkDirective from 'remark-directive'
import { visit } from 'unist-util-visit'

const demo = `
# Hello Gatsby Starter :var[CMS] Homepage

::def[url]{#demo}

This is test markdown.

::include{file=plugins/contentful-plugin/README.md}

\`\`\`sh beep-boop,slip-slap
npx bleep new $ && yarn $
\`\`\`
`

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(includePlugin)
  .use(variablePlugin, {
    CMS: 'Contentful',
    cms: 'contentful',
    url: 'https://gatsbycontentfulhomepage.gatsbyjs.io/',
  })
  .use(remarkStringify)

function includePlugin() {
  return (tree) => {
    visit(tree, async (node) => {
      if (
        node.type === 'leafDirective'
      ) {
        if (node.name !== 'include') return
        const { file } = node.attributes
        if (!file) return

        node.data = node.data || {}
        const filename = path.join(process.cwd(), file)
        let raw
        try {
          raw = fs.readFileSync(filename, 'utf8')
        } catch (e) {
          throw new Error(
            `The ::include file path at '${file}' ('${filename}') was not found.`
          )
        }

        // development only
        // raw = 'beep\n'

        const ast = processor.parse(raw)

        node.type = 'root'
        node.children = processor.runSync(ast, raw).children
      }
    })
  }
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

const buildMarkdown = async (md) => {
  const data = await processor.process(md)
  console.log(String(data))
}

buildMarkdown(demo)
