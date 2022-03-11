import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
  HomepageLink,
  HomepageImage,
} from "./ui"
import { Backgrounds, Containers, TextVariants, FlexVariants } from "./ui.css"
import { Radii } from "../theme.css"

interface HomepageCtaProps {
  id: string
  kicker?: string
  heading: string
  text: string
  links: HomepageLink[]
  image?: HomepageImage
}

export default function HomepageCta(props: HomepageCtaProps) {
  return (
    <Container width={Containers.Fullbleed}>
      <Section
        padding={5}
        radius={Radii.Large}
        background={Backgrounds.Primary}
      >
        <Heading center>
          {props.kicker && <Kicker center>{props.kicker}</Kicker>}
          {props.heading}
        </Heading>
        <Text as="p" center variant={TextVariants.Lead}>
          {props.text}
        </Text>
        <ButtonList
          links={props.links}
          variant={FlexVariants.Center}
          reversed
        />
        {props.image && (
          <Nudge left={5} right={5} bottom={5}>
            <GatsbyImage
              alt={props.image.alt}
              image={getImage(props.image.gatsbyImageData)}
            />
          </Nudge>
        )}
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    kicker
    heading
    text
    image {
      alt
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }
`
