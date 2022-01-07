exports.createSchemaCustomization = async ({ actions }) => {
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
    }

    type Homepage implements Node {
      title: String!
      description: String!
      image: File @fileByRelativePath
      content: [HomepageBlock] @link
    }

    # generic fallback type
    type HomepageSection implements Node & HomepageBlock {
      name: String
    }

    type HomepageHero implements Node & HomepageBlock {
      heading: String
      kicker: String
      subhead: String
      image: File @fileByRelativePath
      # also consider image alt text
      text: String
      links: [HomepageLink] @link
    }

    type HomepageFeature implements Node & HomepageBlock {
      heading: String
      kicker: String
      text: String
      image: File @fileByRelativePath
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

    type HomepageStats implements Node & HomepageBlock {
      content: [HomepageStat] @link
    }

    type HomepageBenefit implements Node {
      heading: String
      text: String
      image: File @fileByRelativePath
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
      avatar: File @fileByRelativePath
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      content: [HomepageTestimonial] @link
    }

    type HomepageLogo implements Node {
      image: File @fileByRelativePath
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
    return linkID // getNode(linkID)
  }

  const pageID = createNodeId(`${node.id} >>> Homepage`)

  const createBlock = (item, i) => {
    let id
    switch (item.type) {
      case 'Hero':
        id = createNodeId(`${node.id} >>> HomepageHero`)
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
          links: item.links?.map(createLinkNode),
          image: item.image,
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
          parent: pageID,
          heading: item.heading,
          subhead: item.subhead,
          kicker: item.kicker,
          text: item.text,
          links: item.links?.map(createLinkNode),
          image: item.image,
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
          parent: pageID,
          heading: item.heading,
          subhead: item.subhead,
          text: item.text,
          links: item.links?.map(createLinkNode),
        })
        break
      case 'TestimonialList':
        id = createNodeId(`${node.id} >>> HomepageTestimonialList`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageTestimonialList',
            contentDigest: node.internal.contentDigest,
          },
          content: item.content?.map((testimonial, i) => {
            const testimonialID = createNodeId(`${node.id} >>> HomepageTestimonial ${i}`)
            actions.createNode({
              ...testimonial,
              id: testimonialID,
              internal: {
                type: 'HomepageTestimonial',
                contentDigest: createContentDigest(JSON.stringify(testimonial)),
              },
              parent: id,
            })
            return testimonialID // getNode(testimonialID)
          }),
        })
        break
      case 'BenefitList':
        id = createNodeId(`${node.id} >>> HomepageBenefitList`)
        actions.createNode({
          id,
          internal: {
            type: 'HomepageBenefitList',
            contentDigest: node.internal.contentDigest,
          },
          content: item.content?.map((benefit, i) => {
            const benefitID = createNodeId(`${node.id} >>> HomepageBenefit ${i}`)
            actions.createNode({
              ...benefit,
              id: benefitID,
              internal: {
                type: 'HomepageBenefit',
                contentDigest: createContentDigest(JSON.stringify(benefit)),
              },
              parent: id,
            })
            return benefitID // getNode(benefitID)
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
              image: logo.image,
            })
            return logoID // getNode(logoID)
          }),
        })
        break
      default:
        console.warn('Unknown type', item.type)
        // fallback for handling unknown blocks
        id = createNodeId(`${node.id} >>> HomepageSection`)
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
    image: node.image,
    content,
  })
}
