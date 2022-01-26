
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Starter Contentful Homepage
</h1>

Create a homepage using Gatsby and Contentful. This starter demonstrates how to use Contentful to build a homepage and can be customized to match your own visual branding.

[View the Demo][demo]

[demo]: https://gatsbycontentfulhomepage.gatsbyjs.io/

## Quick start

You will need a [new or existing Contentful space](https://www.contentful.com/help/contentful-101/#step-2-create-a-space) to use this Starter. During installation, you will be asked for the following:

- Contentful Space ID
  - [Directions to find your Space ID](https://www.contentful.com/help/find-space-id/)
- Contentful Management API Token
  - [Directions to generate a Personal Access Token](https://www.contentful.com/faq/personal-access-tokens/)
- Contentful Delivery API Key and (optional) Preview API Key
  - In your Contentful space, go to Settings > API Keys.
  - On the Content delivery / preview tokens tab, click the Add API Key button.
  - Give the API Key an appropriate name and description.

1. **Create a Gatsby site**

  Use the Gatsby CLI to get started locally:

  ```sh
  npx gatsby new my-homepage https://github.com/gatsbyjs/gatsby-starter-contentful-homepage
  ```

1. **Run the Contentful setup command**

  **TO BE IMPLEMENTED**
  From your site's root directory, run:

  ```sh
  cd my-homepage
  yarn setup
  ```

  This will run a script to populate your Contentful space's content model and add demo content.

1. **Start developing**

  In your site directory, start the development server:

  ```sh
  yarn start
  ```

  Your site should now be running at <http://localhost:8000>

1. **Open the source code and start editing**

## Deployment

## What's included?

```
├── README.md
├── gatsby-config.js
├── gatsby-node.js
├── src
│   ├── components
│   ├── pages
│   ├── colors.css.ts
│   ├── styles.css.ts
│   └── theme.css.ts
└── .env.EXAMPLE
```

1. **`gatsby-config.js`**: [Gatsby config][] file that includes plugins required for this starter.
1. **`gatsby-node.js`**: [Gatsby Node][] config file that creates an abstract data model for the homepage content.
1. **`src/`**: The source directory for the starter, including pages, components, and [Vanilla Extract][] files for styling.

[gatsby config]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
[gatsby node]: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
[vanilla extract]: https://vanilla-extract.style/

<!--


- Quick start
  - Requirements
  - Deploy

- What's inside
- How tos
  - Color themes
  - Custom section components
  - Updates to the data model

- Features
  - Contentful
  - Homepage sections
  - Vanilla Extract

-->

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.
- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).**

## 💫 Deploy

[Build, Deploy, and Host On The Only Cloud Built For Gatsby](https://www.gatsbyjs.com/cloud/)

Gatsby Cloud is an end-to-end cloud platform specifically built for the Gatsby framework that combines a modern developer experience with an optimized, global edge network.

