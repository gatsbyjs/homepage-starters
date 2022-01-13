import * as React from 'react'
import Header from './header'
import Footer from './footer'
import '../styles.css.ts'

export default function Layout (props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
