import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
// prettier-ignore
import {
  Container,
  Box,
  Heading,
  Text,
} from "../components/ui"

export default function BlogPost(props) {
  const post = props.data.blogPost

  return (
    <Layout {...post} description={post.excerpt}>
      <Container>
        <Box paddingY={4}>
          {post.image && (
            <GatsbyImage alt={post.image.alt} image={getImage(post.image)} />
          )}
          <Heading as="h1">{post.title}</Heading>
          {post.author && (
            <Box>
              {post.author.avatar &&
                (!!post.author.avatar.gatsbyImageData ? (
                  <GatsbyImage
                    alt={post.author.avatar.alt}
                    image={getImage(post.author.avatar)}
                  />
                ) : (
                  <img src={post.author.avatar.url} alt={post.author.alt} />
                ))}
              <Text>{post.author.name}</Text>
            </Box>
          )}
          <div
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
      excerpt
      date
      image {
        id
        url
        gatsbyImageData
        alt
      }
      author {
        id
        name
        avatar {
          id
          alt
          gatsbyImageData
          url
        }
      }
    }
  }
`
