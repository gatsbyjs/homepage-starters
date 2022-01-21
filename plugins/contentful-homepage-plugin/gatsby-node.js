exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type.replace("Contentful", "")
        },
      }
    },
  })

  actions.createFieldExtension({
    name: 'imageUrl',
    extend(options) {
      const schemaRE = /^\/\//
      const addURLSchema = str => {
        if (schemaRE.test(str)) return `https:${str}`
        return str
      }
      return {
        resolve(source) {
          return addURLSchema(source.file.url)
        }
      }
    }
  })

  // abstract interfaces
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      url: String
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
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

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
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
      content: [HomepageStat]
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
      logo: HomepageImage
      links: [HomepageLink]
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
      logo: HomepageImage
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
  `)

  // CMS-specific types
  actions.createTypes(`
    type ContentfulHomepageLink implements Node & HomepageLink {
      id: ID!
      href: String
      text: String
    }

    type ContentfulAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      url: String @imageUrl
      file: JSON
    }

    type ContentfulHomepageHero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link(from: "image___NODE")
      text: String
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type ContentfulHomepageFeature implements Node & HomepageBlock & HomepageFeature {
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(from: "image___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type ContentfulHomepageCta implements Node & HomepageBlock & HomepageCta {
      blocktype: String @blocktype
      heading: String
      text: String
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type ContentfulHomepageLogo implements Node & HomepageLogo {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      alt: String
    }

    type ContentfulHomepageLogoList implements Node & HomepageBlock & HomepageLogoList {
      blocktype: String @blocktype
      logos: [HomepageLogo] @link(from: "logos___NODE")
    }

    type ContentfulHomepageTestimonial implements Node & HomepageTestimonial {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link(from: "avatar___NODE")
    }

    type ContentfulHomepageTestimonialList implements Node & HomepageBlock & HomepageTestimonialList {
      id: ID!
      blocktype: String @blocktype
      content: [HomepageTestimonial] @link(from: "content___NODE")
    }

    type ContentfulHomepageBenefit implements Node & HomepageBenefit {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link(from: "image___NODE")
    }

    type ContentfulHomepageBenefitList implements Node & HomepageBlock & HomepageBenefitList {
      id: ID!
      blocktype: String @blocktype
      content: [HomepageBenefit] @link(from: "content___NODE")
    }

    type ContentfulHomepageStat implements Node & HomepageStat {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type ContentfulHomepageStatList implements Node & HomepageBlock & HomepageStatList {
      id: ID!
      blocktype: String @blocktype
      content: [HomepageStat] @link(from: "content___NODE")
    }

    type ContentfulHomepage implements Node & Homepage {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link(from: "image___NODE")
      content: [HomepageBlock] @link(from: "content___NODE")
    }
  `)

  // Layout types
  actions.createTypes(`
    type ContentfulLayoutHeader implements Node & LayoutHeader {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      cta: HomepageLink @link(from: "cta___NODE")
    }

    type ContentfulSocialLink implements Node & SocialLink {
      id: ID!
      username: String!
      service: SocialService!
    }

    type ContentfulLayoutFooter implements Node & LayoutFooter {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      meta: [HomepageLink] @link(from: "meta___NODE")
      socialLinks: [SocialLink] @link(from: "socialLinks___NODE")
      copyright: String
    }

    type ContentfulLayout implements Node & Layout {
      id: ID!
      header: LayoutHeader @link(from: "header___NODE")
      footer: LayoutFooter @link(from: "footer___NODE")
    }
  `)
}
