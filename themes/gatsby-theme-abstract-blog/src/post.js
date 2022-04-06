import * as React from "react"
import { graphql } from "gatsby"
import BlogPost from "@gatsby-theme-abstract-blog/post"

export default function BlogPostQuery(props) {
  const post = props.data.blogPost

  return <BlogPost {...post} />
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
