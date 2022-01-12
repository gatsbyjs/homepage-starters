import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { Container, Section } from './ui'

export default function HomepageCta (props) {
  return (
    <Section>
      <Container>
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
  fragment HomepageCtaContent on HomepageCta {
    id
    heading
    text
    links {
      id
      href
      text
    }
  }
`
