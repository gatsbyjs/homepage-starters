import * as React from 'react'
import { graphql } from 'gatsby'

export default function BlogPost (props) {
  console.log(props)
  return (
    <div>
      <pre>TK BlogPost</pre>
    </div>
  )
}

export const query = graphql`
  query BlogPostPage($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      slug
      title
      body
    }
  }
`
