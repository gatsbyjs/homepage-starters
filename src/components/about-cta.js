import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, Heading, Text, ButtonList } from "./ui"

export default function AboutCta(props) {
  return (
    <Container>
      <Section padding={5} radius="large" background="primary">
        <Heading center>{props.heading}</Heading>
        <Text as="p" center variant="lead">
          {props.text}
        </Text>
        <ButtonList links={props.links} variant="center" reversed />
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutCtaContent on AboutCta {
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
