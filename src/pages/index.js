import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import * as sections from '../components/sections'

const Fallback = (props) =>
  <div>
    No component found: {props.blocktype}
  </div>

export default function Homepage (props) {
  const { homepage } = props.data

  return (
    <Layout {...homepage}>
      {homepage.blocks.map((block, i) => {
        const Component = sections[block.blocktype] || Fallback
        return (
          <Component
            key={block.id}
            index={i}
            {...block}
          />
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
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
`
