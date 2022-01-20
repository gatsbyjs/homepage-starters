import { style, styleVariants } from "@vanilla-extract/css";
import { theme } from "../theme.css";

const breakpoints = ["40em", "52em", "64em"];

export const mediaQueries = {
  small: `screen and (min-width: ${breakpoints[0]})`,
  medium: `screen and (min-width: ${breakpoints[1]})`,
  large: `screen and (min-width: ${breakpoints[2]})`,
};

export const container = style({
  maxWidth: theme.sizes.container,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: theme.space[4],
  paddingRight: theme.space[4],
});

export const containers = styleVariants({
  normal: [container],
  wide: [container],
  narrow: [
    container,
    {
      maxWidth: theme.sizes.narrow,
    },
  ],
});

export const flex = style({
  display: "flex",
  alignItems: "center",
});

export const flexVariants = styleVariants({
  wrap: {
    flexWrap: "wrap",
  },
  spaceBetween: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  center: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  responsive: {
    flexDirection: "column",
    "@media": {
      [mediaQueries.small]: {
        flexDirection: "row",
      },
    },
  },
});

export const flexGap = styleVariants(theme.space, (gap) => ({ gap }));

export const widths = styleVariants(
  {
    full: "100%",
    half: "50%",
    quarter: "25%",
    third: "33.3333%",
    twothirds: "33.3333%",
  },
  (width) => [
    {
      width: "100%",
      "@media": {
        [mediaQueries.small]: {
          width,
        },
      },
    },
  ]
);

export const padding = styleVariants(theme.space, (padding) => ({ padding }));
export const paddingY = styleVariants(theme.space, (padding) => ({
  paddingTop: padding,
  paddingBottom: padding,
}));
export const radii = styleVariants(theme.radii, (borderRadius) => ({
  borderRadius,
}));
export const box = styleVariants({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const section = style({
  paddingTop: theme.space[5],
  paddingBottom: theme.space[5],
});

export const margin = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (margin) => ({ margin })
);

export const margin0 = style({ margin: 0 });

export const text = styleVariants({
  body: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[2],
      fontWeight: theme.fontWeights.normal,
      lineHeight: theme.lineHeights.text,
      letterSpacing: theme.letterSpacings.normal,
    },
  ],
  lead: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[3],
      fontWeight: theme.fontWeights.normal,
      lineHeight: theme.lineHeights.text,
      letterSpacing: theme.letterSpacings.normal,
    },
  ],
  heading: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[6],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
    },
  ],
  subhead: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[5],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
    },
  ],
  kicker: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontSize: theme.fontSizes[2],
      fontWeight: theme.fontWeights.semibold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.wide,
      textTransform: "uppercase",
    },
  ],
  serif: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontFamily: theme.fonts.serif,
      fontSize: theme.fontSizes[6],
      lineHeight: theme.lineHeights.tight,
    },
  ],
  small: [
    margin0,
    {
      fontSize: theme.fontSizes[1],
      marginBottom: theme.space[2],
    },
  ],
  center: {
    textAlign: "center",
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
});

export const navlink = style({
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    color: theme.colors.black,
  },
});

const button = style({
  display: "inline-flex",
  textDecoration: "none",
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes[2],
  lineHeight: 1,
  paddingTop: theme.space[3],
  paddingBottom: theme.space[3],
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  borderRadius: theme.radii.button,
});

export const buttons = styleVariants({
  primary: [
    button,
    {
      color: theme.colors.background,
      backgroundColor: theme.colors.primary,
      ":hover": {
        backgroundColor: theme.colors.black,
      },
      ":focus": {
        backgroundColor: theme.colors.black,
      },
    },
  ],
  reversed: [
    button,
    {
      color: theme.colors.primary,
      backgroundColor: theme.colors.background,
      ":hover": {
        color: theme.colors.background,
        backgroundColor: theme.colors.black,
      },
      ":focus": {
        color: theme.colors.background,
        backgroundColor: theme.colors.black,
      },
    },
  ],
  link: [
    button,
    {
      color: "inherit",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: theme.colors.muted,
      },
      ":focus": {
        backgroundColor: theme.colors.muted,
      },
    },
  ],
  linkReversed: [
    button,
    {
      color: "inherit",
      backgroundColor: "transparent",
      ":hover": {
        color: theme.colors.primary,
        backgroundColor: theme.colors.muted,
      },
      ":focus": {
        color: theme.colors.primary,
        backgroundColor: theme.colors.muted,
      },
    },
  ],
});

export const interactiveIcon = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
});

export const backgrounds = styleVariants({
  primary: {
    color: theme.colors.background,
    backgroundColor: theme.colors.primary,
  },
  muted: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.muted,
  },
});

export const blockquote = style([
  text.lead,
  {
    textAlign: "center",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.space[4],
    paddingBottom: theme.space[4],
  },
]);

export const avatar = style({
  width: theme.sizes.avatar,
  height: theme.sizes.avatar,
  borderRadius: theme.radii.circle,
});

export const logos = styleVariants({
  small: {
    width: "85px",
    height: "20px",
  },
  medium: {
    maxWidth: "128px",
  },
});

export const icons = styleVariants(
  {
    small: "24px",
    medium: "32px",
    large: "64px",
  },
  (size) => ({
    width: size,
    height: size,
  })
);

// for debugging only
export const debug = style({
  outline: "1px solid tomato",
});
