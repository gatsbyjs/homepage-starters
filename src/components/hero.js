import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Container,
  Section,
  Text,
  Heading,
  Subhead,
  Kicker,
  Flex,
  ButtonList,
} from './ui'

export default function Hero (props) {
  return (
    <Section>
      <Container>
        <Flex>
          <div>
            {props.image && (
              <GatsbyImage
                alt={props.image.alt}
                image={getImage(props.image)}
              />
            )}
          </div>
          <div>
            <Kicker as='h3'>{props.kicker}</Kicker>
            <Heading as='h1'>
              {props.heading}
            </Heading>
            <Subhead as='h2'>{props.subhead}</Subhead>
            <Text as='p'>{props.text}</Text>
            <ButtonList links={props.links} />
          </div>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    id
    kicker
    heading
    subhead
    text
    links {
      id
      href
      text
    }
    image {
      id
      gatsbyImageData
      alt
    }
  }
`
