import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from "providers/ThemeProvider";

import { Layout, SEO, Container } from 'components/common';
import { Header } from 'components/theme';
import { Wrapper, IntroWrapper, Details, Thumbnail, Link, SaleCard, StatusContainer, EthInput, ColorTitle, UnderlinedTitle, ConnectButton, ConnectWalletCard, QuartCircleIntro } from "./styles";
import ProgressBar from "react-bootstrap/ProgressBar";
import PulseLoader from "react-spinners/PulseLoader";

const axios = require("axios");
import * as utils from './utils';

import ShineToken from "../../../static/abi/ShineToken.json";
import { RoundedLinkButton, Icon, Text, DescriptionLinksContainer, LinkContainer, TextContainer,DetailsTitle } from 'components/common/RoundedLinkButton';



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
          <h1>Shine Pre Sale (Tranche II)</h1>
          <Details theme={theme}>
            <SaleCard theme={theme} isWalletEnabled={isWalletEnabled}>
              Sale status
            <StatusContainer>
                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="4" fill="#10b981"></circle>{/* red */}
                </svg>
                <span>&nbsp;<b>Open</b>&nbsp;</span>
              </StatusContainer>
              <br />
              <UnderlinedTitle>Sale details:</UnderlinedTitle>

            Total Swap amount: 7,000,000 SHN
            <br />
            Max participation: 1 ETH / address
            <br />
            Rate: ≈ $0.028 / 1 SHN
            <br />
              <br />
              <ConnectButton theme={theme} onClick={() => utils.addToWatchlist(project.metamaskDetails)}>Add SHN to MetaMask</ConnectButton>
              {false && <span>ETH raised so far {ethRaised} ETH </span>}
              <br />
            </SaleCard>

            <ConnectWalletCard theme={theme} isWalletEnabled={isWalletEnabled}>
              <div>
                <h3>Token address</h3>

                <Link href="https://etherscan.io/address/0x1C7ede23b1361acC098A1e357C9085D131b34a01" target="_blank">
                  0x1C7ede23b1361acC098A1e357C9085D131b34a01
              </Link>
                <br></br><br></br>
              </div>

              {isWalletEnabled ? (
                <div>
                  <span>Account: {window.ethereum.selectedAddress}</span>
                  <br />
                  <span>Balance: {balance} ETH</span>
                  <br />
                  <span>Shine Balance: {Number.parseFloat(shineBalance).toLocaleString()} SHN ✨</span>
                  <br />
                  <span>Project Token Balance: {Number.parseFloat(projectBalance).toLocaleString()} {project.metamaskDetails.symbol}</span>
                  <br />
                  {false && <span>SeedSale Contract Shn Balance: {Number.parseFloat(seedSaleShnBalance).toLocaleString()} SHN</span>}
                  <br />
                  {weiRaised && (
                    <div>
                      <span>Sale progress </span>
                      <ProgressBar animated striped variant="success" now={saleProgress} label={`${saleProgress}%`} />
                    </div>
                  )}
                  <br />
                  {metamaskErrorCode && <ColorTitle>{metamaskErrorCode} </ColorTitle>}
                  {isWalletEnabled && !isTransactionBeingProcessed && (
                    <div>
                      <label htmlFor="eth_amount">Enter ETH amount:</label>
                      <br />
                      <EthInput
                        autoComplete="off"
                        type="number"
                        id="eth_amount"
                        value={ethAmountToSpend}
                        onChange={(e) => utils.handleChangeOfEthAmountToSpend(e.target.value, setEthAmountToSpend)}
                      />
                      {ethAmountToSpend && (
                        <span>
                          <span> ≈ {Number.parseFloat(currentEthPrice * ethAmountToSpend).toLocaleString()} USD</span> <br />{" "}
                          <span>Estimated SHN to receive: {utils.estimateReceivedShn(ethAmountToSpend, rate).toLocaleString()}</span>
                        </span>
                      )}
                      <br />
                      <br />

                      <ConnectButton
                        theme={theme}
                        onClick={() =>
                          utils.buyShineTokens(
                            ethAmountToSpend,
                            setEthAmountToSpend,
                            setShineBought,
                            setShineBoughtAmount,
                            setTransactionBeingProcessed,
                            setMetamaskErrorCode,
                            userAddress,
                            saleAbi,
                            saleContractAddress,
                            gas
                          )
                        }
                      >
                        Buy Shine
                    </ConnectButton>
                      <br />
                      <br />
                    </div>
                  )}
                  {isShineBought && !isTransactionBeingProcessed && (
                    <div>
                      <h4>You just successfully bought {Number.parseFloat(shineBoughtAmount).toLocaleString()} Shine!</h4>
                    </div>
                  )}

                  {isTransactionBeingProcessed && (
                    <div>
                      {" "}
                      <h5>Processing </h5>
                      <PulseLoader color={"yellow"} loading={true} size={15} margin={2} /> <br /> <br />
                      <h5>
                        <i>(Can take up to few minutes)</i>
                      </h5>
                    </div>
                  )}
                </div>

              ) : (
                <ConnectButton onClick={() => utils.loadWeb3(setWalletStatus, setBalance)} theme={theme}>CONNECT WALLET</ConnectButton>
              )}
            </ConnectWalletCard>
          </Details>

          <br></br>
          <br></br>


          <Details>

            {console.log("theme ", theme)}

            <DetailsTitle>Details</DetailsTitle>
            <DescriptionLinksContainer>
              <TextContainer>
                {project.shortDescription}
              </TextContainer>

              <LinkContainer>

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/links_${theme}.png`}></Icon>
                    <Text>PROJECT LINKS</Text>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/docs_${theme}.png`}></Icon>
                    <Text>DOCS</Text>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/alphaversion_${theme}.png`}></Icon>
                    <Text>ALPHA VERSION</Text>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/discord_${theme}.png`}></Icon>
                    <Text>DISCORD</Text>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/github_${theme}.png`}></Icon>
                    <Text>GITHUB</Text>
                  </div>
                </RoundedLinkButton>
              </LinkContainer>

            </DescriptionLinksContainer>

          </Details>
        </IntroWrapper>
      </Wrapper>
    </Layout>
  );
}

// eslint-disable-next-line no-undef
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
