import { style, globalStyle } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"

export const blogPost = style({
  fontSize: theme.fontSizes[3],
})

globalStyle(`${blogPost} img`, {
  maxWidth: "100%",
  height: "auto",
})

globalStyle(`${blogPost} a`, {
  color: "inherit",
  fontWeight: theme.fontWeights.medium,
})

globalStyle(`${blogPost} p`, {
  lineHeight: theme.lineHeights.text,
})

globalStyle(`${blogPost} > p:first-of-type`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h2`, {
  fontSize: theme.fontSizes[5],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h3`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h4`, {
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h5, ${blogPost} h6`, {
  fontSize: theme.fontSizes[2],
  fontWeight: theme.fontWeights.bold,
})
