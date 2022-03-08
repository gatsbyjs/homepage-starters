import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
// prettier-ignore
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui"

function PostCard({ slug, image, title, excerpt, author, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={getImage(image)} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>Category TK</Kicker>
        {title}
      </Subhead>
      <Text as="p">{excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({ slug, image, title, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={getImage(image)} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>Category TK</Kicker>
        {title}
      </Subhead>
    </BlockLink>
  )
}

export default function BlogIndex(props) {
  const posts = props.data.allBlogPost.nodes

  // todo: use categories as groups
  const featuredPosts = posts.slice(0, 2)
  const smallPosts = posts.slice(1)
  // for development only
  const fakedPosts = Array.from({ length: 12 }).map((n, i) => ({
    ...posts[0],
    id: posts[0].id + i,
  }))

  return (
    <Layout title="Blog">
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">Blog</Heading>
          <FlexList variant="start" gap={0} gutter={3} responsive>
            {featuredPosts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="half">
                <PostCard {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
        <Box paddingY={4}>
          <Subhead>
            <Kicker>Kicker</Kicker>
            TK Category
          </Subhead>
          <FlexList responsive wrap gap={0} gutter={3} variant="start">
            {fakedPosts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="third">
                <PostCardSmall {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allBlogPost {
      nodes {
        id
        slug
        title
        excerpt
        image {
          id
          alt
          gatsbyImageData
        }
        author {
          id
          name
        }
      }
    }
  }
`
