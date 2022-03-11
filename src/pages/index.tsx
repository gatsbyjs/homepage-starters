import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import sections, { Blocktypes, HomepageBlock } from "../components/sections"

function getComponentByBlocktype(blocktype: Blocktypes) {
  const Component = sections[blocktype]
  if (Component) {
    return Component
  } else {
    console.warn(`No component found for: ${blocktype}`)
    return null
  }
}

interface HomepageProps {
  data: {
    homepage: {
      id: string
      title: string
      description: string
      image: { url: string }
      blocks: HomepageBlock[]
    }
  }
}

export default function Homepage(props: HomepageProps) {
  const { homepage } = props.data

  console.log("sections: ", homepage)

  return (
    <Layout {...homepage}>
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...blockProps } = block
        const Component = getComponentByBlocktype(blocktype) //sections[block.blocktype] || Fallback
        return (
          <React.Fragment key={block.id}>
            <Component {...blockProps} />
          </React.Fragment>
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
