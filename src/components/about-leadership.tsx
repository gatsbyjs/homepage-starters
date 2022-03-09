import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
  HomepageImage,
} from "./ui"
import { Containers, FlexVariants, TextVariants, Widths } from "./ui.css.ts"

interface AboutProfileProps {
  id: string
  image?: HomepageImage
  name?: string
  jobTitle?: string
}

function AboutProfile(props: AboutProfileProps) {
  return (
    <Box width={Widths.Third} padding={4} center>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image.gatsbyImageData)}
        />
      )}
      <Space size={3} />
      <Box>
        {props.name && (
          <Text variant={TextVariants.Medium} bold center>
            {props.name}
          </Text>
        )}
        {props.jobTitle && (
          <Text variant={TextVariants.Medium} center>
            {props.jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  )
}

interface AboutLeadershipProps {
  kicker?: string
  heading?: string
  subhead?: string
  content: AboutProfileProps[]
}

export default function AboutLeadership(props: AboutLeadershipProps) {
  return (
    <Section>
      <Container width={Containers.Tight}>
        <Box center paddingY={4}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        <FlexList
          gutter={false}
          gap={0}
          variant={FlexVariants.Center}
          alignItems={FlexVariants.Start}
        >
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
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
      jobTitle
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
