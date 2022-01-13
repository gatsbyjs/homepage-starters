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
    content {
      id
      value
      label
      heading
    }
  }
`
