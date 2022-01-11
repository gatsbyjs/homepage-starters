import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { sprinkles } from '../sprinkles.css.ts'
import { className } from './hero.css.ts'

import Text from './text'
import Kicker from './kicker'
import Heading from './heading'
import Subhead from './subhead'

export default function Hero (props) {
  return (
    <section className={className}>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image)}
        />
      )}
      <Kicker as='h3'>{props.kicker}</Kicker>
      <Heading as='h1'>
        {props.heading}
      </Heading>
      <Subhead as='h2'>{props.subhead}</Subhead>
      <Text as='p'>{props.text}</Text>
      <Text as='pre' variant='mono'>{props.image.id}</Text>
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
