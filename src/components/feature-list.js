import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Container,
  Section,
  Kicker,
  Heading,
  Text,
} from './ui'
import Feature from './feature'

export default function FeatureList (props) {
  return (
    <Section>
      <Container width='narrow'>
        {props.kicker && <Kicker>{props.kicker}</Kicker>}
        {props.heading && <Heading>{props.heading}</Heading>}
        {props.text && <Text>{props.text}</Text>}
        {props.content.map(feature => (
          <Feature key={feature.id} {...feature} />
        ))}
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureListContent on HomepageFeatureList {
    id
    kicker
    heading
    text
    content {
      id
      ...HomepageFeatureContent
    }
  }
`
