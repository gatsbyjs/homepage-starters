import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
// prettier-ignore
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
} from "../components/ui"
import * as styles from "./blog-post.css.ts"

export default function BlogPost(props) {
  const post = props.data.blogPost

  return (
    <Layout {...post} description={post.excerpt}>
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">{post.title}</Heading>
          {post.author && (
            <Flex>
              {post.author.avatar &&
                (!!post.author.avatar.gatsbyImageData ? (
                  <Avatar {...post.author.avatar} image={post.author.avatar} />
                ) : (
                  <img src={post.author.avatar.url} alt={post.author.alt} />
                ))}
              <Text variant="bold">{post.author.name}</Text>
            </Flex>
          )}
          <div>{post.date}</div>
          {post.image && (
            <GatsbyImage alt={post.image.alt} image={getImage(post.image)} />
          )}
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
      excerpt
      date(formatString: "MMMM Do, YYYY")
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
