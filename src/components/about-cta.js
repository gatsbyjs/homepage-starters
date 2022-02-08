import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Box,
  Kicker,
} from "./ui"

export default function AboutCta(props) {
  return (
    <Container>
      <Section padding={5} radius="large" background="primary">
        <Box center paddingY={4}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && (
            <Text as="p" variant="lead">
              {props.text}
            </Text>
          )}
        </Box>
        <ButtonList links={props.links} variant="center" reversed />
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutCtaContent on AboutCta {
    id
    kicker
    heading
    text
    links {
      id
      href
      text
    }
  }
`
