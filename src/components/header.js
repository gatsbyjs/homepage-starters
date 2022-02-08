import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLinkList,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css.ts"
import NavLinkGroup from "./nav-link-group"
import BrandLogo from "./brand-logo"

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          links {
            ... on ContentfulHomepageLink {
              id
              href
              text
              internal {
                type
              }
            }
            ... on ContentfulHomepageLinkGroup {
              id
              name
              links {
                id
                href
                text
                description
                icon {
                  alt
                  gatsbyImageData
                }
                iconAlternative {
                  alt
                  gatsbyImageData
                }
                internal {
                  type
                }
              }
            }
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

  const { links, cta } = data.layout.header

  const [isOpen, setOpen] = React.useState(false)

  const isLinkGroup = React.useCallback((link) => {
    return !!link.name
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        {/* Desktop / Tablet - Header / Nav */}
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {links &&
                links.map((link) => (
                  <li key={link.id}>
                    {!isLinkGroup(link) ? (
                      <NavLink to={link.href}>{link.text}</NavLink>
                    ) : (
                      <NavLinkGroup name={link.name} links={link.links} />
                    )}
                  </li>
                ))}
            </FlexList>
          </nav>
          {/* <Space /> */}
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      {/* Mobile - Header / Nav */}
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <BrandLogo />
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <InteractiveIcon
              title="Toggle menu"
              onClick={() => setOpen(!isOpen)}
              className={
                mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
              }
            >
              {isOpen ? <X /> : <Menu />}
            </InteractiveIcon>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList
              variant="responsive"
              gap="4"
              className={mobileNavLinkList}
            >
              {links &&
                links.map((link) => (
                  <li key={link.id} className={mobileNavLink}>
                    {!isLinkGroup(link) ? (
                      <NavLink to={link.href}>{link.text}</NavLink>
                    ) : (
                      <NavLinkGroup name={link.name} links={link.links} />
                    )}
                  </li>
                ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
