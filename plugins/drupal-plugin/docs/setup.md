1. **Import content to your Drupal instance**

   For this implementation we used `Pantheon` as our host. So some configurations may be specific to that platform. Before importing the `sql` dump file we recommend adding the `files` folder located in the `data` directory to your drupal site under `sites/default/` or wherever your `files` folder is located on your instance. Afterwards you may use the `sql` dump file provided in the `data` directory of app called `homepage-starter-dump.sql.gz`. Depending on the setup, you may have to extract the `sql` file before trying to import the data.

   ### Lando

   A free, open source, cross-platform, local development environment and DevOps tool built on Docker container technology and developed by Tandem. [See the docs](https://docs.lando.dev/).

   ```sh
   # This will destroy the database and import the data.
   # If you wish to keep you existing data add the --no-wipe flag.
   lando db-import ~/path/to/homepage-starter-dump.sql
   ```

   ### Drush

   For more information on how to use drush commands and how to install the command line shell visit [Drush Documentation Site](https://www.drush.org/latest/).

   ```sh
   # If you wish to start from a clean site
   drush sql-drop
   drush sql-cli < ~/path/to/homepage-starter-dump.sql
   ```

   An `admin` user already exists in the application. You will have to reset the password if you decide to start from a clean site.

   ```sh
   # Drush 9
   drush user:password admin "new_password"

   # Drush 8 & earlier
   drush user-password admin --password="new_password"
   ```
