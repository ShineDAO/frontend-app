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
} from "../../templates/utils";
import { MobileDiv, Button, Card, Text } from "components/common";
import PulseLoader from "react-spinners/PulseLoader";

import veSHN from "../../../../static/abi/veFXS";
import veShnYieldDistributor from "../../../../static/abi/veFXSYieldDistributorV4";
const axios = require("axios");

export function StakingContainer({ isWalletEnabled, chainId, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator }) {
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
  const [userVeShnEndpointCheckpointed, setUserVeShnEndpointCheckpointed] = useState("");
  const [fractionParticipating, setFractionParticipating] = useState("");
  const [yieldPerVeShn, setYieldPerVeShn] = useState("");
  const [earned, setEarned] = useState("");
  const [userAddress, setUserAddress] = useState();
  const [shinePrice, setShinePrice] = useState();
  const [tvl, setTvl] = useState();
  const [successMessage, setSuccessMessage] = useState({ location: "", text: "" }); //location rewardClaim/

  //useEffect(() => {
  //  setVeShnYieldDistributorAddress(getAddress(chainId, "veShnYieldDistributorAddress"));
  //  setVeShnAddress(getAddress(chainId, "veShnAddress"));
  //}, [chainId]);

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
        setEarned(await getEarned(await getOnlyUserAddress(), veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress")));
      }
      getSupply();
    }
  }, [isWalletEnabled, refetchData, chainId]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=shinedao")
      .then(function(response) {
        // handle success
        console.log("shine price ", response.data[0].current_price, fromWei(totalShnSupply));
        setShinePrice(response.data[0].current_price);
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

  async function handleRewardCheckpoint() {
    setLoadingIndicator(loadingIndicator.concat(["rewardCheckpoint"]));
    await rewardCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "veShnYieldDistributorAddress"), veShnYieldDistributor.abi);
  }
  async function handleClaim() {
    setLoadingIndicator(loadingIndicator.concat(["claim"]));
    await getYield(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "veShnYieldDistributorAddress"), veShnYieldDistributor.abi, setSuccessMessage);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "65%", margin: "0 auto" }}>
        <div>
          <div>
            <br></br>
            <Text fontWeight="600">veSHN Staking</Text>
            <p>If you have locked your SHN and got veSHN, you are eligible for veSHN staking.</p>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>APR Base/Max</th>
                  {isWalletEnabled && (
                    <th>
                      {roundTo2Decimals((((fromWei(yieldRate) * 365 * 86400) / fromWei(totalVeShnParticipating)) * 100) / 4)}% / {roundTo2Decimals(((fromWei(yieldRate) * 365 * 86400) / fromWei(totalVeShnParticipating)) * 100)}%
                    </th>
                  )}
                </tr>
                <tr>
                  <td>TVL</td>
                  <td>${roundTo2Decimals(tvl)}</td>
                </tr>
                <tr>
                  <td>% of SHN locked</td>
                  <td>{isWalletEnabled && roundTo2Decimals((fromWei(totalShnSupply) / 21000000) * 100)}%</td>
                </tr>
                <tr>
                  <td>User veSHN Checkpointed</td>
                  <td>{isWalletEnabled && roundTo2Decimals(fromWei(userVeShnCheckpointed))}</td>
                </tr>
              </tbody>
            </table>
            {loadingIndicator.includes("rewardCheckpoint") ? (
              <div>
                <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                <br></br>
                <i>Confirming transaction, please wait.</i>
              </div>
            ) : (
              isWalletEnabled && <Button onClick={() => handleRewardCheckpoint()}>STAKE</Button>
            )}
            <br></br>
            <span> {isWalletEnabled && <i>After you create, add or increase the timelock you need to <b>stake</b> again in order to account the new amount for the reward.</i>} </span>
            <br></br> <br></br> <br></br>
            {loadingIndicator.includes("claim") ? (
              <div>
                <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                <br></br>
                <i>Confirming transaction, please wait.</i>
              </div>
            ) : (
              isWalletEnabled && successMessage.location != "rewardClaim" && <Button onClick={() => handleClaim()}>CLAIM</Button>
            )}
            <br></br> <br></br>
            {isWalletEnabled &&
              (successMessage.location != "rewardClaim" ? (
                <Text fontWeight="600">
                  Earned so far: {fromWei(earned)} SHN 🌟 (${shinePrice * fromWei(earned)})
                </Text>
              ) : (
                <Text color="green" fontWeight="600">
                  Reward claimed!
                </Text>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
