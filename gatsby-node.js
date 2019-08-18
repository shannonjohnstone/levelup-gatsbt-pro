const path = require('path');

/**
 * createPages
 * a function used to programmatically created pages
 * in this use case we are creating pages from the markdown pages that are
 * in `src/posts`
 */
exports.createPages = ({ graphql, actions }) => {
    /**
     * query markdown edges
     * taking frontmatter data for use in creating and context of the page
     */
    return graphql(`
        query loadPagesQuery ($limit: Int!) {
            allMarkdownRemark(limit: $limit) {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `, { limit: 1000 }).then(result => {
        if(result.errors) throw result.errors;

        /**
         * create pages
         * set path for page
         * pass in `path` as context for the `blogPostTemplate` page to use as a query
         */
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            actions.createPage({
                path: `posts${node.frontmatter.slug}`,
                component: path.resolve('src/components/blogPostTemplate.js'),
                context: { slug: node.frontmatter.slug }
            })
        })
    })
}