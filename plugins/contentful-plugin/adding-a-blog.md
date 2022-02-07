# Adding a blog to your homepage starter

The Gatsby Homepage starter includes components for creating a homepage and an _About_ page as well as templates for simple pages like a _Privacy Policy_ page.

It also includes templates for a blog, but this feature is disabled by default.
This guide explains how to enable this feature.

## Get started

The content for the blog pages is sourced by a [Gatsby Theme][], which you'll need to install in your site.

[gatsby theme]: https://www.gatsbyjs.com/docs/themes/

This homepage starter uses Contentful for its content, but you can choose a different CMS for your blog.
For example, if you've decided to switch to Contentful, but you have an existing blog in a different CMS and want to keep the content separate, you can install the blog theme for that CMS.

Currently, the following blog themes are available to work out-of-the-box with this starter:

- [gatsby-theme-contentful-blog][]
- [gatsby-theme-datocms-blog][]
- [gatsby-theme-wordpress-blog][]

Choose one of these blog themes, install it, and add it to your site's `gatsby-config.js`.

```sh name
npm i gatsby-theme-contentful-blog
```

```js name
// gatsby-config.js
module.exports = {
  plugins: [
    // ...
    // Add the theme to the plugins array
    "gatsby-theme-contentful-blog",
  ],
}
```

### Add a content model and content to Contentful

In your Contentful space, add a new content model for `BlogPost`.

The content model requires the following fields:

- `slug`: Unique Short text with the custom validation: `^[a-zA-Z0-9\/_-]*$` - this field is used for the URL path
- `title`: Short text
- `body`: Rich text

### Environment Variables

If you're using a different CMS in your blog than the one used for the homepage content, be sure to add the required environment variables to your `.env.development` and `.end.production` files.

- WordPress requires:
  - `WPGRAPHQL_URL`
- Contentful requires:
  - `CONTENTFUL_SPACE_ID`
  - `CONTENTFUL_ACCESS_TOKEN`
- DatoCMS requires:
  - `DATOCMS_API_TOKEN`
  - `DATOCMS_ENVIRONMENT`

## Using another CMS or data source

If the CMS that you'd like to use for your blog hasn't been built as a theme yet, you can use [gatsby-theme-abstract-blog][] to pull your blog content for other sources.

<!-- TODO: check links after publishing -->

[gatsby-theme-abstract-blog]: https://github.com/gatsbyjs/homepage-starters/tree/main/themes/gatsby-theme-abstract-blog
[gatsby-theme-contentful-blog]: https://github.com/gatsbyjs/homepage-starters/tree/main/themes/gatsby-theme-contentful-blog
[gatsby-theme-datocms-blog]: https://github.com/gatsbyjs/homepage-starters/tree/main/themes/gatsby-theme-datocms-blog
[gatsby-theme-wordpress-blog]: https://github.com/gatsbyjs/homepage-starters/tree/main/themes/gatsby-theme-wordpress-blog
