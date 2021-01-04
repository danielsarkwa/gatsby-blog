// const get access to the gatsby file system
const { createFilePath } = require(`gatsby-source-filesystem`);

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