import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"
import { mediaQueries } from "./ui.css"
export const navGroupWrapper = style({
  position: "relative",
})
const navLinkListWrapperBase = style({
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
      selectors: {
        "&::before": {
          content: "",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(calc(-100% + 2px))",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 14px 17.3px 14px",
          borderColor: `transparent transparent ${theme.colors.muted} transparent`,
        },
      },
    },
  },
})

export const navLinkListWrapper = styleVariants({
  opened: [
    navLinkListWrapperBase,
    {
      "@media": {
        [mediaQueries.small]: {
          animation: "zoomInUp 0.15s ease-in-out",
        },
      },
    },
  ],
  closed: [
    navLinkListWrapperBase,
    {
      "@media": {
        [mediaQueries.small]: {
          animation: "zoomOutDown 0.15s ease-in-out",
          animationFillMode: "forwards",
        },
      },
    },
  ],
})

export const navLinkListWrapperInner = style({
  paddingLeft: theme.space[4],
  "@media": {
    [mediaQueries.small]: {
      paddingLeft: 0,
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
      margin: 0,
    },
  },
})
