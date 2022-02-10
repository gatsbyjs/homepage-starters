import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"
import { mediaQueries } from "./ui.css"
import { mobileNavLink } from "./header.css"

export const navGroupWrapper = style({
  position: "relative",
})

export const navGroupTitle = style([
  mobileNavLink,
  {
    "@media": {
      [mediaQueries.small]: {
        padding: 0,
        alignItems: "baseline",
        color: "inherit",
        fontSize: "inherit",
      },
    },
  },
])

export const navGroupTitleInner = style({
  "@media": {
    [mediaQueries.small]: {
      alignItems: "baseline",
    },
  },
})

const navLinkListWrapperBase = style({
  position: "relative",
  whiteSpace: "nowrap",
  width: "fit-content",
  "@media": {
    [mediaQueries.small]: {
      position: "absolute",
      background: theme.colors.background,
      padding: `${theme.space[3]} ${theme.space[3]} ${theme.space[0]} ${theme.space[3]}`,
      top: "calc(100% + 20px)",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: theme.radii.large,
      minWidth: theme.sizes.navGroupBoxMin,
      maxWidth: theme.sizes.navGroupBoxMax,
      boxShadow:
        "0px 4px 8px 0px #2E29330A, 0px 4px 24px 0px #2E293314, 0px 8px 24px 0px #473F4F29",
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
          borderColor: `transparent transparent ${theme.colors.background} transparent`,
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
  paddingBottom: theme.space[3],
  "@media": {
    [mediaQueries.small]: {
      paddingLeft: 0,
      alignItems: "stretch",
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

export const navLinkListLink = style([
  mobileNavLink,
  {
    "@media": {
      [mediaQueries.small]: {
        padding: `${theme.space[2]} ${theme.space[3]} ${theme.space[3]} ${theme.space[2]}`,
        margin: 0,
        color: "inherit",
        fontSize: theme.fontSizes[2],
        fontWeight: theme.fontWeights.bold,
        borderRadius: theme.radii.button,
        ":hover": {
          background: theme.colors.muted,
        },
      },
    },
  },
])

export const navLinkDescription = style({
  display: "none",
  whiteSpace: "normal",
  "@media": {
    [mediaQueries.small]: {
      display: "block",
      fontSize: theme.fontSizes[1],
      margin: 0,
      minWidth: "300px",
    },
  },
})

export const navLinkTitle = style({
  margin: 0,
  padding: 0,
})
