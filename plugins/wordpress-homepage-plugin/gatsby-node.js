exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: 'blocktype',
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type.replace('Wp', 'Homepage')
        }
      }
    }
  })

  /* might not need this
  actions.createFieldExtension({
    name: 'proxyLinks',
    args: {
      name: {
        type: 'String!',
      },
    },
    extend(options) {
      return {
        resolve(source, args, context, info) {
          const link = source[options.name]?.link
          console.log(options.name, link)
          if (!link) return null
          return [
            link.id,
          ]
        }
      }
    }
  })
  */

  actions.createFieldExtension({
    name: 'recursiveImage',
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source
        }
      }
    }
  })

  // abstract interfaces
  actions.createTypes(`
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON
      image: HomepageImage @recursiveImage
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    interface HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    interface HomepageProduct implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

## TODO layout

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

  // creating custom types because WP does not provide these
  actions.createTypes(`
    type HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    type HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      subhead: String
      image: HomepageImage @link
      text: String
      links: [HomepageLink] @link

      debug: String
    }
    type HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      links: [HomepageLink] @link
      image: HomepageImage @link
    }
    type HomepageFeatureList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature] @link
    }
    type HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      text: String
      logos: [HomepageImage] @link
    }
    type HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      content: [HomepageTestimonial] @link
    }
    type HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      content: [HomepageBenefit] @link
    }
    type HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }
    type HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage @link
      icon: HomepageImage @link
      content: [HomepageStat] @link
      links: [HomepageLink] @link
    }
    type HomepageProductList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageProduct] @link
    }

    type Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link
    }
  `)

  actions.createTypes(`
    type WpMediaItem implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      gatsbyImageData: JSON
      image: HomepageImage @recursiveImage
    }

    type WpBenefit implements Node & HomepageBenefit {
      heading: String
      text: String
      image: HomepageImage @link
    }

    type WpProduct implements Node & HomepageProduct {
      heading: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }

    type WpFeature implements Node & HomepageFeature & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      feature: JSON
      heading: String @proxy(from: "feature.heading")
      kicker: String @proxy(from: "feature.kicker")
      text: String @proxy(from: "feature.text")
      image: HomepageImage @link
      links: [HomepageLink] @proxy(from: "fields.links") @link
    }

    type WpTestimonial implements Node & HomepageTestimonial {
      quote: String
      source: String
      avatar: HomepageImage @link
    }
  `)

  /*
  actions.createTypes(`

    type ContentfulHomepageLogo implements Node & HomepageLogo {
      id: ID!
      image: HomepageImage @link(from: "image___NODE")
      alt: String
    }
  `)
  */

  // Layout types
  /*
  actions.createTypes(`
    type ContentfulLayoutHeader implements Node & LayoutHeader {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      cta: HomepageLink @link(from: "cta___NODE")
    }

    type ContentfulSocialLink implements Node & SocialLink {
      id: ID!
      username: String!
      service: SocialService!
    }

    type ContentfulLayoutFooter implements Node & LayoutFooter {
      id: ID!
      logo: HomepageImage @link(from: "logo___NODE")
      links: [HomepageLink] @link(from: "links___NODE")
      meta: [HomepageLink] @link(from: "meta___NODE")
      socialLinks: [SocialLink] @link(from: "socialLinks___NODE")
      copyright: String
    }

    type ContentfulLayout implements Node & Layout {
      id: ID!
      header: LayoutHeader @link(from: "header___NODE")
      footer: LayoutFooter @link(from: "footer___NODE")
    }
  `)
  */
}

exports.onCreateNode = ({
  actions,
  node,
  createNodeId,
  createContentDigest,
}) => {
  if (!node.internal.type.includes('Wp')) return

  const createLinkNode = parentId => ({ title, url }, i) => {
    const linkID = createNodeId(`${parentId} >>> HomepageLink ${i}`)
    actions.createNode({
      id: linkID,
      internal: {
        type: 'HomepageLink',
        contentDigest: createContentDigest(JSON.stringify({ title, url })),
      },
      href: url,
      text: title,
    })
    return linkID
  }

  switch (node.internal.type) {
    case 'WpPage':
      if (node.slug !== 'homepage') return
      const {
        homepageHero,
        homepageCta,
        statList,
        testimonialList,
        productList,
        logoList,
        featureList,
      } = node

      const heroID = createNodeId(`${node.id} >>> HomepageHero`)
      const ctaID = createNodeId(`${node.id} >>> HomepageCta`)
      const statID = createNodeId(`${node.id} >>> HomepageStatList`)

      actions.createNode({
        ...homepageHero,
        id: heroID,
        internal: {
          type: 'HomepageHero',
          contentDigest: createContentDigest(JSON.stringify(homepageHero)),
        },
        parent: node.id,
        blocktype: 'HomepageHero',
        image: homepageHero.image.id,
        links: [
          homepageHero.link,
          homepageHero.secondarylink,
        ].filter(Boolean)
          .map(createLinkNode(heroID)),

        debug: homepageHero.image.id,
      })

      actions.createNode({
        ...homepageCta,
        id: ctaID,
        internal: {
          type: 'HomepageCta',
          contentDigest: createContentDigest(JSON.stringify(homepageCta)),
        },
        parent: node.id,
        blocktype: 'HomepageCta',
        links: [
          homepageCta.link,
          homepageCta.secondarylink,
        ]
          .filter(Boolean)
          .map(createLinkNode(ctaID)),
      })

      actions.createNode({
        ...statList,
        id: statID,
        internal: {
          type: 'HomepageStatList',
          contentDigest: createContentDigest(JSON.stringify(statList)),
        },
        parent: node.id,
        blocktype: 'HomepageStatList',
        links: [
          statList.link && createLinkNode(statID)(statList.link),
        ].filter(Boolean),
      })

      actions.createNode({
        ...testimonialList,
        id: createNodeId(`${node.id} >>> HomepageTestimonialList`),
        internal: {
          type: 'HomepageTestimonialList',
          contentDigest: createContentDigest(JSON.stringify(testimonialList)),
        },
        parent: node.id,
        blocktype: 'HomepageTestimonialList',
      })

      actions.createNode({
        ...productList,
        id: createNodeId(`${node.id} >>> HomepageProductList`),
        internal: {
          type: 'HomepageProductList',
          contentDigest: createContentDigest(JSON.stringify(productList)),
        },
        parent: node.id,
        blocktype: 'HomepageProductList',
      })

      actions.createNode({
        ...logoList,
        id: createNodeId(`${node.id} >>> HomepageLogoList`),
        internal: {
          type: 'HomepageLogoList',
          contentDigest: createContentDigest(JSON.stringify(logoList)),
        },
        parent: node.id,
        blocktype: 'HomepageLogoList',
        logos: [
          logoList.logo1,
          logoList.logo2,
          logoList.logo3,
          logoList.logo4,
          logoList.logo5,
        ].map(logo => logo.id),
      })

      actions.createNode({
        ...featureList,
        id: createNodeId(`${node.id} >>> HomepageFeatureList`),
        internal: {
          type: 'HomepageFeatureList',
          contentDigest: createContentDigest(JSON.stringify(featureList)),
        },
        parent: node.id,
        blocktype: 'HomepageFeatureList',
        content: [
          featureList.feature1.id,
          featureList.feature2.id,
        ]
      })

      actions.createNode({
        ...node,
        id: createNodeId(`${node.id} >>> Homepage`),
        internal: {
          type: 'Homepage',
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        blocktype: 'Homepage',
        // TODO
        // content:
      })

      // console.log(node)
      break
    case 'WpFeature':
      console.log(node)
      if (node.feature.link) {
        const linkID = createLinkNode(node.id)(node.feature.link, 0)
        actions.createNodeField({
          node,
          name: 'links',
          value: [ linkID ],
        })
      }
      break
    default:
      console.log(node.internal.type)
  }
}
