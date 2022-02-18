exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "wpImagePassthroughResolver",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp")
          const file = context.nodeModel.getNodeById(source.localFile)
          const image = context.nodeModel.getNodeById({
            id: file.children[0],
          })
          const resolver = imageType.getFields().gatsbyImageData.resolve
          if (!resolver) return null
          return await resolver(image, args, context, info)
        },
      }
    },
  })

  actions.createTypes(/* GraphQL */ `
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
      originalId: String
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON @wpImagePassthroughResolver
      # image: HomepageImage @recursiveImage
      localFile: File
      url: String
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

    type SocialLink implements Node {
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

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage @link
      text: String
      links: [HomepageLink] @link
    }

    type HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      kicker: String
      heading: String
      text: String
      links: [HomepageLink] @link
      image: HomepageImage @link
    }

    type HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }

    type HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link
    }

    type HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link
    }

    type HomepageLogo implements Node {
      id: ID!
      originalId: String
      image: HomepageImage @link
      alt: String @proxy(from: "image.title")
    }

    type HomepageProduct implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }

    type HomepageFeatureList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature] @link(by: "originalId")
    }

    type HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      text: String
      logos: [HomepageLogo] @link(by: "originalId")
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      kicker: String
      heading: String
      content: [HomepageTestimonial] @link(by: "originalId")
    }

    type HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      heading: String
      text: String
      content: [HomepageBenefit] @link(by: "originalId")
    }

    type HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage @link
      icon: HomepageImage @link
      content: [HomepageStat] @link(by: "originalId")
      links: [HomepageLink] @link
    }

    type HomepageProductList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      originalId: String
      kicker: String
      heading: String
      text: String
      content: [HomepageProduct] @link(by: "originalId")
    }

    type Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link(by: "originalId")
    }

    type AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link(by: "originalId")
    }
    ## TODO AboutPage
    type AboutProfile implements Node {
      id: ID!
      image: HomepageImage
      name: String
      jobTitle: String
    }
    type AboutHero implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }
    type AboutLeadership implements Node {
      id: ID!
      kicker: String
      heading: String
      subhead: String
      content: [AboutProfile]
    }
    type AboutLogoList implements Node {
      id: ID!
      heading: String
      link: HomepageLink
      logos: [HomepageLogo]
    }
    type AboutStat implements Node {
      id: ID!
      value: String
      label: String
    }
    type AboutStatList implements Node {
      id: ID!
      content: [AboutStat]
    }

    type Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage
      html: String
    }

    type Layout implements Node {
      id: ID!
      # header: LayoutHeader @link
      # footer: LayoutFooter @link
    }

    interface HeaderNavItem implements Node {
      id: ID!
    }

    interface NavItem implements Node & HeaderNavItem {
      id: ID!
      href: String
      text: String
    }

    interface NavItemDropdown implements Node & HeaderNavItem {
      id: ID!
      navItems: [NavItem]
    }

    type WpNavItem implements Node & NavItem & HeaderNavItem {
      id: ID!
      navitem: JSON
      href: String @proxy(from: "navitem.link.url")
      text: String @proxy(from: "navitem.link.title")
    }

    type WpNavItemDropdown implements Node & NavItemDropdown & HeaderNavItem {
      id: ID!
      navItemDropdown: JSON
      navItems: [NavItem] @link(from: "navItemDropdown.navItems.id")
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type WpMediaItem implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      altText: String
      gatsbyImageData: JSON @proxyImage
      # image: HomepageImage @recursiveImage
      localFile: File
      url: String @proxy(from: "mediaItemUrl")
      mediaItemUrl: String
    }

    type WpHomepageLink implements Node & HomepageLink {
      id: ID!
      href: String @proxy(from: "wpFields.link.url")
      text: String @proxy(from: "wpFields.link.title")
      wpFields: JSON
    }
  `)

  // TODO Add WP types as contract
  /*
    type WpPage implements Node & Page {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage @link @proxy(from: "featuredImageId")
      content: String
      html: String @proxy(from: "content")
    }
    type WpHeader implements Node & LayoutHeader {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink] @link @proxy(from: "fields.links")
      cta: HomepageLink @link @proxy(from: "fields.cta")
    }
    type WpFooter implements Node & LayoutFooter {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink] @link @proxy(from: "fields.links")
      meta: [HomepageLink] @link @proxy(from: "fields.meta")
      socialLinks: [SocialLink] @link @proxy(from: "fields.socialLinks")
      copyright: String @proxy(from: "footer.copyright")
    }
  */
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  actions.createNode({
    id: createNodeId("HomepageLayout"),
    internal: {
      type: "Layout",
      contentDigest: createContentDigest("Layout"),
    },
    header: "header",
    footer: "footer",
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  if (!node.internal.type.includes("Wp")) return

  if (node.internal.type === "WpHomepageBlock") {
    if (node.blocktypes.nodes.length < 1) return
    const blocktype = getNode(node.blocktypes.nodes[0].id)
    switch (blocktype.name) {
      case "Hero":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageHero`),
          internal: {
            type: "HomepageHero",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageHero",
          parent: node.id,
          originalId: node.id,
          ...node.hero,
          image: node.hero.image.id,
          links: node.hero.links.map((link) => link.id),
        })
        break
      case "Cta":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageCta`),
          internal: {
            type: "HomepageCta",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageCta",
          originalId: node.id,
          parent: node.id,
          ...node.cta,
          image: node.cta.image.id,
          links: node.cta.links.map((link) => link.id),
        })
        break
      case "Feature":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageFeature`),
          internal: {
            type: "HomepageFeature",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageFeature",
          originalId: node.id,
          parent: node.id,
          ...node.feature,
          image: node.feature.image.id,
          links: node.feature.links.filter(Boolean).map((link) => link.id),
        })
        break
      case "FeatureList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageFeatureList`),
          internal: {
            type: "HomepageFeatureList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageFeatureList",
          originalId: node.id,
          parent: node.id,
          ...node.featureList,
          content: node.featureList.content.map((item) => item.id),
        })
        break
      case "BenefitList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageBenefitList`),
          internal: {
            type: "HomepageBenefitList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageBenefitList",
          originalId: node.id,
          parent: node.id,
          ...node.benefitList,
          content: node.benefitList.content.map((item) => item.id),
        })
        break
      case "LogoList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageLogoList`),
          internal: {
            type: "HomepageLogoList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageLogoList",
          originalId: node.id,
          parent: node.id,
          ...node.logoList,
          logos: node.logoList.logos.map((logo) => logo.id),
        })
        break
      case "ProductList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageProductList`),
          internal: {
            type: "HomepageProductList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageProductList",
          originalId: node.id,
          parent: node.id,
          ...node.productList,
          content: node.productList.content.map((item) => item.id),
        })
        break
      case "StatList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageStatList`),
          internal: {
            type: "HomepageStatList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageStatList",
          originalId: node.id,
          parent: node.id,
          ...node.statList,
          icon: node.statList.icon?.id,
          image: node.statList.image?.id,
          content: node.statList.content?.map((item) => item.id),
          links: node.statList.links?.map((link) => link.id),
        })
        break
      case "TestimonialList":
        actions.createNode({
          id: createNodeId(`${node.id} >>> HomepageTestimonialList`),
          internal: {
            type: "HomepageTestimonialList",
            contentDigest: node.internal.contentDigest,
          },
          blocktype: "HomepageTestimonialList",
          originalId: node.id,
          parent: node.id,
          ...node.testimonialList,
          content: node.testimonialList.content.map((item) => item.id),
        })
        break
      default:
        reporter.warn(
          `Unknown HomepageBlock type: ${blocktype.name} sourced from WordPress. This will not be used.`
        )
        break
    }
  } else if (node.internal.type === "WpHomepageItem") {
    if (node.categories.nodes.length < 1) return
    const category = getNode(node.categories.nodes[0].id)
    if (!category) {
      reporter.warn(`No category found for ${node.id} ${node.title} – skipping`)
      return
    }
    switch (category.name) {
      case "Benefit":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Benefit`),
          internal: {
            type: "HomepageBenefit",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          originalId: node.id,
          ...node.benefit,
          image: node.benefit.image?.id,
        })
        break
      case "Logo":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Logo`),
          internal: {
            type: "HomepageLogo",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          originalId: node.id,
          image: node.logo.image?.id,
          // alt: node.logo.image.title,
        })
        break
      case "Product":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Product`),
          internal: {
            type: "HomepageProduct",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          originalId: node.id,
          ...node.product,
          image: node.product.image?.id,
          links: node.product.links?.map((link) => link.id),
        })
        break
      case "Stat":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Stat`),
          internal: {
            type: "HomepageStat",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          originalId: node.id,
          ...node.stat,
        })
        break
      case "Testimonial":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Testimonial`),
          internal: {
            type: "HomepageTestimonial",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          originalId: node.id,
          ...node.testimonial,
          avatar: node.testimonial.avatar?.id,
        })
        break
      default:
        reporter.warn(
          `Unknown HomepageItem category: ${category.name} sourced from WordPress. This will not be used.`
        )
    }
  } else if (node.internal.type === "WpPage") {
    switch (node.slug) {
      case "homepage":
        actions.createNode({
          id: createNodeId(`${node.id} >>> Homepage`),
          internal: {
            type: "Homepage",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          ...node.homepage,
          title: node.title,
          image: node.homepage?.image?.id,
          content: node.homepage?.blocks?.map((block) => block.id),
        })
        break
      case "about":
        actions.createNode({
          id: createNodeId(`${node.id} >>> AboutPage`),
          internal: {
            type: "AboutPage",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          ...node.homepage,
          title: node.title,
          image: node.homepage?.image?.id,
          content: node.homepage?.blocks?.map((block) => block.id),
        })
        break
      default:
        actions.createNode({
          id: createNodeId(`${node.id} >>> Page ${node.slug}`),
          internal: {
            type: "Page",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          ...node.page,
          slug: node.slug,
          title: node.title,
          description: node.page?.description,
          image: node.image?.id,
          html: node.content,
        })
        break
    }
  }
}
