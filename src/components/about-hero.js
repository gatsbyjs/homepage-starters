import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Section, Text, SuperHeading } from "./ui"
import { aboutHeroHeader, aboutHeroText } from "./about-hero.css.ts"

export default function AboutHero(props) {
  return (
    <Section>
      <Container>
        <SuperHeading className={aboutHeroHeader}>{props.heading}</SuperHeading>
        {props.text && <Text className={aboutHeroText}>{props.text}</Text>}
      </Container>
      {props.image && (
        <GatsbyImage alt={props.image.alt} image={getImage(props.image)} />
      )}
    </Section>
  )
}

export const query = graphql`
  fragment AboutHeroContent on AboutHero {
    id
    heading
    text
    image {
      id
      gatsbyImageData
      alt
    }
  }
`