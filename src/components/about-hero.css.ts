import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

export const aboutHeroHeader = style({
  maxWidth: "1108px",
})

export const aboutHeroText = style({
  fontSize: theme.fontSizes[4],
  marginBottom: theme.space[6],
  maxWidth: "798px",
})
