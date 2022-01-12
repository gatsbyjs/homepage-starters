import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '../theme.css.ts'

export const container = style({
  maxWidth: theme.sizes.container,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
})

export const flex = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.space[3],
})

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
})

export const section = style({
  paddingTop: theme.space[5],
  paddingBottom: theme.space[5],
})

export const margin = styleVariants({
  1: { margin: theme.space[1] },
  2: { margin: theme.space[2] },
  3: { margin: theme.space[3] },
  4: { margin: theme.space[4] },
  5: { margin: theme.space[5] },
  6: { margin: theme.space[6] },
  auto: { margin: 'auto' }
})

export const margin0 = style({ margin: 0 })

export const text = styleVariants({
  body: [margin0, {
    marginBottom: theme.space[2],
    fontSize: theme.fontSizes[2],
    fontWeight: theme.fontWeights.normal,
    lineHeight: theme.lineHeights.text,
    letterSpacing: theme.letterSpacings.normal,
  }],
  lead: [margin0, {
    marginBottom: theme.space[2],
    fontSize: theme.fontSizes[3],
    fontWeight: theme.fontWeights.normal,
    lineHeight: theme.lineHeights.text,
    letterSpacing: theme.letterSpacings.normal,
  }],
  heading: [margin0, {
    marginBottom: theme.space[2],
    fontSize: theme.fontSizes[5],
    fontWeight: theme.fontWeights.extrabold,
    lineHeight: theme.lineHeights.tight,
    letterSpacing: theme.letterSpacings.tight,
  }],
  subhead: [margin0, {
    marginBottom: theme.space[2],
    fontSize: theme.fontSizes[4],
    fontWeight: theme.fontWeights.extrabold,
    lineHeight: theme.lineHeights.tight,
    letterSpacing: theme.letterSpacings.tight,
  }],
  kicker: [margin0, {
    marginBottom: theme.space[2],
    fontSize: theme.fontSizes[2],
    fontWeight: theme.fontWeights.semibold,
    lineHeight: theme.lineHeights.tight,
    letterSpacing: theme.letterSpacings.wide,
    textTransform: 'uppercase',
  }],
})
