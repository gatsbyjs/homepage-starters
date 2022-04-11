### Add content models and content to Contentful

In your Contentful space, add new content models for _Blog Author_ and _Blog Post_.

The _Blog Author_ content model should have the following fields:

- `name`: Short text
- `avatar`: Media (image)

The _Blog Post_ content model should have the following fields:

- `slug`: Unique Short text with the custom validation: `^[a-zA-Z0-9\/_-]*$` - this field is used for the URL path
- `title`: Short text
- `body`: Rich text
- `excerpt`: Long text
- `image`: Media (image)
- `date`: Date & time
- `category`: Short text
- `author`: Reference to `BlogAuthor` (see below)

Once you've set up the content models, navigate to the _Content_ tab and start adding blog posts.
