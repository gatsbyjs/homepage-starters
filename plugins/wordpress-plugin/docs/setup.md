1. **Import content to your WordPress instance**

   - In your WordPress Admin, navigate to _Custom Fields_ > _Tools_ and upload the `data/acf-field-groups.json` file in the _Import Field Groups_ form and click _Import File_.
   - Under _Pages_, create a new page called "Homepage."
   - Ensure that the Homepage imported into WordPress is set to be your site's "Homepage" by going to _Settings_ > _Reading_ and setting the _Your homepage displays_ field to _A static page_ and select _Homepage_ from the dropdown.
   - Navigate back to the Homepage, where you should see the custom field groups for the homepage and you can add your own content.
   - Finally, go to _GraphQL_ > _Settings_ and copy the endpoint for the GraphQL API (e.g. https://example.com/graphql) and create a `.env` file with `WPGRAPHQL_URL="<your-graphql-endpoint-url>"`.
