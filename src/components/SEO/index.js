import path from 'path'
import React from 'react'
import Helmet from 'react-helmet'
import getShareImage from '@jlengstorf/get-share-image'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SchemaOrg from './SchemaOrg'
import config from '../../../config/website'

const SEO = ({ postData, frontmatter = {}, postImage, isBlogPost }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            author {
              name
            }
            organization {
              name
              url
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta =
        frontmatter || postData.childMarkdownRemark.frontmatter || {}
      const title = isBlogPost ? postMeta.title : config.siteTitle
      const description = postMeta.description || seo.description
      const url = postMeta.slug
        ? `${seo.canonicalUrl}${path.sep}${postMeta.slug}`
        : seo.canonicalUrl
      const datePublished = isBlogPost ? postMeta.datePublished : false

      const socialImage = getShareImage({
        title: title,
        tagline: '@tlakomy',
        cloudName: 'tlakomy',
        imagePublicID: 'blog-post-card',
        titleFont: 'futura',
        titleExtraConfig: '_line_spacing_-10',
        taglineFont: 'futura',
        textColor: '232129',
        taglineColor: 'ffc',
      })

      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={socialImage} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={socialImage} />
            <meta property="fb:app_id" content={seo.social.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={seo.social.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={socialImage} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={socialImage}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
}

export default SEO
