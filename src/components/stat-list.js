import * as React from 'react'
import { graphql } from 'gatsby'
import { Container, Section, FlexList } from './ui'

function Stat (props) {
  return (
    <div>
      <div>{props.value}</div>
      <div>{props.label}</div>
    </div>
  )
}

export default function StatList (props) {
  return (
    <Section>
      <Container>
        <FlexList>
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
