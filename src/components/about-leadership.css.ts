import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

export const profileTextContainer = style({
  height: theme.space[5],
  marginTop: theme.space[3],
})

export const profileText = style({
  fontSize: theme.fontSizes[3],
  margin: 0,
})
