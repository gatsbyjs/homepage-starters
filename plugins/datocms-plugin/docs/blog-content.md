### Add models and content to DatoCMS

In your DatoCMS project, navigate to _Settings > Models_ and add new models for _Blog Author_ and _Blog Post_.

The _Blog Author_ model requires the following fields:

- `name`: Single-line string
- `avatar`: Media (single asset)

The _Blog Post_ model requires the following fields:

- `slug`: Single-line string with the custom validation: `^[a-zA-Z0-9\/_-]*$` – this field is used for the URL path
- `title`: Single-line string
- `body`: Structured text
- `excerpt`: Multiple-paragraph text
- `image`: Media (single asset)
- `category`: Single-line string
- `date`: Date
- `author`: Link (Single link) to _Blog Author_

Once you've set up the data models, navigate to the _Content_ tab to start adding blog posts.
