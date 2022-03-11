import HomepageHero, { HeroProps } from "./hero"
import HomepageFeature, { FeatureDataProps } from "./feature"
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

type WithBlocktype<T = {}> = T & { id: string; blocktype: Blocktypes }

export type HomepageBlock =
  | WithBlocktype<HeroProps>
  | WithBlocktype<FeatureDataProps>
  | WithBlocktype<FeatureListProps>
  | WithBlocktype<LogoListProps>
  | WithBlocktype<BenefitListProps>
  | WithBlocktype<TestimonialListProps>
  | WithBlocktype<StatListProps>
  | WithBlocktype<CtaProps>
  | WithBlocktype<ProductListProps>
  | WithBlocktype<AboutHeroProps>
  | WithBlocktype<AboutStatListProps>
  | WithBlocktype<AboutLeadershipProps>
  | WithBlocktype<AboutLogoListProps>

export enum Blocktypes {
  HomepageHero = "HomepageHero",
  HomepageFeature = "HomepageFeature",
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

const sections = {
  [Blocktypes.HomepageHero]: HomepageHero,
  [Blocktypes.HomepageFeature]: HomepageFeature,
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

export default sections
