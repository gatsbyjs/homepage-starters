import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const socialMedia = {
  TWITTER: {
    url: 'https://twitter.com',
    name: 'Twitter',
  },
  INSTAGRAM: {
    url: 'https://instagram.com',
    name: 'Instagram',
  },
  FACEBOOK: {
    url: 'https://facebook.com',
    name: 'Facebook',
  },
  YOUTUBE: {
    url: 'https://youtube.com',
    name: 'YouTube',
  },
  LINKEDIN: {
    url: 'https://linkedin.com',
    name: 'LinkedIn',
  },
  GITHUB: {
    url: 'https://github.com',
    name: 'GitHub',
  },
  // TODO: determine correct URLs for Discord
  DISCORD: {
    url: 'https://discord.com',
    name: 'Discord',
  },
  TWITCH: {
    url: 'https://twitch.tv',
    name: 'Twitch',
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name
}

export default function Footer (props) {
  const data = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          logo {
            id
          }
          links {
            id
            href
            text
          }
          meta {
            id
            href
            text
          }
          copyright
          socialLinks {
            id
            service
            username
          }
        }
      }
    }
  `)

  const {
    logo,
    links,
    meta,
    socialLinks,
    copyright,
  } = data.layout.footer

  return (
    <footer>
      {logo && (
        <GatsbyImage
          image={getImage(logo)}
        />
      )}
      <ul>
        {links && links.map(link => (
          <li key={link.id}>
            <Link to={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {socialLinks && socialLinks.map(link => {
          const url = getSocialURL(link)
          return url && (
            <li key={link.id}>
              <Link to={getSocialURL(link)}>
                {getSocialName(link)}
              </Link>
            </li>
          )
        })}
      </ul>
      <ul>
        {meta && meta.map(link => (
          <li key={link.id}>
            <Link to={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {copyright}
      </div>
    </footer>
  )
}