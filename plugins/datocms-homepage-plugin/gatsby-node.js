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

  let id
  const originalId = node.id.replace(/[A-Za-z-]/g, '')
  const data = node.entityPayload?.attributes || node

  const createHomepageNode = (typeName, data) => {
    id = createNodeId(`${node.id} >>> ${typeName}`)
    actions.createNode({
      ...data,
      id,
      internal: {
        type: typeName,
        contentDigest: node.internal.contentDigest,
      },
      parent: node.id,
      originalId,
    })
  }

  switch (node.internal.type) {
    case 'DatoCmsHomepage':
      createHomepageNode('Homepage', {
        ...node,
        title: data.metadata?.title,
        description: data.metadata?.description,
        image: data.metadata?.image,
        content: data.content,
      })
      break
    case 'DatoCmsHero':
      createHomepageNode('HomepageHero', {
        ...node,
        heading: data.heading,
        kicker: data.kicker,
        subhead: data.subhead,
        image: data.image?.upload_id,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsCta':
      createHomepageNode('HomepageCta', {
        ...node,
        heading: data.heading,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsFeature':
      createHomepageNode('HomepageFeature', {
        ...node,
        heading: data.heading,
        kicker: data.kicker,
        image: data.image,
        text: data.text,
        links: data.links,
      })
      break
    case 'DatoCmsBenefit':
      createHomepageNode('HomepageBenefit', {
        ...node,
        heading: data.heading,
        image: data.image,
        text: data.text,
      })
      break
    case 'DatoCmsBenefitlist':
      createHomepageNode('HomepageBenefitList', {
        ...node,
        content: data.content
      })
      break
    case 'DatoCmsTestimonial':
      createHomepageNode('HomepageTestimonial', {
        ...node,
        quote: data.quote,
        source: data.source,
        avatar: data.avatar,
      })
      break
    case 'DatoCmsTestimoniallist':
      createHomepageNode('HomepageTestimonialList', {
        ...node,
        content: data.content
      })
      break
    case 'DatoCmsStat':
      createHomepageNode('HomepageStat', {
        ...node,
        heading: data.heading,
        value: data.value,
        label: data.label,
      })
      break
    case 'DatoCmsStatlist':
      createHomepageNode('HomepageStatList', {
        ...node,
        content: data.content,
      })
      break
    case 'DatoCmsLogo':
      createHomepageNode('HomepageLogo', {
        ...node,
        alt: data.alt,
        image: data.image,
      })
      break
    case 'DatoCmsLogolist':
      createHomepageNode('HomepageLogoList', {
        ...node,
        logos: data.content,
      })
      break
    case 'DatoCmsLink':
      createHomepageNode('HomepageLink', {
        ...node,
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
