import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, FlexList, Box, Text } from "./ui"
import * as styles from "./about-stat-list.css"
import { FlexVariants, TextVariants, Widths } from "./ui.css"

interface AboutStatProps {
  id: string
  value?: string
  label?: string
}

function AboutStat(props: AboutStatProps) {
  return (
    <Box width={Widths.FitContent} className={styles.statContainer}>
      {props.value && <Text variant={TextVariants.Stat}>{props.value}</Text>}
      {props.label && (
        <Text variant={TextVariants.StatLabel}>{props.label}</Text>
      )}
    </Box>
  )
}

export interface AboutStatListProps {
  content: AboutStatProps[]
}

export default function AboutStatList(props: AboutStatListProps) {
  return (
    <Section>
      <Container>
        <FlexList
          className={styles.statList}
          variant={FlexVariants.Center}
          responsive
        >
          {props.content.map((stat) => (
            <AboutStat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment AboutStatListContent on AboutStatList {
    id
    content {
      id
      value
      label
    }
  }
`
