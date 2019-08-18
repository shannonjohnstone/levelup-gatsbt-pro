import React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';

const BLOG_LISTING_QUERY = graphql`
  query BlogPostListing {
    allMarkdownRemark(limit: 100, sort: { fields: [frontmatter___date], order: DESC } ) {
      edges {
        node {
            excerpt
            frontmatter {
                title
                slug
                date(formatString: "DD-MM-YYYY")
            }
        }
      }
    }
  }
`

const Listing = () => {
    const data = useStaticQuery(BLOG_LISTING_QUERY)

    const constructArticleItem = ({ node }) => (
        <article key={node.frontmatter.slug}>
            <Link to={`/posts${node.frontmatter.slug}`}>
                <h2>{node.frontmatter.title}</h2>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
            <Link to={`/posts${node.frontmatter.slug}`}>
                <p>Read more</p>
            </Link>
        </article>
    )

    return (
        <section>
            {data.allMarkdownRemark.edges.map((constructArticleItem))}
        </section>
    )
}

export default Listing
