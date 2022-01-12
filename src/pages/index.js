import * as React from 'react'
import { graphql } from 'gatsby'
import { themeRoot } from '../styles.css.ts'
import Layout from '../components/layout'
import * as sections from '../components/sections'

const Fallback = (props) =>
  <div>
    No component found: {props.blocktype}
  </div>

export default function Homepage (props) {
  const { homepage } = props.data

  return (
    <div className={themeRoot}>
      <Layout>
        {homepage.blocks.map(block => {
          const Component = sections[block.blocktype] || Fallback
          return <Component key={block.id} {...block} />
        })}
      </Layout>
    </div>
  )
}

export const query = graphql`
  {
    homepage {
      id
      title
      description
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
