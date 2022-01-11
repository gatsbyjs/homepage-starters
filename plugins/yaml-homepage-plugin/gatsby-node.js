const path = require('path')

const imageResolver = async (source, args, context, info) => {
  // TODO: see if there's a simpler way to resolve images
  const imageType = info.schema.getType('ImageSharp')
  const fileNode = context.nodeModel.getNodeById({ id: source.parent })
  const imageNode = context.nodeModel.getNodeById({ id: fileNode.children[0] })
  const resolver = imageType.getFields().gatsbyImageData.resolve
  const result = await resolver(imageNode, args, context, info)
  return result
}

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: 'imageResolver',
    extend() {
      return {
        resolve: imageResolver
      }
    }
  })

  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
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
      name: String
    }

    type HomepageHero implements Node & HomepageBlock {
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link(by: "relativePath")
      # also consider image alt text
      text: String
      links: [HomepageLink] @link
    }

    type HomepageFeature implements Node & HomepageBlock {
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(by: "relativePath")
      links: [HomepageLink] @link
    }

    type HomepageCta implements Node & HomepageBlock {
      heading: String
      text: String
      links: [HomepageLink] @link
    }

    type HomepageStat implements Node {
      heading: String
      value: String!
      label: String!
    }

    type HomepageStatList implements Node & HomepageBlock {
      content: [HomepageStat] @link
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: HomepageImage @link(by: "relativePath")
    }

    type HomepageBenefitList implements Node & HomepageBlock {
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
      content: [HomepageTestimonial] @link
    }

    type HomepageLogo implements Node {
      image: HomepageImage @link(by: "relativePath")
      alt: String
    }

    type HomepageLogoList implements Node & HomepageBlock {
      logos: [HomepageLogo] @link
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
}, options = {}) => {
  // CMS/backend-specific node creation
  // For other CMSs, adjust this to map source data to the abstraction needed in the starter


  if (node.internal.type === 'File') {
    if (node.sourceInstanceName === 'yaml-homepage-assets') {
      const id = createNodeId(`${node.id} >>> HomepageImage`)
      actions.createNode({
        id,
        internal: {
          type: 'HomepageImage',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        relativePath: node.relativePath,
        // TODO: consider better way to set alt text values
        alt: node.name,
      })
    }
  }

  if (!node.internal.type.includes('HomepageYaml')) return

  const createLinkNode = parentId => (link, i) => {
    const linkID = createNodeId(`${parentId} >>> HomepageLink ${i}`)
    actions.createNode({
      ...link,
      id: linkID,
      internal: {
        type: 'HomepageLink',
        contentDigest: createContentDigest(JSON.stringify(link)),
      },
    })
    return linkID
  }

  const pageID = createNodeId(`${node.id} >>> Homepage`)

  const assetsPath = options.assetsPath || ''
  const dataPath = options.path || ''
  const relativePath = path.relative(dataPath, assetsPath)
  const getRelativeImage = (src) => {
    const image = path.relative(relativePath, src)
    return image
  }

  const createBlock = (item, i) => {
    let id
    switch (item.type) {
      case 'Hero':
        id = createNodeId(`${node.id} >>> HomepageHero ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageHero',
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          heading: item.heading,
          subhead: item.subhead,
          kicker: item.kicker,
          text: item.text,
          links: item.links?.map(createLinkNode(id)),
          image: getRelativeImage(item.image),
        })
        break
      case 'Feature':
        id = createNodeId(`${node.id} >>> HomepageFeature ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageFeature',
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          heading: item.heading,
          subhead: item.subhead,
          kicker: item.kicker,
          text: item.text,
          links: item.links?.map(createLinkNode(id)),
          image: getRelativeImage(item.image),
        })
        break
      case 'CTA':
        id = createNodeId(`${node.id} >>> HomepageCta ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageCta',
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
          heading: item.heading,
          subhead: item.subhead,
          text: item.text,
          links: item.links?.map(createLinkNode(id)),
        })
        break
      case 'TestimonialList':
        id = createNodeId(`${node.id} >>> HomepageTestimonialList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageTestimonialList',
            contentDigest: node.internal.contentDigest,
          },
          content: item.content?.map((testimonial, i) => {
            const testimonialID = createNodeId(`${id} >>> HomepageTestimonial ${i}`)
            actions.createNode({
              ...testimonial,
              id: testimonialID,
              internal: {
                type: 'HomepageTestimonial',
                contentDigest: createContentDigest(JSON.stringify(testimonial)),
              },
              parent: id,
            })
            return testimonialID
          }),
        })
        break
      case 'BenefitList':
        id = createNodeId(`${node.id} >>> HomepageBenefitList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageBenefitList',
            contentDigest: node.internal.contentDigest,
          },
          content: item.content?.map((benefit, i) => {
            const benefitID = createNodeId(`${id} >>> HomepageBenefit ${i}`)
            actions.createNode({
              ...benefit,
              id: benefitID,
              internal: {
                type: 'HomepageBenefit',
                contentDigest: createContentDigest(JSON.stringify(benefit)),
              },
              parent: id,
            })
            return benefitID
          }),
        })
        break
      case 'LogoList':
        id = createNodeId(`${node.id} >>> HomepageLogoList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageLogoList',
            contentDigest: node.internal.contentDigest,
          },
          logos: item.logos?.map((logo, i) => {
            const logoID = createNodeId(`${id} >>> HomepageLogo ${i}`)
            actions.createNode({
              ...logo,
              id: logoID,
              internal: {
                type: 'HomepageLogo',
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
      case 'StatList':
        id = createNodeId(`${node.id} >>> HomepageStatList ${i}`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageStatList',
            contentDigest: node.internal.contentDigest,
          },
          content: item.content?.map((stat, i) => {
            const statID = createNodeId(`${id} >>> HomepageStat ${i}`)
            actions.createNode({
              ...stat,
              id: statID,
              internal: {
                type: 'HomepageStat',
                contentDigest: createContentDigest(JSON.stringify(logo)),
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
      default:
        console.warn('Unknown type', item.type)
        // fallback for handling unknown blocks
        id = createNodeId(`${node.id} >>> HomepageSection ${i}`)
        actions.createNode({
          ...item,
          id,
          internal: {
            type: 'HomepageSection',
            contentDigest: node.internal.contentDigest,
          },
          parent: pageID,
        })
    }
    return id
  }

  const content = node.content.map(createBlock)

  actions.createNode({
    id: pageID,
    internal: {
      type: 'Homepage',
      contentDigest: node.internal.contentDigest,
    },
    parent: node.id,
    title: node.title,
    description: node.description,
    image: getRelativeImage(node.image),
    content,
  })
}
