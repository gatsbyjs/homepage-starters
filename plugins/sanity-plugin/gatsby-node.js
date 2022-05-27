const sanityBlockContentToHTML = require("@sanity/block-content-to-html")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          // capitalize
          const type = source._type
          const cap = type.charAt(0).toUpperCase() + type.slice(1)
          return cap
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "sanityBlockContent",
    args: {
      fieldName: "String",
    },
    extend(options) {
      return {
        resolve(source) {
          const html = sanityBlockContentToHTML({
            blocks: source[options.fieldName],
          })
          return html
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "navItemType",
    args: {
      name: {
        type: "String!",
        defaultValue: "Link",
      },
    },
    extend(options) {
      return {
        resolve() {
          switch (options.name) {
            case "Group":
              return "Group"
            default:
              return "Link"
          }
        },
      }
    },
  })

  // abstract interfaces
  actions.createTypes(/* GraphQL */ `
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    interface HeaderNavItem implements Node {
      id: ID!
      navItemType: String
    }

    interface NavItem implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      href: String
      text: String
      icon: HomepageImage
      description: String
    }

    interface NavItemGroup implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      name: String
      navItems: [NavItem]
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData
      url: String
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageFeatureList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature]
    }

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageLogo implements Node {
      id: ID!
      image: HomepageImage
      alt: String
    }

    interface HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      text: String
      logos: [HomepageLogo]
    }

    interface HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    interface HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      content: [HomepageTestimonial]
    }

    interface HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    interface HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      content: [HomepageBenefit]
    }

    interface HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }

    interface HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage
      icon: HomepageImage
      content: [HomepageStat]
      links: [HomepageLink]
    }

    interface HomepageProduct implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageProductList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      content: [HomepageProduct]
    }

    interface Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
    }

    interface LayoutHeader implements Node {
      id: ID!
      navItems: [HeaderNavItem]
      cta: HomepageLink
    }

    enum SocialService {
      TWITTER
      FACEBOOK
      INSTAGRAM
      YOUTUBE
      LINKEDIN
      GITHUB
      DISCORD
      TWITCH
    }

    interface SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    interface LayoutFooter implements Node {
      id: ID!
      links: [HomepageLink]
      meta: [HomepageLink]
      socialLinks: [SocialLink]
      copyright: String
    }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }

    interface AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
    }

    interface AboutHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      image: HomepageImage
    }

    interface AboutStat implements Node {
      id: ID!
      value: String
      label: String
    }

    interface AboutStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [AboutStat]
    }

    interface AboutProfile implements Node {
      id: ID!
      image: HomepageImage
      name: String
      jobTitle: String
    }

    interface AboutLeadership implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      subhead: String
      content: [AboutProfile]
    }

    interface AboutLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      links: [HomepageLink]
      logos: [HomepageLogo]
    }

    interface Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage
      html: String!
    }
  `)

  // CMS-specific types for Homepage
  actions.createTypes(/* GraphQL */ `
    type SanityHomepageLink implements Node & HomepageLink {
      id: ID!
      href: String
      text: String
    }

    type SanityImageAsset implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      gatsbyImageData: GatsbyImageData
      url: String
    }

    type SanityHomepage implements Node & Homepage {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      content: [HomepageBlock] @link
    }

    type SanityHomepageHero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      _type: String
      blocktype: String @blocktype
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      text: String
      links: [HomepageLink] @link
    }

    type SanityHomepageFeature implements Node & HomepageFeature & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      links: [HomepageLink] @link
    }

    type SanityHomepageFeatureList implements Node & HomepageFeatureList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature]
    }

    type SanityHomepageCta implements Node & HomepageCta & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      links: [HomepageLink] @link
    }

    type SanityHomepageLogo implements Node & HomepageLogo {
      id: ID!
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      alt: String
    }

    type SanityHomepageLogoList implements Node & HomepageLogoList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      text: String
      logos: [HomepageLogo]
    }

    type SanityHomepageTestimonial implements Node & HomepageTestimonial {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link(by: "id", from: "avatar.asset._ref")
    }

    type SanityHomepageTestimonialList implements Node & HomepageTestimonialList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      kicker: String
      heading: String
      content: [HomepageTestimonial]
    }

    type SanityHomepageBenefit implements Node & HomepageBenefit {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
    }

    type SanityHomepageBenefitList implements Node & HomepageBenefitList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      text: String
      content: [HomepageBenefit]
    }

    type SanityHomepageStat implements Node & HomepageStat {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type SanityHomepageStatList implements Node & HomepageStatList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      icon: HomepageImage @link(by: "id", from: "icon.asset._ref")
      content: [HomepageStat]
      links: [HomepageLink] @link
    }

    type SanityHomepageProduct implements Node & HomepageProduct {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      links: [HomepageLink] @link
    }

    type SanityHomepageProductList implements Node & HomepageProductList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      content: [HomepageProduct]
    }

    type SanityNavItem implements Node & NavItem & HeaderNavItem {
      id: ID!
      navItemType: String @navItemType(name: "Link")
      href: String
      text: String
      icon: HomepageImage @link(by: "id", from: "icon.asset._ref")
      description: String
    }

    type SanityNavItemGroup implements Node & NavItemGroup & HeaderNavItem {
      id: ID!
      navItemType: String @navItemType(name: "Group")
      name: String
      navItems: [NavItem] @link
    }

    type SanityLayoutHeader implements Node & LayoutHeader {
      id: ID!
      navItems: [HeaderNavItem] @link(from: "navItems._ref")
      cta: HomepageLink @link
    }

    type SanitySocialLink implements Node & SocialLink {
      id: ID!
      username: String!
      service: SocialService!
    }

    type SanityLayoutFooter implements Node & LayoutFooter {
      id: ID!
      links: [HomepageLink] @link
      meta: [HomepageLink] @link
      socialLinks: [SocialLink] @link
      copyright: String
    }

    type SanityLayout implements Node & Layout {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }

    type SanityAboutPage implements Node & AboutPage {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      content: [HomepageBlock]
    }

    type SanityAboutHero implements Node & AboutHero & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      text: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
    }

    type SanityAboutStat implements Node & AboutStat {
      id: ID!
      value: String
      label: String
    }

    type SanityAboutStatList implements Node & AboutStatList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      content: [AboutStat]
    }

    type SanityAboutProfile implements Node & AboutProfile {
      id: ID!
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      name: String
      jobTitle: String
    }

    type SanityAboutLeadership implements Node & AboutLeadership & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      kicker: String
      heading: String
      subhead: String
      content: [AboutProfile]
    }

    type SanityAboutLogoList implements Node & AboutLogoList & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      links: [HomepageLink]
      logos: [HomepageLogo]
    }

    type SanityPage implements Node & Page {
      id: ID!
      slug: String! @proxy(from: "slug.current")
      title: String
      description: String
      image: HomepageImage @link(by: "id", from: "image.asset._ref")
      html: String! @sanityBlockContent(fieldName: "content")
    }
  `)
}
