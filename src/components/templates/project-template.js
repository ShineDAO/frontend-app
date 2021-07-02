import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';

import { Layout, SEO, Container, Card } from 'components/common';
import { Header } from 'components/theme';
import axios from 'axios';
import { graphql } from 'gatsby';
import {
  RoundedLinkButton,
  Icon,
  TextRoundedLinkButton,
  DescriptionLinksContainer,
  LinkContainer,
  TextContainer,
  DetailsTitle,
  TasksSection,
  ContributeTitle,
  ContributeText,
  ConnectButtonContainer,
  TaskSectionTextContainer,
} from 'components/common/RoundedLinkButton';
import {
  Wrapper,
  ProjectsWrapper,
  Heading,
  HeadingText,
  InfoCards,
  CardHeaderWrapper,
  ProjectNameWrapper,
  Details,
  ConnectButton,
  Thumbnail,
  Link,
  SaleCard,
  StatusContainer,
  EthInput,
  ColorTitle,
  UnderlinedTitle,
  ConnectWalletCard,
  LitepaperCard,
  StatsCard,
  TokenCard,
  CardHeaderTextWrapper,
  CardBottomWrapper,
  FirstStatsCard,
  RightStatsCard,
  LeftStatsCard,
  TierWrapper, TitleText, StatsCardHeading,
  FlexBox
} from './styles';

import * as utils from './utils';

