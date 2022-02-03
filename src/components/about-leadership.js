import * as React from "react"
import { graphql } from "gatsby"
import { Container, FlexList, Heading, Section, Text } from "./ui"
import AboutProfile from "./about-profile"

export default function AboutLeadership(props) {
  return (
    <Container>
      <Section>
        <Heading as="h1">{props.heading}</Heading>
        <Text>{props.subhead}</Text>
        <FlexList>
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutLeadershipContent on AboutLeadership {
    id
    heading
    subhead
    content {
      id
      name
      title
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
