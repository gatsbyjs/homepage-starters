import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Flex,
  FlexList,
  Space,
  Link,
  NavLink,
  Button,
  Logo,
} from "./ui"

export default function Header(props) {
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

  const { logo, links, cta } = data.layout.header

  return (
    <header>
      <Container>
        <Space size={3} />
        <Flex>
          {logo && <Logo image={logo} />}
          <nav>
            <FlexList>
              {links &&
                links.map((link) => (
                  <li key={link.id}>
                    <NavLink to={link.href}>{link.text}</NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
          <Space />
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
    </header>
  )
}
