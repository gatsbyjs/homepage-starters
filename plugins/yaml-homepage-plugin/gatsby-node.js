exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
    }

    # generic fallback type
    type HomepageSection implements Node & HomepageBlock {
      name: String
    }

    type HomepageHero implements Node & HomepageBlock {
      heading: String!
      kicker: String
      subhead: String
      image: File @fileByRelativePath

      # should this be ImageSharp instead?
      # image: ImageSharp @link(by: "WHAT")

      # also consider image alt text
      text: String
      links: [HomepageLink]
    }

    type HomepageFeature implements Node & HomepageBlock {
      heading: String!
      kicker: String
      text: String
      image: File @fileByRelativePath
      links: [HomepageLink]
    }

    type HomepageCta implements Node & HomepageBlock {
      heading: String!
      text: String
      links: [HomepageLink]
    }

    type HomepageStat implements Node {
      heading: String
      value: String!
      label: String!
    }

    type HomepageStats implements Node & HomepageBlock {
      content: [HomepageStat]
    }

    type HomepageBenefit implements Node {
      heading: String!
      text: String
      image: File @fileByRelativePath
    }

    type HomepageBenefits implements Node & HomepageBlock {
      content: [HomepageBenefit]
    }

    type HomepageLink implements Node {
      href: String!
      text: String!
    }

    type HomepageTestimonial implements Node {
      quote: String!
      source: String!
      avatar: File @fileByRelativePath
    }

    type HomepageTestimonials implements Node & HomepageBlock {
      content: [HomepageTestimonial]
    }

    type HomepageLogo implements Node {
      image: File @fileByRelativePath
      alt: String
    }

    type HomepageLogoList implements Node & HomepageBlock {
      logos: [HomepageLogo]
    }

    type Homepage implements Node {
      title: String!
      description: String!
      image: File @fileByRelativePath
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
  createContentDigest,
}) => {
  // CMS/backend-specific node creation
  // For other CMSs, adjust this to map source data to the abstraction needed in the starter

  if (!node.internal.type.includes('HomepageYaml')) return

  const createLinkNode = (link, i) => {
    const linkID = createNodeId(`${node.id} >>> HomepageLink ${i}`)
    actions.createNode({
      ...link,
      id: linkID,
      internal: {
        type: 'HomepageLink',
        contentDigest: createContentDigest(JSON.stringify(link)),
      },
    })
    return getNode(linkID)
  }

  let id
  switch (node.type) {
    case 'Hero':
      id = createNodeId(`${node.id} >>> HomepageHero`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageHero',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        heading: node.heading,
        subhead: node.subhead,
        kicker: node.kicker,
        text: node.text,
        links: node.links?.map(createLinkNode),
        image: node.image,
      })
      break
    case 'Feature':
      id = createNodeId(`${node.id} >>> HomepageFeature`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageFeature',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        heading: node.heading,
        subhead: node.subhead,
        kicker: node.kicker,
        text: node.text,
        links: node.links?.map(createLinkNode),
        image: node.image,
      })
      break
    case 'CTA':
      id = createNodeId(`${node.id} >>> HomepageCta`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageCta',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        heading: node.heading,
        subhead: node.subhead,
        text: node.text,
        links: node.links?.map(createLinkNode),
      })
      break
    case 'Testimonials':
      id = createNodeId(`${node.id} >>> HomepageTestimonials`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageTestimonials',
          contentDigest: node.internal.contentDigest,
        },
        content: node.content?.map((item, i) => {
          const itemID = createNodeId(`${node.id} >>> HomepageTestimonial ${i}`)
          actions.createNode({
            ...item,
            id: itemID,
            internal: {
              type: 'HomepageTestimonial',
              contentDigest: createContentDigest(JSON.stringify(item)),
            },
            parent: id,
          })
          return getNode(itemID)
        }),
      })
      break
    case 'Benefits':
      id = createNodeId(`${node.id} >>> HomepageBenefits`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageBenefits',
          contentDigest: node.internal.contentDigest,
        },
        content: node.content?.map((item, i) => {
          const itemID = createNodeId(`${node.id} >>> HomepageBenefit ${i}`)
          actions.createNode({
            ...item,
            id: itemID,
            internal: {
              type: 'HomepageBenefit',
              contentDigest: createContentDigest(JSON.stringify(item)),
            },
            parent: id,
          })
          return getNode(itemID)
        }),
      })
      break
    case 'LogoList':
      id = createNodeId(`${node.id} >>> HomepageLogoList`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageLogoList',
          contentDigest: node.internal.contentDigest,
        },
        logos: node.logos?.map((item, i) => {
          const itemID = createNodeId(`${id} >>> HomepageLogo ${i}`)
          actions.createNode({
            ...item,
            id: itemID,
            internal: {
              type: 'HomepageLogo',
              contentDigest: createContentDigest(JSON.stringify(item)),
            },
            parent: id,
            alt: item.alt,
            image: item.image,
          })
          return getNode(itemID)
        }),
      })
      break
    default:
      console.warn('Unknown type', node.type)
      // fallback for handling unknown blocks
      id = createNodeId(`${node.id} >>> HomepageSection`)
      actions.createNode({
        ...node,
        id,
        internal: {
          type: 'HomepageSection',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
      })
  }

  const child = getNode(id)
  // console.log(child)
  actions.createParentChildLink({
    parent: node,
    child,
  })
}
