import * as React from 'react'

export default function Text ({
  as: Component = 'div',
  variant = 'body',
  ...props
}) {
  return (
    <Component
      {...props}
    />
  )
}
