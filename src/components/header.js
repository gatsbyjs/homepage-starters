import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function Header (props) {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          logo {
            id
            gatsbyImageData
          }
          links {
            id
            href
            text
          }
          cta {
            id
            href
            text
          }
        }
      }
    }
  `)

  const {
    logo,
    links,
    cta,
  } = data.layout.header

  return (
    <header>
      {logo && (
        <GatsbyImage
          image={getImage(logo)}
        />
      )}
      <nav>
        <ul>
          {links && links.map(link => (
            <li key={link.id}>
              <Link to={link.href}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          {cta && (
            <Link
              to={cta.href}>
              {cta.text}
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
