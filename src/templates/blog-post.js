import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container, Heading, Box } from "../components/ui"

export default function BlogPost(props) {
  const post = props.data.blogPost

  return (
    <Layout {...post}>
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">{post.title}</Heading>
          <div
            dangerouslySetInnerHTML={{
              // __html: post.body.childMarkdownRemark.html,
              __html: post.html,
            }}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostPage($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      slug
      title
      html

      # description
      # image
      # body {
      #   childMarkdownRemark {
      #     html
      #   }
      # }
    }
  }
`
