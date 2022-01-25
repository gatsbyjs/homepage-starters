const path = require("path")

// TODO add checks for images with all CMSs

const imageResolver = async (source, args, context, info) => {
  const imageType = info.schema.getType("ImageSharp")
  const fileNode = context.nodeModel.getNodeById({ id: source.parent })
  const imageNode = context.nodeModel.getNodeById({ id: fileNode.children[0] })
  const resolver = imageType.getFields().gatsbyImageData?.resolve
  if (!resolver) return null

  const result = await resolver(imageNode, args, context, info)
  return result
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "imageResolver",
    extend() {
      return {
        resolve: imageResolver,
      }
    },
  })

  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    type Homepage implements Node {
      title: String!
      description: String!
      image: HomepageImage @link(by: "relativePath")
      content: [HomepageBlock] @link
    }

    type HomepageImage implements Node {
      relativePath: String
      alt: String
      gatsbyImageData: JSON @imageResolver
    }

    # generic fallback type
    type HomepageSection implements Node & HomepageBlock {
      blocktype: String
      name: String
    }

    type HomepageHero implements Node & HomepageBlock {
      blocktype: String
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link(by: "relativePath")
      # also consider image alt text
      text: String
      links: [HomepageLink] @link
    }

    type HomepageFeature implements Node & HomepageBlock {
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
    }

    type HomepageFeatureList implements Node & HomepageBlock {
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature] @link
    }

    type HomepageCta implements Node & HomepageBlock {
      blocktype: String
      heading: String
      text: String
      image: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
    }

    type HomepageStat implements Node {
      heading: String
      value: String!
      label: String!
    }

    type HomepageStatList implements Node & HomepageBlock {
      blocktype: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage
      icon: HomepageImage
      links: [HomepageLink] @link
      content: [HomepageStat] @link
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: HomepageImage @link(by: "relativePath")
    }

    type HomepageBenefitList implements Node & HomepageBlock {
      blocktype: String
      heading: String
      text: String
      content: [HomepageBenefit] @link
    }

    type HomepageLink implements Node {
      href: String!
      text: String!
    }

    type HomepageTestimonial implements Node {
      quote: String!
      source: String!
      avatar: HomepageImage @link(by: "relativePath")
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      blocktype: String
      kicker: String
      heading: String
      content: [HomepageTestimonial] @link
    }

    type HomepageLogo implements Node {
      image: HomepageImage @link(by: "relativePath")
      alt: String
    }

    type HomepageLogoList implements Node & HomepageBlock {
      blocktype: String
      text: String
      logos: [HomepageLogo] @link
    }

    type HomepageProduct implements Node {
      heading: String
      text: String
      image: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
    }

    type HomepageProductList implements Node & HomepageBlock {
      blocktype: String
      heading: String
      kicker: String
      text: String
      content: [HomepageProduct] @link
    }

    type LayoutHeader implements Node {
      id: ID!
      logo: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
      cta: HomepageLink @link
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

    type LayoutFooter implements Node {
      id: ID!
      logo: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
      meta: [HomepageLink] @link
      socialLinks: [SocialLink] @link
      copyright: String
    }

    type Layout implements Node {
      id: ID!
      header: LayoutHeader! @link
      footer: LayoutFooter! @link
    }
  `)
}

exports.onCreateNode = async (
  {
    actions,
    node,
    getNode,
    getNodeAndSavePathDependency,
    createNodeId,
    createContentDigest,
  },
  options = {}
) => {
  if (node.internal.type === "File") {
    if (node.sourceInstanceName === "yaml-homepage-assets") {
      const id = createNodeId(`${node.id} >>> HomepageImage`)
      actions.createNode({
        id,
        internal: {
          type: "HomepageImage",
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        relativePath: node.relativePath,
        // TODO: consider better way to set alt text values
        alt: node.name,
      })
    }
  }

  const createLinkNode = (parentId) => (link, i) => {
    const linkID = createNodeId(`${parentId} >>> HomepageLink ${i}`)
    actions.createNode({
      ...link,
      id: linkID,
      internal: {
        type: "HomepageLink",
        contentDigest: createContentDigest(JSON.stringify(link)),
      },
    })
    return linkID
  }

  if (node.internal.type === "LayoutYaml") {
    const layoutID = createNodeId(`${node.id} >>> Layout`)
    const headerID = createNodeId(`${layoutID} >>> LayoutHeader`)
    const footerID = createNodeId(`${layoutID} >>> LayoutFooter`)
    const ctaID = createNodeId(`${headerID} >>> HomepageLink`)

    const cta = createLinkNode(headerID)(node.header.cta, 0)
    const createSocialLinkNode = (link, i) => {
      const linkID = createNodeId(`${footerID} >>> SocialLink ${i}`)
      actions.createNode({
        ...link,
        id: linkID,
        internal: {
          type: "SocialLink",
          contentDigest: createContentDigest(JSON.stringify(link)),
        },
      })
      return linkID
    }

    // header
    actions.createNode({
      ...node.header,
      id: headerID,
      internal: {
        type: "LayoutHeader",
        contentDigest: node.internal.contentDigest,
      },
      parent: layoutID,
      links: node.header?.links?.map(createLinkNode(headerID)),
      cta,
    })

    // footer
    actions.createNode({
      ...node.footer,
      id: footerID,
      internal: {
        type: "LayoutFooter",
        contentDigest: node.internal.contentDigest,
      },
      parent: layoutID,
      links: node.footer?.links?.map(createLinkNode(footerID)),
      socialLinks: node.footer?.socialLinks?.map(createSocialLinkNode),
      meta: node.footer?.meta?.map(createLinkNode(footerID + "meta")),
    })

    // layout
    actions.createNode({
      id: layoutID,
      internal: {
        type: "Layout",
        contentDigest: node.internal.contentDigest,
      },
      header: headerID,
      footer: footerID,
    })
  }

  if (!node.internal.type.includes("HomepageYaml")) return

  const pageID = createNodeId(`${node.id} >>> Homepage`)

  const assetsPath = path.join(__dirname, "assets")
  const dataPath = path.join(__dirname, "data")
  const relativePath = path.relative(dataPath, assetsPath)

  const getRelativeImage = (src) => {
    if (!src) return null
    const image = path.relative(relativePath, src)
    return image
  }

  const createBlock = (item, i) => {
    let id
    const blocktype = `Homepage${item.type}`
    switch (item.type) {
      case "Hero":
        id = createNodeId(`${node.id} >>> HomepageHero ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageHero",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          heading: item.heading,
          subhead: item.subhead,
          kicker: item.kicker,
          text: item.text,
          links: item.links?.map(createLinkNode(id)),
          image: getRelativeImage(item.image),
          imagePath: getRelativeImage(item.image),
        })
        break
      case "Feature":
        id = createNodeId(`${node.id} >>> HomepageFeature ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageFeature",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          heading: item.heading,
          subhead: item.subhead,
          kicker: item.kicker,
          text: item.text,
          links: item.links?.map(createLinkNode(id)),
          image: getRelativeImage(item.image),
        })
        break
      case "FeatureList":
        id = createNodeId(`${node.id} >>> HomepageFeatureList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageFeatureList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          kicker: item.kicker,
          heading: item.heading,
          text: item.text,
          content: item.content?.map((feature, i) => {
            const featureID = createNodeId(`${id} >>> HomepageFeature ${i}`)
            actions.createNode({
              ...feature,
              id: featureID,
              internal: {
                type: "HomepageFeature",
                contentDigest: createContentDigest(JSON.stringify(feature)),
              },
              parent: id,
              image: getRelativeImage(feature.image),
              links: feature.links?.map(createLinkNode(id)),
            })
            return featureID
          }),
        })
        break
      case "Cta":
        id = createNodeId(`${node.id} >>> HomepageCta ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageCta",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          heading: item.heading,
          subhead: item.subhead,
          text: item.text,
          image: getRelativeImage(item.image),
          links: item.links?.map(createLinkNode(id)),
        })
        break
      case "TestimonialList":
        id = createNodeId(`${node.id} >>> HomepageTestimonialList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageTestimonialList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          content: item.content?.map((testimonial, i) => {
            const testimonialID = createNodeId(
              `${id} >>> HomepageTestimonial ${i}`
            )
            actions.createNode({
              ...testimonial,
              id: testimonialID,
              internal: {
                type: "HomepageTestimonial",
                contentDigest: createContentDigest(JSON.stringify(testimonial)),
              },
              parent: id,
              avatar: getRelativeImage(testimonial.avatar),
            })
            return testimonialID
          }),
        })
        break
      case "BenefitList":
        id = createNodeId(`${node.id} >>> HomepageBenefitList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageBenefitList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          content: item.content?.map((benefit, i) => {
            const benefitID = createNodeId(`${id} >>> HomepageBenefit ${i}`)
            actions.createNode({
              ...benefit,
              id: benefitID,
              internal: {
                type: "HomepageBenefit",
                contentDigest: createContentDigest(JSON.stringify(benefit)),
              },
              parent: id,
              image: getRelativeImage(benefit.image),
            })
            return benefitID
          }),
        })
        break
      case "LogoList":
        id = createNodeId(`${node.id} >>> HomepageLogoList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageLogoList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          logos: item.logos?.map((logo, i) => {
            const logoID = createNodeId(`${id} >>> HomepageLogo ${i}`)
            actions.createNode({
              ...logo,
              id: logoID,
              internal: {
                type: "HomepageLogo",
                contentDigest: createContentDigest(JSON.stringify(logo)),
              },
              parent: id,
              alt: logo.alt,
              image: getRelativeImage(logo.image),
            })
            return logoID
          }),
        })
        break
      case "StatList":
        id = createNodeId(`${node.id} >>> HomepageStatList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: "HomepageStatList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          content: item.content?.map((stat, i) => {
            const statID = createNodeId(`${id} >>> HomepageStat ${i}`)
            actions.createNode({
              ...stat,
              id: statID,
              internal: {
                type: "HomepageStat",
                contentDigest: createContentDigest(JSON.stringify(stat)),
              },
              parent: id,
              value: stat.value,
              label: stat.label,
              heading: stat.heading,
            })
            return statID
          }),
        })
        break
      case "ProductList":
        id = createNodeId(`${node.id} >>> HomepageProductList ${i}`)
        actions.createNode({
          ...item,
          id,
          internal: {
            type: "HomepageProductList",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
          content: item.content?.map((product, i) => {
            const productID = createNodeId(`${id} >>> HomepageProduct ${i}`)
            actions.createNode({
              ...product,
              id: productID,
              internal: {
                type: "HomepageProduct",
                contentDigest: createContentDigest(JSON.stringify(product)),
              },
              parent: id,
              heading: product.heading,
              text: product.text,
              image: getRelativeImage(product.image),
              links: product.links?.map(createLinkNode(id)),
            })
            return productID
          }),
        })
        break
      default:
        console.warn("Unknown type", item.type)
        // fallback for handling unknown blocks
        id = createNodeId(`${node.id} >>> HomepageSection ${i}`)
        actions.createNode({
          ...item,
          id,
          internal: {
            type: "HomepageSection",
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          blocktype,
        })
    }
    return id
  }

  const content = node.content.map(createBlock)

  actions.createNode({
    id: pageID,
    internal: {
      type: "Homepage",
      contentDigest: node.internal.contentDigest,
    },
    parent: node.id,
    title: node.title,
    description: node.description,
    image: getRelativeImage(node.image),
    content,
  })
}
