import * as React from "react"
import { graphql, Link } from "gatsby"
import { Container, Section, Heading, Text, Box, Space, ButtonList } from "./ui"

export default function HomepageCta(props) {
  return (
    <Section>
      <Container>
        <Box padding={5} radius="button" background="primary">
          <Heading center>{props.heading}</Heading>
          <Text as="p" center variant="lead">
            {props.text}
          </Text>
          <ButtonList links={props.links} variant="center" reversed />
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
