import {
  defineProperties,
  createSprinkles
} from '@vanilla-extract/sprinkles';
import { theme } from './styles.css.ts'

const typography = {
  fontSize: theme.fontSizes,
}

const layout = {
  padding: theme.space,
  paddingTop: theme.space,
  paddingRight: theme.space,
  paddingBottom: theme.space,
  paddingLeft: theme.space,
  margin: theme.space,
  marginTop: theme.space,
  marginRight: theme.space,
  marginBottom: theme.space,
  marginLeft: theme.space,
  display: ['none', 'flex', 'block', 'inline'],
  flexDirection: ['row', 'column'],
  justifyContent: [
    'stretch',
    'flex-start',
    'center',
    'flex-end',
    'space-around',
    'space-between'
  ],
  alignItems: [
    'stretch',
    'flex-start',
    'center',
    'flex-end'
  ],
}

const properties = defineProperties({
  properties: {
    ...layout,
    ...typography,
    color: theme.colors,
    backgroundColor: theme.colors,
    borderColor: theme.colors,
  },
  shorthands: {
    padding: [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
    ],
    paddingX: [
      'paddingLeft',
      'paddingRight',
    ],
    paddingY: [
      'paddingTop',
      'paddingBottom',
    ],
    margin: [
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
    ],
    marginX: [
      'marginLeft',
      'marginRight',
    ],
    marginY: [
      'marginTop',
      'marginBottom',
    ],
  },
});

export const sprinkles = createSprinkles(properties)

export type Sprinkles = Parameters<typeof sprinkles>[0];
