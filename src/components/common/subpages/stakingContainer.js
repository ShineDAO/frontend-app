import React, { useState, useEffect, useContext } from "react";

import {
  getYield,
  getOnlyUserAddress,
  getEarned,
  getYieldPerVeShn,
  getUserVeShnEndpointCheckpointed,
  getFractionParticipating,
  getUserVeShnCheckpointed,
  rewardCheckpoint,
  getTotalVeFXSSupplyStored,
  getTotalVeFXSParticipating,
  getyieldPerVeFXSStored,
  getYieldRate,
  getLastUpdateTime,
  getPeriodFinish,
  getTotalShnSupply,
  fromWei,
  getAddress,
  roundTo2Decimals,
  getRewardAddresses,
  getRewardTokenSymbols,
  //getUserVeShnCheckpointedInAllAddresses,
  getDataForControlPanel,
} from "../../templates/utils";
import { MobileDiv, Button, Card, Text } from "components/common";
import PulseLoader from "react-spinners/PulseLoader";

import veSHN from "../../../../static/abi/veFXS";
import ShineToken from "../../../../static/abi/ShineToken";
import veShnYieldDistributor from "../../../../static/abi/veFXSYieldDistributorV4";
import GeneralCheckpoint from "../../../../static/abi/GeneralCheckpoint";
const axios = require("axios");

