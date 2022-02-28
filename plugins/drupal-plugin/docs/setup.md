1. **Import content to your Drupal instance**

   For this implementation we used `Pantheon` as our host. So some configurations may be specific to that platform. Before importing the `sql` dump file we recommend adding the `files` folder located in the `data` directory to your drupal site under `sites/default/` or wherever your `files` folder is located on your instance. Afterwards you may use the `sql` dump file provided in the `data` directory of app called `homepage-starter-dump.sql.gz`. Depending on the setup, you may have to extract the `sql` file before trying to import the data.

   ## Hosting on Pantheon

   1. Go to Pantheon.io, register and log in
   1. Create a new blank project and provide a name for the project

      <img src="./docs/images/setup-step-1.png" width="300">

   1. Select Drupal with Composer and then following the instructions to complete the installation

      <img src="./docs/images/setup-step-2.png" width="300">

   1. On the `Dashboard` there will be three (3) environments (_Dev, Test and Live_) and for our purposes we will use `Dev`. Select _Database/Files_ then _Wipe_. Click **`Wipe the Development Environment`** and follow the instructions to start with an empty site.

      <img src="./docs/images/setup-step-3.png" width="300">

   1. Go to _Import_. Here under `MySQL Database` select `File` and use the `homepage-starter-dump.sql.gz` provided in the data directory to upload the database. Make sure _Run update.php after the database import finishes_ is selected before uploading the file. Click **`Import`**.

      <img src="./docs/images/setup-step-4.png" width="500">

   1. Under `Archive of site files` select `File` and use the `files.zip` also provided in the data directory to upload the files. Click **`Import`**.

      <img src="./docs/images/setup-step-5.png" width="500">

   1. **`Clear Caches`** and you're done! Test out your site by clicking either **`Visit Development Site`** or **`Site Admin`**.

      <img src="./docs/images/setup-step-6.png" width="500">

   1. The credentials for logging in are:
      `sh username: admin password: DrupalGatsby123 `
      Our site is up but we still need to install the [Gatsbt Module](https://www.drupal.org/project/gatsby). To do that on `Pantheon` we need to pull down the site locally and install the module using `composer`. To stream line this process we will use a free, open source, cross-platform tool called [Lando](https://lando.dev/download/).

### Lando & Pantheon Integration

1. Install `Lando` and `Docker`
1. A `Machine Token` is needed by `Pantheon` in order to _push and pull_ the **_*Database, Files and Code*_**. To generate a `Machine Token` follow these [instructions](https://pantheon.io/docs/machine-tokens). Remember that the `Machine Key` will only be visible once so keep it handy.
1. ```sh
   # Create a new directory for your Drupal site
   mkdir homepage-starter
   cd homepage-starter

   # Initialize Lando and when prompted select Pantheon and paste in the Machine Key generated earlier. Continue following the prompts provided to pull donw your site.
   lando init

   # Start server
   lando start

   # Pull down Database, Files and Code. We are working on the dev server so be sure to select "dev" when prompted
   lando pull

   # Clear caches
   lando drush cc all
   ```

1. ```sh
   # Add composer file provide and run:
   lando composer install

   # OR

   # Manually install modules
   lando composer require 'drupal/gatsby:^1.0@RC'
   lando composer require 'drupal/markdown:^3.0@RC'
   lando composer require 'drupal/simplemde:^1.0@alpha'
   # Optional but makes navigation easier
   lando composer require 'drupal/admin_toolbar'

   # Clear caches again
   lando drush cc all
   ```

1. ```sh
   # Push up Database, Files and Code. We are working on the dev server so be sure to select "dev" when prompted
   lando push
   ```

1. If you decided to manually add your modules, go to your `Drupal` site hosted on `Patheon` and login.

   1. Select _Extend_ in the toolbar.

      <img src="./docs/images/setup-step-7.png" width="500">

   1. Find the `Gatsby Section` and check **_`Gatsby`_**, **_`Gatsby Fast Builds`_**, **_`Gatsby JSON:API Instant Preview and Incremental Builds`_**. All other dependent modules will automatically be installed.

      <img src="./docs/images/setup-step-8.png" width="500">

   1. Head to the bottom on the page and click the **_*Install*_** button.

1. Remember to clear your caches again and you're done!

---

## Local Development

The `composer.json` file as well as exported configurations found in the `config` folder are also included. If you decide to import and install these configurations, please do so before executing the `sql` script and be sure `not` to clean the existing database.

```sh
# import configurations
drush cim

# initial install
composer update

# installing from composer.lock
composer install
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

### Lando

A free, open source, cross-platform, local development environment and DevOps tool built on Docker container technology and developed by Tandem. [See the docs](https://docs.lando.dev/).

```sh
# This will destroy the database and import the data.
# If you wish to keep you existing data add the --no-wipe flag.
lando db-import ~/path/to/homepage-starter-dump.sql
```
