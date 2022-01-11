import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from '../sprinkles.css.ts'

export const text = recipe({
  base: {
    marginTop: 0,
    marginBottom: 0,
  },
  variants: {
    variant: {
      heading: sprinkles({
        fontWeight: 'extrabold',
        fontSize: 5,
        lineHeight: 'tight',
        letterSpacing: 'tight',
      }),
      kicker: sprinkles({
        fontWeight: 'semibold',
        fontSize: 2,
        lineHeight: 'tight',
        letterSpacing: 'wide',
        textTransform: 'uppercase',
      }),
      body: sprinkles({
        fontWeight: 'normal',
        fontSize: 2,
        letterSpacing: 'normal',
        lineHeight: 'text',
      }),
      lead: sprinkles({
        fontWeight: 'normal',
        fontSize: 3,
        letterSpacing: 'normal',
        lineHeight: 'text',
      }),
      mono: sprinkles({
        fontFamily: 'mono',
        fontSize: 1,
        lineHeight: 'text',
      }),
    }
  },
})
