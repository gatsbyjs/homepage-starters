1. **Import content to your Drupal instance**

   For this implementation we used `Pantheon` as our host. So some configurations may be specific to that platform. Before importing the `sql` dump file we recommend adding the `files` folder located in the `data` directory to your drupal site under `sites/default/` or wherever your `files` folder is located on your instance. Afterwards you may use the `sql` dump file provided in the `data` directory of app called `homepage-starter-dump.sql`

   ### Lando

   A free, open source, cross-platform, local development environment and DevOps tool built on Docker container technology and developed by Tandem. [See the docs](https://docs.lando.dev/).

   ```sh
   lando db-import ~/path/to/homepage-starter-dump.sql
   ```

   ### Drush

   For more information on how to use drush commans and how to install the command line shell visit [Drush Documentation Site](https://www.drush.org/latest/).

   ```sh
   drush sql-drop
   drush sql-cli < ~/path/to/homepage-starter-dump.sql
   ```
