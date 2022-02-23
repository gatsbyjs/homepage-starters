1. **Import content to your WordPress instance**

   - In your WordPress Admin navigate to _CPT UI_ > _Tools_ and paste the contents of the `content/post-types.json` file into the _Import Post Types_ field and click the _Import_ button.
   - In _CPT UI_ > _Tools_, go to the _Taxonomies_ tab and paste the contents of the `content/taxonomies.json` file into the _Import Taxonomies_ field and click the _Import_ button.
   - Navigate to _Custom Fields_ > _Tools_ and upload the `content/acf-field-groups.json` file in the _Import Field Groups_ form and click _Import File_.
   - Next, go to _Tools_ > _Import_ and use the _WordPress_ import tool to upload the content from the `content/content.xml` file.
   - Ensure that the Homepage imported into WordPress is set to be your site's "Homepage" by going to _Settings_ > _Reading_ and setting the _Your homepage displays_ field to _A static page_ and select _Homepage_ from the dropdown.
   - Finally, go to _GraphQL_ > _Settings_ and copy the endpoint for the GraphQL API (e.g. https://example.com/graphql) and create a `.env` file with `WPGRAPHQL_URL="<your-graphql-endpoint-url>"`.
