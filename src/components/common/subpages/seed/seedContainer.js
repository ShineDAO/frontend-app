//note both ntt address and seed factory address have to be updates
import React, { useState, useContext, useEffect } from "react";
import { Button } from "components/common";
import { Card, Text } from "components/common";

import { TableD, TableR, TableLabel } from "components/common/Table";
import { SmallerText } from "components/common/Text";
import { Slider } from "components/common/Container/index";
import PulseLoader from "react-spinners/PulseLoader";

import {
  getOnlyUserAddress,
  deployNewSeed,
  getSeedSales,
  toWei,
  approveContract,
  getTokenRate,
  getTokenRatio,
  fromFixed,
  getCoingeckoName,
  getNetworkName,
  getAllowance,
  fromWei,
  setAccessToken,
  timeConverter,
  substringAddress,
  getTokenBalance,
  getErc20Balance,
  getErc20Symbol,
  getNftBalance,
  erc721Abi,
  erc4671Abi,
  ZERO_ADDRESS,
  getTokenAddressFromDealsConfig,
  retrieveIndex,
  getAddress,
} from "../../../../../src/components/templates/utils.js";
import SeedFactory from "../../../../../static/abi/SeedFactory";
import Seed from "../../../../../static/abi/Seed";
import ERC20 from "../../../../../static/abi/ShineToken";
import { SeedCard } from "./SeedCard.js";
import axios from "axios";
import { WalletContext } from "providers/WalletProvider";
import { Tab } from "react-bootstrap";
import { families } from "detect.js";
import { ErrorMessage } from "formik";

