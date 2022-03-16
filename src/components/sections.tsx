import HomepageHero, { HeroProps } from "./hero"
import HomepageFeatureList, { FeatureListProps } from "./feature-list"
import HomepageLogoList, { LogoListProps } from "./logo-list"
import HomepageBenefitList, { BenefitListProps } from "./benefit-list"
import HomepageTestimonialList, {
  TestimonialListProps,
} from "./testimonial-list"
import HomepageStatList, { StatListProps } from "./stat-list"
import HomepageCta, { CtaProps } from "./cta"
import HomepageProductList, { ProductListProps } from "./product-list"

import AboutHero, { AboutHeroProps } from "./about-hero"
import AboutStatList, { AboutStatListProps } from "./about-stat-list"
import AboutLeadership, { AboutLeadershipProps } from "./about-leadership"
import AboutLogoList, { AboutLogoListProps } from "./about-logo-list"

export enum Blocktypes {
  HomepageHero = "HomepageHero",
  HomepageFeatureList = "HomepageFeatureList",
  HomepageLogoList = "HomepageLogoList",
  HomepageBenefitList = "HomepageBenefitList",
  HomepageTestimonialList = "HomepageTestimonialList",
  HomepageStatList = "HomepageStatList",
  HomepageCta = "HomepageCta",
  HomepageProductList = "HomepageProductList",
  AboutHero = "AboutHero",
  AboutStatList = "AboutStatList",
  AboutLeadership = "AboutLeadership",
  AboutLogoList = "AboutLogoList",
}

type SectionProps =
  | HeroProps
  | FeatureListProps
  | LogoListProps
  | BenefitListProps
  | TestimonialListProps
  | StatListProps
  | CtaProps
  | ProductListProps
  | AboutHeroProps
  | AboutStatListProps
  | AboutLeadershipProps
  | AboutLogoListProps

type WithBlocktype<B, P = SectionProps> = { id: string; blocktype: B } & P

export type HomepageBlock =
  | WithBlocktype<Blocktypes.HomepageHero, HeroProps>
  | WithBlocktype<Blocktypes.HomepageFeatureList, FeatureListProps>
  | WithBlocktype<Blocktypes.HomepageLogoList, LogoListProps>
  | WithBlocktype<Blocktypes.HomepageBenefitList, BenefitListProps>
  | WithBlocktype<Blocktypes.HomepageTestimonialList, TestimonialListProps>
  | WithBlocktype<Blocktypes.HomepageStatList, StatListProps>
  | WithBlocktype<Blocktypes.HomepageCta, CtaProps>
  | WithBlocktype<Blocktypes.HomepageProductList, ProductListProps>
  | WithBlocktype<Blocktypes.AboutHero, AboutHeroProps>
  | WithBlocktype<Blocktypes.AboutStatList, AboutStatListProps>
  | WithBlocktype<Blocktypes.AboutLeadership, AboutLeadershipProps>
  | WithBlocktype<Blocktypes.AboutLogoList, AboutLogoListProps>

const sections = {
  [Blocktypes.HomepageHero]: HomepageHero,
  [Blocktypes.HomepageFeatureList]: HomepageFeatureList,
  [Blocktypes.HomepageLogoList]: HomepageLogoList,
  [Blocktypes.HomepageBenefitList]: HomepageBenefitList,
  [Blocktypes.HomepageTestimonialList]: HomepageTestimonialList,
  [Blocktypes.HomepageStatList]: HomepageStatList,
  [Blocktypes.HomepageCta]: HomepageCta,
  [Blocktypes.HomepageProductList]: HomepageProductList,
  [Blocktypes.AboutHero]: AboutHero,
  [Blocktypes.AboutStatList]: AboutStatList,
  [Blocktypes.AboutLeadership]: AboutLeadership,
  [Blocktypes.AboutLogoList]: AboutLogoList,
}

const omitBlocktype = (propsWithBlocktype) => {
  const { blocktype, ...props } = propsWithBlocktype
  return props
}

interface SectionComponentAndProps {
  Component: (props: SectionProps) => JSX.Element
  props: SectionProps
}

export const getSectionComponentAndProps = (
  block: HomepageBlock
): SectionComponentAndProps | null => {
  const { id, ...propsWithBlocktype } = block

  switch (propsWithBlocktype.blocktype) {
    case Blocktypes.HomepageHero:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageFeatureList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageLogoList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageBenefitList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageTestimonialList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageStatList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageCta:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.HomepageProductList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.AboutHero:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.AboutStatList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.AboutLeadership:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    case Blocktypes.AboutLogoList:
      return {
        Component: sections[propsWithBlocktype.blocktype],
        props: omitBlocktype(propsWithBlocktype),
      }
    default:
      console.warn(`No component found for: ${block.blocktype}`)
      return null
  }
}
