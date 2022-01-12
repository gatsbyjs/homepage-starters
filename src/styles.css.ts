import { createTheme, style } from '@vanilla-extract/css'

const colors = {
  text: '#000',
  background: '#fff',
}

const space = {
  0: 0,
  1: '8px',
  2: '16px',
  3: '32px',
  4: '64px',
  5: '128px',
}

const fontSizes = {
  0: '12px',
  1: '14px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '48px',
}

const fonts = {}
const sizes = {}

export const [themeRoot, theme] = createTheme({
  colors,
  space,
  fontSizes,
  fonts,
  sizes,
})