export function SeedContainer({ activeContract, setActiveContract }) {
  const { currentAccount, setCurrentAccount, isWalletEnabled, chainId, nativeTokenName, nativeBalance, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator } = useContext(WalletContext);

  const [offeredTokenBalance, setOfferedTokenBalance] = useState();
  const [acceptedTokenBalance, setAcceptedTokenBalance] = useState();
  const [tokenASymbol, setTokenASymbol] = useState();
  const [tokenBSymbol, setTokenBSymbol] = useState();

  const [createdTag, setCreatedTag] = useState();

  const [salesLoading, setSalesLoading] = useState(false);

  //const [userAddress, setUserAddress] = useState();
  const [notEnoughTokensAError, setNotEnoughTokensAError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [successMessage, setSuccessMessage] = useState(["none"]);
  const [errorMessage, setErrorMessage] = useState();

  const [cardVisible, setCardVisible] = useState(false);
  const [dealsVisible, setDealsVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const [title, setTitle] = useState("");

  const [nativeTokenUsed, setNativeTokenUsed] = useState(true);
  const [isListedCustomTokenUsed, setIsListedCustomTokenUsed] = useState(true); // for example if USDC, USDT are used
  const [selectedTokenKey, setSelectedTokenKey] = useState("native");
  const [stablesUsed, setStablesUsed] = useState(true);
  const [maxRaise, setMaxRaise] = useState();
  const [visibility, setVisibility] = useState("private");

  const [acceptedTokenAddress, setAcceptedTokenAddress] = useState();
  const [requireKyc, setRequireKyc] = useState(false);

  const [offeredTokenAddress, setOfferedTokenAddress] = useState();
  const [tokenAmount, setTokenAMount] = useState();
  const [rate, setRate] = useState();
  const [convertedRate, setConvertedRate] = useState();
  const [seedSalesData, setSeedSalesData] = useState();
  const [seedIndex, setSeedIndex] = useState();
  const [allowance, setAllowance] = useState();
  const [vestingEnabled, setVestingEnabled] = useState(false);

  const [accessMechanism, setAccessMechanism] = useState("open");
  const [distributionMechanism, setDistributionMechanism] = useState("instant");
  const [lockDuration, setLockDuration] = useState(0);

  const [whitelistedAddresses, setWhitelistedAddresses] = useState();
  const [capsForWhitelistedAddresses, setcapsForWhitelistedAddresses] = useState();
  const [nftCap, setNftCap] = useState(0);
  const [nttCap, setNttCap] = useState(0);

  const [nftAddress, setAccessNftAddress] = useState();
  const [nttAddress, setAccessNttAddress] = useState();

  const [accessTokenAddress, setAccessTokenAddress] = useState();
  const [accessTokenAmountTier1, setAccessTokenAmountTier1] = useState(0);
  const [accessTokenAmountTier2, setAccessTokenAmountTier2] = useState(0);
  const [accessTokenAmountTier3, setAccessTokenAmountTier3] = useState(0);
  const [accessTokenAmountTier4, setAccessTokenAmountTier4] = useState(0);
  const [tier1Cap, setTier1Cap] = useState(0); //needs to be initialized to zero as toWei fails because of undefined
  const [tier2Cap, setTier2Cap] = useState(0);
  const [tier3Cap, setTier3Cap] = useState(0);
  const [tier4Cap, setTier4Cap] = useState(0);

  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState(parseInt(parseInt(Date.now() / 1000 + 60 * 60 * 3).toString())); //3hrs from now

  const [cliffDuration, setCliffDuration] = useState(5184000);
  const [vestingDuration, setVestingDuration] = useState(5184000);
  const [percentageVested, setPercentageVested] = useState(100);

  useEffect(() => {
    if (isWalletEnabled == true && activeContract != null && currentAccount != null && typeof seedIndex == "undefined") {
      async function getIndex() {
        //setSeedIndex(await retrieveIndex(SeedFactory.abi, seedFactoryAddress, activeContract.toLocaleLowerCase()));
      }
      getIndex();
    }
  }, [isWalletEnabled, currentAccount, activeContract]);
  useEffect(() => {
    if (title.length > 50) {
      setTitleError("Maximum Title length is 50 charachters");
    } else if (title.length == 0) {
      setTitleError("Please enter value for Title");
    } else {
      setTitleError(false);
    }
  }, [title]);

  useEffect(() => {
    if (isWalletEnabled == true && currentAccount != null) {
      async function loadSeedSales() {
        console.log("active acc dds", activeContract, seedIndex, typeof activeContract, typeof seedIndex, activeContract);

        if (!activeContract) {
          console.log("active acc 1", activeContract, seedIndex, typeof activeContract, typeof seedIndex);
          setSalesLoading(true);
          setSeedSalesData(await getSeedSales(currentAccount, Seed.abi, SeedFactory.abi, getAddress(chainId, "seedFactoryAddress"), ERC20.abi, activeContract));
          setSalesLoading(false);
        } else if (activeContract) {
          console.log("active acc 2", activeContract, seedIndex, typeof activeContract, typeof seedIndex);
          setSalesLoading(true);
          setSeedSalesData(await getSeedSales(currentAccount, Seed.abi, SeedFactory.abi, getAddress(chainId, "seedFactoryAddress"), ERC20.abi, activeContract));
          setSalesLoading(false);
        }
      }
      loadSeedSales();
    }
  }, [isWalletEnabled, currentAccount, refetchData, chainId, seedIndex, activeContract]);

  useEffect(() => {
    if (Number(offeredTokenBalance) < Number(tokenAmount) && typeof offeredTokenAddress !== "undefined" && offeredTokenAddress !== "") {
      setNotEnoughTokensAError("You don't have enough offered tokens (A) in your balance to launch a deal successfully");
    } else {
      setNotEnoughTokensAError(false);
    }
  }, [offeredTokenBalance, offeredTokenAddress, tokenAmount]);

  useEffect(() => {
    console.log("allowance ", allowance, offeredTokenAddress);
    async function loadData() {
      if (typeof offeredTokenAddress !== "undefined" && offeredTokenAddress !== "") {
        console.log("balance1, ", await getErc20Balance(currentAccount, offeredTokenAddress));
        getAllowance(setAllowance, getAddress(chainId, "seedFactoryAddress"), currentAccount, ERC20.abi, offeredTokenAddress);
        setOfferedTokenBalance(await getErc20Balance(currentAccount, offeredTokenAddress));
        setTokenASymbol(await getErc20Symbol(offeredTokenAddress));
      } else {
        setOfferedTokenBalance(0);
        setTokenASymbol("");
      }
    }
    loadData();
  }, [offeredTokenAddress]);

  useEffect(() => {
    async function loadDataForAcceptedTokenAddress() {
      console.log("balance2", currentAccount, acceptedTokenAddress, typeof acceptedTokenAddress, typeof acceptedTokenAddress !== "undefined" && acceptedTokenAddress !== "");
      if (typeof acceptedTokenAddress !== "undefined" && acceptedTokenAddress !== "") {
        setAcceptedTokenBalance(await getErc20Balance(currentAccount, acceptedTokenAddress));
        setTokenBSymbol(await getErc20Symbol(acceptedTokenAddress));
      }
    }
    loadDataForAcceptedTokenAddress();
  }, [acceptedTokenAddress]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${getCoingeckoName(chainId)}`)
      .then(function(response) {
        // handle success
        //setConvertedRate(getTokenRate(response.data[0].current_price, rate));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, [rate]);

  useEffect(() => {
    setConvertedRate(getTokenRatio(tokenAmount, maxRaise));
  }, [tokenAmount, maxRaise]);

  async function handleNewSeedDeploy(offeredTokenAddress, acceptedTokenAddressArg) {
    let acceptedTokenAddress;

    if (acceptedTokenAddressArg == "" || typeof acceptedTokenAddressArg == "undefined") {
      acceptedTokenAddress = ZERO_ADDRESS;
    } else {
      acceptedTokenAddress = acceptedTokenAddressArg;
    }

    console.log("convertedRate", rate, convertedRate, fromFixed(convertedRate), offeredTokenAddress, tokenAmount, acceptedTokenAddress);
    setSuccessMessage(["none"]);
    setErrorMessage();
    let createdContract = await deployNewSeed(
      currentAccount,
      offeredTokenAddress,
      acceptedTokenAddress,
      SeedFactory.abi,
      Seed.abi,
      getAddress(chainId, "seedFactoryAddress"),
      toWei(tokenAmount),
      convertedRate,
      lockDuration,
      cliffDuration,
      vestingDuration,
      percentageVested,
      startTime,
      endTime,
      accessTokenAddress,
      toWei(accessTokenAmountTier1),
      toWei(accessTokenAmountTier2),
      toWei(accessTokenAmountTier3),
      toWei(accessTokenAmountTier4),
      toWei(tier1Cap),
      toWei(tier2Cap),
      toWei(tier3Cap),
      toWei(tier4Cap),
      title,
      accessMechanism,
      whitelistedAddresses,
      capsForWhitelistedAddresses,
      nftAddress,
      toWei(nftCap),
      requireKyc,
      getAddress(chainId, "nttAddress"),
      nttCap,
      distributionMechanism,
      visibility,
      ["none"],
      setLoadingIndicator,
      ["none"],
      setSuccessMessage,
      setErrorMessage
    );
    setCreatedTag(createdContract);
  }

  function handleSeedClick(index, seedAddress) {
    if (index != seedIndex) {
      setSeedSalesData(); // this needs to be here because of caching performance issue
      setSeedIndex(index);
      setCardVisible(true);
      setDealsVisible(false);
      setActiveContract(seedAddress);
    } else {
      setSeedIndex();
    }
  }
  async function handleLauncherApprove() {
    await approveContract(currentAccount, ERC20.abi, offeredTokenAddress, getAddress(chainId, "seedFactoryAddress"));
  }

  function getTransactionCount(accessMechanism, distributionMechanism, visibility, requireKyc) {
    let count = 2;
    if (accessMechanism != "open") {
      count++;
    }
    if (distributionMechanism != "instant") {
      count++;
    }
    if (visibility == "public") {
      count++;
    }
    if (requireKyc) {
      count++;
    }
    return count;
  }

  function getEligibilityStatus(accessMechanism, capPerAddressEnabled, capPerAddress, nftBalance, kycEnabled, nttBalance, hasValidNtt, accessTokenBalance, tier1Cap) {
    console.log("eligible ", accessMechanism);
    if (accessMechanism == "open") {
      return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Open Access</div>
          {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
        </div>
      );
    } else if (accessMechanism == "whitelist") {
      if (capPerAddressEnabled && capPerAddress > 0) {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Whitelist</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "gray", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Private</div>
            <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Whitelist</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      }
    } else if (accessMechanism == "nft-gate") {
      if (nftBalance > 0) {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>NFT Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "gray", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Private</div>
            <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>NFT Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      }
    } else if (accessMechanism == "ntt-gate") {
      if (nttBalance > 0 && hasValidNtt) {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>NTT Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "gray", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Private</div>
            <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>NTT Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      }
    } else if (accessMechanism == "token-gate-tiers") {
      if (fromWei(accessTokenBalance) > fromWei(tier1Cap)) {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Tiered Token Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      } else {
        return (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "gray", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Private</div>
            <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Tiered Token Gate</div>
            {kycEnabled ? hasValidNtt ? <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : <div style={{ background: "red", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>KYC</div> : null}
          </div>
        );
      }
    }
  }

  function getVisibilityStatus(visiblityStatus, currentAccount) {
    if (visiblityStatus == true) {
      return <div style={{ background: "green", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Public</div>;
    } else if (visiblityStatus == false) {
      return <div style={{ background: "#444444", paddingLeft: 5, paddingRight: 5, marginBottom: 20 }}>Private</div>;
    }
  }

  function getAccessStatus(accessMechanism) {
    if (accessMechanism == "open") {
      return <span>Open to anyone</span>;
    } else if (accessMechanism == "whitelist") {
      return <span>Whitelisted addresses</span>;
    } else if (accessMechanism == "nft-gate") {
      return <span>NFT Gated</span>;
    } else if (accessMechanism == "ntt-gate") {
      return <span>NTT Gated</span>;
    } else if (accessMechanism == "token-gate-tiers") {
      return <span>Token Gated With Tiers</span>;
    } else {
      return "Uknown";
    }
  }

  function handleOfferedTokenAddress(data) {
    console.log("data ", data.target.getAttribute("data-token"));
    let offeredTokenKey = data.target.getAttribute("data-token");
    setSelectedTokenKey(offeredTokenKey);
    if (offeredTokenKey == "custom") {
      setAcceptedTokenBalance(0);
      setTokenBSymbol("");
      setAcceptedTokenAddress("");
      setIsListedCustomTokenUsed(false);
      setNativeTokenUsed(false);
    } else if (offeredTokenKey == "native") {
      setNativeTokenUsed(true);
      setAcceptedTokenBalance(0);
      setTokenBSymbol("");
      setAcceptedTokenAddress("");
      setIsListedCustomTokenUsed(true);
    } else {
      setIsListedCustomTokenUsed(true);
      setAcceptedTokenBalance(0);
      setTokenBSymbol("");
      setAcceptedTokenAddress(getTokenAddressFromDealsConfig(chainId, offeredTokenKey));
      setNativeTokenUsed(false);
    }
  }

  function handleKycCheckbox(requireKyc) {
    setNttCap(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn);
    setRequireKyc(!requireKyc);
  }

  return (
    <div style={{ width: "100%" }}>
      {console.log("isVestingenabled  ", typeof vestingEnabled, vestingEnabled)}
      {console.log("converted rate ", convertedRate)}
      {console.log("trx- ", successMessage)}
      {formVisible && (
        <div style={{ display: "flex", flexDirection: "column", paddingTop: 50, alignItems: "center" }}>
          <div onClick={() => setFormVisible(false)} style={{ cursor: "pointer", paddingBottom: 0 }}>
            <h3>← Go Back</h3>
          </div>
          <div style={{ margin: "0 auto", width: "70%", marginTop: "25px", border: "1px solid whitesmoke" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                {" "}
                <h2>Title</h2>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input name="title" onChange={target => typeof target.target.value !== "undefined" && setTitle(target.target.value)} value={title} style={{ borderRadius: 6, boder: "1px solid #3f3d56", width: "80%" }}></input>{" "}
              </div>
              <br></br>
              <div style={{ background: "#4f4fc8" }}>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                  <h2>Tokens</h2>
                </div>

                <div>
                  <table>
                    <TableR>
                      <TableD>
                        {" "}
                        <label for="offered-erc20-token-address">Offered Token (A) Address:</label>
                      </TableD>
                      <TableD>
                        <label for="offered-erc20-token-address">Your Balance of token (A): </label>
                      </TableD>
                      <TableD>
                        <label for="emitted-token-amount">Offered Token (A) Amount: </label>
                      </TableD>
                    </TableR>
                    <TableR>
                      <TableD>
                        {" "}
                        <input
                          name="offered-erc20-token-address"
                          onChange={target => typeof target.target.value !== "undefined" && setOfferedTokenAddress(target.target.value.toLocaleLowerCase())}
                          value={offeredTokenAddress}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", width: 300 }}
                        ></input>{" "}
                      </TableD>
                      <TableD>
                        {offeredTokenBalance} {tokenASymbol}
                      </TableD>
                      <TableD>
                        <input
                          name="accepted-token-amount"
                          onChange={target => typeof target.target.value !== "undefined" && setTokenAMount(target.target.value.toLocaleLowerCase())}
                          value={tokenAmount}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}
                        ></input>{" "}
                      </TableD>
                    </TableR>
                    <br></br>
                    <TableR>
                      <TableD>
                        <label for="accepted-token-address">Accepted Token (B) Amount:</label>
                      </TableD>
                      <TableD>
                        <label for="offered-erc20-token-address">Your Balance of token (B): </label>
                      </TableD>
                      <TableD>
                        <label for="">Accepted Token (B) Amount: </label>
                      </TableD>
                    </TableR>
                    <TableR>
                      {
                        <TableD visibility={isListedCustomTokenUsed ? "hidden" : "visible"} style={{ paddingLeft: 0 }}>
                          <input name="accepted-token-address" onChange={target => setAcceptedTokenAddress(target.target.value.toLocaleLowerCase())} value={acceptedTokenAddress} style={{ borderRadius: 6, boder: "1px solid #3f3d56", width: 300 }}></input>{" "}
                        </TableD>
                      }
                      <TableD>{selectedTokenKey == "native" ? `${nativeBalance} ${nativeTokenName}` : `${acceptedTokenBalance} ${tokenBSymbol}`} </TableD>
                      <TableD style={{ paddingLeft: 0 }}>
                        <input name="max-raise" onChange={target => setMaxRaise(target.target.value.toLocaleLowerCase())} value={maxRaise} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>{" "}
                      </TableD>
                    </TableR>
                    <TableR>
                      <TableD>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <TableLabel
                            selected={selectedTokenKey == "native"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="native"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            {nativeTokenName}
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "usdc"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="usdc"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            USDC
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "usdt"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="usdt"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            USDT
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "dai"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="dai"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            DAI
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "frax"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="frax"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            FRAX
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "shn"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="shn"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            SHN
                          </TableLabel>
                          <TableLabel
                            selected={selectedTokenKey == "custom"}
                            onClick={e => handleOfferedTokenAddress(e)}
                            data-token="custom"
                            style={{ borderRight: "1px solid gray", cursor: "pointer", paddingLeft: 5, paddingRight: 5, marginBottom: 20, marginRight: 3 }}
                          >
                            Custom Address
                          </TableLabel>
                        </div>
                      </TableD>
                    </TableR>
                  </table>

                  <br></br>
                </div>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                  <label for="rate">Token Rate A/B </label>

                  {false && (
                    <input
                      name="rate"
                      onChange={target => typeof target.target.value !== "undefined" && setRate(target.target.value.toLocaleLowerCase())}
                      value={rate}
                      style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "69%", float: "right" }}
                    ></input>
                  )}
                  <h4>{fromFixed(convertedRate)}</h4>
                </div>
                <br></br>
                {notEnoughTokensAError && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Text color="red">{notEnoughTokensAError}</Text>
                    <br></br>
                  </div>
                )}
                {titleError && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Text color="red">{titleError}</Text>
                    <br></br>
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                  <h2>Schedule</h2>
                </div>

                <div>
                  <table>
                    <TableR>
                      <TableD>
                        <label for="start-time">Start Timestamp:</label> 
                      </TableD>
                      <TableD>
                        <label for="end-time">End Timestamp:</label>
                      </TableD>
                    </TableR>
                    <TableR>
                      <TableD>
                        {" "}
                        <input name="start-time" onChange={target => setStartTime(target.target.value.toLocaleLowerCase())} value={startTime} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>
                      </TableD>
                      <TableD>
                        {" "}
                        <input name="end-time" onChange={target => setEndTime(target.target.value.toLocaleLowerCase())} value={endTime} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>
                      </TableD>
                    </TableR>
                  </table>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    You will be able to reclaim all unsold tokens after the end timestamp<br></br>
                    <br></br>
                  </div>
                </div>
              </div>
              <div style={{ background: "#4f4fc8" }}>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                  <h2>Access</h2>
                </div>
                <table>
                  <TableR>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <td>
                        <input type="radio" onChange={event => setAccessMechanism(event.target.value)} checked={accessMechanism === "open"} value="open" name="access" /> Open
                      </td>
                      <td>
                        <input type="radio" onChange={event => setAccessMechanism(event.target.value)} checked={accessMechanism === "whitelist"} value="whitelist" name="access" /> Whitelist
                      </td>
                      <td>
                        <input type="radio" onChange={event => setAccessMechanism(event.target.value)} checked={accessMechanism === "nft-gate"} value="nft-gate" name="access" /> NFT Gate{" "}
                      </td>

                      <td>
                        <input type="radio" onChange={event => setAccessMechanism(event.target.value)} checked={accessMechanism === "token-gate-tiers"} value="token-gate-tiers" name="access" /> Token Gate{" "}
                      </td>

                      {false && (
                        <td>
                          <input type="checkbox" checked={requireKyc} onChange={() => handleKycCheckbox(requireKyc)} /> Require KYC{" "}
                        </td>
                      )}
                    </div>
                  </TableR>
                  {accessMechanism == "whitelist" && (
                    <div>
                      <table>
                        <br></br>
                        <TableR>
                          {" "}
                          <TableD> Whitelist Addresses (comma separated) </TableD>
                        </TableR>
                        <TableR>
                          {" "}
                          <TableD>
                            <input name="whitelist-addresses" onChange={target => setWhitelistedAddresses(target.target.value.toLocaleLowerCase())} value={whitelistedAddresses} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>
                          </TableD>
                        </TableR>
                        <br></br>
                        <TableR>
                          <TableD>Token (B) Cap/Address (comma separated)</TableD>
                        </TableR>
                        <TableR>
                          {" "}
                          <TableD>
                            <input
                              name="whitelisted-addresses-cap"
                              onChange={target => setcapsForWhitelistedAddresses(target.target.value.toLocaleLowerCase())}
                              value={capsForWhitelistedAddresses}
                              style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}
                            ></input>
                          </TableD>
                        </TableR>
                      </table>
                    </div>
                  )}
                  {accessMechanism == "nft-gate" && (
                    <div>
                      <table>
                        <br></br>
                        <TableR>
                          {" "}
                          <TableD>
                            <label for="NFT-address">NFT address:</label>
                          </TableD>
                        </TableR>
                        <TableR>
                          <TableD>
                            {" "}
                            <input name="NFT-address" onChange={target => setAccessNftAddress(target.target.value.toLocaleLowerCase())} value={nftAddress} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input> 
                          </TableD>
                        </TableR>
                        <br></br>
                        <TableR>
                          <TableD>Token (B) Cap/NFT</TableD>
                        </TableR>
                        <TableR>
                          <TableD>
                            {" "}
                            <input name="NFT-cap" onChange={target => setNftCap(target.target.value.toLocaleLowerCase())} value={nftCap} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input> 
                          </TableD>
                        </TableR>
                      </table>
                    </div>
                  )}
                  {accessMechanism == "ntt-gate" && (
                    <div>
                      <table>
                        <br></br>
                        <TableR>
                          <TableD>
                            {" "}
                            <label for="NFT-address">Enter NTT address:</label>
                          </TableD>
                        </TableR>
                        <TableR>
                          <TableD>
                            {" "}
                            <input name="NFT-address" onChange={target => setAccessNttAddress(target.target.value.toLocaleLowerCase())} value={nttAddress} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input> 
                          </TableD>
                        </TableR>
                        <br></br>
                        <TableR>
                          <TableD>NTT Cap</TableD>
                        </TableR>
                        <TableR>
                          <TableD>
                            {" "}
                            <input name="NTT-cap" onChange={target => setNttCap(target.target.value.toLocaleLowerCase())} value={nttCap} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input> 
                          </TableD>
                        </TableR>
                      </table>
                    </div>
                  )}

                  {accessMechanism == "token-gate-tiers" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <label for="access-token-address">Access Token Address: </label>
                        <input
                          name="access-token-address"
                          onChange={target => setAccessTokenAddress(target.target.value.toLocaleLowerCase())}
                          value={accessTokenAddress}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", width: "52%", float: "right" }}
                        ></input>{" "}
                        <br></br>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <label for="tier-1-access-token">Tier 1 needs: </label>
                        <input
                          name="tier-1-access-token"
                          onChange={target => setAccessTokenAmountTier1(target.target.value.toLocaleLowerCase())}
                          value={accessTokenAmountTier1}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}
                        ></input>
                        <label for="tier-1-max-contribution"> Access Tokens and Token (B) Cap/Address is: </label>
                        <input name="tier-1-max-contribution" onChange={target => setTier1Cap(target.target.value.toLocaleLowerCase())} value={tier1Cap} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}></input>
                        <br></br>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <label for="tier-2-access-token">Tier 2 needs: </label>
                        <input
                          name="tier-2-access-token"
                          onChange={target => setAccessTokenAmountTier2(target.target.value.toLocaleLowerCase())}
                          value={accessTokenAmountTier2}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}
                        ></input>
                        <label for="tier-2-max-contribution"> Access Tokens and Token (B) Cap/Address is: </label>
                        <input name="tier-2-max-contribution" onChange={target => setTier2Cap(target.target.value.toLocaleLowerCase())} value={tier2Cap} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}></input>

                        <br></br>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <label for="tier-3-access-token">Tier 3 needs: </label>
                        <input
                          name="tier-3-access-token"
                          onChange={target => setAccessTokenAmountTier3(target.target.value.toLocaleLowerCase())}
                          value={accessTokenAmountTier3}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}
                        ></input>
                        <label for="tier-3-max-contribution"> Access Tokens and Token (B) Cap/Address is: </label>
                        <input name="tier-3-max-contribution" onChange={target => setTier3Cap(target.target.value.toLocaleLowerCase())} value={tier3Cap} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}></input>

                        <br></br>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <label for="tier-4-access-token">Tier 4 needs:</label>
                        <input
                          name="tier-4-access-token"
                          onChange={target => setAccessTokenAmountTier4(target.target.value.toLocaleLowerCase())}
                          value={accessTokenAmountTier4}
                          style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}
                        ></input>
                        <label for="tier-4-max-contribution"> Access Tokens and Token (B) Cap/Address is: </label>
                        <input name="tier-4-max-contribution" onChange={target => setTier4Cap(target.target.value.toLocaleLowerCase())} value={tier4Cap} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "100px" }}></input>
                      </div>
                    </div>
                  )}
                </table>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                  <h2>Distribution</h2>
                </div>
                <table>
                  <TableR>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} onChange={event => setDistributionMechanism(event.target.value)}>
                      <TableD>
                        <input type="radio" checked={distributionMechanism === "instant"} value="instant" name="distribution" /> Instant
                      </TableD>
                      <TableD>
                        <input type="radio" checked={distributionMechanism === "lock"} value="lock" name="distribution" /> Lock
                      </TableD>
                      <TableD>
                        <input type="radio" checked={distributionMechanism === "linear-vesting"} value="linear-vesting" name="distribution" /> Linear Vesting
                      </TableD>
                    </div>
                  </TableR>
                </table>
                {distributionMechanism == "instant" && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    All tokens are released instantly<br></br>
                    <br></br>
                  </div>
                )}
                {distributionMechanism == "lock" && (
                  <div>
                    <table>
                      <TableR>
                        <TableD>% Locked</TableD>
                        <TableD>Lock Duration (in seconds)</TableD>
                      </TableR>
                      <TableR>
                        <TableD>
                          {" "}
                          <Slider type="range" min="0" max="100" value={percentageVested} onChange={event => setPercentageVested(event.target.value)}></Slider>
                        </TableD>
                        <TableD>
                          {" "}
                          <input name="lock-duration" onChange={target => setLockDuration(target.target.value.toLocaleLowerCase())} value={lockDuration} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input> 
                        </TableD>
                      </TableR>
                    </table>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {percentageVested}% of the tokens are going to be vested for {lockDuration} seconds&nbsp; {percentageVested < 100 && <span>and {100 - percentageVested}% are going to be released immediatly.</span>}
                    </div>
                    <br></br>
                    <br></br>
                  </div>
                )}
                {distributionMechanism == "linear-vesting" && (
                  <div>
                    <table>
                      <TableR>
                        <TableD>% Locked</TableD>
                        <TableD>Cliff Duration (s)</TableD>
                        <TableD>Vest Duration (s)</TableD>
                      </TableR>
                      <TableR>
                        <TableD>
                          {" "}
                          <Slider width="120px" type="range" min="0" max="100" value={percentageVested} onChange={event => setPercentageVested(event.target.value)}></Slider>
                        </TableD>
                        <TableD>
                          {" "}
                          <input name="cliff-timestamp" onChange={target => setCliffDuration(target.target.value.toLocaleLowerCase())} value={cliffDuration} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>{" "}
                        </TableD>
                        <TableD>
                          {" "}
                          <input name="vesting-duration" onChange={target => setVestingDuration(target.target.value.toLocaleLowerCase())} value={vestingDuration} style={{ borderRadius: 6, boder: "1px solid #3f3d56" }}></input>{" "}
                        </TableD>
                      </TableR>
                    </table>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                      {percentageVested < 100 && <span style={{ textAlign: "center" }}>{100 - percentageVested}% are going to be released immediatly while</span>}
                      <span style={{ textAlign: "center" }}>
                        {percentageVested}% of the tokens are going to be locked over Cliff Duration of {cliffDuration} seconds and vested linearly over Vesting Duration of {vestingDuration} seconds.{" "}
                      </span>
                    </div>
                    <br></br>
                    <br></br>
                  </div>
                )}
              </div>
              <div style={{ background: "#4f4fc8" }}>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 25 }}>
                  <h2>Listing</h2>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }} onChange={event => setVisibility(event.target.value)}>
                  <td>
                    <input type="radio" checked={visibility === "public"} value="public" name="visibility" /> True
                  </td>
                  <td>
                    <input type="radio" checked={visibility === "private"} value="private" name="visibility" /> False
                  </td>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>{visibility == "public" ? "Deal is going to be listed on the main page and also accessible via a generated link" : "Deal is only going to be accessible via a generated link"}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", paddingBottom: 10, paddingTop: 8 }}>
                <div style={{ marginBottom: "15px" }}> You have in total {getTransactionCount(accessMechanism, distributionMechanism, visibility, requireKyc) + 1} transactions to confirm:</div>
                <div>
                  {" "}
                  <span>- transaction to deploy the deal contract</span> {console.log("loading indicator 321", loadingIndicator, loadingIndicator.includes("deploy-0"))}
                  {loadingIndicator.includes("deploy-0") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-0-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  {accessMechanism != "open" && <span>- transaction to set up the access mechanism</span>}
                  {loadingIndicator.includes("deploy-1") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-1-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  {requireKyc && <span>- transaction to set up the kyc module</span>}
                  {loadingIndicator.includes("deploy-2") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-2-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  {distributionMechanism != "instant" && <span>- transaction to set up the distribution mechanism</span>}
                  {loadingIndicator.includes("deploy-3") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-3-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  {visibility != "private" && <span>- transaction to set up the deal visibility</span>}
                  {loadingIndicator.includes("deploy-4") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-4-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  <span>- transaction to approve the created contract</span>
                  {loadingIndicator.includes("deploy-5") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-5-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <div>
                  <span>- transaction to send tokens to a smart contract</span>
                  {loadingIndicator.includes("deploy-6") && (
                    <span>
                      <PulseLoader color={"gold"} loading={true} size={10} margin={2} />

                      <SmallerText>Confirming...</SmallerText>
                    </span>
                  )}
                  {successMessage.includes("trx-6-success") && <SmallerText color="green">Success</SmallerText>}
                </div>
                <br></br>
                <div>{errorMessage && <Text color="red">{errorMessage}</Text>}</div>
                <br></br>
                <div style={{ textAlign: "center" }}>
                  {createdTag && (
                    <Text color="white" fontWeight={300} fontSize="18px">
                      Your deal has been created. You can visit the deal at the following link <a href={`https://app.shinedao.finance/deals?tag=${createdTag}`}>https://app.shinedao.finance/deals?tag={createdTag}</a>
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {false && allowance == 0 && (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
          <Button onClick={() => handleLauncherApprove()}>Approve Launcher</Button>
          <br></br>
          <br></br>
        </div>
      )}
      <br></br>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {formVisible && typeof tokenAmount != "undefined" && typeof maxRaise !=="undefined" && maxRaise !=="" && typeof offeredTokenAddress !== "undefined" && offeredTokenAddress !== "" && notEnoughTokensAError == false && titleError == false && (
          <Button onClick={() => handleNewSeedDeploy(offeredTokenAddress, acceptedTokenAddress)}>Launch Deal</Button>
        )}
        {!salesLoading && !activeContract && isWalletEnabled && !formVisible && !cardVisible && <Button onClick={() => setFormVisible(true)}>New Deal</Button>}
        {!isWalletEnabled && <h3 style={{ paddingTop: 80 }}>Please connect your wallet to see and create deals.</h3>}
      </div>
      {false && <Button onClick={() => loadSeedSales()}>Load seed sales</Button>}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 60 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {console.log("seed sales data ", seedSalesData)}
          {console.log("seed sales mapper  ", !activeContract, dealsVisible, !formVisible, !cardVisible, seedSalesData)}
          {salesLoading && (
            <div>
              {" "}
              <PulseLoader color={"gold"} loading={true} size={10} margin={2} />
              <Text>Loading...</Text>
            </div>
          )}
          {!activeContract &&
            dealsVisible &&
            !formVisible &&
            !cardVisible &&
            seedSalesData &&
            seedSalesData.map(
              (
                {
                  name,
                  seedAddress,
                  rate,
                  offeredTokenName,
                  offeredTokenTotalSupply,
                  offeredTokenSymbol,
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
                  accessTokenBalance,
                  capForNTT,
                  capForNFT,
                  nftBalance,
                  nttBalance,
                  hasValidNtt,
                  kycEnabled,
                },
                index
              ) => {
                if (dealVisibility === true && totalOffered != 0) {
                  return (
                    <Card
                      key={index}
                      flexDirection="column"
                      alignItems="flex-start"
                      margin="5px"
                      padding="0px 0px 0px 35px"
                      clickable="true"
                      border="1px solid white"
                      width="350px"
                      height="400px"
                      background={index == seedIndex ? "#2f2f2f" : "black"}
                      index={index}
                      onClick={() => handleSeedClick(index, seedAddress)}
                    >
                      <div>
                        {getEligibilityStatus(accessMechanism, capPerAddressEnabled, capPerAddress, nftBalance, kycEnabled, nttBalance, hasValidNtt, accessTokenBalance, tier1Cap)}
                        {false && <div>{getVisibilityStatus(dealVisibility, currentAccount)} </div>}
                      </div>
                      <h1>{name}</h1>
                      {false && (
                        <div>
                          - {offeredTokenName} - {acceptedTokenSymbol} - {fromWei(weiRaised)}
                        </div>
                      )}
                      <div>
                        <b>Tokens:</b>
                        <SmallerText>
                          {" "}
                          {offeredTokenSymbol} for {acceptedTokenAddress != ZERO_ADDRESS ? acceptedTokenSymbol : nativeTokenName}
                        </SmallerText>
                      </div>
                      <div>
                        {" "}
                        <b>Deal size</b>{" "}
                        <SmallerText>
                          {fromWei(totalOffered)} {offeredTokenSymbol} for max {fromFixed(rate) * fromWei(totalOffered)} {acceptedTokenAddress != ZERO_ADDRESS ? acceptedTokenSymbol : nativeTokenName}
                        </SmallerText>
                      </div>
                      <div>
                        {" "}
                        <b>Rate</b>{" "}
                        <SmallerText>
                          {fromFixed(rate)} {offeredTokenSymbol} for 1 {acceptedTokenAddress != ZERO_ADDRESS ? acceptedTokenSymbol : nativeTokenName}
                        </SmallerText>
                      </div>
                      <div>
                        <b> Start time</b> <SmallerText>{timeConverter(startTime)}</SmallerText>
                      </div>
                      <div>
                        <b>End time </b>
                        <SmallerText> {timeConverter(endTime)}</SmallerText>
                      </div>
                      {false && (
                        <div>
                          <b>Offered Token Address</b> <SmallerText>{substringAddress(offeredTokenAddress)}</SmallerText>
                        </div>
                      )}
                      {false && (
                        <div>
                          <b>Accepted Token Address</b>
                          <SmallerText> {substringAddress(acceptedTokenAddress)}</SmallerText>
                        </div>
                      )}{" "}
                      {false && (
                        <div>
                          <b>Visibility </b>
                          <SmallerText> {dealVisibility ? "Public" : "Private"}</SmallerText>
                        </div>
                      )}
                      <div>
                        <b>Access Type </b>
                        <SmallerText> {getAccessStatus(accessMechanism)}</SmallerText>
                      </div>
                      <div>
                        <b>Distribution Type </b>
                        <SmallerText> {distributionMechanism}</SmallerText>
                      </div>
                    </Card>
                  );
                }
              }
            )}
        </div>

        {activeContract && seedSalesData && console.log("activeContract xxx", activeContract, seedIndex, typeof seedIndex, seedSalesData, typeof seedSalesData)}
        {activeContract && seedSalesData && (
          <SeedCard
            setSeedSalesData={setSeedSalesData}
            setActiveContract={setActiveContract}
            setCardVisible={setCardVisible}
            setDealsVisible={setDealsVisible}
            setRefetchData={setRefetchData}
            refetchData={refetchData}
            getEligibilityStatus={getEligibilityStatus}
            seedSaleData={seedSalesData && seedSalesData[activeContract ? 0 : seedIndex]}
          ></SeedCard>
        )}
      </div>
    </div>
  );
}
