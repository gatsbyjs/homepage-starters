import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container, Section, FlexList, Box } from './ui'

function Benefit (props) {
  return (
    <Box as='li'>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image)}
        />
      )}
      <h2>{props.heading}</h2>
      <p>{props.text}</p>
    </Box>
  )
}

export default function BenefitList (props) {
  return (
    <Section>
      <Container>
        <FlexList variant='responsive'>
          {props.content.map(benefit => (
            <Benefit
              key={benefit.id}
              {...benefit}
            />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageBenefitListContent on HomepageBenefitList {
    id
    content {
      id
      heading
      text
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
