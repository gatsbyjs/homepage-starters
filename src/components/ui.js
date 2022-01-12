import * as React from 'react'
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
  console.log('Base', _cx, cx(..._cx, className))
  return (
    <Component
      className={cx(..._cx, className)}
      {...props}
    />
  )
}

export function Flex ({
  className,
  ...props
}) {
  return (
    <Base
      className={cx(styles.flex, className)}
      {...props}
    />
  )
}

export function FlexList ({
  className,
  ...props
}) {
  return (
    <ul
      className={cx(styles.flex, styles.list, className)}
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
  console.log('Text', props.children, variant, styles.text[variant])
  return (
    <Base
      cx={[styles.text[variant]]}
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

