# Gatsby Theme Abstract Blog

A core data-abstraction theme for Gatsby.

This theme can be used on its own, but is intended as shared abstraction layer for other themes.
If you're looking for a simpler setup, see one of the following themes that are built with this theme.

- gatsby-theme-contentful-blog
- gatsby-theme-datocms-blog
- gatsby-theme-wordpress-blog

## Get started

Install the theme and add it to your Gatsby site's `gatsby-config.js`.

```sh
npm i gatsby-theme-abstract-blog
```

```js
// gatsby-config.js
module.exports = {
  plugins: ["gatsby-theme-abstract-blog"],
}
```

This theme provides a data abstraction layer for other themes or sites to implement based on their CMS backend.
It does not include pages or source content, and you'll need to provide these for the theme to render blog pages.

### Add templates

This theme requires that your site include two templates in its `src` directory.
By default it expects these templates to exist:

- `src/templates/blog-index.js`
- `src/templates/blog-post.js`

Add these two templates to your site.

```js
// src/templates/blog-index.js
import * as React from "react"
import { Link } from "gatsby"

export default function BlogIndex({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

```js
// src/templates/blog-post.js
import * as React from "react"

export default function BlogPost(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}
      />
    </div>
  )
}
```

### Add content source

Because this theme does not source content, you'll need to source content from your CMS of choice.

1. Add a source plugin to your `gatsby-config.js` for your CMS
1. Add a custom GraphQL type definition to your `gatsby-node.js` that implements the `BlogPost` interface, ensuring the shape matches the interface provided by this theme.

The following example is for WordPress, but change the node type as needed for your CMS.

```js
// example gatsby-node.js
exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    type WpPost implements Node & BlogPost {
      id: ID!
      slug: String!
      title: String!
      html: String! @proxy(from: "content")
    }
  `)
}
```

## Options

```js
// example gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-abstract-blog",
      options: {
        postPath: "src/templates/blog-post",
        indexPath: "src/templates/blog-index",
        customQueries: false,
      },
    },
  ],
}
```

- `postPath`: relative path to template for the blog post pages
- `indexPath`: relative path to template for the blog index page
- `customQueries`: set to `true` to use provided components as page components that include Gatsby GraphQL page queries
