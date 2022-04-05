const dato = require("datocms-structured-text-to-html-string")
const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type
            .replace("DatoCms", "")
            .replace(/list$/, "List")
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "imagePassthroughArgs",
    extend(options) {
      const { args } = getGatsbyImageResolver()
      return {
        args,
      }
    },
  })

  actions.createFieldExtension({
    name: "metalinks",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const type = info.schema.getType(source.internal.type)
          const resolver = type.getFields().metalinks?.resolve
          const result = await resolver(source, args, context, {
            fieldName: "metalinks",
          })
          return result
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "ctalink",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const type = info.schema.getType(source.internal.type)
          const resolver = type.getFields().originalCta?.resolve
          const result = await resolver(source, args, context, info)
          return result
        },
      }
    },
  })

  // support DatoCMS logos as images
  actions.createFieldExtension({
    name: "recursiveImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source
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

  actions.createFieldExtension({
    name: "richText",
    extend(options) {
      return {
        resolve(source, args, context, info) {
          const body = source.entityPayload.attributes.body
          const html = dato.render(body)
          return html
        },
      }
    },
  })

  // abstract interfaces
  actions.createTypes(/* GraphQL */ `
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
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface NavItemGroup implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      name: String
      navItems: [NavItem]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON @imagePassthroughArgs
      url: String
      ## DatoCMS specific
      originalId: String
      entityPayload: JSON
      image: HomepageImage @recursiveImage
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
      kicker: String
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
      navItems: [HeaderNavItem]
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

    interface AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
      # DatoCMS
      entityPayload: JSON
    }

    interface AboutHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      image: HomepageImage
      # DatoCMS
      originalId: String
      entityPayload: JSON
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
      # DatoCMS
      originalId: String
      entityPayload: JSON
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
      # DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface AboutLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      links: [HomepageLink]
      logos: [HomepageImage]
      # DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage
      html: String!
      body: DatoCmsDatoCmsPageBodyStructuredText
    }
  `)

  // CMS-specific types for Homepage
  actions.createTypes(/* GraphQL */ `
    type DatoCmsHomepageLink implements Node & HomepageLink {
      id: ID!
      originalId: String
      entityPayload: JSON
      href: String
      text: String
    }

    type DatoCmsNavItem implements Node & NavItem & HeaderNavItem {
      id: ID!
      navItemType: String @navItemType(name: "Link")
      originalId: String
      entityPayload: JSON
      href: String
      text: String
      icon: HomepageImage
      description: String
    }

    type DatoCmsNavItemGroup implements Node & NavItemGroup & HeaderNavItem
      @dontInfer {
      id: ID!
      navItemType: String @navItemType(name: "Group")
      name: String
      navItems: [NavItem]
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON @imagePassthroughArgs
      originalId: String
      entityPayload: JSON
      image: HomepageImage @recursiveImage
      url: String
    }

    type DatoCmsHomepageHero implements Node & HomepageHero & HomepageBlock
      @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
    }

    type DatoCmsHomepageFeature implements Node & HomepageBlock & HomepageFeature
      @dontInfer {
      originalId: String
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      entityPayload: JSON
    }

    type DatoCmsHomepageFeatureList implements Node & HomepageBlock & HomepageFeatureList
      @dontInfer {
      originalId: String
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature]
      entityPayload: JSON
    }

    type DatoCmsHomepageCta implements Node & HomepageBlock & HomepageCta
      @dontInfer {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      kicker: String
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    type DatoCmsHomepageLogoList implements Node & HomepageBlock & HomepageLogoList
      @dontInfer {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      text: String
      logos: [HomepageImage]
    }

    type DatoCmsHomepageTestimonial implements Node & HomepageTestimonial
      @dontInfer {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    type DatoCmsHomepageTestimonialList implements Node & HomepageBlock & HomepageTestimonialList
      @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      kicker: String
      heading: String
      content: [HomepageTestimonial]
    }

    type DatoCmsHomepageBenefit implements Node & HomepageBenefit @dontInfer {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    type DatoCmsHomepageBenefitList implements Node & HomepageBlock & HomepageBenefitList
      @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      text: String
      content: [HomepageBenefit]
    }

    type DatoCmsHomepageStat implements Node & HomepageStat @dontInfer {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type DatoCmsHomepageStatList implements Node & HomepageBlock & HomepageStatList
      @dontInfer {
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

    type DatoCmsHomepageProduct implements Node & HomepageProduct @dontInfer {
      id: ID!
      originalId: String
      entityPayload: JSON
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    type DatoCmsHomepageProductList implements Node & HomepageBlock & HomepageProductList
      @dontInfer {
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
      description: String
        @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage
        @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      content: [HomepageBlock]
      entityPayload: JSON
    }
  `)

  // CMS specific types for About page
  actions.createTypes(/* GraphQL */ `
    type DatoCmsAboutHero implements Node & AboutHero & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      originalId: String
      entityPayload: JSON
      heading: String
      text: String
      image: HomepageImage
    }

    type DatoCmsAboutStat implements Node & AboutStat @dontInfer {
      id: ID!
      value: String
      label: String
    }

    type DatoCmsAboutStatList implements Node & AboutStatList & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      originalId: String
      entityPayload: JSON
      content: [AboutStat]
    }

    type DatoCmsAboutProfile implements Node & AboutProfile @dontInfer {
      id: ID!
      image: HomepageImage
      name: String
      jobTitle: String
    }

    type DatoCmsAboutLeadership implements Node & AboutLeadership & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      originalId: String
      entityPayload: JSON
      kicker: String
      heading: String
      subhead: String
      content: [AboutProfile]
    }

    type DatoCmsAboutLogoList implements Node & AboutLogoList & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      originalId: String
      entityPayload: JSON
      heading: String
      links: [HomepageLink]
      logos: [HomepageImage]
    }

    type DatoCmsAboutpage implements Node & AboutPage @dontInfer {
      id: ID!
      title: String @proxy(from: "entityPayload.attributes.metadata.title")
      description: String
        @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage
        @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      content: [HomepageBlock]
      entityPayload: JSON
      originalId: String
    }
  `)

  // Layout types
  actions.createTypes(/* GraphQL */ `
    type DatoCmsLayoutheader implements Node & LayoutHeader @dontInfer {
      id: ID!
      navItems: [HeaderNavItem]
      originalCta: HomepageLink
        @link(by: "originalId", from: "entityPayload.attributes.cta")
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

  actions.createTypes(/* GraphQL */ `
    type DatoCmsPage implements Node & Page {
      id: ID!
      entityPayload: JSON!
      slug: String!
      title: String @proxy(from: "entityPayload.attributes.metadata.title")
      description: String
        @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage
        @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      html: String! @richText
      body: DatoCmsDatoCmsPageBodyStructuredText
    }
  `)
}
