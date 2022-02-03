import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Text } from "./ui"

export default function AboutProfile(props) {
  return (
    <Box>
      <GatsbyImage alt={props.image.alt} image={getImage(props.image)} />
      <Text>{props.name}</Text>
      <Text>{props.title}</Text>
    </Box>
  )
}
