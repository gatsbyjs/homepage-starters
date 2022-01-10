import * as React from 'react'
import { graphql } from 'gatsby'

function Testimonial (props) {
  return (
    <blockquote>
      <p>
        {props.quote}
      </p>
      <figcaption>
        <cite>
          {props.source}
        </cite>
      </figcaption>
    </blockquote>
  )
}

export default function TestimonialList (props) {
  return (
    <section>
      <ul>
        {props.content.map(testimonial => (
          <li key={testimonial.id}>
            <Testimonial {...testimonial} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export const query = graphql`
  fragment HomepageTestimonialListContent on HomepageTestimonialList {
    id
    content {
      id
      quote
      source
      avatar {
        id
        gatsbyImageData
      }
    }
  }
`
