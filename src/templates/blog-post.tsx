import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
  HomepageImage,
} from "../components/ui"
import { avatar as avatarStyle } from "../components/ui.css"
import * as styles from "./blog-post.css"

export interface BlogAuthor {
  id: string
  name: string
  avatar: HomepageImage
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  html: string
  image: HomepageImage
  author: BlogAuthor
}

export interface BlogPostProps {
  data: {
    blogPost: BlogPost
  }
}

export default function BlogPost(props: BlogPostProps) {
  const post = props.data.blogPost

  return (
    <Layout {...post} description={post.excerpt}>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {post.title}
          </Heading>
          <Space size={4} />
          {post.author && (
            <Box center>
              <Flex>
                {post.author.avatar &&
                  (!!post.author.avatar.gatsbyImageData ? (
                    <Avatar
                      {...post.author.avatar}
                      image={post.author.avatar.gatsbyImageData}
                    />
                  ) : (
                    <img
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      className={avatarStyle}
                    />
                  ))}
                <Text variant="bold">{post.author.name}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{post.date}</Text>
          <Space size={4} />
          {post.image && (
            <GatsbyImage
              alt={post.image.alt}
              image={post.image.gatsbyImageData}
            />
          )}
          <Space size={5} />
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
