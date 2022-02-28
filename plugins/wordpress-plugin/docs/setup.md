1. **Import content to your WordPress instance**

   <!--
   - Navigate to _Custom Fields_ > _Tools_ and upload the `data/acf-field-groups.json` file in the _Import Field Groups_ form and click _Import File_.
     -->

   - In your WordPress Admin, go to _Tools_ > _Import_ and use the _WordPress_ import tool to upload the content from the `data/content.xml` file.
   - Ensure that the Homepage imported into WordPress is set to be your site's "Homepage" by going to _Settings_ > _Reading_ and setting the _Your homepage displays_ field to _A static page_ and select _Homepage_ from the dropdown.
   - Finally, go to _GraphQL_ > _Settings_ and copy the endpoint for the GraphQL API (e.g. https://example.com/graphql) and create a `.env` file with `WPGRAPHQL_URL="<your-graphql-endpoint-url>"`.
