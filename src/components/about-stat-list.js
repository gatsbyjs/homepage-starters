import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, FlexList } from "./ui"
import { Stat } from "./stat-list"

export default function AboutStatList(props) {
  return (
    <Container variant="narrow">
      <Section>
        <FlexList gap={5}>
          {props.content.map((stat) => (
            <Stat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutStatListContent on AboutStatList {
    id
    content {
      id
      value
      label
    }
  }
`
