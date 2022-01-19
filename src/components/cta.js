import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Container,
  Section,
  Heading,
  Text,
  Box,
  ButtonList,
} from './ui'

export default function HomepageCta (props) {
  return (
    <Section>
      <Container>
        <Box
          padding={5}
          radius='button'
          background='primary'>
          <Heading center>{props.heading}</Heading>
          <Text as='p' center variant='lead'>{props.text}</Text>
          <ButtonList
            links={props.links}
            variant='center'
            reversed
          />
          {props.image && (
            <GatsbyImage
              alt={props.image.alt}
              image={getImage(props.image)}
            />
          )}
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
    image {
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
