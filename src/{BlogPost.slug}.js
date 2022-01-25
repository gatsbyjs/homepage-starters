import * as React from 'react'
import { graphql } from 'gatsby'

// FS route pages wont render without the graphql node type available
// but it still renders an error during build/dev
export default function BlogPost (props) {
  return (
    <div>
      <pre>TK BlogPost</pre>
    </div>
  )
}
