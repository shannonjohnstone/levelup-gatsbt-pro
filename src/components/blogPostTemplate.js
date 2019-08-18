import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout';

/**
 * BlogPost
 * @param {Object} data
 * 
 * Component used to create blog post pages
 * markdown queried and passed in from `gatsby-node.js`
 */
export default function BlogPost({ data }) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark

    return (
        <Layout>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    )
}

/**
 * slug variable value is being passed in from `gatsby-node.js`
 * via the context object
 */
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`