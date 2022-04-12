import * as React from "react"

export default function Fallback(props) {
  return <pre children={JSON.stringify(props, null, 2)} />
}
