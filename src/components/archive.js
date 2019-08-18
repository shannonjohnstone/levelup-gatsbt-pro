/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const BLOG_ARCHIVE_QUERY = graphql`
  query BlogPostArchive {
    allMarkdownRemark(limit: 5, sort: { fields: [frontmatter___date], order: DESC } ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD-MM-YYYY")
          }
        }
      }
    }
  }
`

const Archive = () => {
  const data = useStaticQuery(BLOG_ARCHIVE_QUERY)

  const constructLiItem = ({ node }) => (
    <li key={node.frontmatter.path}>
      <Link to={`/posts/${node.frontmatter.path}`}>{node.frontmatter.title}</Link>
    </li>
  )

  return (
    <section>
      <h2>Archive</h2>
      <ul>
        {data.allMarkdownRemark.edges.map((constructLiItem))}
      </ul>
    </section>
  )
}

export default Archive
