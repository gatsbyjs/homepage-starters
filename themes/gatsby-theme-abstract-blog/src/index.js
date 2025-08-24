import * as React from "react"
import { graphql } from "gatsby"
import BlogIndex from "@gatsby-theme-abstract-blog/index"

export default function BlogIndexQuery(props) {
  const posts = props.data.allBlogPost.nodes

  return <BlogIndex posts={posts} />
}

export const query = graphql`
  query {
    allBlogPost(sort: {date: DESC}) {
      nodes {
        id
        slug
        title
        excerpt
        category
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
