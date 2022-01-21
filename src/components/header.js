import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Container,
  Flex,
  FlexList,
  Space,
  Link,
  NavLink,
  Button,
  Logo,
  InteractiveIcon,
  Padding,
} from "./ui";
import {
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
} from "./header.css.ts";
import Close from "./close";
import Hamburger from "./hamburger";
import {
  mobileNavOverlay,
  mobileNavLinkList,
  mobileNavLink,
} from "./header.css.ts";
import { GatsbyWordpressLogo } from "./logos";

export default function Header(props) {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
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
  `);

  const { links, cta } = data.layout.header;

  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isOpen]);

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        {/* Desktop / Tablet - Header / Nav */}
        <Padding size={2} />
        <Flex>
          <GatsbyWordpressLogo />
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
      {/* Mobile - Header / Nav */}
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Padding size={2} />
        <Flex variant="spaceBetween">
          <GatsbyWordpressLogo inverted={isOpen} />
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <InteractiveIcon onClick={() => setOpen(!isOpen)}>
              {isOpen ? <Close /> : <Hamburger />}
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
                    <NavLink to={link.href}>{link.text}</NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  );
}
