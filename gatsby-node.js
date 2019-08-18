const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const BlogPost = path.resolve('src/components/blogPost.js');

    return graphql(`
        query loadPagesQuery ($limit: Int!) {
            allMarkdownRemark(limit: $limit) {
                edges {
                    node {
                        html
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `, { limit: 1000 }).then(result => {
        if(result.errors) throw result.errors;

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            console.log(node.frontmatter.path, 'PATH...')
            createPage({
                path: node.frontmatter.path,
                component: BlogPost,
                // context: { node }
            })
        })
    })
}