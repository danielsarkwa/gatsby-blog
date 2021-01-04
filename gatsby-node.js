const path = require('path');

// get access to the gatsby file system
const { createFilePath } = require(`gatsby-source-filesystem`);

// create slug for the markdown files for routing
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if(node.internal.type === `MarkdownRemark`) {
        // slug is the link for the node used in the browser for routing
        const slug = createFilePath({ node, getNode })

        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

// build the pages from the markdown
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    // make query for the markdown remarks
    return graphql(`
    {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog.post.js`),
                context: {
                    slug: node.fields.slug
                }
            })
        })
    })
}
