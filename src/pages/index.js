import * as React from 'react'
import { graphql } from 'gatsby'
import { themeRoot } from '../styles.css.ts'
import * as sections from '../components/sections'

const Fallback = (props) =>
  <div>
    No component found: {props.__typename}
  </div>

export default function Homepage (props) {
  const blocks = props.data.blocks.nodes

  return (
    <div className={themeRoot}>
      {blocks.map(block => {
        const Component = sections[block.__typename] || Fallback
        return <Component key={block.id} {...block} />
      })}
    </div>
  )
}

export const query = graphql`
  {
    blocks: allHomepageBlock {
      nodes {
        id
        __typename
        ...HomepageHeroContent
      }
    }
  }
`
