import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// prettier-ignore
import {
  Container,
  Heading,
  Box,
  Link
} from "../components/ui"

export default function BlogIndex(props) {
  const posts = props.data.allBlogPost

  return (
    <Layout title="Blog">
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">Blog</Heading>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </Layout>
  )
}

/* TODO
export const query = graphql`
  query {
    allBlogPost {
      id
      slug
      title
    }
  }
`
*/
