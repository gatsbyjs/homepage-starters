import * as React from "react"
import { graphql } from "gatsby"
import BlogPost from "@gatsby-theme-abstract-blog/post"

export default function BlogPostQuery(props) {
  const post = props.data.blogPost
  const { next, previous } = props.data

  return <BlogPost {...post} next={next} previous={previous} />
}

export const query = graphql`
  query ($id: String!, $next: String, $previous: String) {
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
    previous: blogPost(slug: { eq: $previous }) {
      id
      slug
      title
      image {
        id
        url
        gatsbyImageData
        alt
      }
    }
    next: blogPost(slug: { eq: $next }) {
      id
      slug
      title
      image {
        id
        url
        gatsbyImageData
        alt
      }
    }
  }
`
