import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Box,
  Icon,
  ButtonList,
} from './ui'

function Stat (props) {
  return (
    <Box>
      <Text variant='serif'>{props.value}</Text>
      <Text>{props.label}</Text>
    </Box>
  )
}

export default function StatList (props) {
  return (
    <Section>
      <Container>
        <Box>
          {props.icon && <Icon {...props.icon} />}
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && <Text>{props.text}</Text>}
          <FlexList gap={5} variant='center'>
            {props.content.map(stat => (
              <li key={stat.id}>
                <Stat {...stat} />
              </li>
            ))}
          </FlexList>
        </Box>
        {props.image && (
          <GatsbyImage
            alt={props.image.alt}
            image={getImage(props.image)}
          />
        )}
        <ButtonList links={props.links} />
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageStatListContent on HomepageStatList {
    id
    kicker
    heading
    text
    image {
      id
      gatsbyImageData
    }
    icon {
      id
      gatsbyImageData
    }
    content {
      id
      value
      label
      heading
    }
    links {
      id
      href
      text
    }
  }
`
