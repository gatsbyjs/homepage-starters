import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container, Section } from './ui'

export default function Feature (props) {
  return (
    <Section>
      <Container>
        {props.image && (
          <GatsbyImage
            alt={props.image.alt}
            image={getImage(props.image)}
          />
        )}
        <h3>{props.kicker}</h3>
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
        <ul>
          {props.links.map(link => (
            <li key={link.id}>
              <Link to={link.href}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureContent on HomepageFeature {
    id
    kicker
    heading
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
