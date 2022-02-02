import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// prettier-ignore
import {
  Container,
  Heading,
  Box
} from "../components/ui"
import * as styles from "./blog-post.css.ts"

export default function BlogPost(props) {
  const post = props.data.blogPost

  return (
    <Layout {...post}>
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">{post.title}</Heading>
          <div
            className={styles.blogPost}
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      slug
      title
      html
      # description
      # image
    }
  }
`
