import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "providers/ThemeProvider";

import { Layout, SEO, Container, Card } from "components/common";
import { Header } from "components/theme";
import axios from "axios";
import { graphql } from "gatsby";
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
} from "components/common/RoundedLinkButton";
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
  TierWrapper,
  TitleText,
  StatsCardHeading,
  FlexBox,
  JoinCard,
  Cards,
  TBAText,
} from "./styles";

import * as utils from "./utils";

import { Avatar } from "../common/Avatar";
//import DefiOptionsLogo from "../landing/UpcomingProjects/defi-options-dao-logo-new.png";
import { Text } from "../common/Text";
import ShineToken from "../../../static/abi/ShineToken.json";
import { DisableColor } from "../landing/SaleDetails/styles";
import PulseLoader from "react-spinners/PulseLoader";
import ProgressBar from "react-bootstrap/ProgressBar";
//import DateCountdown from 'react-date-countdown-timer';

export default function ProjectTemplate({ data }) {
  const { theme } = useContext(ThemeContext);

  const project = data.projectsJson;
  console.log("project data ", project);

  const shineTokenAbi = ShineToken.abi;

  const [currentStatus, setCurrentStatus] = useState(project.technicalDetails.currentStatus);

  const { tokenAbi } = project.technicalDetails;
  const saleAbi = project.technicalDetails[currentStatus].abi;

  const saleContractAddress = project.technicalDetails[currentStatus].saleAddress;
  const date = project.technicalDetails[currentStatus].date;
  const tokenContractAddress = project.technicalDetails[currentStatus].tokenAddress;
  const shineTokenAddress = project.technicalDetails[currentStatus].shineTokenAddress;
  console.log("shn address 1232", shineTokenAddress);
  const { tokensOffered } = project.technicalDetails[currentStatus];
  const { rate } = project.technicalDetails[currentStatus];
  const { gas } = project.technicalDetails[currentStatus];
  const { deployerAddress } = project.technicalDetails[currentStatus];
  const maxWeiToRaise = tokensOffered / rate;
  const openLink = link => {
    window.open(link, "_blank", "noopener");
  };

  const [isWalletEnabled, setWalletStatus] = useState();
  const [currentNetwork, setCurrentNetwork] = useState();
  const [balance, setBalance] = useState();
  const [shineBalance, setShineBalance] = useState();
  const [projectBalance, setProjectBalance] = useState();
  const [isShineBought, setShineBought] = useState(false);
  const [isTokenWithdrawn, setIsTokenWithdrawn] = useState(false);
  const [shineBoughtAmount, setShineBoughtAmount] = useState(false);
  const [isTransactionBeingProcessed, setTransactionBeingProcessed] = useState(false);
  const [ethAmountToSpend, setEthAmountToSpend] = useState("");
  const [shnReference, setShnReference] = useState("");
  const [currentEthPrice, setCurrentEthPrice] = useState();
  const [ethRaised, setEthRaised] = useState();
  const [weiRaised, setWeiRaised] = useState();
  const [seedSaleShnBalance, setSeedSaleShnBalance] = useState();
  const [metamaskErrorCode, setMetamaskErrorCode] = useState();
  const [saleProgress, setSaleProgress] = useState();
  const [userAddress, setUserAddress] = useState();
  const [vestingPeriod, setVestingPeriod] = useState();
  const [vestedBalances, setVestedBalances] = useState();
  const [relativeCap, setRelativeCap] = useState();
  const [newRelativeCap, setNewRelativeCap] = useState(); // used for updating the new relative cap through the UI
  const [contributions, setContributions] = useState();
  const [isSaleOpenForAll, setIsSaleOpenForAll] = useState();
  const [currentMigration, setCurrentMigration] = useState();

  useEffect(() => {
    isWalletEnabled ? utils.getEthBalance(setBalance) : null;
    isWalletEnabled ? utils.getEthRaised(setEthRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled ? utils.getWeiRaised(setWeiRaised, saleAbi, saleContractAddress) : null;
    isWalletEnabled ? utils.getSeedSaleShnBalance(setSeedSaleShnBalance, tokenAbi, saleContractAddress, tokenContractAddress) : null;
    isWalletEnabled ? utils.getUserAddress(setUserAddress, setShineBalance, shineTokenAbi, shineTokenAddress) : null;

    isWalletEnabled ? utils.getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi, tokenContractAddress) : null;

    isWalletEnabled ? utils.getCurrentMigrations(setCurrentMigration) : null;
    isWalletEnabled ? utils.getVestingPeriod(saleAbi, saleContractAddress, setUserAddress, setVestingPeriod) : null;
    isWalletEnabled ? utils.getVestedBalances(saleAbi, saleContractAddress, setUserAddress, setVestedBalances) : null;
    isWalletEnabled ? utils.getRelativeCap(saleAbi, saleContractAddress, setUserAddress, setRelativeCap) : null;
    isWalletEnabled ? utils.getContributions(saleAbi, saleContractAddress, setUserAddress, setContributions) : null;
    isWalletEnabled ? utils.getIsSaleOpenForAll(saleAbi, saleContractAddress, setIsSaleOpenForAll) : null;
  }, [isWalletEnabled, isTransactionBeingProcessed, isShineBought, isTokenWithdrawn, currentStatus]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${getCoingeckoName(currentNetwork)}`)
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
  }, [ethAmountToSpend, currentNetwork]);

  useEffect(() => {
    console.log("sale progress 0 ", weiRaised);
    console.log("sale progress 1", (weiRaised / maxWeiToRaise) * 100);
    isWalletEnabled && setSaleProgress(((weiRaised / maxWeiToRaise) * 100).toFixed(2));
  }, [weiRaised]);

  function getNetworkName(chainId) {
    const chainMapper = {
      "0x1": "Ethereum",
      "0x89": "Polygon/Matic",
      "0x539": "Localhost",
    };
    if (chainMapper[chainId]) {
      return chainMapper[chainId];
    } else {
      return chainId;
    }
  }
  function getCoingeckoName(chainId) {
    const chainMapper = {
      "0x1": "ethereum",
      "0x89": "matic-network",
      "0x539": "matic-network",
    };
    if (chainMapper[chainId]) {
      return chainMapper[chainId];
    } else {
      return "ethereum";
    }
  }
  function getNativeTokenName(chainId) {
    const chainMapper = {
      "0x1": "ETH",
      "0x89": "MATIC",
      "0x539": "MATIC", //localhost
    };
    if (chainMapper[chainId]) {
      return chainMapper[chainId];
    } else {
      return "ETH";
    }
  }

  return (
    <Layout>
      <SEO />
      <Wrapper>
        <Header />

        <ProjectsWrapper as={Container}>
          <Heading>
            {false && <Avatar imageUrl={DefiOptionsLogo} alt="project logo" width="80px" height="80px" />}
            {false && <HeadingText>Project Details</HeadingText>}
          </Heading>
          <InfoCards>
            <StatsCard>
              <CardHeaderWrapper>
                <ProjectNameWrapper>
                  <Avatar imageUrl={project.image} alt="Defi options logo" width="60px" height="60px" />
                  <StatsCardHeading margin="0 0 0 16px" fontSize="24px" fontWeight={800} color="white">
                    {project.title}
                  </StatsCardHeading>
                </ProjectNameWrapper>
              </CardHeaderWrapper>
              <CardHeaderTextWrapper>
                <TBAText color="#3F3D56" fontWeight={800}>
                  {date} {false && <DateCountdown mostSignificantFigure="hour" dateTo="August 19, 2021 20:30:00 GMT+03:00" />}
                </TBAText>
              </CardHeaderTextWrapper>
              <Text color="white" style={{ margin: "0 auto" }}>
                <i>{false && "Please Note: for Tier1 and Tier 2 sale is opening 15 mins after"}</i>
              </Text>
              <Text theme={theme} margin="11px 0px 0px 0px" color="white" fontWeight={600} fontSize="22px">
                Sale details:
              </Text>

              <CardBottomWrapper>
                <FirstStatsCard>
                  <Text color="#3F3D56" fontWeight={300} fontSize="20px">
                    Total Raise
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
                    Round Allocation
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
                {isWalletEnabled && false && (
                  <Card onClick={() => utils.addToWatchlist(project.technicalDetails[currentStatus].metamaskDetails)} borderRadius="4px" background="white" clickable width="100%" height="48px">
                    <Text fontWeight={800}>ADD {project.technicalDetails[currentStatus].metamaskDetails.symbol} TO METAMASK</Text>
                  </Card>
                )}

                <Text color="white" fontWeight={800}>
                  ⚠️ Please carefully read the <a target="_blank" href="https://shinedao.medium.com/jan-14th-kassandra-dao-private-sale-8b9a1c2dd41"> announcement</a> before participating!
                </Text>
              </CardBottomWrapper>
            </StatsCard>
            <TokenCard>
              <TitleText fontWeight={800} fontSize="24px" color="white">
                Token Address{" "}
                <Link href={`https://${currentStatus == "seed" ? "etherscan.io" : "polygonscan.com"}/address/${tokenContractAddress}`} target="_blank">
                  {tokenContractAddress.substring(0, 6)}...{tokenContractAddress.substring(tokenContractAddress.length - 4)}
                </Link>
              </TitleText>

              {!isWalletEnabled && (
                <Cards>
                  <JoinCard theme={theme}>
                    <h2 theme={theme}>TIER 1</h2>
                    <p className="frame1" theme={theme}>
                      {" "}
                      &#62; 15k SHN{" "}
                    </p>
                    <p className="frame2" theme={theme}>
                      {" "}
                      {/* {false && theme === "light" ? "❓" : "❔"}  {false && "Seed-sale" } */}
                      {false && "Seed-sale"} <br></br> ✅ Private Sale{" "}
                    </p>
                    <p className="frame2">
                      Cap/person <br></br> ${project.technicalDetails[currentStatus].caps.tier1.amount}
                    </p>
                  </JoinCard>
                  <JoinCard theme={theme}>
                    <h2>TIER 2</h2>
                    <p className="frame1"> &#62; 50.000 SHN </p>
                    <p className="frame2">
                      {" "}
                      {/* {false && theme === "light" ? "❓" : "❔"}  {false && "Seed-sale" } */}
                      <br></br> ✅ Private Sale{" "}
                    </p>
                    <p className="frame2">
                      Cap/person <br></br>${project.technicalDetails[currentStatus].caps.tier2.amount}
                    </p>
                  </JoinCard>
                  <JoinCard theme={theme}>
                    <h2>TIER 3</h2>
                    <p className="frame1"> &#62; 200k SHN </p>
                    <p className="frame2">
                      {false && "✅ Seed-sale"} <br></br>✅ Private Sale
                    </p>
                    <p className="frame2">
                      Cap/person <br></br> ${project.technicalDetails[currentStatus].caps.tier3.amount}
                    </p>
                  </JoinCard>
                  <JoinCard theme={theme}>
                    <h2>COMMITTEE</h2>
                    <p className="frame1"> &#62; 400k SHN </p>
                    <p className="frame2">
                      {false && "✅ Seed-sale"} <br></br>✅ Private Sale
                    </p>
                    <p className="frame2">
                      Cap/person <br></br> ${project.technicalDetails[currentStatus].caps.tier4.amount}
                    </p>
                  </JoinCard>
                </Cards>
              )}
              {false && (
                <div>
                  {!isWalletEnabled && (
                    <TierWrapper highlightTier={shineBalance >= 15000 && shineBalance < 50000}>
                      <Card width="120px" height="32px" background="#EEEEFF">
                        <Text fontSize="18px" fontWeight={800}>
                          TIER 1
                        </Text>
                      </Card>
                      <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                        (&gt;15k SHN)
                      </Text>
                      <Text color="#EEEEFF" fontSize="18px" fontWeight={800}>
                        Not guaranteed
                      </Text>
                    </TierWrapper>
                  )}
                  {!isWalletEnabled && (
                    <TierWrapper highlightTier={shineBalance >= 50000 && shineBalance < 200000}>
                      <Card width="120px" height="32px" background="#EEEEFF">
                        <Text fontSize="18px" fontWeight={800}>
                          TIER 2
                        </Text>
                      </Card>
                      <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                        (&gt;50k SHN)
                      </Text>
                      <Text color="#EEEEFF" fontSize="18px" fontWeight={800}>
                        Not guaranteed
                      </Text>
                    </TierWrapper>
                  )}
                  {!isWalletEnabled && (
                    <TierWrapper highlightTier={shineBalance >= 200000 && shineBalance < 400000}>
                      <Card width="120px" height="32px" background="#EEEEFF">
                        <Text fontSize="18px" fontWeight={800}>
                          TIER 3
                        </Text>
                      </Card>
                      <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                        (&gt;200k SHN)
                      </Text>
                      <Text color="#EEEEFF" fontSize="18px" fontWeight={800}>
                        Guaranteed
                      </Text>
                    </TierWrapper>
                  )}
                  {!isWalletEnabled && (
                    <TierWrapper highlightTier={shineBalance >= 400000}>
                      <Card width="120px" height="32px" background="#EEEEFF">
                        <Text fontSize="18px" fontWeight={800}>
                          TIER 4
                        </Text>
                      </Card>
                      <Text color="#EEEEFF" fontSize="14px" fontWeight={800}>
                        (&gt;400k SHN)
                      </Text>
                      <Text color="#EEEEFF" fontSize="18px" fontWeight={800}>
                        Guaranteed
                      </Text>
                    </TierWrapper>
                  )}
                </div>
              )}

              {isWalletEnabled && project.technicalDetails[currentStatus].saleFinished && (
                <Text color="tomato" fontSize="17px" fontWeight={800}>
                  The {currentStatus} offering has finished.
                </Text>
              )}
              {isWalletEnabled && utils.getTier(shineBalance) === "No Tier" && !project.technicalDetails[currentStatus].saleFinished && (
                <Text color="tomato" fontSize="17px" fontWeight={800}>
                  The amount of SHN that you have is below a minimum threshold to be placed in a tier. In order to participate in the sale, please consider getting some SHN on{" "}
                  <b style={{ cursor: "pointer", color: "#fada5e" }} onClick={() => window.open("https://info.quickswap.exchange/#/token/0x53d76f967de13e7f95e90196438dce695ecfa957", "_blank", "noopener")}>
                    Quickswap.
                  </b>
                </Text>
              )}
              {isWalletEnabled && (utils.getTier(shineBalance) === "Tier 1" || utils.getTier(shineBalance) === "Tier 2") && !isSaleOpenForAll && (
                <Text color="tomato" fontSize="17px" fontWeight={800}>
                  Seed sale is not yet open for Tier 1 and Tier 2. To get priority access please consider upgrading your tier{" "}
                  <b style={{ cursor: "pointer", color: "#fada5e" }} onClick={() => window.open("https://v2.info.uniswap.org/pair/0x165c6e50ed0ced21c0192fac26c1affb0dea5c28", "_blank", "noopener")}>
                    here.
                  </b>
                </Text>
              )}
              <br></br>
              {isWalletEnabled && (
                <Details theme={theme}>
                  <div>
                    <Text color="#aeaeae" fontWeight={100}>
                      <span>Current Network: {getNetworkName(currentNetwork)}</span>
                      <br />
                      <span>
                        Connected account: {window.ethereum.selectedAddress.substring(0, 6)}...
                        {window.ethereum.selectedAddress.substring(window.ethereum.selectedAddress.length - 4)}
                      </span>
                      <br />
                      {isWalletEnabled && (
                        <Text color="#aeaeae">
                          {" "}
                          SHN balance: {Number.parseFloat(shineBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} SHN <b style={{ color: "#f2df96" }}>{utils.getTier(shineBalance)}</b>
                        </Text>
                      )}

                      <span>
                        {getNetworkName(currentNetwork)} Balance: {Number.parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 2 })} {getNativeTokenName(currentNetwork)}
                      </span>
                      <br />
                      {console.log("project token balance", projectBalance)}
                      <span>
                        Project Token Balance: {Number.parseFloat(projectBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.technicalDetails[currentStatus].metamaskDetails.symbol}
                      </span>
                      <br />
                      {false && <span>SeedSale Contract Shn Balance: {Number.parseFloat(seedSaleShnBalance).toLocaleString()} SHN</span>}
                      <br />
                      {weiRaised && new Date().getTime() > new Date(project.technicalDetails[currentStatus].date).getTime() && !project.technicalDetails[currentStatus].saleFinished && (
                        <div>
                          <span>Sale progress: {saleProgress}% </span>
                          <ProgressBar animated striped variant="success" now={saleProgress} label={`${saleProgress}%`} />
                        </div>
                      )}
                      <br />

                      {isWalletEnabled && !(new Date().getTime() > new Date(project.technicalDetails[currentStatus].date).getTime()) && (
                        <Text color="tomato" fontSize="17px" fontWeight={800}>
                          Sale is not open yet!
                        </Text>
                      )}
                      {isWalletEnabled && currentNetwork !== project.technicalDetails[currentStatus].network && (
                        <div>
                          <Text color="tomato" fontSize="17px" fontWeight={800}>
                            You are on the wrong network. To access {currentStatus} please change your network to {getNetworkName(project.technicalDetails[currentStatus].network)}.
                          </Text>
                          <br></br>
                          <br></br>
                          <br></br>
                          <Text color="gold" fontSize="14px" fontWeight={500}>
                            <i>
                              {" "}
                              {!project.title.includes("Kassandra") && (
                                <div>
                                  Note: if you want to access vested balances from the seed stage please click{" "}
                                  <b style={{ color: "tomato", cursor: "pointer" }} onClick={() => setCurrentStatus("seed")}>
                                    here
                                  </b>
                                  .
                                </div>
                              )}
                            </i>
                          </Text>
                        </div>
                      )}
                    </Text>

                    <Text color="#aeaeae" fontWeight={100}>
                      {metamaskErrorCode && <ColorTitle>{metamaskErrorCode} </ColorTitle>}

                      {isWalletEnabled && !isTransactionBeingProcessed && new Date().getTime() > new Date(project.technicalDetails[currentStatus].date).getTime() && currentNetwork === project.technicalDetails[currentStatus].network && (
                        <div>
                          {!project.technicalDetails[currentStatus].saleFinished && (
                            <div>
                              <br></br>
                              <label htmlFor="eth_amount">Enter {getNativeTokenName(currentNetwork)} amount:</label>
                              <br />
                              <EthInput autoComplete="off" type="number" id="eth_amount" value={ethAmountToSpend} onChange={e => utils.handleChangeOfEthAmountToSpend(e.target.value, setEthAmountToSpend)} />
                              {ethAmountToSpend && (
                                <span>
                                  <span> ≈ {Number.parseFloat(currentEthPrice * ethAmountToSpend).toLocaleString()} USD</span> <br />{" "}
                                  <span>
                                    Estimated {project.technicalDetails[currentStatus].metamaskDetails.symbol} tokens to receive: {utils.estimateReceivedShn(ethAmountToSpend, rate).toLocaleString()}
                                  </span>
                                  {false && utils.getTier(shineBalance) !== "No Tier" && <span>Current contribution: {contributions}</span>}
                                </span>
                              )}
                              <br /> <br />
                              {// relativeCap && shineBalance needed below because it takes few hundred miliseconds to load the state variables
                              console.log("sshhnn", shineBalance)}
                              {relativeCap && shineBalance && ethAmountToSpend > utils.getMaximumContribution(relativeCap, shineBalance) - contributions && utils.getTier(shineBalance) !== "No Tier" && (
                                <Text color="tomato">
                                  The amount that you are trying to buy exceeds the maximum contribution cap for your current tier which is {utils.getTier(shineBalance)}. Your remaining maximum contribution is:{" "}
                                  <span
                                    onClick={e =>
                                      setEthAmountToSpend(
                                        Number.parseFloat(utils.getMaximumContribution(relativeCap, shineBalance) - contributions - 0.0001).toLocaleString(undefined, {
                                          minimumFractionDigits: 5,
                                          maximumFractionDigits: 5,
                                        })
                                      )
                                    }
                                    style={{ cursor: "pointer", color: "#007bff" }}
                                  >
                                    {Number.parseFloat(utils.getMaximumContribution(relativeCap, shineBalance) - contributions - 0.0001).toLocaleString(undefined, {
                                      minimumFractionDigits: 5,
                                      maximumFractionDigits: 5,
                                    })}{" "}
                                  </span>{" "}
                                  {getNativeTokenName(currentNetwork)}
                                </Text>
                              )}
                              <br />
                              <br />
                              <FlexBox>
                                <ConnectButton
                                  theme={theme}
                                  onClick={() =>
                                    utils.buyShineTokens(ethAmountToSpend, setEthAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, userAddress, saleAbi, saleContractAddress, gas, currentStatus)
                                  }
                                >
                                  Buy Tokens
                                </ConnectButton>
                                <Text margin="0 0 0 10px" color="#aeaeae">
                                  {" "}
                                  {false && "Note: 25% of the bought tokens are released immediatly, 75% is vested for 100 days."}
                                </Text>
                              </FlexBox>
                            </div>
                          )}

                          <br />
                          <br />
                        </div>
                      )}
                      {isWalletEnabled && console.log("vested balances ", vestedBalances)}
                      {vestedBalances > 0 && currentNetwork === project.technicalDetails[currentStatus].network && (
                        <FlexBox>
                          <ConnectButton theme={theme} onClick={() => utils.withdrawTokens(saleAbi, saleContractAddress, userAddress, gas, setTransactionBeingProcessed, setMetamaskErrorCode, setIsTokenWithdrawn, setShineBought)}>
                            Widthdraw tokens
                          </ConnectButton>
                          <Text margin="0 0 0 10px" color="#aeaeae">
                            {" "}
                            Vested Amount: {Number.parseFloat(vestedBalances).toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.technicalDetails[currentStatus].metamaskDetails.symbol}{" "}
                          </Text>
                          <Text margin="0 0 0 10px" color="#aeaeae">
                            {" "}
                            Unlock time: {utils.timeConverter(vestingPeriod)}
                          </Text>
                        </FlexBox>
                      )}
                      {isShineBought && !isTransactionBeingProcessed && (
                        <div style={{ marginTop: 20 }}>
                          <h4>
                            You just successfully bought {Number.parseFloat(shineBoughtAmount).toLocaleString()} {project.technicalDetails[currentStatus].metamaskDetails.symbol} tokens! {false && "(Note: 75% is vested)"}{" "}
                          </h4>
                        </div>
                      )}

                      {isTokenWithdrawn && !isTransactionBeingProcessed && (
                        <div>
                          <h4>You have just successfully withdrawn your remaining vested {project.technicalDetails[currentStatus].metamaskDetails.symbol} tokens!</h4>
                        </div>
                      )}

                      {isTransactionBeingProcessed && (
                        <div>
                          {" "}
                          <h5>Processing </h5>
                          <PulseLoader color={"yellow"} loading={true} size={15} margin={2} /> <br /> <br />
                          <h5>
                            <i>(Can take up to few minutes, Matic network has been experiencing congestion for the last few weeks so please wait patiently)</i>
                          </h5>
                        </div>
                      )}
                    </Text>
                  </div>
                </Details>
              )}

              {console.log("shine balance", shineBalance)}
              {!isWalletEnabled && (
                <Card onClick={() => utils.loadWeb3(setWalletStatus, setBalance, setCurrentNetwork)} borderRadius="4px" border="1px solid white" color="white" background="#1E1E1E" clickable width="100%" height="48px" margin="5px 0 0 0">
                  <Text fontWeight={800} color="white">
                    CONNECT WALLET
                  </Text>
                </Card>
              )}
            </TokenCard>
          </InfoCards>

          <br></br>
          <br></br>

          <Details>
            <DetailsTitle>Details</DetailsTitle>

            <DescriptionLinksContainer>
              <TextContainer>{project.shortDescription}</TextContainer>
              <LinkContainer>
                <RoundedLinkButton theme={theme} onClick={() => openLink(project.links.website)}>
                  <div>
                    <Icon src={`/icons/links_${theme}.png`}></Icon>
                    <TextRoundedLinkButton>WEBSITE</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
                <RoundedLinkButton theme={theme} onClick={() => openLink(project.links.docs)}>
                  <div>
                    <Icon src={`/icons/docs_${theme}.png`}></Icon>
                    <TextRoundedLinkButton>DOCS</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme} onClick={() => openLink(project.links.alpha)}>
                  <div>
                    <Icon src={`/icons/alphaversion_${theme}.png`}></Icon>
                    <TextRoundedLinkButton>DEMO VERSION</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>

                <RoundedLinkButton theme={theme} onClick={() => openLink(project.links.discord)}>
                  <div>
                    <Icon src={`/icons/discord_${theme}.png`}></Icon>
                    <TextRoundedLinkButton>DISCORD</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
                <RoundedLinkButton theme={theme} onClick={() => openLink(project.links.github)}>
                  <div>
                    <Icon src={`/icons/github_${theme}.png`}></Icon>
                    <TextRoundedLinkButton>GITHUB</TextRoundedLinkButton>
                  </div>
                </RoundedLinkButton>
              </LinkContainer>
            </DescriptionLinksContainer>

            {!project.title.includes("Kassandra") && (
              <TasksSection theme={theme}>
                <TaskSectionTextContainer>
                  <ContributeTitle>Contribute and get rewarded</ContributeTitle>

                  <ContributeText>7% of projects tokens will be distributed to early contributors.</ContributeText>
                </TaskSectionTextContainer>

                <ConnectButtonContainer>
                  <ConnectButton onClick={() => openLink(project.links.tasks)} theme={theme}>
                    SEE TASKS
                  </ConnectButton>
                </ConnectButtonContainer>
              </TasksSection>
            )}

            <LitepaperCard theme={theme}>
              {true && (
                <ConnectButton theme={theme} onClick={() => openLink(project.links.lightpaper)}>
                  <DisableColor>GO TO LITEPAPER</DisableColor>
                </ConnectButton>
              )}
              <br></br>
              <br></br>
              <h3>Tokenomics</h3>
            </LitepaperCard>
          </Details>

          {true && (
            <a>
              <img src={theme == "light" ? require(`assets/illustrations/${project.tokenomics.tokenDistributionImage.light}`) : require(`assets/illustrations/${project.tokenomics.tokenDistributionImage.dark}`)} alt="Project Tokenomics" />
            </a>
          )}
          {console.log("user address 0", userAddress)}
          {console.log("user address 1", deployerAddress)}
          {console.log("user address 3", userAddress == deployerAddress.toLowerCase())}
          {userAddress == deployerAddress.toLowerCase() && isWalletEnabled && (
            <ConnectButtonContainer>
              <ConnectButton onClick={() => utils.enableAccessForTier1AndTier2(userAddress, gas, saleAbi, saleContractAddress)} theme={theme}>
                Open Sale for Tier 1 and Tier 2
              </ConnectButton>
              <br></br>
              <EthInput autoComplete="off" type="string" id="shn_reference" value={shnReference} onChange={e => utils.handleChangeOfShnReference(e.target.value, setShnReference)} />
              <ConnectButton onClick={() => utils.setShineTokenAddress(userAddress, shnReference, gas, saleAbi, saleContractAddress)} theme={theme}>
                Set SHN Reference
              </ConnectButton>

              <br></br>
              <EthInput autoComplete="off" type="number" id="new_relative_cap" value={newRelativeCap} onChange={e => utils.handleChangeOfNewRelativeCap(e.target.value, setNewRelativeCap)} />
              <ConnectButton onClick={() => utils.setNewRelativeCap(userAddress, newRelativeCap, gas, saleAbi, saleContractAddress)} theme={theme}>
                Set Relative Cap
              </ConnectButton>
              <br></br>
              <label htmlFor="new_relative_cap"> Current Cap: {relativeCap}</label>
              <br></br>
              <label htmlFor="new_relative_cap"> Current migration: {currentMigration}</label>
            </ConnectButtonContainer>
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
      image
      shortDescription
      links {
        website
        discord
        docs
        github
        tasks
        lightpaper
        alpha
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
      technicalDetails {
        currentStatus
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

        seed {
          network
          date
          saleFinished
          shineTokenAddress
          metamaskDetails {
            address
            decimals
            image
            symbol
          }
          tokenAddress
          gas
          caps {
            tier1 {
              status
              amount
            }
            tier2 {
              status
              amount
            }
            tier3 {
              status
              amount
            }
            tier4 {
              status
              amount
            }
          }
          rate
          saleAddress
          deployerAddress
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
        ido {
          network
          date
          saleFinished
          shineTokenAddress
          metamaskDetails {
            address
            decimals
            image
            symbol
          }
          tokenAddress
          gas
          caps {
            tier1 {
              status
              amount
            }
            tier2 {
              status
              amount
            }
            tier3 {
              status
              amount
            }
            tier4 {
              status
              amount
            }
          }
          rate
          saleAddress
          deployerAddress
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
        ganacheSeed {
          network
          date
          saleFinished
          shineTokenAddress
          metamaskDetails {
            address
            decimals
            image
            symbol
          }
          tokenAddress
          gas
          caps {
            tier1 {
              status
              amount
            }
            tier2 {
              status
              amount
            }
            tier3 {
              status
              amount
            }
            tier4 {
              status
              amount
            }
          }
          rate
          saleAddress
          deployerAddress
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
        ganacheIdo {
          network
          date
          saleFinished
          shineTokenAddress
          metamaskDetails {
            address
            decimals
            image
            symbol
          }
          tokenAddress
          gas
          caps {
            tier1 {
              status
              amount
            }
            tier2 {
              status
              amount
            }
            tier3 {
              status
              amount
            }
            tier4 {
              status
              amount
            }
          }
          rate
          saleAddress
          deployerAddress
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