export function StakingContainer({ isWalletEnabled, chainId, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator, setRewardAddressesDropdown, setTokenSymbolsForDropdown }) {
  //const [veShnYieldDistributorAddress, setVeShnYieldDistributorAddress] = useState(getAddress(chainId, "veShnYieldDistributorAddress"));
  //const [veShnAddress, setVeShnAddress] = useState(getAddress(chainId, "veShnAddress")); //didnt work as expected

  const [totalShnSupply, setTotalShnSupply] = useState("0");
  const [periodFinish, setPeriodFinish] = useState("");
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [yieldRate, setYieldRate] = useState("");
  const [yieldPerVeShnStored, setYieldPerVeShnStored] = useState("");
  const [totalVeShnParticipating, setTotalVeShnParticipating] = useState("");
  const [totalVeShnSupplyStored, setTotalVeShnSupplyStored] = useState("");
  const [userVeShnCheckpointed, setUserVeShnCheckpointed] = useState("");
  //const [userVeShnCheckpointedAllAddresses, setUserVeShnCheckpointedAllAddresses] = useState("");
  const [userVeShnEndpointCheckpointed, setUserVeShnEndpointCheckpointed] = useState("");
  const [fractionParticipating, setFractionParticipating] = useState("");
  const [yieldPerVeShn, setYieldPerVeShn] = useState("");
  const [earned, setEarned] = useState("");
  const [userAddress, setUserAddress] = useState();
  const [tvl, setTvl] = useState();
  const [successMessage, setSuccessMessage] = useState({ location: "", text: "" }); //location rewardClaim/
  const [rewardAddresses, setRewardAddresses] = useState();
  const [tokenSymbols, setTokenSymbols] = useState();

  const [dataForAdminPanel, setDataForAdminPanel] = useState();
  const [tokenPrices, setTokenPrices] = useState([]);

  //useEffect(() => {
  //  setVeShnYieldDistributorAddress(getAddress(chainId, "veShnYieldDistributorAddress"));
  //  setVeShnAddress(getAddress(chainId, "veShnAddress"));
  //}, [chainId]);

  const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [playing, toggle];
  };
  const [playing, toggle] = useAudio("https://themushroomkingdom.net/sounds/wav/sm64/sm64_exit_course_pause_menu.wav");

  useEffect(() => {
    if (isWalletEnabled == true) {
      async function getSupply() {
        const shnSupply = await getTotalShnSupply(veSHN.abi, getAddress(chainId, "veShnAddress"));
        console.log("shnSupply balance", shnSupply);
        setTotalShnSupply(shnSupply);
        setUserAddress(await getOnlyUserAddress());
        setPeriodFinish(await getPeriodFinish(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setLastUpdateTime(await getLastUpdateTime(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setYieldRate(await getYieldRate(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setYieldPerVeShnStored(await getyieldPerVeFXSStored(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setTotalVeShnParticipating(await getTotalVeFXSParticipating(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setTotalVeShnSupplyStored(await getTotalVeFXSSupplyStored(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setUserVeShnCheckpointed(await getUserVeShnCheckpointed(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setUserVeShnEndpointCheckpointed(await getUserVeShnEndpointCheckpointed(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setFractionParticipating(await getFractionParticipating(veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setYieldPerVeShn(await getYieldPerVeShn(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setRewardAddresses(await getRewardAddresses(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi));
        setEarned(await getEarned(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
        setTokenSymbols(await getRewardTokenSymbols(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi, veShnYieldDistributor.abi, ShineToken.abi));
        //setUserVeShnCheckpointedAllAddresses(await getUserVeShnCheckpointedInAllAddresses(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi));
        setDataForAdminPanel(await getDataForControlPanel(await getOnlyUserAddress(), getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi, veShnYieldDistributor.abi));
      }
      getSupply();
    }
  }, [isWalletEnabled, refetchData, chainId]);

  useEffect(() => {
    if (typeof rewardAddresses != "undefined") {
      setRewardAddressesDropdown(rewardAddresses); //dropdown is used for notifying reward in the control panel
    }
  }, [rewardAddresses]);

  useEffect(() => {
    if (typeof tokenSymbols != "undefined") {
      setTokenSymbolsForDropdown(tokenSymbols); //used to show symbols in dropdown
    }
  }, [tokenSymbols]);

  const coingeckoConfig = {
    // we already have a template for 10 reward tokens. Fill them out when new yield distributor is launched.
    "1": { id: "fill_in_when_known", hardcodedPrice: 0.0039 },
    "2": { id: "fill_in_when_known", hardcodedPrice: 323 },
    "3": { id: "fill_in_when_known", hardcodedPrice: 4242 },
    "4": { id: "fill_in_when_known", hardcodedPrice: 5523 },
    "5": { id: "fill_in_when_known", hardcodedPrice: 1 },
    "6": { id: "fill_in_when_known", hardcodedPrice: 1 },
    "7": { id: "fill_in_when_known", hardcodedPrice: 1 },
    "8": { id: "fill_in_when_known", hardcodedPrice: 1 },
    "9": { id: "fill_in_when_known", hardcodedPrice: 1 },
  };

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=shinedao`)
      .then(function(response) {
        // handle success
        console.log("shine price ", response.data[0].current_price, fromWei(totalShnSupply));
        setTvl(fromWei(totalShnSupply) * response.data[0].current_price);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, [totalShnSupply, refetchData]);

  useEffect(() => {
    if (typeof tokenSymbols != "undefined") {
      async function fetchData() {
        let temp_arr = [];
        axios
          .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=shinedao`)
          .then(function(response) {
            // handle success
            console.log("shine price ", response.data[0].current_price, fromWei(totalShnSupply));
            console.log("token symbols", tokenSymbols);
            temp_arr.push(response.data[0].current_price);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed

            tokenSymbols.forEach((element, index) => {
              if (index != 0) {
                temp_arr.push(coingeckoConfig[index].hardcodedPrice);
              }
            });

            setTokenPrices(temp_arr);
            // note that first emmited token should always be SHN and here its excluded
          });
      }
      fetchData();
    }
  }, [tokenSymbols]);

  async function handleRewardCheckpoint() {
    setLoadingIndicator(loadingIndicator.concat(["rewardCheckpoint"]));
    await rewardCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi);
  }
  async function handleRewardCheckpoint_DEPRECATED() {
    setLoadingIndicator(loadingIndicator.concat(["rewardCheckpoint"]));
    await rewardCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "veShnYieldDistributorAddress"), veShnYieldDistributor.abi);
  }
  async function handleClaim(rewardAddress, index) {
    setLoadingIndicator(loadingIndicator.concat([`claim-${index}`]));
    await getYield(rewardAddress, userAddress, loadingIndicator, setLoadingIndicator, index, setRefetchData, getAddress(chainId, "veShnYieldDistributorAddress"), veShnYieldDistributor.abi, setSuccessMessage, toggle);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "85%", margin: "0 auto" }}>
        <div>
          <div>
            <br></br>
            <Text fontSize="26px" fontWeight="600" fontFamily="ClashGrotesk-Regular">
              veSHN Staking
            </Text>
            <br></br>
            <p>If you have locked your SHN and got veSHN, you are eligible for veSHN staking.</p>
          </div>
          {isWalletEnabled ? <div style={{fontSize:"large", color:"#5f7bcc"}}>
            <span>Total Value Locked: ${roundTo2Decimals(tvl)}</span>
            <br></br>
            <span>% of SHN locked: {roundTo2Decimals((fromWei(totalShnSupply) / 21000000) * 100)}%</span><br></br><br></br>
          </div>:<span style={{color:"#5f7bcc"}}>Connect your wallet to see the stats.</span>}
          <div>
            <table>
              <tbody>
                <tr>
                  {console.log("token prices ", tokenPrices)}
                  <th>APR Base/Max</th>
                  {false && isWalletEnabled && (
                    <td>
                      {roundTo2Decimals((((fromWei(yieldRate) * 365 * 86400) / fromWei(totalVeShnParticipating)) * 100) / 4)}% / {roundTo2Decimals(((fromWei(yieldRate) * 365 * 86400) / fromWei(totalVeShnParticipating)) * 100)}%
                    </td>
                  )}
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    typeof dataForAdminPanel.yieldRate_arr != "undefined" &&
                    dataForAdminPanel.yieldRate_arr.map((item, index) => {
                      return (
                        <td key={`apr-${index}`}>
                          {roundTo2Decimals((((fromWei(dataForAdminPanel.yieldRate_arr[index]) * 365 * 86400 * tokenPrices[index]) / (fromWei(dataForAdminPanel.totalVeShnParticipating_arr[index] )* tokenPrices[0])) * 100) / 4)}% /{" "}
                          {roundTo2Decimals(((fromWei(dataForAdminPanel.yieldRate_arr[index]) * 365 * 86400 * tokenPrices[index]) / (fromWei(dataForAdminPanel.totalVeShnParticipating_arr[index] )* tokenPrices[0])) * 100)}%
                          {
                            //{false && roundTo2Decimals((((fromWei(dataForAdminPanel.yieldRate_arr[index]) * 365 * 86400) / fromWei(dataForAdminPanel.totalVeShnParticipating_arr[index])) * 100) / 4)}% /{" "}
                          }
                          {
                            //{false && roundTo2Decimals(((fromWei(dataForAdminPanel.yieldRate_arr[index]) * 365 * 86400) / fromWei(dataForAdminPanel.totalVeShnParticipating_arr[index])) * 100)}%
                          }{" "}
                        </td>
                      );
                    })}
                </tr>

                <tr>
                  <td>User veSHN Staked</td>
                  {
                    //<td>{isWalletEnabled && roundTo2Decimals(fromWei(userVeShnCheckpointed))}</td>
                  }
                  {false && isWalletEnabled && userVeShnCheckpointedAllAddresses && userVeShnCheckpointedAllAddresses.map(userVeShnCheckpointed => <td>{roundTo2Decimals(fromWei(userVeShnCheckpointed))}</td>)}
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    typeof dataForAdminPanel.userVeShnCheckpointed_arr != "undefined" &&
                    dataForAdminPanel.userVeShnCheckpointed_arr.map((item, index) => {
                      return <td key={`total-staked-${index}`}>{roundTo2Decimals(fromWei(item))}</td>;
                    })}
                </tr>
                <tr>
                  <td>Reward token Symbol</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    typeof dataForAdminPanel.userVeShnCheckpointed_arr != "undefined" &&
                    dataForAdminPanel.userVeShnCheckpointed_arr.map((item, index) => {
                      return <td key={`token-symbol-${index}`}>{tokenSymbols[index]}</td>;
                    })}
                </tr>
                <tr></tr>
                <tr></tr>
              </tbody>
            </table>
            {loadingIndicator.includes("rewardCheckpoint") ? (
              <div>
                <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                <br></br>
                <i>Confirming transaction, please wait.</i>
              </div>
            ) : (
              isWalletEnabled && <Button onClick={() => handleRewardCheckpoint()}>Stake</Button>
            )}
            <br></br>
            <span>
              {" "}
              {isWalletEnabled && (
                <i>
                  After you create, add or increase the timelock you need to <b>stake</b> again in order to account the new amount for the reward.
                </i>
              )}{" "}
            </span>
            <br></br> <br></br> <br></br>
            {isWalletEnabled && <Text fontWeight="800">Earned so far:</Text>}
            <br></br>
            <div>
              {isWalletEnabled &&
                (successMessage.location != "rewardClaim" ? (
                  typeof dataForAdminPanel != "undefined" &&
                  typeof dataForAdminPanel.earned_arr != "undefined" &&
                  dataForAdminPanel.earned_arr.map((item, index) => {
                    return (
                      <div key={`reward-claim-${index}`} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text fontWeight="600">
                          {roundTo2Decimals(fromWei(dataForAdminPanel.earned_arr[index]))} {tokenSymbols[index]} 🌟 (${roundTo2Decimals(tokenPrices[index] * fromWei(dataForAdminPanel.earned_arr[index]))})
                        </Text>
                        {loadingIndicator.includes(`claim-${index}`) ? (
                          <div>
                            <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                            <br></br>
                            <i>Confirming transaction, please wait.</i>
                          </div>
                        ) : (
                          isWalletEnabled &&
                          successMessage.location != "rewardClaim" && (
                            <Button style={{ width: 150 }} onClick={() => handleClaim(rewardAddresses[index], index)}>
                              Claim
                            </Button>
                          )
                        )}
                      </div>
                    );
                  })
                ) : (
                  <Text color="green" fontWeight="600">
                    Reward claimed!
                  </Text>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
