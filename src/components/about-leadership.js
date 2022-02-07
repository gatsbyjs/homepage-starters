import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, FlexList, Heading, Section, Text, Box, Kicker } from "./ui"
import { profileTextContainer, profileText } from "./about-leadership.css.ts"

function AboutProfile(props) {
  return (
    <Box width="third" padding={4} center>
      <GatsbyImage alt={props.image.alt} image={getImage(props.image)} />
      <Box className={profileTextContainer}>
        <Text bold center className={profileText}>
          {props.name}
        </Text>
        <Text center className={profileText}>
          {props.title}
        </Text>
      </Box>
    </Box>
  )
}

export default function AboutLeadership(props) {
  return (
    <Container width="tight">
      <Section>
        <Box center padding={5}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        <FlexList gutter={false} gap={0} variant="center">
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutLeadershipContent on AboutLeadership {
    id
    kicker
    heading
    subhead
    content {
      id
      name
      title
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
