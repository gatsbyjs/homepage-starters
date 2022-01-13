import * as React from 'react'
import { graphql, Link } from 'gatsby'
import {
  Container,
  Section,
  Box,
  ButtonList,
} from './ui'

export default function HomepageCta (props) {
  return (
    <Section>
      <Container>
        <Box
          padding={4}
          radius='button'
          background='primary'>
          <h2>{props.heading}</h2>
          <p>{props.text}</p>
          <ButtonList
            links={props.links}
            reversed
          />
        </Box>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    heading
    text
    links {
      id
      href
      text
    }
  }
`
