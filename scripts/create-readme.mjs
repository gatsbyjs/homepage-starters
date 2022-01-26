import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkDirective from 'remark-directive'
import { visit } from 'unist-util-visit'

const demo = `
# Hello

This is test markdown.

::beep[]

::include{file=plugins/contentful-plugin/README.md}

`

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(includePlugin)
  .use(remarkStringify)

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function includePlugin() {
  return (tree) => {
    visit(tree, async (node) => {
      if (
        node.type === 'leafDirective'
        || node.type === 'textDirective'
        || node.type === 'containerDirective'
      ) {
        if (node.name !== 'include') return
        const { file } = node.attributes
        if (!file) return

        node.data = node.data || {}
        const filename = path.join(process.cwd(), file)
        const raw = fs.readFileSync(filename, 'utf8')
        const md = await processor.process(raw)

        console.log(node)
      }
    })
  }
}

const buildMarkdown = async (md) => {
  const data = await processor.process(md)
  console.log(String(data))
}

buildMarkdown(demo)
