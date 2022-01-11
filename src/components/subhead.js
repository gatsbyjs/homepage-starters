import * as React from 'react'
import Text from './text'

export default function Subhead (props) {
  return (
    <Text
      as='h3'
      variant='subhead'
      {...props}
    />
  )
}
