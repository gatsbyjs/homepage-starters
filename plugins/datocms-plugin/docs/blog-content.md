### Add a model and content to DatoCMS

In your DatoCMS project, add a new model for `BlogPost`.

The model requires the following fields:

- `slug`: Single-line stringa withe the custom validation: `^[a-zA-Z0-9\/_-]*$` – this field is used for the URL path
- `title`: Single-line string
- `body`: Structured text
