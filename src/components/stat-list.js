import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Container,
  Section,
  FlexList,
  Text,
  Box,
} from './ui'

function Stat (props) {
  return (
    <Box>
      <Text variant='serif'>{props.value}</Text>
      <Text>{props.label}</Text>
    </Box>
  )
}

export default function StatList (props) {
  // props.kicker
  // props.heading
  // props.text
  // props.image
  // props.icon
  return (
    <Section>
      <Container>
        <FlexList gap={5} variant='center'>
          {props.content.map(stat => (
            <li key={stat.id}>
              <Stat {...stat} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageStatListContent on HomepageStatList {
    id
    kicker
    heading
    text
    image {
      id
      gatsbyImageData
    }
    icon {
      id
      gatsbyImageData
    }
    content {
      id
      value
      label
      heading
    }
  }
`
