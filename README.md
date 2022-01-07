
# Gatsby Homepage Starters

Development setup for homepage starters with various CMS backends

```sh
├── README.md
├── gatsby-config.js
├── package.json
├── plugins
│   ├── contentful-homepage-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   ├── datocms-homepage-plugin
│   │   ├── gatsby-config.js
│   │   ├── gatsby-node.js
│   │   └── package.json
│   └── yaml-homepage-plugin
│       ├── gatsby-config.js
│       ├── gatsby-node.js
│       └── package.json
├── src
│   ├── components
│   └── pages
│       └── index.js
```

---

## Notes

- YAML
  - Local filesystem approach for development
  - data and assets are in the plugin directory
- DatoCMS
  - Requires a `.env.development`
  - Project needs to be set up in the shared Gatsby DatoCMS account
- Contenful
  - Requires a `.env.development`
  - Not currently working
