import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  Link,
} from './ui'

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
      <Container>
        <Space size={3} />
        <Flex>
          {logo && (
            <GatsbyImage
              image={getImage(logo)}
            />
          )}
          <nav>
            <FlexList>
              {links && links.map(link => (
                <li key={link.id}>
                  <NavLink to={link.href}>
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </FlexList>
          </nav>
          <Space />
          <div>
            {cta && (
              <Button
                to={cta.href}>
                {cta.text}
              </Button>
            )}
          </div>
        </Flex>
      </Container>
    </header>
  )
}
