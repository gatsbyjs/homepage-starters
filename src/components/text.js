import * as React from 'react'
import { text } from './text.css.ts'

export default function Text ({
  as: Component = 'div',
  variant = 'body',
  ...props
}) {
  return (
    <Component
      {...props}
      className={text({ variant })}
    />
  )
}
