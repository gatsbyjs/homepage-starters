import * as React from 'react'
import { graphql } from 'gatsby'

function Stat (props) {
  return (
    <div>
      <div>{props.value}</div>
      <div>{props.label}</div>
    </div>
  )
}

export default function StatList (props) {
  return (
    <section>
      <ul>
        {props.content.map(stat => (
          <li key={stat.id}>
            <Stat {...stat} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export const query = graphql`
  fragment HomepageStatListContent on HomepageStatList {
    id
    content {
      id
      value
      label
      heading
    }
  }
`
