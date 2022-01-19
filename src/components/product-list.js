import * as React from 'react'
import { graphql } from 'gatsby'
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

function Product (props) {
  return (
    <Box>
      <Heading>{props.heading}</Heading>
      <Text>{props.text}</Text>
      <ButtonList links={props.links} />
    </Box>
  )
}

export default function ProductList (props) {
  return (
    <Section>
      <Container>
        <Box>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && <Text>{props.text}</Text>}
          <FlexList gap={5} variant='center'>
            {props.content.map(product => (
              <li key={product.id}>
                <Product {...product} />
              </li>
            ))}
          </FlexList>
        </Box>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageProductListContent on HomepageProductList {
    id
    kicker
    heading
    text
    content {
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
  }
`
