1. **Set up Sanity Studio**

   1. In the `studio` directory, install dependencies for Sanity Studio:

      ```sh
      yarn
      ```

   1. Create a new Sanity project by running:

      ```sh
      yarn sanity-init
      ```

      This will prompt you to log in if this is your first time using Sanity CLI.

   1. Deploy the Sanity GraphQL API for your new project:

      ```sh
      yarn deploy
      ```

   1. Optionally, to import the demo content for this starter run:

      ```sh
      yarn sanity-import
      ```

   1. Start the Sanity Studio development server to start editing content:

      ```sh
      yarn start
      ```

   1. In your _Gatsby site's directory_, to create `.env.development` and `.env.production` files with configuration for your Sanity project, run:

      ```sh
      yarn setup
      ```
