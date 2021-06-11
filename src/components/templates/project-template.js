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
  IntroWrapper,
  QuartCircleIntro,
  Heading,
  HeadingText,
  InfoCards,
  CardHeaderWrapper,
  CardTitleWrapper,
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
} from './styles';

import * as utils from './utils';

import { Avatar } from '../common/Avatar';
import DefiOptionsLogo from '../landing/UpcomingProjects/defi_options_logo.png';
import { Text } from '../common/Text';
import ShineToken from '../../../static/abi/ShineToken.json';
import { DisableColor } from '../landing/SaleDetails/styles';

export default function ProjectTemplate({ data }) {
  const { theme } = useContext(ThemeContext);

  const project = data.projectsJson;
  console.log('project data ', project);

  const shineTokenAddress = '0xd3E104c53966Dd06E3CF62FE7C3A3EC2247c4Ade';
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
  }, [
    isWalletEnabled,
    isTransactionBeingProcessed,
    isShineBought,
    saleAbi,
    saleContractAddress,
    tokenAbi,
    tokenContractAddress,
    shineTokenAbi,
    shineTokenAddress,
  ]);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
      .then(function(response) {
        // handle success
        setCurrentEthPrice(response.data[0].current_price);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, [ethAmountToSpend]);

  useEffect(() => {
    console.log('wwwwwwwwww ', weiRaised);
    isWalletEnabled && setSaleProgress(((weiRaised / maxWeiToRaise) * 100).toFixed(2));
  }, [isWalletEnabled, maxWeiToRaise, weiRaised]);

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
          <InfoCards>
            <Card background="#3F3D56" padding="40px" flexDirection="column" width="540px" justifyContent="flex-start">
              <CardHeaderWrapper>
                <ProjectNameWrapper>
                  <Avatar imageUrl={DefiOptionsLogo} alt="Defi options logo" width="40px" height="40px" />
                  <Text margin="0 0 0 16px" fontSize="24px" fontWeight={800} color="white">
                    Defi Options DAO
                  </Text>
                </ProjectNameWrapper>
                <Card background="#fada5e" borderRadius="4px" height="32px" width="140px">
                  &nbsp; &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill="#3F3D56" />
                  </svg>
                  <Text color="#3F3D56" fontWeight={800}>
                    &nbsp; in TBA days
                  </Text>
                </Card>
              </CardHeaderWrapper>
              <Card background="#3F3D56" flexWrap="wrap" height="336px" margin="40px 0">
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="white"
                  display="flex"
                  height="96px"
                  flexDirection="column"
                  margin="0 24px 24px 0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="#3F3D56" fontWeight={300} fontSize="20px">
                    Total raise
                  </Text>
                  <Text color="#3F3D56" fontWeight={800} fontSize="24px">
                    $200k
                  </Text>
                </Card>
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="#3F3D56"
                  border="1px solid white"
                  display="flex"
                  flexDirection="column"
                  height="96px"
                  margin="0 0 24px 0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Incubation Stage
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    Seed Sale
                  </Text>
                </Card>
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="#3F3D56"
                  display="flex"
                  height="96px"
                  border="1px solid white"
                  flexDirection="column"
                  margin="0 24px 24px 0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Total supply
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    100,000,000 DoD
                  </Text>
                </Card>
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="#3F3D56"
                  border="1px solid white"
                  display="flex"
                  flexDirection="column"
                  height="96px"
                  margin="0 0 24px 0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Chain
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    Ethereum
                  </Text>
                </Card>
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="#3F3D56"
                  display="flex"
                  border="1px solid white"
                  height="96px"
                  flexDirection="column"
                  margin="0 24px 0 0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Round allocation
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    100,000,000 DoD
                  </Text>
                </Card>
                <Card
                  alignItems="flex-start"
                  justifyContent="space-around"
                  background="#3F3D56"
                  border="1px solid white"
                  display="flex"
                  flexDirection="column"
                  height="96px"
                  margin="0"
                  padding="16px 0 16px 24px"
                  width="218px"
                >
                  <Text color="white" fontWeight={300} fontSize="20px">
                    Rate
                  </Text>
                  <Text color="white" fontWeight={700} fontSize="20px">
                    ≈ $0.01 / 1 DoD
                  </Text>
                </Card>
                <Card borderRadius="4px" background="white" clickable width="100%" height="48px" margin="40px 0 0 0">
                  <Text fontWeight={800}>ADD DOD TO METAMASK</Text>
                </Card>
              </Card>
            </Card>
            <Card background="#1E1E1E" padding="40px" flexDirection="column" width="540px" justifyContent="flex-start">
              <CardTitleWrapper>
                <Text fontWeight={800} fontSize="24px" color="white">
                  Token Address
                </Text>
              </CardTitleWrapper>
              <Card
                width="462px"
                borderRadius="4px"
                border="1px solid #3F3D56"
                background="#1E1E1E"
                height="72px"
                margin="24px 0 0 0"
                padding="20px 24px"
                justifyContent="space-between"
              >
                <Card width="120px" height="32px" background="#EEEEFF">
                  <Text fontSize="18px" fontWeight={800}>
                    TIER 1
                  </Text>
                </Card>
                <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                  ≈ $300
                </Text>
              </Card>
              <Card
                width="462px"
                borderRadius="4px"
                border="1px solid #3F3D56"
                background="#1E1E1E"
                height="72px"
                margin="24px 0 0 0"
                padding="20px 24px"
                justifyContent="space-between"
              >
                <Card width="120px" height="32px" background="#EEEEFF">
                  <Text fontSize="18px" fontWeight={800}>
                    TIER 2
                  </Text>
                </Card>
                <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                  ≈ $800
                </Text>
              </Card>
              <Card
                width="462px"
                borderRadius="4px"
                border="1px solid #3F3D56"
                background="#1E1E1E"
                height="72px"
                margin="24px 0 0 0"
                padding="20px 24px"
                justifyContent="space-between"
              >
                <Card width="120px" height="32px" background="#EEEEFF">
                  <Text fontSize="18px" fontWeight={800}>
                    TIER 3
                  </Text>
                </Card>
                <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                  ≈ $2400
                </Text>
              </Card>
              <Card
                width="462px"
                borderRadius="4px"
                border="1px solid #3F3D56"
                background="#1E1E1E"
                height="72px"
                margin="24px 0 0 0"
                padding="20px 24px"
                justifyContent="space-between"
              >
                <Card width="120px" height="32px" background="#EEEEFF">
                  <Text fontSize="18px" fontWeight={800}>
                    TIER 4
                  </Text>
                </Card>
                <Text color="#EEEEFF" fontSize="24px" fontWeight={800}>
                  ≈ $4200
                </Text>
              </Card>
              <Card
                borderRadius="4px"
                border="1px solid white"
                color="white"
                background="#1E1E1E"
                clickable
                width="100%"
                height="48px"
                margin="40px 0 0 0"
              >
                <Text fontWeight={800} color="white">
                  CONNECT WALLET
                </Text>
              </Card>
            </Card>
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
