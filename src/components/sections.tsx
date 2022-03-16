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

export { default as HomepageHero } from "./hero"
export { default as HomepageFeatureList } from "./feature-list"
export { default as HomepageLogoList } from "./logo-list"
export { default as HomepageBenefitList } from "./benefit-list"
export { default as HomepageTestimonialList } from "./testimonial-list"
export { default as HomepageStatList } from "./stat-list"
export { default as HomepageCta } from "./cta"
export { default as HomepageProductList } from "./product-list"
export { default as AboutHero } from "./about-hero"
export { default as AboutStatList } from "./about-stat-list"
export { default as AboutLeadership } from "./about-leadership"
export { default as AboutLogoList } from "./about-logo-list"

export type Sections =
  | typeof HomepageHero
  | typeof HomepageFeatureList
  | typeof HomepageLogoList
  | typeof HomepageBenefitList
  | typeof HomepageTestimonialList
  | typeof HomepageStatList
  | typeof HomepageCta
  | typeof HomepageProductList
  | typeof AboutHero
  | typeof AboutStatList
  | typeof AboutLeadership
  | typeof AboutLogoList

export type SectionProps =
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

type Blocktypes =
  | "HomepageHero"
  | "HomepageFeatureList"
  | "HomepageLogoList"
  | "HomepageBenefitList"
  | "HomepageTestimonialList"
  | "HomepageStatList"
  | "HomepageCta"
  | "HomepageProductList"
  | "AboutHero"
  | "AboutStatList"
  | "AboutLeadership"
  | "AboutLogoList"

type WithBlocktype<B = Blocktypes, P = SectionProps> = {
  id: string
  blocktype: B
} & P

export type HomepageBlock =
  | WithBlocktype<"HomepageHero", HeroProps>
  | WithBlocktype<"HomepageFeatureList", FeatureListProps>
  | WithBlocktype<"HomepageLogoList", LogoListProps>
  | WithBlocktype<"HomepageBenefitList", BenefitListProps>
  | WithBlocktype<"HomepageTestimonialList", TestimonialListProps>
  | WithBlocktype<"HomepageStatList", StatListProps>
  | WithBlocktype<"HomepageCta", CtaProps>
  | WithBlocktype<"HomepageProductList", ProductListProps>
  | WithBlocktype<"AboutHero", AboutHeroProps>
  | WithBlocktype<"AboutStatList", AboutStatListProps>
  | WithBlocktype<"AboutLeadership", AboutLeadershipProps>
  | WithBlocktype<"AboutLogoList", AboutLogoListProps>
