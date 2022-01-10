import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

function Logo (props) {
  if (!props.image) return false

  return (
    <GatsbyImage
      alt={props.alt}
      image={getImage(props.image)}
    />
  )
}

export default function LogoList (props) {
  return (
    <section>
      <ul>
        {props.logos.map(logo => (
          <li key={logo.id}>
            <Logo {...logo} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export const query = graphql`
  fragment HomepageLogoListContent on HomepageLogoList {
    id
    logos {
      id
      alt
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
