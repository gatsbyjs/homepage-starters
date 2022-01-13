import * as React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import isAbsoluteURL from 'is-absolute-url'
import * as styles from './ui.css.ts'

export const cx = (...args) => args
  .filter(Boolean)
  .join(' ')

export function Container ({
  className,
  ...props
}) {
  return (
    <div
      className={cx(styles.container, className)}
      {...props}
    />
  )
}

export function Base ({
  as: Component = 'div',
  cx: _cx = [],
  className,
  ...props
}) {
  return (
    <Component
      className={cx(..._cx, className)}
      {...props}
    />
  )
}

export function Flex ({
  variant,
  gap = 3,
  cx: _cx,
  ...props
}) {
  return (
    <Base
      cx={[
        styles.flex,
        styles.flexVariants[variant],
        styles.flexGap[gap],
        _cx
      ]}
      {...props}
    />
  )
}

export function Box ({
  width = 'full',
  background,
  padding,
  radius,
  ...props
}) {
  return (
    <Base
      cx={[
        styles.widths[width],
        styles.backgrounds[background],
        styles.padding[padding],
        styles.radii[radius],
      ]}
      {...props}
    />
  )
}

export function FlexList ({
  ...props
}) {
  return (
    <Flex
      as='ul'
      cx={[
        styles.list,
      ]}
      {...props}
    />
  )
}

export function List (props) {
  return (
    <Base
      as='ul'
      cx={[ styles.list ]}
      {...props}
    />
  )
}

export function Space ({
  className,
  size = 'auto',
  ...props
}) {
  return (
    <Base
      className={cx(styles.margin[size], className)}
      {...props}
    />
  )
}

export function Section ({
  className,
  ...props
}) {
  return (
    <Base
      as='section'
      className={cx(styles.section, className)}
      {...props}
    />
  )
}

export function Text ({
  variant = 'body',
  ...props
}) {
  return (
    <Base
      cx={[
        styles.text[variant],
      ]}
      {...props}
    />
  )
}

export function Heading ({
  ...props
}) {
  return (
    <Text
      as='h2'
      variant='heading'
      {...props}
    />
  )
}

export function Subhead ({
  ...props
}) {
  return (
    <Text
      as='h3'
      variant='subhead'
      {...props}
    />
  )
}

export function Kicker ({
  ...props
}) {
  return (
    <Text
      as='h4'
      variant='kicker'
      {...props}
    />
  )
}

export function Link ({
  to,
  href,
  ...props
}) {
  const url = href || to
  if (isAbsoluteURL(url)) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={url} {...props} />
    )
  }
  return <GatsbyLink to={url} {...props} />
}

export function NavLink ({
  ...props
}) {
  return (
    <Base
      as={Link}
      cx={[styles.navlink]}
      {...props}
    />
  )
}

export function Button ({
  variant = 'primary',
  ...props
}) {
  return (
    <Base
      as={Link}
      cx={[styles.buttons[variant]]}
      {...props}
    />
  )
}

export function ButtonList ({
  links = [],
  reversed = false,
}) {
  const getVariant = (i) => {
    if (reversed) {
      return i === 0 ? 'reversed' : 'linkReversed'
    }
    return i === 0 ? 'primary' : 'link'
  }
  return (
    <FlexList>
      {links.map((link, i) => (
        <li key={link.id}>
          <Button
            href={link.href}
            variant={getVariant(i)}>
            {link.text}
          </Button>
        </li>
      ))}
    </FlexList>
  )
}

export function Blockquote (props) {
  return (
    <Base
      as='blockquote'
      cx={[styles.blockquote]}
      {...props}
    />
  )
}

export function Avatar ({
  alt,
  image,
}) {
  return (
    <GatsbyImage
      alt={alt}
      image={getImage(image)}
      className={styles.avatar}
    />
  )
}
