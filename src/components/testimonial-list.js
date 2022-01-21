import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, Box, List, Blockquote, Text, Avatar } from "./ui"

function Testimonial(props) {
  return (
    <Blockquote>
      <p>{props.quote}</p>
      <Text as="figcaption">
        {props.avatar && <Avatar alt={props.avatar.alt} image={props.avatar} />}
        <Box>
          <cite>{props.source}</cite>
        </Box>
      </Text>
    </Blockquote>
  )
}

export default function TestimonialList(props) {
  return (
    <Section>
      <Container>
        <List>
          {props.content.map((testimonial) => (
            <li key={testimonial.id}>
              <Testimonial {...testimonial} />
            </li>
          ))}
        </List>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageTestimonialListContent on HomepageTestimonialList {
    id
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
