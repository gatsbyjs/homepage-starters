1. **Setup your DatoCMS project**

[![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=60908&name=Homepage+Starter)

This will clone the data model and records backing the demo site to populate your DatoCMS project.

1. **Run the setup script**

After setting up the cloned DatoCMS project, from your site's root directory, run:

```sh
cd my-homepage
yarn setup
```

This will run a script to create `.env.development` and `.env.production` files for you populated with your DatoCMS project environment variables.
