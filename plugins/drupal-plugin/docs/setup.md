1. **Import content to your Drupal instance**

   An `sql` dump file is provided in the data directory of app called `homepage-starter-dump.sql.gz`

   ### Lando

   A free, open source, cross-platform, local development environment and DevOps tool built on Docker container technology and developed by Tandem. [See the docs](https://docs.lando.dev/)

   ```sh
   lando db-import ~/path/to/homepage-starter-dump.sql.gz
   ```

   ### Drush

   For more information on how to use drush commans and how to install the comman line shell visit [Drush Documentation Site](https://www.drush.org/latest/)

   ```sh
   drush sql-drop
   drush sql-cli < ~/path/to/homepage-starter-dump.sql
   ```

   **NB. You may need to extract the file sql file when using `Drush`**
