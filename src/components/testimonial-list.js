import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Container,
  Section,
  Heading,
  Kicker,
  Flex,
  Box,
  FlexList,
  Blockquote,
  Text,
  Avatar,
} from './ui'

function Testimonial (props) {
  return (
    <Blockquote>
      <p>
        {props.quote}
      </p>
      <Text as='figcaption'>
        {props.avatar && (
          <Avatar
            alt={props.avatar.alt}
            image={props.avatar}
          />
        )}
        <Box>
          <Text as='cite' variant='caps'>
            {props.source}
          </Text>
        </Box>
      </Text>
    </Blockquote>
  )
}

export default function TestimonialList (props) {
  return (
    <Section>
      <Container>
        <Box center>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading>{props.heading}</Heading>}
        </Box>
        <FlexList gutter={3} variant='start' responsive wrap>
          {props.content.map(testimonial => (
            <Box as='li' key={testimonial.id} width='half' padding={3}>
              <Testimonial {...testimonial} />
            </Box>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageTestimonialListContent on HomepageTestimonialList {
    id
    kicker
    heading
    content {
      id
      quote
      source
      avatar {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
