import React, { useState, useContext, useEffect } from "react";
import { Button } from "components/common";
import { ThemeContext } from "providers/ThemeProvider";

import { getOnlyUserAddress, deployNewSeed, getSeedSales, getCoingeckoName, getNetworkName, getRateInUsd, getNativeTokenPrice, ZERO_ADDRESS } from "../../../templates/utils.js";
import SeedFactory from "../../../../../static/abi/SeedFactory";
import Seed from "../../../../../static/abi/Seed";
import ERC20 from "../../../../../static/abi/ShineToken";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import ProgressBar from "react-bootstrap/ProgressBar";
import { SmallerText } from "components/common/Text";

import { Text, Card } from "components/common";
import * as utils from "../../../templates/utils";
import { fromWei, fromFixed, getCustomTier, approveContract, checkApprovalStatus } from "../../../templates/utils";
import { WalletContext } from "providers/WalletProvider";

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
} from "../../..//templates/styles";

import { Avatar } from "../../../common/Avatar";
import seedSale from "pages/seed-sale.js";

export function SeedCard({
  setSeedSalesData,
  setActiveContract,
  setCardVisible,
  setDealsVisible,
  isWalletEnabled1111,
  refetchData,
  setRefetchData,
  loadingIndicator,
  setLoadingIndicator,
  getEligibilityStatus,
  seedSaleData: {
    name,
    seedAddress,
    rate,
    offeredTokenName,
    offeredTokenSymbol,
    offeredTokenTotalSupply,
    acceptedTokenSymbol,
    acceptedTokenBalance,
    weiRaised,
    dealVisibility,
    startTime,
    endTime,
    acceptedTokenAddress,
    accessMechanism,
    distributionMechanism,
    offeredTokenAddress,
    percentageVested,
    cliffDuration,
    vestingDuration,
    cliffPeriod,
    vestingPeriod,
    vestedBalance,
    capPerAddressEnabled,
    capPerAddress,
    accessNFT,
    accessNTT,
    accessToken,
    totalOffered,
    tier1,
    tier2,
    tier3,
    tier4,
    tier1Cap,
    tier2Cap,
    tier3Cap,
    tier4Cap,
    accessTokenSymbol,
    capForNTT,
    capForNFT,
    nftBalance,
    nttBalance,
    kycEnabled,
    hasValidNtt,
    accessTokenBalance,
  },
}) {
  const { theme } = useContext(ThemeContext);
  const { isWalletEnabled, setWalletStatus, chainId, setChainId, currentAccount, setCurrentAccount, nativeBalance, setNativeBalance, nativeTokenName } = useContext(WalletContext);
  //replace balance with context nativeBalance and currentNetwork with chainId from context

  {
    console.log("native token name 123 ", nativeTokenName);
  }
  const [approveLoading, setApproveLoading] = useState(false);
  const [shineBalance, setShineBalance] = useState(23232);
  const [currentStatus, setCurrentStatus] = useState("seed");
  const [tokenContractAddress, setTokenContractAddress] = useState("0x00184f7E750Db6D16118597d18b79AAeCE26E5f2"); // random address initially

  const [isSaleOpenForAll, setIsSaleOpenForAll] = useState();
  const [projectBalance, setProjectBalance] = useState();
  //const [weiRaised, setWeiRaised] = useState();

  const [seedSaleShnBalance, setSeedSaleShnBalance] = useState();
  const [metamaskErrorCode, setMetamaskErrorCode] = useState();
  const [saleProgress, setSaleProgress] = useState();
  const [relativeCap, setRelativeCap] = useState();
  const [newRelativeCap, setNewRelativeCap] = useState(); // used for updating the new relative cap through the UI
  const [contributions, setContributions] = useState();
  const [currentMigration, setCurrentMigration] = useState();

  const [isShineBought, setShineBought] = useState(false);
  const [isTokenWithdrawn, setIsTokenWithdrawn] = useState(false);
  const [shineBoughtAmount, setShineBoughtAmount] = useState(false);
  const [isTransactionBeingProcessed, setTransactionBeingProcessed] = useState(false);
  const [amountToSpend, setAmountToSpend] = useState(0);
  const [shnReference, setShnReference] = useState("");
  const [currentEthPrice, setCurrentEthPrice] = useState();
  const [ethRaised, setEthRaised] = useState();
  const [saleContractAddress, setSaleContractAddress] = useState("0xC7E7D5B322cEa8FEFb388Eb19463737C3468f30D"); //random address initially
  //const [rate, setRate] = useState();
  const [rateInUsd, setRateInUsd] = useState();

  const [vestedSoFar, setVestedSoFar] = useState();
  const [secondsSinceEpoch, setSecondsSinceEpoch] = useState();

  const [approvalStatus, setApprovalStatus] = useState(false);
  console.log("refetch data", refetchData);

  useEffect(() => {
    console.log("Refetch data 123", refetchData);

    if (isWalletEnabled == true && typeof name != "undefined") {
      async function getLocked() {
        setTokenContractAddress(offeredTokenAddress);
        setSaleContractAddress(seedAddress);
        //setRate(rate);
        utils.getProjectBalance(setProjectBalance, currentAccount, ERC20.abi, offeredTokenAddress);
        utils.getSeedSaleShnBalance(setSeedSaleShnBalance, ERC20.abi, seedAddress, offeredTokenAddress);
        console.log("sale data 1", await getNativeTokenPrice("0x89"));
        setRateInUsd(getRateInUsd(utils.fromFixed(rate), await getNativeTokenPrice(chainId)));
        setSecondsSinceEpoch(Math.round(Date.now() / 1000));
        //console.log("vested so far ", secondsSinceEpoch <= vestingPeriod, secondsSinceEpoch, cliffPeriod, vestedBalance);
        if (Math.round(Date.now() / 1000) <= cliffPeriod) {
          setVestedSoFar(0);
        } else if (Math.round(Date.now() / 1000) <= vestingPeriod) {
          setVestedSoFar(rewardPerSecond * (Math.round(Date.now() / 1000) - cliffPeriod));
        } else {
          setVestedSoFar(vestedBalance);
        }
      }
      getLocked();
    }
  }, [isWalletEnabled, name, refetchData]);

  useEffect(() => {
    //https://stackoverflow.com/a/70068404 setting refetch back to false, in case if there are multiple swaps one after other
    if (refetchData == true) {
      const timer = setTimeout(() => {
        setRefetchData(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [refetchData]);

  useEffect(() => {
    checkApprovalStatus(currentAccount, ERC20.abi, acceptedTokenAddress, seedAddress, amountToSpend, setApprovalStatus);
  }, [amountToSpend, name]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${getCoingeckoName(chainId)}`)
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
  }, [amountToSpend, chainId]);

  function getDistributionInfo(distributionMechanism, percentageVested, cliffDuration, vestingDuration) {
    if (distributionMechanism == "lock") {
      return (
        <div>
          <Text color="white" fontWeight={500} fontSize="20px">
            {" "}
            Distribution mechanism
          </Text>
          <Text color="#a2a2a2" fontWeight={300} fontSize="16px">
            {100 - percentageVested}% of tokens unlocked immediatly, and the rest after {vestingDuration / 86400} days
          </Text>
        </div>
      );
    } else if (distributionMechanism == "linear-vesting") {
      return (
        <div>
          <Text color="white" fontWeight={500} fontSize="20px">
            {" "}
            Distribution mechanism
          </Text>
          <Text color="#a2a2a2" fontWeight={700} fontSize="16px">
            {100 - percentageVested}% of tokens unlocked immediatly, then distributed linearly over {vestingDuration / 86400} days with a cliff period of {cliffDuration / 86400} days
          </Text>
        </div>
      );
    } else {
      return (
        <div>
          <Text color="white" fontWeight={500} fontSize="20px">
            {" "}
            Distribution mechanism
          </Text>
          <Text color="#a2a2a2" fontWeight={700} fontSize="16px">
            All tokens are unlocked immediatly
          </Text>
        </div>
      );
    }
  }

  const project = {
    title: "EXAMPLE",
    image: "test",
    frontendDetails: { totalRaise: "200k", incubationStage: "seed", totalSupply: "500M", chain: "Matic", rate: "$0.02", roundAllocation: "200k" },
    technicalDetails: {
      seed: {
        rate: 203333,
        date: "Fri, 14 Jan 2022 15:00:00 GMT",
        metamaskDetails: { sybmol: "SYMBOL" },
        network: "0x7a69",
        caps: { tier1: { amount: 400 }, tier2: { amount: 400 }, tier3: { amount: 400 }, tier4: { amount: 400 } },
      },
    },
  };
  const saleAbi = Seed.abi;

  function getAccessStatus(accessMechanism, capPerAddress, acceptedTokenSymbol, capForNFT, capForNTT, accessTokenBalance, tier1, tier2, tier3, tier4) {
    if (accessMechanism == "open") {
      return (
        <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
          Open to anyone
        </Text>
      );
    } else if (accessMechanism == "whitelist") {
      return (
        <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
          Whitelist, {fromWei(capPerAddress)} {acceptedTokenSymbol} cap/address
        </Text>
      );
    } else if (accessMechanism == "nft-gate") {
      return (
        <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
          NFT Gated, {fromWei(capForNFT)} {acceptedTokenSymbol} cap/address
        </Text>
      );
    } else if (accessMechanism == "ntt-gate") {
      return (
        <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
          NTT Gated {fromWei(capForNTT)} {acceptedTokenSymbol} cap/address
        </Text>
      );
    } else if (accessMechanism == "token-gate-tiers") {
      let calculatedTier = getCustomTier(fromWei(accessTokenBalance), fromWei(tier1), fromWei(tier2), fromWei(tier3), fromWei(tier4));
      return (
        <div>
          <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
            Token Gated With Tiers
          </Text>
          <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
            Your Balance - {fromWei(accessTokenBalance)} {accessTokenSymbol} {calculatedTier}
          </Text>
          <div style={{ display: "flex", paddingTop: 10, paddingBottom: 10, flexWrap: "wrap", justifyContent: "space-between" }}>
            <div style={{ paddingBottom: 10, paddingRight: 10 }}>
              <Text color={calculatedTier != "Tier 1" ? "#322ad1" : "red"} fontWeight={500} fontSize="16px">
                TIER 1
              </Text>

              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                &#62; {fromWei(tier1)} {accessTokenSymbol}
              </Text>
              <Text color="white" fontWeight={500} fontSize="16px">
                Cap/address{" "}
              </Text>
              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                {fromWei(tier1Cap)} {acceptedTokenSymbol}
              </Text>
            </div>
            <div style={{ paddingBottom: 10, paddingRight: 10 }}>
              <Text color={calculatedTier != "Tier 2" ? "#322ad1" : "red"} fontWeight={500} fontSize="16px">
                TIER 2
              </Text>

              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                &#62; {fromWei(tier2)} {accessTokenSymbol}
              </Text>
              <Text color="white" fontWeight={500} fontSize="16px">
                Cap/address{" "}
              </Text>
              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                {fromWei(tier2Cap)} {acceptedTokenSymbol}
              </Text>
            </div>
            <div style={{ paddingBottom: 10, paddingRight: 10 }}>
              <Text color={calculatedTier != "Tier 3" ? "#322ad1" : "red"} fontWeight={500} fontSize="16px">
                TIER 3
              </Text>
              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                &#62; {fromWei(tier3)} {accessTokenSymbol}
              </Text>
              <Text color="white" fontWeight={500} fontSize="16px">
                Cap/address{" "}
              </Text>
              <Text color="#a2a2a2" fontWeight={700} fontSize="16px">
                {fromWei(tier3Cap)} {acceptedTokenSymbol}
              </Text>
            </div>
            <div style={{ paddingBottom: 10, paddingRight: 10 }}>
              <Text color={calculatedTier != "Tier 4" ? "#322ad1" : "red"} fontWeight={700} fontSize="16px">
                TIER 4
              </Text>
              <Text color="#a2a2a2" fontWeight={700} fontSize="16px">
                &#62; {fromWei(tier4)} {accessTokenSymbol}
              </Text>
              <Text color="white" fontWeight={500} fontSize="16px">
                Cap/address{" "}
              </Text>
              <Text color="#a2a2a2" fontWeight={500} fontSize="16px">
                {fromWei(tier4Cap)} {acceptedTokenSymbol}
              </Text>
            </div>
          </div>{" "}
        </div>
      );
    } else {
      return "Uknown";
    }
  }

  function handleSwapButton(acceptedTokenAddress, amountToSpend, setAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, currentAccount, saleAbi, saleContractAddress, currentStatus) {
    if (acceptedTokenAddress == utils.ZERO_ADDRESS) {
      utils.buyShineTokens(amountToSpend, setAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, currentAccount, saleAbi, saleContractAddress, currentStatus, setRefetchData);
    } else {
      utils.swapTokenWithToken(amountToSpend, setAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, currentAccount, saleAbi, saleContractAddress, currentStatus, setRefetchData);
    }
  }

  async function handleApprove() {
    setApproveLoading(true);
    await approveContract(currentAccount, ERC20.abi, acceptedTokenAddress, seedAddress, utils.toWei(amountToSpend), setApprovalStatus);
    setApproveLoading(false);
  }

  function setExpansionDetails() {
    setSeedSalesData();
    setActiveContract(null);
    setCardVisible(false);
    setDealsVisible(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: 50, alignItems: "center" }}>
      <div onClick={() => setExpansionDetails()} style={{ cursor: "pointer" }}>
        <h3>← Go Back</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}>
        <StatsCard background="black" border="1px solid white">
          <div>{getEligibilityStatus(accessMechanism, capPerAddressEnabled, capPerAddress, nftBalance, kycEnabled, nttBalance, hasValidNtt, accessTokenBalance, tier1Cap)}</div>

          <CardHeaderWrapper>
            <ProjectNameWrapper>
              {false && <Avatar imageUrl={project.image} alt="Defi options logo" width="60px" height="60px" />}
              <StatsCardHeading margin="0 0 40px 0px" fontSize="30px" fontWeight={800} color="white">
                {name}
              </StatsCardHeading>
            </ProjectNameWrapper>
          </CardHeaderWrapper>

          <Text color="white" style={{ margin: "0 auto" }}>
            <i>{false && "Please Note: for Tier1 and Tier 2 sale is opening 15 mins after"}</i>
          </Text>

          <CardBottomWrapper background="black">
            <div style={{ paddingBottom: 10 }}>
              <Text color="white" fontWeight={500} fontSize="20px">
                Total Deal
              </Text>
              <Text color="#a2a2a2" fontWeight={300} fontSize="16px">
                {fromWei(totalOffered)} {offeredTokenSymbol} for max {fromFixed(rate) * fromWei(totalOffered)} {acceptedTokenAddress != ZERO_ADDRESS ? acceptedTokenSymbol : nativeTokenName}
              </Text>
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Text color="white" fontWeight={500} fontSize="20px">
                Deal avaibility
              </Text>
              <Text color="#a2a2a2" fontWeight={300} fontSize="16px">
                {utils.timeConverter(startTime)} to {utils.timeConverter(endTime)}
              </Text>
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Text color="white" fontWeight={500} fontSize="20px">
                Total supply for offered token
              </Text>
              <Text color="#a2a2a2" fontWeight={300} fontSize="16px">
                {utils.fromWei(offeredTokenTotalSupply)} {offeredTokenSymbol}
              </Text>
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Text color="white" fontWeight={300} fontSize="20px">
                Rate
              </Text>
              <Text color="#a2a2a2" fontWeight={700} fontSize="20px">
                {fromFixed(rate)} {offeredTokenSymbol} for 1 {acceptedTokenAddress != ZERO_ADDRESS ? acceptedTokenSymbol : nativeTokenName}
              </Text>
            </div>
            <div style={{ paddingBottom: 10 }}>
              <Text color="white" fontWeight={500} fontSize="20px">
                Access Mechanism
              </Text>

              {getAccessStatus(accessMechanism, capPerAddress, acceptedTokenSymbol, capForNFT, capForNTT, accessTokenBalance, tier1, tier2, tier3, tier4)}
            </div>
            <div>{getDistributionInfo(distributionMechanism, percentageVested, cliffDuration, vestingDuration)}</div>

            {isWalletEnabled && false && (
              <Card onClick={() => utils.addToWatchlist(project.technicalDetails[currentStatus].metamaskDetails)} borderRadius="4px" background="white" clickable width="100%" height="48px">
                <Text fontWeight={800}>ADD {project.technicalDetails[currentStatus].metamaskDetails.symbol} TO METAMASK</Text>
              </Card>
            )}

            <Text color="red" fontWeight={800}>
              {endTime && secondsSinceEpoch > endTime && "Sale closed!"}
            </Text>
            <br></br>
            <br></br>
          </CardBottomWrapper>
        </StatsCard>

        <TokenCard>
          <TitleText fontWeight={800} fontSize="24px" color="white">
            Offered Token Address{" "}
            <Link href={`https://${project.technicalDetails[currentStatus].network == "0x1" ? "etherscan.io" : "polygonscan.com"}/address/${tokenContractAddress}`} target="_blank">
              {tokenContractAddress.substring(0, 6)}...{tokenContractAddress.substring(tokenContractAddress.length - 4)}
            </Link>
          </TitleText>

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
          {false && isWalletEnabled && (utils.getTier(shineBalance) === "Tier 1" || utils.getTier(shineBalance) === "Tier 2") && !isSaleOpenForAll && (
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
              <div style={{ width: "100%" }}>
                <Text color="#aeaeae" fontWeight={100}>
                  <span>Current Network: {getNetworkName(chainId)}</span>
                  <br />
                  <span>
                    Connected account: {window.ethereum.selectedAddress.substring(0, 6)}...
                    {window.ethereum.selectedAddress.substring(window.ethereum.selectedAddress.length - 4)}
                  </span>
                  <br />
                  {false && isWalletEnabled && (
                    <Text color="#aeaeae">
                      {" "}
                      Access token balance: {Number.parseFloat(shineBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} SHN <b style={{ color: "#f2df96" }}>{utils.getTier(shineBalance)}</b>
                    </Text>
                  )}
                  {acceptedTokenAddress != utils.ZERO_ADDRESS && (
                    <span>
                      Accepted Token Balance: {Number.parseFloat(fromWei(acceptedTokenBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 })} {acceptedTokenSymbol}
                    </span>
                  )}
                  <br></br>
                  <span>
                    {getNetworkName(chainId)} Balance: {Number.parseFloat(nativeBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} {nativeTokenName}
                  </span>
                  <br />
                  {console.log("vestedSoFar ", vestedSoFar)}
                  <span>
                    Project token balance: {Number.parseFloat(projectBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} {offeredTokenSymbol}
                  </span>
                  <br />
                  {true && (
                    <span>
                      Remaining Deal Balance: {Number.parseFloat(seedSaleShnBalance).toLocaleString()} {offeredTokenSymbol}
                    </span>
                  )}
                  <br />
                  {weiRaised && (
                    <div>
                      <br></br>
                      <span>Sale progress: {((weiRaised * fromFixed(rate)) / totalOffered) * 100}% </span>
                      <ProgressBar animated striped variant="success" now={((weiRaised * fromFixed(rate)) / totalOffered) * 100} label={`${((weiRaised * fromFixed(rate)) / totalOffered) * 100}%`} />
                    </div>
                  )}
                  <br />

                  {false && isWalletEnabled && !(new Date().getTime() > new Date(project.technicalDetails[currentStatus].date).getTime()) && (
                    <Text color="tomato" fontSize="17px" fontWeight={800}>
                      Sale is not open yet!
                    </Text>
                  )}
                  {false && isWalletEnabled && chainId !== project.technicalDetails[currentStatus].network && (
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
                          {false && !project.title.includes("Kassandra") && (
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

                  {isWalletEnabled &&
                    !isTransactionBeingProcessed && (
                      <div>
                        
                        <div>
                          <br></br>
                          {acceptedTokenAddress == utils.ZERO_ADDRESS ? <label htmlFor="eth_amount">Enter {nativeTokenName} amount:</label> : <label htmlFor="eth_amount">Enter {acceptedTokenSymbol} amount:</label>}
                          <br />
                          <EthInput autoComplete="off" type="number" id="eth_amount" value={amountToSpend} onChange={e => utils.handleChangeOfEthAmountToSpend(e.target.value, setAmountToSpend)} />
                          {console.log("debug", currentEthPrice, amountToSpend, Number.parseFloat(currentEthPrice * amountToSpend).toLocaleString())}
                          {amountToSpend && (
                            <span>
                              {acceptedTokenAddress == utils.ZERO_ADDRESS && (
                                <span>
                                  {" "}
                                  <span> ≈ {Number.parseFloat(currentEthPrice * amountToSpend).toLocaleString()} USD</span> <br />{" "}
                                </span>
                              )}
                              <span>
                                <br></br>
                                Estimated tokens to receive: {utils.estimateReceivedTokens(amountToSpend, fromFixed(rate))} {offeredTokenSymbol}
                              </span>
                              {false && utils.getTier(shineBalance) !== "No Tier" && <span>Current contribution: {contributions}</span>}
                            </span>
                          )}
                          <br /> <br />
                          {// relativeCap && shineBalance needed below because it takes few hundred miliseconds to load the state variables
                          console.log("sshhnn", shineBalance, contributions)}
                          {relativeCap && shineBalance && amountToSpend > utils.getMaximumContribution(relativeCap, shineBalance) - contributions && utils.getTier(shineBalance) !== "No Tier" && (
                            <Text color="tomato">
                              The amount that you are trying to buy exceeds the maximum contribution cap for your current tier which is {utils.getTier(shineBalance)}. Your remaining maximum contribution is:{" "}
                              <span
                                onClick={e =>
                                  setAmountToSpend(
                                    Number.parseFloat(utils.getMaximumContribution(relativeCap, shineBalance) - contributions - 0.0001)
                                      .toLocaleString(undefined, {
                                        minimumFractionDigits: 5,
                                        maximumFractionDigits: 5,
                                      })
                                      .replace(",", "")
                                  )
                                }
                                style={{ cursor: "pointer", color: "#007bff" }}
                              >
                                {Number.parseFloat(utils.getMaximumContribution(relativeCap, shineBalance) - contributions - 0.0001).toLocaleString(undefined, {
                                  minimumFractionDigits: 5,
                                  maximumFractionDigits: 5,
                                })}{" "}
                              </span>{" "}
                              {nativeTokenName}
                            </Text>
                          )}
                          <br />
                          <br />
                          <FlexBox>
                            {approvalStatus &&
                              (!approveLoading ? (
                                <ConnectButton theme={theme} onClick={() => handleApprove()}>
                                  Approve
                                </ConnectButton>
                              ) : (
                                <span style={{ paddingRight: 15 }}>
                                  <PulseLoader color={"gold"} loading={true} size={10} margin={2} />
                                  <SmallerText>Confirming...</SmallerText>
                                </span>
                              ))}

                            <ConnectButton
                              theme={theme}
                              onClick={() =>
                                handleSwapButton(acceptedTokenAddress, amountToSpend, setAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, currentAccount, saleAbi, saleContractAddress, currentStatus)
                              }
                            >
                              Swap
                            </ConnectButton>
                            <Text margin="0 0 0 10px" color="#aeaeae">
                              {" "}
                              {false && "Note: 25% of the bought tokens are released immediatly, 75% is vested for 100 days."}
                            </Text>
                          </FlexBox>
                        </div>
                        
                        <br />
                        <br />
                      </div>
                    )}
                  {isWalletEnabled && vestedBalance && console.log("vested balances ", utils.fromWei(vestedBalance))}
                  {vestedBalance && vestedBalance > 0 && chainId === project.technicalDetails[currentStatus].network && (
                    <div>
                      <FlexBox>
                        {cliffPeriod != vestingPeriod && (
                          <Text margin="0 0 0 10px" color="#aeaeae">
                            {" "}
                            Cliff start time: {utils.timeConverter(cliffPeriod)}
                          </Text>
                        )}

                        <Text margin="0 0 0 10px" color="#aeaeae">
                          {" "}
                          Unlock time: {utils.timeConverter(vestingPeriod)}
                        </Text>
                      </FlexBox>
                      <br></br>

                      <FlexBox>
                        <ConnectButton theme={theme} onClick={() => utils.withdrawTokens(saleAbi, saleContractAddress, currentAccount, setTransactionBeingProcessed, setMetamaskErrorCode, setIsTokenWithdrawn, setShineBought)}>
                          Widthdraw tokens
                        </ConnectButton>
                        {typeof vestedSoFar != "undefined" && (
                          <Text margin="0 0 0 10px" color="#aeaeae">
                            {" "}
                            Available: {Number.parseFloat(utils.fromWei(vestedSoFar)).toLocaleString(undefined, { maximumFractionDigits: 2 })} {offeredTokenSymbol}{" "}
                          </Text>
                        )}
                        <Text margin="0 0 0 10px" color="#aeaeae">
                          {" "}
                          Remaining vest: {Number.parseFloat(utils.fromWei(vestedBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 })} {offeredTokenSymbol}{" "}
                        </Text>
                      </FlexBox>
                    </div>
                  )}
                  {isShineBought && !isTransactionBeingProcessed && (
                    <div style={{ marginTop: 20 }}>
                      <h4>
                        You just successfully bought {Number.parseFloat(shineBoughtAmount).toLocaleString()} {offeredTokenSymbol} tokens! {false && "(Note: 75% is vested)"}{" "}
                      </h4>
                    </div>
                  )}

                  {isTokenWithdrawn && !isTransactionBeingProcessed && (
                    <div>
                      <h4>You have successfully claimed portion of your {offeredTokenSymbol} tokens!</h4>
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
          {console.log("current network ", chainId, project.technicalDetails[currentStatus].network)}

          {console.log("shine balance", shineBalance)}
        </TokenCard>
      </div>
    </div>
  );
}