import { Avatar } from '../common/Avatar';
import DefiOptionsLogo from '../landing/UpcomingProjects/defi_options_logo.png';
import { Text } from '../common/Text';
import ShineToken from '../../../static/abi/ShineToken.json';
import { DisableColor } from '../landing/SaleDetails/styles';
import PulseLoader from 'react-spinners/PulseLoader';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ProjectTemplate({ data }) {
  const { theme } = useContext(ThemeContext);

  const project = data.projectsJson;
  console.log('project data ', project);

  const shineTokenAddress = '0x83a30087015E0e766BbD9772743F38940C35094D'; //Local Ganache
  //const shineTokenAddress = '0x1C7ede23b1361acC098A1e357C9085D131b34a01';


  const shineTokenAbi = ShineToken.abi;

  const { currentStatus } = project.technicalDetails;
  const { tokenAbi } = project.technicalDetails;
  const saleAbi = project.technicalDetails[currentStatus].abi;

  const saleContractAddress = project.technicalDetails[currentStatus].saleAddress;
  const tokenContractAddress = project.technicalDetails.tokenAddress;
  const { tokensOffered } = project.technicalDetails[currentStatus];
  const { rate } = project.technicalDetails[currentStatus];
  const { gas } = project.technicalDetails[currentStatus];
  const maxWeiToRaise = tokensOffered / rate;
  const openLink = link => {
    window.open(link, '_blank', 'noopener');
  };

  const [isWalletEnabled, setWalletStatus] = useState();
  const [balance, setBalance] = useState();
  const [shineBalance, setShineBalance] = useState();
  const [projectBalance, setProjectBalance] = useState();
  const [isShineBought, setShineBought] = useState(false);
  const [shineBoughtAmount, setShineBoughtAmount] = useState(false);
  const [isTransactionBeingProcessed, setTransactionBeingProcessed] = useState(false);
  const [ethAmountToSpend, setEthAmountToSpend] = useState('');
  const [currentEthPrice, setCurrentEthPrice] = useState();
  const [ethRaised, setEthRaised] = useState();
  const [weiRaised, setWeiRaised] = useState();
  const [seedSaleShnBalance, setSeedSaleShnBalance] = useState();
  const [metamaskErrorCode, setMetamaskErrorCode] = useState();
  const [saleProgress, setSaleProgress] = useState();
  const [userAddress, setUserAddress] = useState();
  const [vestingPeriod, setVestingPeriod] = useState();
  const [vestedBalances, setVestedBalances] = useState();


  useEffect(() => {
    isWalletEnabled ? utils.getEthBalance(setBalance) : null;
    isWalletEnabled ? utils.getEthRaised(setEthRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled ? utils.getWeiRaised(setWeiRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled
      ? utils.getSeedSaleShnBalance(setSeedSaleShnBalance, tokenAbi, saleContractAddress, tokenContractAddress)
      : null;
    isWalletEnabled ? utils.getUserAddress(setUserAddress, setShineBalance, shineTokenAbi, shineTokenAddress) : null;

    isWalletEnabled
      ? utils.getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi, tokenContractAddress)
      : null;

    isWalletEnabled ? utils.getCurrentMigrations() : null;
    isWalletEnabled ? utils.getVestingPeriod(saleAbi, saleContractAddress, setUserAddress, setVestingPeriod) : null;
    isWalletEnabled ? utils.getVestedBalances(saleAbi, saleContractAddress, setUserAddress, setVestedBalances) : null;

  }, [
    isWalletEnabled,
    isTransactionBeingProcessed,
    isShineBought,
  ]);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
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
    console.log('wwwwwwwwww ', weiRaised);
    isWalletEnabled && setSaleProgress(((weiRaised / maxWeiToRaise) * 100).toFixed(2));
  }, [weiRaised]);

  function getTier(shineBalance) {
    if (shineBalance < 15000) {
      return "No Tier"
    } else if (shineBalance >= 15000 && shineBalance < 50000) {
      return "Tier 1"
    } else if (shineBalance >= 50000 && shineBalance < 200000) {
      return "Tier 2"
    } else if (shineBalance >= 200000 && shineBalance < 400000) {
      return "Tier 3"
    } else if (shineBalance >= 400000) {
      return "Tier 4"
    }
  }
  //console.log(kFormatter(1200)); // 1.2k
  //console.log(kFormatter(-1200)); // -1.2k
  //console.log(kFormatter(900)); // 900
  //console.log(kFormatter(-900)); // -900
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  return (
    <Layout>
      <SEO />
      <Wrapper>
        <Header />


        {false && <Details theme={theme}>
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
        </Details>}


        <ProjectsWrapper as={Container}>
          <Heading>
            {false && <Avatar imageUrl={DefiOptionsLogo} alt="project logo" width="80px" height="80px" />}
            <HeadingText>Project Details</HeadingText>
          </Heading>
          <InfoCards>
            <StatsCard>
              <CardHeaderWrapper>
                <ProjectNameWrapper>
                  <Avatar imageUrl={DefiOptionsLogo} alt="Defi options logo" width="60px" height="60px" />
                  <StatsCardHeading margin="0 0 0 16px" fontSize="24px" fontWeight={800} color="white">
                    {project.title}
                  </StatsCardHeading>
                </ProjectNameWrapper>
                <CardHeaderTextWrapper>
                  &nbsp; &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill="#3F3D56" />
                  </svg>
                  <Text color="#3F3D56" fontWeight={800}>
                    &nbsp; in TBA days
                  </Text>
                </CardHeaderTextWrapper>
              </CardHeaderWrapper>
              <CardBottomWrapper>
                <FirstStatsCard>
                  <Text color="#3F3D56" fontWeight={300} fontSize="20px">
                    Total raise
                  </Text>
                  <Text color="#3F3D56" fontWeight={800} fontSize="24px">
                    {project.frontendDetails.totalRaise}
                  </Text>
                </FirstStatsCard>
                <RightStatsCard>
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Incubation Stage
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    {project.frontendDetails.incubationStage}
                  </Text>
                </RightStatsCard>
                <LeftStatsCard>
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Total supply
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    {project.frontendDetails.totalSupply}
                  </Text>
                </LeftStatsCard>
                <RightStatsCard>
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Chain
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    {project.frontendDetails.chain}
                  </Text>
                </RightStatsCard>
                <LeftStatsCard>
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Round allocation
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    {project.frontendDetails.roundAllocation}
                  </Text>
                </LeftStatsCard>
                <RightStatsCard>
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Rate
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    ≈ {project.frontendDetails.rate}
                  </Text>
                </RightStatsCard>
                <Card onClick={() => alert("Announced token is not launched yet")} borderRadius="4px" background="white" clickable width="100%" height="48px">
                  <Text fontWeight={800}>ADD DOD TO METAMASK</Text>
                </Card>
              </CardBottomWrapper>
            </StatsCard>
            <TokenCard>
              <TitleText fontWeight={800} fontSize="24px" color="white">
                Token Address    <Link href="https://etherscan.io/address/0x1C7ede23b1361acC098A1e357C9085D131b34a01" target="_blank">

                  {project.technicalDetails.tokenAddress.substring(0, 6)}...{project.technicalDetails.tokenAddress.substring(project.technicalDetails.tokenAddress.length - 4)}
                </Link>
              </TitleText>


              {!isWalletEnabled &&
                <TierWrapper highlightTier={shineBalance >= 15000 && shineBalance < 50000}>
                  <Card width="120px" height="32px" background="#EEEEFF">
                    <Text fontSize="18px" fontWeight={800}>
                      TIER 1
                    </Text>
                  </Card>
                  <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                    (&gt;15k SHN)
                  </Text>
                  <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                    ❔
                  </Text>
                </TierWrapper>
              }
              {!isWalletEnabled &&
                <TierWrapper highlightTier={shineBalance >= 50000 && shineBalance < 200000}>
                  <Card width="120px" height="32px" background="#EEEEFF">
                    <Text fontSize="18px" fontWeight={800}>
                      TIER 2
                    </Text>
                  </Card>
                  <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                    (&gt;50k SHN)
                  </Text>
                  <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                    ❔
                  </Text>
                </TierWrapper>
              }
              {!isWalletEnabled &&
                <TierWrapper highlightTier={shineBalance >= 200000 && shineBalance < 400000}>
                  <Card width="120px" height="32px" background="#EEEEFF">
                    <Text fontSize="18px" fontWeight={800}>
                      TIER 3
                    </Text>
                  </Card>
                  <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                    (&gt;200k SHN)
                  </Text>
                  <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                    ≈ $2400
                  </Text>
                </TierWrapper>
              }
              {!isWalletEnabled && <TierWrapper highlightTier={shineBalance >= 400000}>
                <Card width="120px" height="32px" background="#EEEEFF">
                  <Text fontSize="18px" fontWeight={800}>
                    TIER 4
                  </Text>
                </Card>
                <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                  (&gt;400k SHN)
                </Text>
                <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                  ≈ $4200
                </Text>
              </TierWrapper>
              }
              {isWalletEnabled && shineBalance < 15000 && <Text color="tomato" fontSize="17px" fontWeight={800}>
                You don't have a tier. Please consider getting some SHN
              </Text>}
              <br></br>
              {isWalletEnabled && <Details theme={theme}>





                {isWalletEnabled ? (
                  <div>
                    <Text color="#aeaeae" fontWeight={100}>



                      <span>Connected account: {window.ethereum.selectedAddress.substring(0, 6)}...{window.ethereum.selectedAddress.substring(window.ethereum.selectedAddress.length - 4)}</span>
                      <br />
                      {isWalletEnabled && <Text color="#aeaeae"> SHN balance: {kFormatter(shineBalance)} SHN <b>({getTier(shineBalance)})</b></Text>}

                      <span>ETH Balance: {balance} ETH</span>
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
                              <span>Estimated {project.metamaskDetails.symbol} tokens to receive: {utils.estimateReceivedShn(ethAmountToSpend, rate).toLocaleString()}</span>
                            </span>
                          )}
                          <br />
                          <br />

                          <FlexBox>
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
                              Buy Tokens
                            </ConnectButton>
                            <Text margin="0 0 0 10px" color="#aeaeae"> Note: 25% tokens are released immediatly, 75% is vested for 30 days </Text>
                          </FlexBox>
                          <br />
                          <br />
                          {isWalletEnabled && console.log("vested balances ", vestedBalances)}
                          {vestedBalances > 0 && <FlexBox>
                           
                            <ConnectButton
                              theme={theme}
                              onClick=""
                            >
                              Widthdraw tokens
                            </ConnectButton>
                            <Text margin="0 0 0 10px" color="#aeaeae"> Vested Amount: {vestedBalances} {project.metamaskDetails.symbol} </Text>
                            <Text margin="0 0 0 10px" color="#aeaeae"> Unlock time: {timeConverter(vestingPeriod)}</Text>
                          </FlexBox>
                          }



                        </div>
                      )}
                      {isShineBought && !isTransactionBeingProcessed && (
                        <div style={{"marginTop":20}}>
                          <h4>You just successfully bought {Number.parseFloat(shineBoughtAmount).toLocaleString()} {project.metamaskDetails.symbol} tokens! (Note: 75% is vested) </h4>
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
                    </Text>
                  </div>

                ) : (
                  <ConnectButton onClick={() => utils.loadWeb3(setWalletStatus, setBalance)} theme={theme}>CONNECT WALLET</ConnectButton>

                )}

              </Details>}





              {console.log("shine balance", shineBalance)}
              {!isWalletEnabled && (<Card
                onClick={() => utils.loadWeb3(setWalletStatus, setBalance)}
                borderRadius="4px"
                border="1px solid white"
                color="white"
                background="#1E1E1E"
                clickable
                width="100%"
                height="48px"
                margin="20px 0 0 0"
              >
                <Text fontWeight={800} color="white">
                  CONNECT WALLET
                </Text>
              </Card>)}

            </TokenCard>
          </InfoCards>

          <br></br>
          <br></br>

          <Details>
            <DetailsTitle>Details</DetailsTitle>

            <DescriptionLinksContainer>
              <TextContainer>{project.shortDescription}</TextContainer>
              <LinkContainer>
                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/links_${theme}.png`}></Icon>
                    <TextRoundedLinkButton onClick={() => openLink(project.links.website)}>
                      WEBSITE
                    </TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/docs_${theme}.png`}></Icon>
                    <TextRoundedLinkButton onClick={() => openLink(project.links.docs)}>DOCS</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>

                {false && (
                  <RoundedLinkButton theme={theme}>
                    <div>
                      <Icon src={`/icons/alphaversion_${theme}.png`}></Icon>
                      <TextRoundedLinkButton>ALPHA VERSION</TextRoundedLinkButton>
                    </div>
                  </RoundedLinkButton>
                )}

                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/discord_${theme}.png`}></Icon>
                    <TextRoundedLinkButton onClick={() => openLink(project.links.discord)}>
                      DISCORD
                    </TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
                <RoundedLinkButton theme={theme}>
                  <div>
                    <Icon src={`/icons/github_${theme}.png`}></Icon>
                    <TextRoundedLinkButton onClick={() => openLink(project.links.github)}>GITHUB</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
              </LinkContainer>
            </DescriptionLinksContainer>

            <TasksSection theme={theme}>
              <TaskSectionTextContainer>
                <ContributeTitle>Contribute and get rewarded</ContributeTitle>

                <ContributeText>20% of projects tokens will be distributed to early contributors.</ContributeText>
              </TaskSectionTextContainer>

              <ConnectButtonContainer>
                <ConnectButton onClick={() => openLink(project.links.tasks)} theme={theme}>
                  SEE TASKS
                </ConnectButton>
              </ConnectButtonContainer>
            </TasksSection>

            <LitepaperCard theme={theme}>
              <h3>Tokenomics</h3>

              {false && (
                <ConnectButton theme={theme}>
                  <DisableColor href="/Litepaper.pdf" target="_blank">
                    GO TO LITEPAPER
                  </DisableColor>
                </ConnectButton>
              )}
            </LitepaperCard>
          </Details>

          {true && (
            <a>
              <img
                src={
                  theme == 'light'
                    ? require(`assets/illustrations/${project.tokenomics.tokenDistributionImage.light}`)
                    : require(`assets/illustrations/${project.tokenomics.tokenDistributionImage.dark}`)
                }
                alt="Project Tokenomics"
              />
            </a>
          )}
        </ProjectsWrapper>
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
        website
        discord
        docs
        github
        tasks
      }
      tokenomics {
        tokenDistributionImage {
          light
          dark
        }
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
      frontendDetails {
        totalRaise
        incubationStage
        totalSupply
        chain
        roundAllocation
        rate
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
