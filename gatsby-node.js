const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateWebpackConfig = ({ stage, loaders, actions  }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });

  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-date-countdown-timer/,
            use: loaders.null(),
          },
          {
            test: /detect.js/, //https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-code-classlanguage-textwindowcode-is-defined
            use: loaders.null(),
          }
        ],
      },
    })
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  //console.log(`Node created of type "${node.internal.type}"`)
  const { createNodeField } = actions
  if (node.internal.type === `ProjectsJson`) {
    const fileNode = getNode(node.parent)
    console.log(`\n project file - `, fileNode.relativePath)
    console.log(createFilePath({ node, getNode, basePath: `src/data/projects` }))
    const slug = createFilePath({ node, getNode, basePath: `src/data/projects` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  const { createPage } = actions
  const result = await graphql(`
    query {
      allProjectsJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result, null, 4))

  result.data.allProjectsJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/templates/project-template.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

