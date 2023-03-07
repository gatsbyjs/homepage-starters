You will need a new or existing [Contentful space][] to use this starter and will be asked for your [Space ID][], [Content Management API Key][] (also referred to as a Personal Access Token) and [Content Delivery API Key][] during installation.

**Note:**
Since this project was first released, Contentful has adjusted the amount of content types allowed in a free space. As a result, the default data set used for this starter has the About page content types and content omitted.

If you already have a paid Contentful space, you can utilize the data set that includes the About page content by renaming `scripts/data-with-about-page.json` to `/scripts/data.json` before running the `yarn gatsby-provision` command.

[contentful space]: https://www.contentful.com/help/contentful-101/#step-2-create-a-space
[space id]: https://www.contentful.com/help/find-space-id/
[content delivery api key]: https://www.contentful.com/developers/docs/references/authentication/#api-keys-in-the-contentful-web-app
[content management api key]: https://www.contentful.com/developers/docs/references/authentication/#the-content-management-api
