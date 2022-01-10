exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    // Prevents errors when a block is not present in the content
    name: 'fallbackId',
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          return source.originalId || ''
        }
      }
    }
  })

  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      originalId: String
    }

    type HomepageLink implements Node {
      href: String
      text: String
    }

    type HomepageHero implements Node & HomepageBlock {
      heading: String
      kicker: String
      subhead: String
      image: ContentfulAsset @link
      text: String
      links: [HomepageLink] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageFeature implements Node & HomepageBlock {
      heading: String
      kicker: String
      text: String
      image: ContentfulAsset @link
      links: [HomepageLink] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageCta implements Node & HomepageBlock {
      heading: String
      text: String
      links: [HomepageLink] @link(by: "originalId")
      originalId: String @fallbackId
    }


    type HomepageLogo implements Node {
      image: ContentfulAsset @link
      alt: String
      originalId: String
    }
    type HomepageLogoList implements Node & HomepageBlock {
      logos: [HomepageLogo] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageTestimonial implements Node {
      quote: String
      source: String
      avatar: ContentfulAsset
      originalId: String
    }
    type HomepageTestimonialList implements Node & HomepageBlock {
      content: [HomepageTestimonial] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: ContentfulAsset @link
      originalId: String,
    }
    type HomepageBenefitList implements Node & HomepageBlock {
      content: [HomepageBenefit] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageStat implements Node {
      value: String
      label: String
      heading: String
      originalId: String
    }
    type HomepageStatList implements Node & HomepageBlock {
      content: [HomepageStat] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type Homepage implements Node {
      title: String
      description: String
      image: ContentfulAsset @link
      content: [HomepageBlock] @link(by: "originalId")
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
        id,
        internal: {
          type: 'Homepage',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        title: node.title,
        description: node.description,
        image: node.image___NODE,
        content: node.content___NODE,
      })
      const child = getNode(id)
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
        originalId: node.id,
      })
      break
    case 'ContentfulHomepageHero':
      id = createNodeId(`${node.id} >>> HomepageHero`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageHero',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        heading: node.heading,
        subhead: node.subhead,
        kicker: node.kicker,
        text: node.text,
        image: node.image___NODE,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageFeature':
      id = createNodeId(`${node.id} >>> HomepageFeature`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageFeature',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        heading: node.heading,
        kicker: node.kicker,
        text: node.text,
        image: node.image___NODE,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageCta':
      id = createNodeId(`${node.id} >>> HomepageCta`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageCta',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        heading: node.heading,
        text: node.text,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageLogo':
      id = createNodeId(`${node.id} >>> HomepageLogo`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageLogo',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        image: node.image___NODE,
        alt: node.alt,
      })
      break
    case 'ContentfulHomepageLogoList':
      id = createNodeId(`${node.id} >>> HomepageLogoList`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageLogoList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageTestimonial':
      id = createNodeId(`${node.id} >>> HomepageTestimonial`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageTestimonial',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
      })
      break
    case 'ContentfulHomepageTestimonialList':
      id = createNodeId(`${node.id} >>> HomepageTestimonialList`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageTestimonialList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageBenefit':
      id = createNodeId(`${node.id} >>> HomepageBenefit`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageBenefit',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
      })
      break
    case 'ContentfulHomepageBenefitList':
      id = createNodeId(`${node.id} >>> HomepageBenefitList`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageBenefitList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageStat':
      id = createNodeId(`${node.id} >>> HomepageStat`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageStat',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
      })
      break
    case 'ContentfulHomepageStatList':
      id = createNodeId(`${node.id} >>> HomepageStatList`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageStatList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId: node.id,
        content: node.content___NODE,
      })
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
