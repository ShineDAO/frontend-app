import React from "react"
import { Layout, SEO } from 'components/common';
import { Header } from "components/theme";

export default function ProjectTemplate({ data }) {
    const project = data.projectsJson
    console.log("project ", project)
    return (
        <Layout>
            <SEO />
            <Header />
            <br></br>
            <div>Hello {project.title}</div>
            <br></br>
            <p>{project.shortDescription}</p>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    projectsJson(fields: { slug: { eq: $slug } }) {
        id
        title
        tokenAddress
        shortDescription
        links {
          app
          discord
          docs
          github
        }
        tokenomics {
          totalOutstandingDeFiTokens
          totalAmountRaised
          coreTeam {
            percentage
            total
          }
          ido {
            amountRaised
            percentage
            tokenPrice
            total
          }
          liquiditySupply {
            percentage
            tokenPrice
            total
          }
          rewards {
            percentage
            total
          }
          shineDaoAllocation {
            percentage
            total
          }
          totalSupply {
            percentage
            total
          }
          treasury {
            total
            percentage
          }
        }
    }
  }
`
//for homepage you need the following query:
//query MyQuery {
//    allProjectsJson {
//      nodes {
//        id
//        title
//        shortDescription
//      }
//    }
//  }
  
// or just use graphiql explorer locally on this url http://localhost:8000/___graphql?query=query%20MyQuery%20%7B%0A%20%20allProjectsJson%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20shortDescription%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=MyQuery