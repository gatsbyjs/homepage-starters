import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"

export const statHeader = style({
  fontFamily: theme.fonts.mono,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.tight,
  fontSize: theme.fontSizes[6],
  margin: 0,
})

export const statKicker = style({
  fontSize: theme.fontSizes[3],
  lineHeight: theme.lineHeights.text,
  fontWeight: theme.fontWeights.bold,
})
