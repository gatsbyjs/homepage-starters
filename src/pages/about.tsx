import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  getSectionComponentAndProps,
  HomepageBlock,
} from "../components/sections"

interface AboutProps {
  data: {
    aboutPage: {
      id: string
      title: string
      description: string
      image: { id: string; url: string }
      blocks: HomepageBlock[]
    }
  }
}

export default function About(props: AboutProps) {
  const { aboutPage } = props.data

  return (
    <Layout {...aboutPage}>
      {aboutPage.blocks.map((block) => {
        const { Component, props } = getSectionComponentAndProps(block)
        return <Component key={block.id} {...props} />
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    aboutPage {
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
        ...AboutHeroContent
        ...AboutStatListContent
        ...HomepageProductListContent
        ...AboutLeadershipContent
        ...HomepageBenefitListContent
        ...AboutLogoListContent
        ...HomepageCtaContent
      }
    }
  }
`
