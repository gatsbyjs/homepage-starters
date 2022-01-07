exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
    }

    type Homepage implements Node {
      title: String
      description: String
      image: ContentfulAsset @link(from: "image___NODE")
      content: [HomepageBlock] @link(from: "content___NODE")
    }

    type HomepageLink implements Node {
      href: String
      text: String
    }

    type HomepageHero implements Node & HomepageBlock {
      heading: String
      kicker: String
      subhead: String
      image: ContentfulAsset
      text: String
      links: [HomepageLink]
    }

    type HomepageFeature implements Node & HomepageBlock {
      heading: String
      kicker: String
      text: String
      image: ContentfulAsset
      links: [HomepageLink]
    }

    type HomepageCta implements Node & HomepageBlock {
      heading: String
      text: String
      links: [HomepageLink]
    }


    type HomepageLogo implements Node {
      image: ContentfulAsset
      alt: String
    }
    type HomepageLogoList implements Node & HomepageBlock {
      logos: [HomepageLogo]
    }

    type HomepageTestimonial implements Node {
      quote: String
      source: String
      avatar: ContentfulAsset
    }
    type HomepageTestimonialList implements Node & HomepageBlock {
      content: [HomepageTestimonial]
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: ContentfulAsset
    }
    type HomepageBenefitList implements Node & HomepageBlock {
      content: [HomepageBenefit]
    }

    type HomepageStat implements Node {
      value: String
      label: String
      heading: String
    }
    type HomepageStatList implements Node & HomepageBlock {
      content: [HomepageStat]
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

  let id

  switch (node.internal.type) {
    case 'ContentfulHomepage':
      id = createNodeId(`${node.id} >>> Homepage`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'Homepage',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
      })
      break
    case 'ContentfulHomepageLink':
      id = createNodeId(`${node.id} >>> HomepageLink`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageLink',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
      })
      break
    case 'ContentfulHomepageHero':
      id = createNodeId(`${node.id} >>> HomepageHero`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageHero',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
      })
      break
    case 'ContentfulHomepageFeature':
      break
    case 'ContentfulHomepageCta':
      break
    case 'ContentfulHomepageLogo':
      break
    case 'ContentfulHomepageLogoList':
      break
    case 'ContentfulHomepageTestimonial':
      break
    case 'ContentfulHomepageLogoTestimonialList':
      break
    case 'ContentfulHomepageBenefit':
      break
    case 'ContentfulHomepageLogoBenefitList':
      break
    case 'ContentfulHomepageStat':
      break
    case 'ContentfulHomepageStatList':
      break
  }

  // Skip non-homepage related nodes
  if (id) {
    const child = getNode(id)
    actions.createParentChildLink({
      parent: node,
      child,
    })
  }
}
