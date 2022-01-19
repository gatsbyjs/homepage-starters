import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Container,
  Section,
} from './ui'
import Feature from './feature'

export default function FeatureList (props) {
  return (
    <Section>
      <Container width='narrow'>
        <pre>TODO</pre>
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
