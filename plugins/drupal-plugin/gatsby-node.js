const formatAsNodeType = (str) => {
  const base = str.replace("node__", "")
  const type = base
    .split("_")
    .map(
      (section) =>
        `${section.substring(0, 1).toUpperCase()}${section.substring(1)}`
    )
    .join("")
  const internalType = base.toLowerCase()
  return [type, internalType]
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          return formatAsNodeType(source.internal.type)[0]
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "imageUrl",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const fieldMediaImage = context.nodeModel.getNodeById({
            id: source.relationships.field_media_image___NODE,
          })
          console.log(source.relationships.field_media_image___NODE)
          const localFile = context.nodeModel.getNodeById({
            id: fieldMediaImage.localFile___NODE,
          })
          return localFile.url
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "proxyImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp")
          const fieldMediaImage = context.nodeModel.getNodeById({
            id: source.relationships.field_media_image___NODE,
          })
          const localFile = context.nodeModel.getNodeById({
            id: fieldMediaImage.localFile___NODE,
          })
          const image = context.nodeModel.getNodeById({
            id: localFile.children[0],
          })
          const resolver = imageType.getFields().gatsbyImageData.resolve
          if (!resolver) return null
          return await resolver(image, args, context, info)
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
  actions.createTypes(/* GraphQL */ `
    type node__homepage_link implements Node & HomepageLink @dontInfer {
      id: ID!
      href: String @proxy(from: "field_href")
      text: String @proxy(from: "title")
    }

    type media__image implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "field_media_image.alt")
      gatsbyImageData: JSON @proxyImage
      url: String @imageUrl
      title: String
    }

    type node__homepage_hero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      heading: String @proxy(from: "title")
      kicker: String @proxy(from: "field_kicker")
      subhead: String @proxy(from: "field_subhead")
      image: HomepageImage
        @link(by: "id", from: "relationships.field_image___NODE")
      text: String @proxy(from: "field_text")
      links: [HomepageLink]
        @link(by: "id", from: "relationships.field_links___NODE")
    }

    type DrupalHomepageFeature implements Node & HomepageBlock & HomepageFeature
      @dontInfer {
      blocktype: String @blocktype
      heading: String
      kicker: String @proxy(from: "field_kicker")
      text: String @proxy(from: "title")
      image: HomepageImage @link(from: "image___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
    }
    type DrupalHomepageFeatureList implements Node & HomepageBlock & HomepageFeatureList
      @dontInfer {
      blocktype: String @blocktype
      kicker: String @proxy(from: "field_kicker")
      heading: String
      text: String @proxy(from: "title")
      content: [HomepageFeature] @link(from: "content___NODE")
    }

    type DrupalHomepageCta implements Node & HomepageBlock & HomepageCta
      @dontInfer {
      blocktype: String @blocktype
      heading: String
      text: String @proxy(from: "title")
      image: HomepageImage @link(from: "image___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type DrupalHomepageLogo implements Node & HomepageLogo @dontInfer {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      alt: String
    }

    type DrupalHomepageLogoList implements Node & HomepageBlock & HomepageLogoList
      @dontInfer {
      blocktype: String @blocktype
      text: String @proxy(from: "title")
      logos: [HomepageLogo] @link(from: "logos___NODE")
    }

    type DrupalHomepageTestimonial implements Node & HomepageTestimonial
      @dontInfer {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link(from: "avatar___NODE")
    }

    type DrupalHomepageTestimonialList implements Node & HomepageBlock & HomepageTestimonialList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      kicker: String @proxy(from: "field_kicker")
      heading: String
      content: [HomepageTestimonial] @link(from: "content___NODE")
    }

    type DrupalHomepageBenefit implements Node & HomepageBenefit @dontInfer {
      id: ID!
      heading: String
      text: String @proxy(from: "title")
      image: HomepageImage @link(from: "image___NODE")
    }

    type DrupalHomepageBenefitList implements Node & HomepageBlock & HomepageBenefitList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String
      text: String @proxy(from: "title")
      content: [HomepageBenefit] @link(from: "content___NODE")
    }

    type DrupalHomepageStatList implements Node & HomepageBlock & HomepageStatList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      kicker: String @proxy(from: "field_kicker")
      heading: String
      text: String @proxy(from: "title")
      image: HomepageImage @link(from: "image___NODE")
      icon: HomepageImage @link(from: "icon___NODE")
      content: [HomepageStat] @link(from: "content___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type DrupalHomepageProduct implements Node & HomepageProduct @dontInfer {
      heading: String
      text: String @proxy(from: "title")
      image: HomepageImage @link(from: "image___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type DrupalHomepageProductList implements Node & HomepageProductList & HomepageBlock
      @dontInfer {
      blocktype: String @blocktype
      heading: String
      kicker: String @proxy(from: "field_kicker")
      text: String @proxy(from: "title")
      content: [HomepageProduct] @link(from: "content___NODE")
    }

    type DrupalHomepage implements Node & Homepage @dontInfer {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link(from: "image___NODE")
      content: [HomepageBlock] @link(from: "content___NODE")
    }
  `)

  // Layout types
  actions.createTypes(/* GraphQL */ `
    type DrupalLayoutHeader implements Node & LayoutHeader @dontInfer {
      id: ID!
      links: [HomepageLink] @link(from: "links___NODE")
      cta: HomepageLink @link(from: "cta___NODE")
    }

    type DrupalSocialLink implements Node & SocialLink @dontInfer {
      id: ID!
      username: String!
      service: SocialService!
    }

    type DrupalLayoutFooter implements Node & LayoutFooter @dontInfer {
      id: ID!
      links: [HomepageLink] @link(from: "links___NODE")
      meta: [HomepageLink] @link(from: "meta___NODE")
      socialLinks: [SocialLink] @link(from: "socialLinks___NODE")
      copyright: String
    }

    type DrupalLayout implements Node & Layout @dontInfer {
      id: ID!
      header: LayoutHeader @link(from: "header___NODE")
      footer: LayoutFooter @link(from: "footer___NODE")
    }
  `)
}
