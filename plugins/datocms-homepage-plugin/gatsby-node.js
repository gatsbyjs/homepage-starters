/*
const parentResolverPassthrough = ({ field } = {}) => async (source, args, context, info) => {
  const fieldName = field || info.fieldName
  const parentNode = context.nodeModel.getNodeById({ id: source.parent })
  const schemaType = info.schema.getType(parentNode.internal.type)
  const resolver = schemaType.getFields()[fieldName].resolve
  const result = await resolver(parentNode, args, context, { fieldName })
  return result
}
*/

exports.createSchemaCustomization = async ({ actions }) => {
  /*
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
  */

  actions.createFieldExtension({
    name: 'blocktype',
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type.replace('DatoCms', '')
        }
      }
    }
  })

  // TODO: test this out
  actions.createFieldExtension({
    name: 'datoproxy',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, args, context, info) {
          const value = source.entityPayload.attributes[info.fieldName]
          console.log({ value, info })
          return source.entityPayload.attributes[info.fieldName]
        }
      }
    }
  })

  // abstract interfaces
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLink implements Node {
      id: ID!
      href: String
      text: String
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      ## DatoCMS specific
      originalId: String
      entityPayload: JSON
    }

    interface HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage
      text: String
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      links: [HomepageLink]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageLogo implements Node {
      id: ID!
      image: HomepageImage
      alt: String
    }

    interface HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      logos: [HomepageLogo]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    interface HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageTestimonial]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    interface HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageBenefit]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }

    interface HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageStat]
      ## DatoCMS
      originalId: String
      entityPayload: JSON
    }

    interface Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage
      content: [HomepageBlock]
      entityPayload: JSON
    }

    interface LayoutHeader implements Node {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      cta: HomepageLink
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

    interface SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    interface LayoutFooter implements Node {
      id: ID!
      logo: HomepageImage
      links: [HomepageLink]
      meta: [HomepageLink]
      socialLinks: [SocialLink]
      copyright: String
    }

    interface Layout implements Node {
      id: ID!
      header: LayoutHeader
      footer: LayoutFooter
    }
  `)


  actions.createTypes(`
    type DatoCmsLink implements Node & HomepageLink {
      id: ID!
      originalId: String
      entityPayload: JSON
      href: String
      text: String
    }

    type DatoCmsAsset implements Node & HomepageImage {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      originalId: String
      entityPayload: JSON
    }

    type DatoCmsHero implements Node & HomepageHero & HomepageBlock {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.image.upload_id")
      text: String
      links: [HomepageLink] @link(by: "originalId") @datoproxy
    }

    type DatoCmsFeature implements Node & HomepageBlock & HomepageFeature {
      originalId: String
      blocktype: String @blocktype
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.image.upload_id")
      links: [HomepageLink] @link(by: "originalId", from: "entityPayload.attributes.links")
      entityPayload: JSON
    }

    type DatoCmsCta implements Node & HomepageBlock & HomepageCta {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      heading: String
      text: String
      links: [HomepageLink] @link(from: "links___NODE")
    }

    type DatoCmsLogo implements Node & HomepageLogo {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      alt: String
    }

    type DatoCmsLogolist implements Node & HomepageBlock & HomepageLogoList {
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      logos: [HomepageLogo] @link(from: "logos___NODE")
    }

    type DatoCmsTestimonial implements Node & HomepageTestimonial {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link(from: "avatar___NODE")
    }

    type DatoCmsTestimoniallist implements Node & HomepageBlock & HomepageTestimonialList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageTestimonial] @link(from: "content___NODE")
    }

    type DatoCmsBenefit implements Node & HomepageBenefit {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link(from: "image___NODE")
    }

    type DatoCmsBenefitlist implements Node & HomepageBlock & HomepageBenefitList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageBenefit] @link(from: "content___NODE")
    }

    type DatoCmsStat implements Node & HomepageStat {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type DatoCmsStatlist implements Node & HomepageBlock & HomepageStatList {
      id: ID!
      originalId: String
      entityPayload: JSON
      blocktype: String @blocktype
      content: [HomepageStat] @link(from: "content___NODE")
    }

    type DatoCmsHomepage implements Node & Homepage {
      id: ID!
      title: String @proxy(from: "entityPayload.attributes.metadata.title")
      description: String @proxy(from: "entityPayload.attributes.metadata.description")
      image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      # image: HomepageImage @link(by: "originalId", from: "entityPayload.attributes.metadata.image")
      content: [HomepageBlock] @link(by: "originalId", from: "entityPayload.attributes.content")
      entityPayload: JSON
    }
  `)

  // Layout types
  actions.createTypes(`
    type DatoCmsLayoutHeader implements Node & LayoutHeader {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      cta: HomepageLink @link(from: "cta___NODE")
    }

    type DatoCmsSocialLink implements Node & SocialLink {
      id: ID!
      username: String!
      service: SocialService!
    }

    type DatoCmsLayoutFooter implements Node & LayoutFooter {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      meta: [HomepageLink] @link(from: "meta___NODE")
      socialLinks: [SocialLink] @link(from: "socialLinks___NODE")
      copyright: String
    }

    type DatoCmsLayout implements Node & Layout {
      id: ID!
      header: LayoutHeader @link(from: "header___NODE")
      footer: LayoutFooter @link(from: "footer___NODE")
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

  if (node.internal.type === 'DatoCmsHero') {
    console.log('Hero', node.entityPayload.attributes)
  }

/*
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
      console.log(data)
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
*/
}
