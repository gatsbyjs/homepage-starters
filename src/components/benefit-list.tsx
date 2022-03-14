import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
  HomepageImage,
} from "./ui"
import { FlexVariants, IconSizes, TextVariants, Widths } from "./ui.css"

interface BenefitProps {
  id: string
  image?: HomepageImage
  heading: string
  text: string
}

function Benefit(props: BenefitProps) {
  return (
    <Box as="li" width={Widths.Third} padding={4} paddingY={3}>
      {props.image && (
        <Icon
          alt={props.image.alt}
          image={props.image.gatsbyImageData}
          size={IconSizes.Small}
        />
      )}
      <Space size={2} />
      <Heading variant={TextVariants.SubheadSmall}>{props.heading}</Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

export interface BenefitListProps {
  heading?: string
  text?: string
  content: BenefitProps[]
}

export default function BenefitList(props: BenefitListProps) {
  return (
    <Section>
      <Container>
        <Box center>
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && <Text variant={TextVariants.Lead}>{props.text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant={FlexVariants.Start} responsive wrap>
          {props.content.map((benefit) => (
            <Benefit key={benefit.id} {...benefit} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageBenefitListContent on HomepageBenefitList {
    id
    heading
    text
    content {
      id
      heading
      text
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
