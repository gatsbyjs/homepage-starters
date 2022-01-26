import * as React from 'react'
import { graphql } from 'gatsby'

export default function BlogPost (props) {
  console.log(props)
  const post = props.data.blogPost

  return (
    <div>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post.body.childMarkdownRemark.html
        }}
      />
    </div>
  )
}

export const query = graphql`
  query BlogPostPage($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      slug
      title
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
