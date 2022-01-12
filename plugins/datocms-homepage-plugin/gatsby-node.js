const parentResolverPassthrough = ({ field } = {}) => async (source, args, context, info) => {
  const fieldName = field || info.fieldName
  const parentNode = context.nodeModel.getNodeById({ id: source.parent })
  const schemaType = info.schema.getType(parentNode.internal.type)
  const resolver = schemaType.getFields()[fieldName].resolve
  const result = await resolver(parentNode, args, context, { fieldName })
  return result
}

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

  actions.createFieldExtension({
    name: 'parentResolverPassthrough',
    args: {
      field: 'String',
    },
    extend({ field }) {
      return {
        resolve: parentResolverPassthrough({
          field,
        })
      }
    },
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

    type HomepageImage implements Node {
      alt: String
      gatsbyImageData: JSON @parentResolverPassthrough(field: "gatsbyImageData")
    }

    type HomepageHero implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link(by: "originalId")
      # also consider image alt text
      text: String
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageFeature implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(by: "originalId", from: "upload_id")
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageCta implements Node & HomepageBlock {
      originalId: String @fallbackId
      heading: String
      text: String
      links: [HomepageLink] @link(by: "originalId")
    }

    type HomepageStat implements Node {
      originalId: String @fallbackId
      heading: String
      value: String!
      label: String!
    }

    type HomepageStatList implements Node & HomepageBlock {
      content: [HomepageStat] @link(by: "originalId")
      originalId: String @fallbackId
    }

    type HomepageBenefit implements Node {
      originalId: String @fallbackId
      heading: String
      text: String
      image: HomepageImage @link(by: "originalId")
    }

    type HomepageBenefitList implements Node & HomepageBlock {
      originalId: String @fallbackId
      content: [HomepageBenefit] @link(by: "originalId")
    }

    type HomepageTestimonial implements Node {
      originalId: String @fallbackId
      quote: String!
      source: String!
      avatar: HomepageImage
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      originalId: String @fallbackId
      content: [HomepageTestimonial] @link(by: "originalId")
    }

    type HomepageLogo implements Node {
      originalId: String @fallbackId
      alt: String
      image: HomepageImage @link(by: "originalId")
    }

    type HomepageLogoList implements Node & HomepageBlock {
      originalId: String @fallbackId
      logos: [HomepageLogo] @link(by: "originalId")
    }

    type Homepage implements Node @dontInfer {
      title: String!
      description: String!
      image: HomepageImage @link(by: "originalId")
      content: [HomepageBlock] @link(by: "originalId")
    }

    # Layout

    type Layout implements Node {
      header: LayoutHeader @link(by: "originalId")
      footer: LayoutFooter @link(by: "originalId")
    }

    type LayoutHeader implements Node {
      # should this be a more generic type?
      logo: HomepageImage @link(by: "originalId")
      links: [HomepageLink] @link(by: "originalId")
      cta: HomepageLink @link(by: "originalId")
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
      username: String!
      service: SocialService!
    }

    type LayoutFooter implements Node {
      logo: HomepageImage @link(by: "originalId")
      links: [HomepageLink] @link(by: "originalId")
      meta: [HomepageLink] @link(by: "originalId")
      socialLinks: [SocialLink] @link(by: "originalId")
      copyright: String
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
  const _originalId = node.id.replace(/[A-Za-z-]/g, '')
  const data = node.entityPayload?.attributes || node

  const createHomepageNode = (typeName, data, originalId = _originalId) => {
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
    case 'DatoCmsAsset':
      // TODO: get "alt" text from content nodes
      createHomepageNode('HomepageImage', {
        ...node,
        ...data,
      })
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
      // TODO: see if this is needed
      createHomepageNode('HomepageLogo', {
        ...node,
        alt: data.alt,
        image: data.image,
      }, data.upload_id)
      break
    case 'DatoCmsLogolist':
      createHomepageNode('HomepageLogoList', {
        ...node,
        logos: data.logos
      })
      break
    case 'DatoCmsLink':
      createHomepageNode('HomepageLink', {
        ...node,
        href: data.href,
        text: data.text,
      })
      break
    // Layout nodes
    case 'DatoCmsLayout':
      createHomepageNode('Layout', {
        ...node,
        ...data
      })
      break
    case 'DatoCmsLayoutheader':
      const [ cta ] = data.cta
      createHomepageNode('LayoutHeader', {
        ...node,
        ...data,
        cta,
      })
      break
    case 'DatoCmsLayoutfooter':
      createHomepageNode('LayoutFooter', {
        ...node,
        ...data,
        socialLinks: data.social_links,
      })
      break
    case 'DatoCmsSocialLink':
      createHomepageNode('SocialLink', {
        ...node,
        service: data.service,
        username: data.username,
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
