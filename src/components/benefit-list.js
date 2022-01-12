import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container, Section, FlexList } from './ui'

function Benefit (props) {
  return (
    <div>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image)}
        />
      )}
      <h2>{props.heading}</h2>
      <p>{props.text}</p>
    </div>
  )
}

export default function BenefitList (props) {
  return (
    <Section>
      <Container>
        <FlexList>
          {props.content.map(benefit => (
            <li key={benefit.id}>
              <Benefit {...benefit} />
            </li>
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
