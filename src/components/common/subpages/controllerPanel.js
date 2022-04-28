import React, { useState, useContext, useEffect } from "react";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { MobileDiv, Button, Card, Text } from "components/common";
import {
  timeConverter,
  getEarned,
  getYieldPerVeShn,
  getFractionParticipating,
  getUserVeShnEndpointCheckpointed,
  getUserVeShnCheckpointed,
  getTotalVeFXSSupplyStored,
  getTotalVeFXSParticipating,
  getyieldPerVeFXSStored,
  getYieldRate,
  getLastUpdateTime,
  getPeriodFinish,
  getTotalShnSupply,
  fromWei,
  getOnlyUserAddress,
  sync,
  getAddress,
} from "../../templates/utils";
import PulseLoader from "react-spinners/PulseLoader";

import { ThemeContext } from "providers/ThemeProvider";
import veShnYieldDistributor from "../../../../static/abi/veFXSYieldDistributorV4";
import veSHN from "../../../../static/abi/veFXS";

export function ControllerPanel({ isWalletEnabled, chainId, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator }) {
  //const [veShnYieldDistributorAddress, setVeShnYieldDistributorAddress] = useState(getAddress(chainId, "veShnYieldDistributorAddress"));
  //const [veShnAddress, setVeShnAddress] = useState(getAddress(chainId, "veShnAddress"));

  const { theme } = useContext(ThemeContext);
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

  async function handleSync() {
    setLoadingIndicator(loadingIndicator.concat(["sync"]));
    await sync(await getOnlyUserAddress(), setRefetchData, loadingIndicator, setLoadingIndicator, veShnYieldDistributor.abi, getAddress(chainId, "veShnYieldDistributorAddress"));
  }

  return (
    <div>
      {" "}
      <HorizontalRuler theme={theme}></HorizontalRuler>
      {console.log("controllerAddress ", getAddress(chainId, "controllerAddress"))}
      {userAddress === getAddress(chainId, "controllerAddress") && (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "80%" }}></div>
          {loadingIndicator.includes("sync") ? (
            <div>
              <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
              <br></br>
              <i>Confirming transaction, please wait.</i>
            </div>
          ) : (
            <Button onClick={() => handleSync()}>Sync</Button>
          )}
          <table>
            <tbody>
              <tr>
                <td>Period finish</td>
                <td>{isWalletEnabled && timeConverter(periodFinish)}</td>
              </tr>

              <tr>
                <td>Last update time</td>
                <td>{isWalletEnabled && timeConverter(lastUpdateTime)}</td>
              </tr>

              <tr>
                <td>Yield Rate</td>
                <td>{isWalletEnabled && fromWei(yieldRate)}</td>
              </tr>

              <tr>
                <td>Yield Per veSHN Stored</td>
                <td>{isWalletEnabled && fromWei(yieldPerVeShnStored)}</td>
              </tr>

              <tr>
                <td>Total veSHN Participating</td>
                <td>{isWalletEnabled && fromWei(totalVeShnParticipating)}</td>
              </tr>

              <tr>
                <td>Total veSHN Supply Stored</td>
                <td>{isWalletEnabled && fromWei(totalVeShnSupplyStored)}</td>
              </tr>

              <tr>
                <td>User veSHN Checkpointed</td>
                <td>{isWalletEnabled && fromWei(userVeShnCheckpointed)}</td>
              </tr>
              <tr>
                <td>Fraction Participating</td>
                <td>{isWalletEnabled && fractionParticipating / 10000}%</td>
              </tr>

              <tr>
                <td>Yield Per VeShn</td>
                <td>{isWalletEnabled && fromWei(yieldPerVeShn)}</td>
              </tr>

              <tr>
                <td>userVeShnEndpointCheckpointed</td>
                <td>{isWalletEnabled && userVeShnEndpointCheckpointed}</td>
              </tr>

              <tr>
                <td>User Address</td>
                <td>{isWalletEnabled && userAddress}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
