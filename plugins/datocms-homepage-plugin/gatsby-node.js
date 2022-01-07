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
      originalId: String
      href: String
      text: String
    }

    type HomepageHero implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      kicker: String
      subhead: String
      image: DatoCmsAsset @link(by: "originalId")
      # also consider image alt text
      text: String
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageFeature implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      kicker: String
      text: String
      image: DatoCmsAsset @link(by: "originalId", from: "upload_id")
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageCta implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      text: String
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageStat implements Node {
      heading: String
      value: String!
      label: String!
    }

    type HomepageStatList implements Node & HomepageBlock {
      content: [HomepageStat]
      originalId: String @fallbackId
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: DatoCmsAsset @link(by: "originalId")
    }

    type HomepageBenefitList implements Node & HomepageBlock {
      originalId: String @fallbackId
      content: [HomepageBenefit]
    }

    type HomepageTestimonial implements Node {
      quote: String!
      source: String!
      avatar: JSON
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      originalId: String @fallbackId
      content: [HomepageTestimonial]
    }

    type HomepageLogo implements Node {
      alt: String
      image: DatoCmsAsset @link(by: "originalId")
    }

    type HomepageLogoList implements Node & HomepageBlock {
      originalId: String @fallbackId
      logos: [HomepageLogo]
    }

    type Homepage implements Node @dontInfer {
      title: String!
      description: String!
      image: DatoCmsAsset @link(by: "originalId")
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
  // CMS specific node creation
  // For other CMSs, adjust this to map source data to the abstraction needed in the starter
  if (!node.internal.type.includes('DatoCms')) return

  const data = node.entityPayload?.attributes || node
  let id

  const getDatoID = str => str.replace(/[A-Za-z-]/g, '')
  const originalId = getDatoID(node.id)

  switch (node.internal.type) {
    case 'DatoCmsHomepage':
      id = createNodeId(`${node.id} >>> Homepage`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'Homepage',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        title: data.metadata?.title,
        description: data.metadata?.description,
        image: data.metadata?.image,
        content: data.content,
      })
      break
    case 'DatoCmsHero':
      id = createNodeId(`${node.id} >>> HomepageHero`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageHero',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        heading: data.heading,
        kicker: data.kicker,
        subhead: data.subhead,
        image: data.image?.upload_id,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsCta':
      id = createNodeId(`${node.id} >>> HomepageCta`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageCta',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        heading: data.heading,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsFeature':
      id = createNodeId(`${node.id} >>> HomepageFeature`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageFeature',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        heading: data.heading,
        kicker: data.kicker,
        image: data.image,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsBenefit':
      id = createNodeId(`${node.id} >>> HomepageBenefit`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageBenefit',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        heading: data.heading,
        image: data.image,
        text: data.text,
      })
      break
    case 'DatoCmsBenefitList':
      id = createNodeId(`${node.id} >>> HomepageBenefitList`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageBenefitList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        content: data.content
      })
      break
    case 'DatoCmsTestimonial':
      id = createNodeId(`${node.id} >>> HomepageTestimonial`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageTestimonial',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        quote: data.quote,
        source: data.source,
        avatar: data.avatar,
      })
      break
    case 'DatoCmsTestimonialList':
      id = createNodeId(`${node.id} >>> HomepageTestimonialList`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageTestimonialList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        content: data.content
      })
      break
    case 'DatoCmsStat':
      id = createNodeId(`${node.id} >>> HomepageStat`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageStat',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        heading: data.heading,
        value: data.value,
        label: data.label,
      })
      break
    case 'DatoCmsStatList':
      id = createNodeId(`${node.id} >>> HomepageStatList`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageStatList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        content: data.content,
      })
      break
    case 'DatoCmsLogo':
      id = createNodeId(`${node.id} >>> HomepageLogo`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageLogo',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        alt: data.alt,
        image: data.image,
      })
      break
    case 'DatoCmsLogoList':
      id = createNodeId(`${node.id} >>> HomepageLogoList`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageLogoList',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        logos: data.content,
      })
      break
    case 'DatoCmsLink':
      id = createNodeId(`${node.id} >>> HomepageLink`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageLink',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        originalId,
        href: data.href,
        text: data.text,
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
