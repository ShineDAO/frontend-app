import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';

import { Layout, SEO, Container } from 'components/common';
import { Header } from 'components/theme';
import axios from 'axios';
import { graphql } from 'gatsby';
import { Wrapper, IntroWrapper, QuartCircleIntro, Heading, HeadingText } from './styles';

import * as utils from './utils';

import ShineToken from '../../../static/abi/ShineToken.json';
import { Avatar } from '../common/Avatar';
import DefiOptionsLogo from '../landing/UpcomingProjects/defi_options_logo.png'

export default function ProjectTemplate({ data }) {
  const { theme } = useContext(ThemeContext);

  const project = data.projectsJson;
  console.log('project data ', project);


  var shineTokenAddress = "0xd3E104c53966Dd06E3CF62FE7C3A3EC2247c4Ade"
  var shineTokenAbi = ShineToken.abi;


  var currentStatus = project.technicalDetails.currentStatus;
  var tokenAbi = project.technicalDetails.tokenAbi;
  var saleAbi = project.technicalDetails[currentStatus].abi;


  var saleContractAddress = project.technicalDetails[currentStatus].saleAddress;
  var tokenContractAddress = project.technicalDetails.tokenAddress;
  var tokensOffered = project.technicalDetails[currentStatus].tokensOffered
  var rate = project.technicalDetails[currentStatus].rate;
  var gas = project.technicalDetails[currentStatus].gas;
  var maxWeiToRaise = tokensOffered / rate;

  const [isWalletEnabled, setWalletStatus] = useState();
  const [balance, setBalance] = useState();
  const [shineBalance, setShineBalance] = useState();
  const [projectBalance, setProjectBalance] = useState();
  const [isShineBought, setShineBought] = useState(false);
  const [shineBoughtAmount, setShineBoughtAmount] = useState(false);
  const [isTransactionBeingProcessed, setTransactionBeingProcessed] = useState(false);
  const [ethAmountToSpend, setEthAmountToSpend] = useState("");
  const [currentEthPrice, setCurrentEthPrice] = useState();
  const [ethRaised, setEthRaised] = useState();
  const [weiRaised, setWeiRaised] = useState();
  const [seedSaleShnBalance, setSeedSaleShnBalance] = useState();
  const [metamaskErrorCode, setMetamaskErrorCode] = useState();
  const [saleProgress, setSaleProgress] = useState();
  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
    isWalletEnabled ? utils.getEthBalance(setBalance) : null;
    isWalletEnabled ? utils.getEthRaised(setEthRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled ? utils.getWeiRaised(setWeiRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled ? utils.getSeedSaleShnBalance(setSeedSaleShnBalance, tokenAbi, saleContractAddress, tokenContractAddress) : null;
    isWalletEnabled ? utils.getUserAddress(setUserAddress, setShineBalance, shineTokenAbi, shineTokenAddress) : null;

    isWalletEnabled ? utils.getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi, tokenContractAddress) : null;

    isWalletEnabled ? utils.getCurrentMigrations() : null;
  }, [isWalletEnabled, isTransactionBeingProcessed, isShineBought]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum")
      .then(function (response) {
        // handle success
        setCurrentEthPrice(response.data[0].current_price);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [ethAmountToSpend]);

  useEffect(() => {
    console.log("wwwwwwwwww ", weiRaised);
    isWalletEnabled && setSaleProgress(((weiRaised / maxWeiToRaise) * 100).toFixed(2));
  }, [weiRaised]);

  return (
    <Layout>
      <SEO />
      <Wrapper>
        <QuartCircleIntro theme={theme} />
        <Header />
        <IntroWrapper as={Container}>
          <Heading>
            <Avatar imageUrl={DefiOptionsLogo} alt="project logo" width="80px" height="80px" />
            <HeadingText>Defi Options DAO</HeadingText>
          </Heading>
        </IntroWrapper>
      </Wrapper>
    </Layout>
  );
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
        initialCirculatingSupply
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
      metamaskDetails {
        address
        decimals
        image
        symbol
      }
      technicalDetails {
        currentStatus
        tokenAddress
        tokenAbi {
          anonymous
          constant
          inputs {
            indexed
            internalType
            name
            type
          }
          name
          outputs {
            internalType
            name
            type
          }
          payable
          stateMutability
          type
        }
        ido {
          gas
          rate
          saleAddress
          tokensOffered
          abi
        }
        seed {
          gas
          rate
          saleAddress
          tokensOffered
          abi {
            constant
            name
            payable
            stateMutability
            type
            anonymous
            inputs {
              type
              name
              internalType
              indexed
            }
            outputs {
              type
              name
              internalType
            }
          }
        }
      }
    }
  }
`;
// for homepage you need the following query:
// query MyQuery {
//    allProjectsJson {
//      nodes {
//        id
//        title
//        shortDescription
//      }
//    }
//  }

// or just use graphiql explorer locally on this url http://localhost:8000/___graphql?query=query%20MyQuery%20%7B%0A%20%20allProjectsJson%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20shortDescription%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=MyQuery
