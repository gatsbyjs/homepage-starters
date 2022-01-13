import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Container, Section, FlexList } from './ui'
import * as styles from './logo-list.css.ts'


function Logo (props) {
  if (!props.image) return false

  return (
    <GatsbyImage
      alt={props.alt}
      image={getImage(props.image)}
      className={styles.logo}
    />
  )
}

export default function LogoList (props) {
  return (
    <Section>
      <Container>
        <FlexList variant='spaceBetween'>
          {props.logos.map(logo => logo && (
            <li key={logo.id}>
              <Logo {...logo} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
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
