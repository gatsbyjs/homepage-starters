import * as React from "react"
import Header from "./header"
import "../styles.css"
import { Slice } from "gatsby"

interface LayoutProps {
  title: string
  description?: string
  image?: { id: string; url: string }
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Slice alias="header" />
      {props.children}
      <Slice alias="footer" />
    </>
  )
}

export default Layout
