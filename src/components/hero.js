import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { sprinkles } from '../sprinkles.css.ts'
import { className } from './hero.css.ts'

export default function Hero (props) {
  return (
    <section className={className}>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image)}
        />
      )}
      <h3>{props.kicker}</h3>
      <h1
        className={sprinkles({
          fontSize: 5,
        })}>
        {props.heading}
      </h1>
      <h2>{props.subhead}</h2>
      <p>{props.text}</p>
      <pre>{props.image.id}</pre>
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
  fragment HomepageHeroContent on HomepageHero {
    id
    kicker
    heading
    subhead
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
