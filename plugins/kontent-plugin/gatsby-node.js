const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")
const { getImageData } = require("gatsby-plugin-image")
const {
  getKontentItemNodeTypeName,
} = require("@kentico/gatsby-source-kontent/src/naming")
const { createContentDigest } = require("gatsby-core-utils")

function getGatsbyImageData({
  image,
  backgroundColor,
  options = {},
  layout = `constrained`,
  ...props
}) {
  const urlBuilder = ({
    baseUrl,
    width,
    height,
    options: { quality, fit = "crop", lossless },
  }) => {
    const props = [
      ["w", width],
      ["h", height],
      ["auto", "format"],
      ["bg", backgroundColor],
      ["q", quality],
      ["lossless", lossless],
      ["fit", fit],
    ]
    const query = props
      .filter(([, val]) => typeof val !== "undefined")
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&")

    return `${baseUrl}?${query}`
  }
  const data = getImageData({
    baseUrl: image[0].url,
    sourceWidth: image[0].width,
    sourceHeight: image[0].height,
    layout,
    urlBuilder,
    backgroundColor,
    pluginName: "gatsby-kontent-components",
    options,
    ...props,
  })

  return data
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "KontentObject",
    args: {
      variableName: {
        type: "String",
        defaultValue: "",
      },
    },
    extend(options, prevFieldConfig) {
      return {
        args: {
          variableName: "String",
        },
        resolve(source, args, context, info) {
          return source.elements[options.variableName].value
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "KontentNodeFromElement",
    args: {
      variableName: {
        type: "String",
        defaultValue: "",
      },
      type: {
        type: "String",
        defaultValue: "",
      },
    },
    extend(options, prevFieldConfig) {
      return {
        async resolve(source, args, context, info) {
          const codenames = source.elements[options.variableName].value
          const lng = source.preferred_language

          const new_type = getKontentItemNodeTypeName(options.type)

          const entry = await context.nodeModel.findOne({
            query: {
              filter: {
                system: {
                  codename: {
                    in: codenames,
                  },
                },
                preferred_language: {
                  eq: lng,
                },
              },
            },
            type: new_type,
          })

          return entry
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "KontentSocialService",
    args: {
      variableName: {
        type: "String",
        defaultValue: "",
      },
    },
    extend(options, prevFieldConfig) {
      return {
        async resolve(source, args, context, info) {
          return source.elements[options.variableName].value[0].name
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "KontentNodesFromElement",
    args: {
      variableName: {
        type: "String",
        defaultValue: "",
      },
      type: {
        type: "String",
        defaultValue: "",
      },
    },
    extend(options, prevFieldConfig) {
      return {
        async resolve(source, args, context, info) {
          const codenames = source.elements[options.variableName].value
          const lng = source.preferred_language

          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                system: {
                  codename: {
                    in: codenames,
                  },
                },
                preferred_language: {
                  eq: lng,
                },
              },
            },
            type: getKontentItemNodeTypeName(options.type),
          })
          const arrayEntries = Array.from(entries)

          return codenames.map(
            (val) => arrayEntries.filter((x) => x.system.codename === val)[0]
          )
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "KontentImage",
    args: {
      variableName: {
        type: "String",
        defaultValue: "image",
      },
    },
    extend(options, prevFieldConfig) {
      return {
        async resolve(source, args, context, info) {
          const image = source.elements[options.variableName].value
          const gatsbyImage = getGatsbyImageData({ image })

          return {
            id: "f98a8742-29df-4e4c-9896-ff0fa7c55c5a",
            url: image.url,
            gatsbyImageData: gatsbyImage,
            alt: "alt",
            internal: {
              type: "kontent_asset_homepage_image",
              contentDigest: createContentDigest(image),
              owner: "kontent",
            },
            parent: null,
            children: [],
          }
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          const type = source.internal.type.replace("kontent_item_", "")
          const blocktype_parts = type.split("_")
          return blocktype_parts
            .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
            .join("")
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
      gatsbyImageData: JSON @imagePassthroughArgs
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

  actions.createTypes(/* GraphQl */ `
    interface kontent_item_homepage_block implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      system: kontent_item_system!
      preferred_language: String!
    }

    type kontent_asset_homepage_image implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON @imagePassthroughArgs
      url: String
    }

    interface kontent_item_header_nav_item implements Node & HeaderNavItem {
      id: ID!
      navItemType: String
      system: kontent_item_system!
      preferred_language: String!
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type kontent_item_homepage_link implements Node & HomepageLink @dontInfer {
      id: ID!
      href: String @KontentObject(variableName: "href")
      text: String @KontentObject(variableName: "text")
    }

    type kontent_item_nav_item implements Node & NavItem & HeaderNavItem & kontent_item_header_nav_item
      @dontInfer {
      id: ID!
      navItemType: String @navItemType(name: "Link")
      href: String @KontentObject(variableName: "href")
      text: String @KontentObject(variableName: "text")
      icon: HomepageImage @KontentImage(variableName: "icon")
      description: String @KontentObject(variableName: "description")
    }

    type kontent_item_navitemgroup implements Node & NavItemGroup & HeaderNavItem & kontent_item_header_nav_item
      @dontInfer {
      id: ID!
      navItemType: String @navItemType(name: "Group")
      name: String @KontentObject(variableName: "name")
      navItems: [NavItem]
        @KontentNodesFromElement(variableName: "navitems", type: "nav_item")
    }

    type kontent_asset_homepage_image implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON @imagePassthroughArgs
      url: String
    }

    type kontent_item_homepage_hero implements Node & HomepageHero & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String! @KontentObject(variableName: "heading")
      kicker: String @KontentObject(variableName: "kicker")
      subhead: String @KontentObject(variableName: "subhead")
      image: HomepageImage @KontentImage
      text: String @KontentObject(variableName: "text")
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
    }

    type kontent_item_homepage_feature implements Node & kontent_item_homepage_block & HomepageBlock & HomepageFeature
      @dontInfer {
      blocktype: String @blocktype
      heading: String @KontentObject(variableName: "heading")
      kicker: String @KontentObject(variableName: "kicker")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
    }

    type kontent_item_homepage_feature_list implements Node & kontent_item_homepage_block & HomepageBlock & HomepageFeatureList
      @dontInfer {
      blocktype: String @blocktype
      kicker: String @KontentObject(variableName: "kicker")
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      content: [HomepageFeature]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_feature"
        )
    }

    type kontent_item_homepage_cta implements Node & kontent_item_homepage_block & HomepageBlock & HomepageCta
      @dontInfer {
      blocktype: String @blocktype
      kicker: String @KontentObject(variableName: "kicker")
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
    }

    type kontent_item_homepage_logo implements Node & HomepageLogo @dontInfer {
      id: ID!
      image: HomepageImage @KontentImage
      alt: String @KontentObject(variableName: "alt")
    }

    type kontent_item_homepage_logo_list implements Node & kontent_item_homepage_block & HomepageBlock & HomepageLogoList
      @dontInfer {
      blocktype: String @blocktype
      text: String @KontentObject(variableName: "text")
      logos: [HomepageLogo]
        @KontentNodesFromElement(variableName: "logos", type: "homepage_logo")
    }

    type kontent_item_homepage_testimonial implements Node & HomepageTestimonial
      @dontInfer {
      id: ID!
      quote: String @KontentObject(variableName: "quote")
      source: String @KontentObject(variableName: "source")
      avatar: HomepageImage @KontentImage(variableName: "avatar")
    }

    type kontent_item_homepage_testimonial_list implements Node & kontent_item_homepage_block & HomepageBlock & HomepageTestimonialList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      kicker: String @KontentObject(variableName: "kicker")
      heading: String @KontentObject(variableName: "heading")
      content: [HomepageTestimonial]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_testimonial"
        )
    }

    type kontent_item_homepage_benefit implements Node & HomepageBenefit
      @dontInfer {
      id: ID!
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
    }

    type kontent_item_homepage_benefit_list implements Node & kontent_item_homepage_block & HomepageBlock & HomepageBenefitList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      content: [HomepageBenefit]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_benefit"
        )
    }

    type kontent_item_homepage_stat implements Node & HomepageStat @dontInfer {
      id: ID!
      value: String @KontentObject(variableName: "value")
      label: String @KontentObject(variableName: "label")
      heading: String @KontentObject(variableName: "heading")
    }

    type kontent_item_homepage_stat_list implements Node & kontent_item_homepage_block & HomepageBlock & HomepageStatList
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      kicker: String @KontentObject(variableName: "kicker")
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
      icon: HomepageImage @KontentImage(variableName: "icon")
      content: [HomepageStat]
        @KontentNodesFromElement(variableName: "content", type: "homepage_stat")
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
    }

    type kontent_item_homepage_product implements Node & HomepageProduct
      @dontInfer {
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
    }

    type kontent_item_homepage_product_list implements Node & HomepageProductList & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      blocktype: String @blocktype
      heading: String @KontentObject(variableName: "heading")
      kicker: String @KontentObject(variableName: "kicker")
      text: String @KontentObject(variableName: "text")
      content: [HomepageProduct]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_product"
        )
    }

    type kontent_item_homepage implements Node & Homepage @dontInfer {
      id: ID!
      title: String @KontentObject(variableName: "title")
      description: String @KontentObject(variableName: "description")
      image: HomepageImage @KontentImage
      content: [HomepageBlock]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_block"
        )
    }
  `)

  // CMS specific types for About page
  actions.createTypes(/* GraphQL */ `
    type kontent_item_about_hero implements Node & AboutHero & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String @KontentObject(variableName: "heading")
      text: String @KontentObject(variableName: "text")
      image: HomepageImage @KontentImage
    }

    type kontent_item_about_stat implements Node & AboutStat @dontInfer {
      id: ID!
      value: String @KontentObject(variableName: "value")
      label: String @KontentObject(variableName: "label")
    }

    type kontent_item_about_stat_list implements Node & AboutStatList & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      content: [AboutStat]
        @KontentNodesFromElement(variableName: "content", type: "about_stat")
    }

    type kontent_item_about_profile implements Node & AboutProfile @dontInfer {
      id: ID!
      image: HomepageImage @KontentImage
      name: String @KontentObject(variableName: "name")
      jobTitle: String @KontentObject(variableName: "job_title")
    }

    type kontent_item_about_leadership implements Node & AboutLeadership & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      kicker: String @KontentObject(variableName: "kicker")
      heading: String @KontentObject(variableName: "heading")
      subhead: String @KontentObject(variableName: "subhead")
      content: [AboutProfile]
        @KontentNodesFromElement(variableName: "content", type: "about_profile")
    }

    type kontent_item_about_logo_list implements Node & AboutLogoList & kontent_item_homepage_block & HomepageBlock
      @dontInfer {
      id: ID!
      blocktype: String @blocktype
      heading: String @KontentObject(variableName: "heading")
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
      logos: [HomepageLogo]
        @KontentNodesFromElement(variableName: "logos", type: "homepage_logo")
    }

    type kontent_item_about_page implements Node & AboutPage @dontInfer {
      id: ID!
      title: String @KontentObject(variableName: "title")
      description: String @KontentObject(variableName: "description")
      image: HomepageImage @KontentImage
      content: [HomepageBlock]
        @KontentNodesFromElement(
          variableName: "content"
          type: "homepage_block"
        )
    }
  `)

  // Layout types
  actions.createTypes(/* GraphQL */ `
    type kontent_item_layoutheader implements Node & LayoutHeader @dontInfer {
      id: ID!
      navItems: [HeaderNavItem]
        @KontentNodesFromElement(
          variableName: "navitems"
          type: "header_nav_item"
        )
      cta: HomepageLink
        @KontentNodeFromElement(variableName: "cta", type: "homepage_link")
    }

    type kontent_item_sociallink implements Node & SocialLink @dontInfer {
      id: ID!
      username: String! @KontentObject(variableName: "username")
      service: SocialService! @KontentSocialService(variableName: "service")
    }

    type kontent_item_layoutfooter implements Node & LayoutFooter @dontInfer {
      id: ID!
      links: [HomepageLink]
        @KontentNodesFromElement(variableName: "links", type: "homepage_link")
      meta: [HomepageLink]
        @KontentNodesFromElement(variableName: "meta", type: "homepage_link")
      socialLinks: [SocialLink]
        @KontentNodesFromElement(
          variableName: "social_links"
          type: "sociallink"
        )
      copyright: String @KontentObject(variableName: "copyright")
    }

    type kontent_item_layout implements Node & Layout @dontInfer {
      id: ID!
      header: LayoutHeader
        @KontentNodeFromElement(variableName: "header", type: "layoutheader")
      footer: LayoutFooter
        @KontentNodeFromElement(variableName: "footer", type: "layoutfooter")
    }
  `)

  // Page types
  actions.createTypes(/* GraphQL */ `
    type kontent_item_page implements Node & Page {
      id: ID!
      slug: String! @KontentObject(variableName: "slug")
      title: String @KontentObject(variableName: "title")
      description: String @KontentObject(variableName: "description")
      image: HomepageImage @KontentImage
      html: String! @KontentObject(variableName: "body")
    }
  `)
}
