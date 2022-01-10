import {
  defineProperties,
  createSprinkles
} from '@vanilla-extract/sprinkles';

const space = {
  0: 0,
  1: 8,
  2: 16,
  3: 32,
  4: 64,
  5: 128,
};

const colors = {
  text: '#000',
  background: '#fff',
};

const layout = {
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
    padding: space,
    paddingTop: space,
    paddingRight: space,
    paddingBottom: space,
    paddingLeft: space,
    margin: space,
    marginTop: space,
    marginRight: space,
    marginBottom: space,
    marginLeft: space,
    color: colors,
    backgroundColor: colors,
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
