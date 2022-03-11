import * as React from "react"
import { graphql } from "gatsby"
import { Container, Box, Kicker, Heading, Text } from "./ui"
import Feature, { FeatureProps } from "./feature"
import { Backgrounds, Containers } from "./ui.css"
import { Radii } from "../theme.css"

interface FeatureListProps {
  kicker?: string
  heading: string
  text?: string
  content: FeatureProps[]
}

export default function FeatureList(props: FeatureListProps) {
  return (
    <Container width={Containers.Fullbleed}>
      <Box background={Backgrounds.Muted} radius={Radii.Large}>
        <Box center paddingY={5}>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          {props.text && <Text>{props.text}</Text>}
        </Box>
        {props.content.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageFeatureListContent on HomepageFeatureList {
    id
    kicker
    heading
    text
    content {
      id
      ...HomepageFeatureContent
    }
  }
`
