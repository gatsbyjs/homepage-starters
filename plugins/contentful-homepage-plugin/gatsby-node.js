exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
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
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
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
      content: [HomepageStat]
    }

    interface Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
      # blocks: [HomepageBlock] @proxy(from: "content")
    }

    # prevent errors when undefined
    # type ContentfulLayoutHeader implements Node {
    #   logo: ContentfulAsset
    # }
    # type ContentfulLayoutFooter implements Node {
    #   logo: ContentfulAsset
    # }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
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
      social: [SocialLink]
      copyright: String
    }

    type ContentfulLink implements Node & HomepageLink {
      id: ID!
      href: String
      text: String
      # consider @proxy
    }

    type ContentfulAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON
    }

    type ContentfulHomepageLink implements Node & HomepageLink {
      href: String
      text: String
    }

    type ContentfulHomepageHero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    type ContenfulHomepageFeature implements Node & HomepageBlock & HomepageFeature {
      id: ID!
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    type ContentfulHomepageCta implements Node & HomepageBlock & HomepageCta {
      heading: String
      text: String
      links: [HomepageLink]
    }

    type ContentfulHomepageLogo implements Node & HomepageBlock & HomepageLogo {
      id: ID!
      image: HomepageImage
      alt: String
    }
    type ContentfulHomepageLogoList implements Node & HomepageBlock & HomepageLogoList {
      id: ID!
      logos: [HomepageLogo]
    }

    type ContentfulHomepageTestimonial implements Node & HomepageTestimonial {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    type ContentfulHomepageTestimonialList implements Node & HomepageBlock & HomepageTestimonialList {
      id: ID!
      content: [HomepageTestimonial]
    }

    type ContentfulHomepageBenefit implements Node & HomepageBenefit {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }
    type ContentfulHomepageBenefitList implements Node & HomepageBlock & HomepageBenefitList {
      id: ID!
      content: [HomepageBenefit]
    }

    type ContentfulHomepageState implements Node & HomepageStat {
      id: ID!
      value: String
      label: String
      heading: String
    }
    type ContentfulHomepageStatList implements Node & HomepageBlock & HomepageStatList {
      id: ID!
      content: [HomepageStat]
    }

    type ContentfulHomepage implements Node & Homepage {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
    }
  `)
}

exports.onCreateNode = async ({
  actions,
  node,
  getNode,
  getNodeAndSavePathDependency,
  createNodeId,
}) => {
  if (!node.internal.type.includes('Contentful')) return

  // TODO
  if (node.internal.type === 'ContentfulHomepage') {
    // console.log(node)
  }
  return
}
