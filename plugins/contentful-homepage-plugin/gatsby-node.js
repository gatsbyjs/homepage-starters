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
      originalId: node.id,
    })
  }


  switch (node.internal.type) {
    case 'ContentfulHomepage':
      createHomepageNode('Homepage', {
        title: node.title,
        description: node.description,
        image: node.image___NODE,
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageLink':
      createHomepageNode('HomepageLink', {
        ...node,
      })
      break
    case 'ContentfulHomepageHero':
      createHomepageNode('HomepageHero', {
        heading: node.heading,
        subhead: node.subhead,
        kicker: node.kicker,
        text: node.text,
        image: node.image___NODE,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageFeature':
      createHomepageNode('HomepageFeature', {
        heading: node.heading,
        kicker: node.kicker,
        text: node.text,
        image: node.image___NODE,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageCta':
      createHomepageNode('HomepageCta', {
        heading: node.heading,
        text: node.text,
        links: node.links___NODE,
      })
      break
    case 'ContentfulHomepageLogo':
      createHomepageNode('HomepageLogo', {
        image: node.image___NODE,
        alt: node.alt,
      })
      break
    case 'ContentfulHomepageLogoList':
      createHomepageNode('HomepageLogoList', {
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageTestimonial':
      createHomepageNode('HomepageTestimonial', { ...node })
      break
    case 'ContentfulHomepageTestimonialList':
      createHomepageNode('HomepageTestimonialList', {
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageBenefit':
      createHomepageNode('HomepageBenefit', { ...node })
      break
    case 'ContentfulHomepageBenefitList':
      createHomepageNode('HomepageBenefitList', {
        content: node.content___NODE,
      })
      break
    case 'ContentfulHomepageStat':
      createHomepageNode('HomepageStat', { ...node })
      break
    case 'ContentfulHomepageStatList':
      createHomepageNode('HomepageStatList', {
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
