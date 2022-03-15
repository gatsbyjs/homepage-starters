import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  getSectionComponentAndProps,
  HomepageBlock,
} from "../components/sections"

interface HomepageProps {
  data: {
    homepage: {
      id: string
      title: string
      description: string
      image: { id: string; url: string }
      blocks: HomepageBlock[]
    }
  }
}

export default function Homepage(props: HomepageProps) {
  const { homepage } = props.data

  return (
    <Layout {...homepage}>
      {homepage.blocks.map((block) => {
        const { Component, props } = getSectionComponentAndProps(block)
        return <Component key={block.id} {...props} />
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
        ...HomepageFeatureListContent
        ...HomepageCtaContent
        ...HomepageLogoListContent
        ...HomepageTestimonialListContent
        ...HomepageBenefitListContent
        ...HomepageStatListContent
        ...HomepageProductListContent
      }
    }
  }
`
