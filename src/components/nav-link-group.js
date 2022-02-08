import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Flex, FlexList, NavButtonLink, NavLink } from "./ui"
import Caret from "./caret"
import {
  navIcon,
  navIconAlternative,
  navGroupWrapper,
  navLinkListWrapper,
  navLinkListWrapperInner,
  navLinkDescription,
} from "./nav-link-group.css"
import { mediaQueries } from "./ui.css"

export default function NavLinkGroup({ name, links }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [popupVisible, setPopupVisible] = React.useState(false)
  const isSmallScreen = () => {
    return !window.matchMedia(mediaQueries.small).matches
  }
  const onGroupButtonClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setPopupVisible(true)
    } else {
      // ensures that sub-menu closes when no animation is available
      if (isSmallScreen()) {
        setIsOpen(false)
      }
      setPopupVisible(false)
    }
  }

  React.useEffect(() => {
    // crude implementation of animating the popup without a library
    const popupBox = document.querySelector(`[data-id="${name}-popup-box"]`)
    const onAnimationEnd = ({ animationName }) => {
      if (animationName === `zoomOutDown`) {
        setIsOpen(false)
      }
    }
    if (popupBox) {
      popupBox.addEventListener("animationend", onAnimationEnd)
      return () => {
        popupBox.removeEventListener("animationend", onAnimationEnd)
      }
    }
  }, [isOpen, name])

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
          data-id={`${name}-popup-box`}
          className={navLinkListWrapper[popupVisible ? "opened" : "closed"]}
        >
          <FlexList
            variant="columnStart"
            gap={4}
            className={navLinkListWrapperInner}
          >
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
                      <Box>{link.text}</Box>
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
