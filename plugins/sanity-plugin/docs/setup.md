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

   1. Start the Sanity Studio development server to start adding content:

      ```sh
      yarn start
      ```

   1. In your Gatsby site's directory, run `yarn setup` to create `.env.development` and `.env.production` files with configuration for your Sanity project.
