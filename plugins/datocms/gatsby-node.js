exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: 'blocktype',
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type
            .replace('DatoCms', 'Homepage')
            .replace(/list$/, 'List')
        }
      }
    }
  })

  actions.createFieldExtension({
    name: 'metalinks',
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const type = info.schema.getType(source.internal.type)
          const resolver = type.getFields().metalinks?.resolve
          const result = await resolver(source, args, context, {
            fieldName: 'metalinks'
          })
          return result
        }
      }
    }
  })

  actions.createFieldExtension({
    name: 'ctalink',
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const type = info.schema.getType(source.internal.type)
          const resolver = type.getFields().originalCta?.resolve
          const result = await resolver(source, args, context, info)
          return result
        }
      }
    }
  })

  // support DatoCMS logos as images
  actions.createFieldExtension({
    name: 'recursiveImage',
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source
        }
      }
    }
  })

  // abstract interfaces
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      ## DatoCMS specific
      originalId: String
      entityPayload: JSON
      image: HomepageImage @recursiveImage
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageFeatureList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      text: String
      logos: [HomepageImage]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
      entityPayload: JSON
    }

    interface LayoutHeader implements Node {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      cta: HomepageLink
      entityPayload: JSON
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
      entityPayload: JSON
    }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }
  `)


  actions.createTypes(`
    type DatoCmsLink implements Node & HomepageLink {
      id: ID!
      originalId: String
      entityPayload: JSON
      href: String
      text: String
    }

    type DatoCmsAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      originalId: String
      entityPayload: JSON
      image: HomepageImage @recursiveImage
    }

    type DatoCmsHero implements Node & HomepageHero & HomepageBlock @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    type DatoCmsFeature implements Node & HomepageBlock & HomepageFeature @dontInfer {
      originalId: String
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      entityPayload: JSON
    }

    type DatoCmsFeaturelist implements Node & HomepageBlock & HomepageFeatureList @dontInfer {
      originalId: String
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature]
      entityPayload: JSON
    }

    type DatoCmsCta implements Node & HomepageBlock & HomepageCta @dontInfer {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    type DatoCmsLogolist implements Node & HomepageBlock & HomepageLogoList @dontInfer {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      text: String
      logos: [HomepageImage]
    }

    type DatoCmsTestimonial implements Node & HomepageTestimonial @dontInfer {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    type DatoCmsTestimoniallist implements Node & HomepageBlock & HomepageTestimonialList @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      kicker: String
      heading: String
      content: [HomepageTestimonial]
    }

    type DatoCmsBenefit implements Node & HomepageBenefit @dontInfer {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    type DatoCmsBenefitlist implements Node & HomepageBlock & HomepageBenefitList @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      text: String
      content: [HomepageBenefit]
    }

    type DatoCmsStat implements Node & HomepageStat @dontInfer {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type DatoCmsStatlist implements Node & HomepageBlock & HomepageStatList @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      image: HomepageImage
      icon: HomepageImage
      content: [HomepageStat]
      links: [HomepageLink]
    }

    type DatoCmsProduct implements Node & HomepageProduct @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    type DatoCmsProductlist implements Node & HomepageBlock & HomepageProductList @dontInfer {
      id: ID!
      blocktype: String @blocktype
      originalId: String
      entityPayload: JSON
      heading: String
      kicker: String
      text: String
      content: [HomepageProduct]
    }

    type DatoCmsHomepage implements Node & Homepage @dontInfer {
      id: ID!
      title: String @proxy(from: "entityPayload.attributes.metadata.title")
      description: String @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      content: [HomepageBlock]
      entityPayload: JSON
    }
  `)

  // Layout types
  actions.createTypes(`
    type DatoCmsLayoutheader implements Node & LayoutHeader @dontInfer {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      originalCta: HomepageLink @link(by: "originalId",from: "entityPayload.attributes.cta")
      cta: HomepageLink @ctalink
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsSocialLink implements Node & SocialLink @dontInfer {
      id: ID!
      username: String!
      service: SocialService!
    }

    type DatoCmsLayoutfooter implements Node & LayoutFooter @dontInfer {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      metalinks: [HomepageLink]
      meta: [HomepageLink] @metalinks
      socialLinks: [SocialLink]
      copyright: String
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsLayout implements Node & Layout @dontInfer {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }
  `)
}
