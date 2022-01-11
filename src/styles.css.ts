import {
  createTheme,
  style,
  createGlobalTheme,
  globalStyle,
} from '@vanilla-extract/css'

const colors = {
  background: '#fff',
  primary: '#004ca3',
  muted: '#f5fcff'
}

colors.text = colors.primary

const space = {
  0: 0,
  1: '4px',
  2: '8px',
  3: '16px',
  4: '32px',
  5: '64px',
  6: '128px',
}

const fontSizes = {
  0: '12px',
  1: '14px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '48px',
}

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const fonts = {
  text: '"DM Sans", sans-serif',
  heading: '"DM Sans", sans-serif',
  mono: 'Menlo, monospace',
}

const lineHeights = {
  text: 1.65,
  heading: 1.25,
  tight: 1.1,
}

const letterSpacings = {
  normal: 0,
  tight: '-0.02em',
  wide: '0.08em',
}

const sizes = {
  container: '1280px',
}

globalStyle('body', {
  margin: 0,
  fontFamily: fonts.text,
  color: colors.text,
})

export const theme = createGlobalTheme(':root', {
  colors,
  space,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  letterSpacings,
  sizes,
})
