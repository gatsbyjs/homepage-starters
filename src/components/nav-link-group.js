import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Flex, FlexList, NavButtonLink, NavLink, Text } from "./ui"
import Caret from "./caret"
import {
  navIcon,
  navIconAlternative,
  navGroupWrapper,
  navLinkListWrapper,
  navLinkDescription,
} from "./nav-link-group.css"

export default function NavLinkGroup({ name, links }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const popupBox = React.forwardRef(null)
  const onGroupButtonClick = () => {
    setIsOpen((opened) => !opened)
  }
  const mountedStyle = {
    animation: "zoomInUp 0.15s ease-in-out",
  }
  const unmountedStyle = {
    animation: "zoomOutDown 0.15s ease-in-out",
    animationFillMode: "forwards",
  }

  React.useEffect(() => {
    const animatedBox = document.querySelector(`.${navLinkListWrapper}`)
    const onAnimationEnd = () => {
      console.log("Animation ended")
    }
    console.log(`.${navLinkListWrapper}`)
    if (popupBox.value) {
      console.log(popupBox.value)
      popupBox.value.addEventListener("animationend", onAnimationEnd)
      return () => {
        popupBox.value.removeEventListener("animationend", onAnimationEnd)
      }
    }
  }, [])

  return (
    <Flex variant="columnStart" gap="4" className={navGroupWrapper}>
      <NavButtonLink onClick={onGroupButtonClick}>
        <Flex gap={1} variant="baseline">
          {name}
          <Caret direction={isOpen ? "up" : "down"} />
        </Flex>
      </NavButtonLink>
      {isOpen && (
        <Box
          className={navLinkListWrapper}
          style={isOpen ? mountedStyle : unmountedStyle}
        >
          <FlexList variant="columnStart" gap={4}>
            {links.map((link) => (
              <li key={link.id}>
                <NavLink to={link.href}>
                  <Flex gap={3}>
                    {link.icon && (
                      <GatsbyImage
                        alt={link.icon.alt}
                        image={getImage(link.icon)}
                        className={navIcon}
                      />
                    )}
                    {link.iconAlternative && (
                      <GatsbyImage
                        alt={link.iconAlternative.alt}
                        image={getImage(link.iconAlternative)}
                        className={navIconAlternative}
                      />
                    )}
                    <Flex variant="columnStart" gap={1}>
                      {link.text}
                      {/* {link.description && <Text>{link.description}</Text>} */}
                      <Box className={navLinkDescription}>
                        akfjkajhk askfjh akjsfh jkah fk aksjfhjkah kfjhakjhf
                        akhka jhfa
                      </Box>
                    </Flex>
                  </Flex>
                </NavLink>
              </li>
            ))}
          </FlexList>
        </Box>
      )}
    </Flex>
  )
}
