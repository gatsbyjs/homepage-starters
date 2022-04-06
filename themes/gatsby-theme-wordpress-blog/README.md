# Gatsby Theme WordPress Blog

A core, data-only theme for adding a blog to your site, with content from WordPress.

## Get started

Install the theme and add it to your Gatsby site's `gatsby-config.js`.

```sh
npm i gatsby-theme-wordpress-blog
```

```js
// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    "gatsby-theme-wordpress-blog",
    // ...
  ],
}
```

Add `.env.development` and `.env.production` files with the following environment variable defined:

```sh
// .env example
WPGRAPHQL_URL=""
```

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

## Options

```js
// example gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-wordpress-blog",
      options: {
        postPath: "src/templates/blog-post",
        indexPath: "src/templates/blog-index",
      },
    },
  ],
}
```

- `postPath`: relative path to template for the blog post pages
- `indexPath`: relative path to template for the blog index page
