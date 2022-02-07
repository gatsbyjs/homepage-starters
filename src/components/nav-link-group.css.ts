import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"
import { mediaQueries } from "./ui.css"
export const navGroupWrapper = style({
  position: "relative",
})
export const navLinkListWrapper = style({
  position: "relative",
  whiteSpace: "nowrap",
  width: "fit-content",
  "@media": {
    [mediaQueries.small]: {
      position: "absolute",
      background: theme.colors.muted,
      padding: theme.space[4],
      top: "calc(100% + 20px)",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: theme.radii.large,
      minWidth: theme.sizes.navGroupBox,
    },
  },
})

export const navIcon = style({
  display: "none",
  flexShrink: 0,
  width: theme.sizes.navIconSmall,
  height: theme.sizes.navIconSmall,
  "@media": {
    [mediaQueries.small]: {
      display: "block",
    },
  },
})

export const navIconAlternative = style({
  flexShrink: 0,
  width: theme.sizes.navIcon,
  height: theme.sizes.navIcon,
  "@media": {
    [mediaQueries.small]: {
      display: "none",
    },
  },
})

export const navLinkDescription = style({
  display: "none",
  whiteSpace: "normal",
  "@media": {
    [mediaQueries.small]: {
      display: "block",
      fontSize: theme.fontSizes[1],
    },
  },
})
