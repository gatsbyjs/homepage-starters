### Add a content model and content to Contentful

In your Contentful space, add a new content model for `BlogPost`.

The content model requires the following fields:

- `slug`: Unique Short text with the custom validation: `^[a-zA-Z0-9\/_-]*$` - this field is used for the URL path
- `title`: Short text
- `body`: Rich text
