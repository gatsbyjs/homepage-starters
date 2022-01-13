import * as React from 'react'
import { graphql } from 'gatsby'
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
} from './ui'

function Benefit (props) {
  return (
    <Box as='li' center>
      {props.image && (
        <Icon
          alt={props.image.alt}
          image={props.image}
          size='large'
        />
      )}
      <Space size={2} />
      <Heading variant='subhead'>{props.heading}</Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

export default function BenefitList (props) {
  return (
    <Section>
      <Container>
        <FlexList variant='responsive'>
          {props.content.map(benefit => (
            <Benefit
              key={benefit.id}
              {...benefit}
            />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageBenefitListContent on HomepageBenefitList {
    id
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
