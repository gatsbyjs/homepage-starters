import * as React from 'react'
import Text from './text'

export default function Heading (props) {
  return (
    <Text
      as='h2'
      variant='heading'
      {...props}
    />
  )
}
