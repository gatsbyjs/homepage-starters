import * as React from "react"
import { graphql } from "gatsby"
import { Container, CTALink, Heading, FlexList } from "./ui"
import { LogoItem } from "./logo-list"

export default function AboutLogoList(props) {
  return (
    <Container>
      <Heading as="h1">{props.heading}</Heading>
      <CTALink href={props.link.href}>{props.link.text}</CTALink>
      <FlexList gap={5} variant="center">
        {props.logos.map(
          (logo) =>
            logo && (
              <li key={logo.id}>
                <LogoItem {...logo} />
              </li>
            )
        )}
      </FlexList>
    </Container>
  )
}

export const query = graphql`
  fragment AboutLogoListContent on AboutLogoList {
    id
    heading
    link {
      href
      text
    }
    logos {
      id
      alt
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
