import { style, globalStyle } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"

export const blogPost = style({})

globalStyle(`${blogPost} img`, {
  maxWidth: "100%",
  height: "auto",
})
