import * as React from 'react'
import { graphql, Link } from 'gatsby'

export default function Feature (props) {
  return (
    <section>
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
    </section>
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
    }
  }
`
