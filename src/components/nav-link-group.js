import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Flex, FlexList, NavButtonLink, NavLink } from "./ui"
import Caret from "./caret"

export default function NavLinkGroup({ name, links }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const onGroupButtonClick = () => {
    console.log("asfas")
    setIsOpen((opened) => !opened)
  }
  return (
    <Box>
      <NavButtonLink onClick={onGroupButtonClick}>
        <Flex gap={1} variant="baseline">
          {name}
          <Caret direction={isOpen ? "up" : "down"} />
        </Flex>
      </NavButtonLink>
      <FlexList variant="columnStart">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink to={link.href}>
              <Flex>
                {link.iconAlternative && (
                  <GatsbyImage
                    alt={link.iconAlternative.alt}
                    image={getImage(link.iconAlternative)}
                  />
                )}
                {link.text}
              </Flex>
            </NavLink>
          </li>
        ))}
      </FlexList>
    </Box>
  )
}
