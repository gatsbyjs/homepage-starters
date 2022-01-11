import * as React from 'react'
import Text from './text'

export default function Kicker (props) {
  return (
    <Text
      as='h4'
      variant='kicker'
      {...props}
    />
  )
}
