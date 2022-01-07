import * as React from 'react'
import { graphql } from 'gatsby'

export default function Homepage (props) {
  const blocks = props.data.blocks.nodes

  return (
    <div>
      {blocks.map(block => (
        <div key={block.id}>
          <h2>{block.__typename}</h2>
          <pre
            children={JSON.stringify(block, null, 2)}
          />
        </div>
      ))}
    </div>
  )
}

// TODO update YAML data structure and query top-level homepage
export const query = graphql`
  {
    blocks: allHomepageBlock {
      nodes {
        id
        __typename
        ... on HomepageHero {
          id
          heading
        }
        ... on HomepageFeature {
          id
          heading
        }
      }
    }
  }
`
