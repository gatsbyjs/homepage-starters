import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Text,
  InteractiveIcon,
} from "./ui"
import TwitterIcon from "./icons/twitterIcon"
import InstagramIcon from "./icons/instagramIcon"
import FacebookIcon from "./icons/facebookIcon"
import YoutubeIcon from "./icons/youtubeIcon"
import GithubIcon from "./icons/githubIcon"
import TwitchIcon from "./icons/twitchIcon"
import { GatsbyWordpressLogo } from "./logos"
import { footerSocialLinkWrapper } from "./footer.css.ts"

const socialMedia = {
  TWITTER: {
    url: "https://twitter.com",
    name: "Twitter",
    icon: <TwitterIcon />,
  },
  INSTAGRAM: {
    url: "https://instagram.com",
    name: "Instagram",
    icon: <InstagramIcon />,
  },
  FACEBOOK: {
    url: "https://facebook.com",
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  YOUTUBE: {
    url: "https://youtube.com",
    name: "YouTube",
    icon: <YoutubeIcon />,
  },
  GITHUB: {
    url: "https://github.com",
    name: "GitHub",
    icon: <GithubIcon />,
  },
  TWITCH: {
    url: "https://twitch.tv",
    name: "Twitch",
    icon: <TwitchIcon />,
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialIcon = ({ service }) => {
  const icon = socialMedia[service]?.icon
  return icon
}

export default function Footer(props) {
  const data = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          logo {
            id
            gatsbyImageData
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

  const { links, meta, socialLinks, copyright } = data.layout.footer

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex variant="start" responsive>
          <GatsbyWordpressLogo />
          <Space />
          <FlexList>
            {socialLinks &&
              socialLinks.map((link) => {
                const url = getSocialURL(link)
                return (
                  url && (
                    <li key={link.id}>
                      <NavLink to={url}>
                        <InteractiveIcon className={footerSocialLinkWrapper}>
                          {getSocialIcon(link)}
                        </InteractiveIcon>
                      </NavLink>
                    </li>
                  )
                )
              })}
          </FlexList>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive>
            {links &&
              links.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>{link.text}</NavLink>
                </li>
              ))}
          </FlexList>
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>
                    <Text variant="small">{link.text}</Text>
                  </NavLink>
                </li>
              ))}
          </FlexList>
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  )
}
