import * as React from 'react'
import { graphql } from 'gatsby'
import * as sections from '../components/sections'

const Fallback = (props) =>
  <div>
    No component found: {props.__typename}
  </div>

export default function Homepage (props) {
  const [ homepage ] = props.data.allHomepage.nodes

  return (
    <div>
      {homepage.blocks.map(block => {
        const Component = sections[block.__typename] || Fallback
        return <Component key={block.id} {...block} />
      })}
    </div>
  )
}

export const query = graphql`
  {
    allHomepage {
      nodes {
        id
        title
        description
        blocks: content {
          id
          __typename
          ...HomepageHeroContent
          ...HomepageFeatureContent
          ...HomepageCtaContent
          ...HomepageLogoListContent
          ...HomepageTestimonialListContent
          ...HomepageBenefitListContent
          ...HomepageStatListContent
        }
      }
    }
  }
`
