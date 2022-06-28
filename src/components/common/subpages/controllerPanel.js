import React, { useState, useContext, useEffect } from "react";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { MobileDiv, Button, Card, Text } from "components/common";
import {
  timeConverter,
  getTotalShnSupply,
  fromWei,
  toWei,
  getOnlyUserAddress,
  sync,
  getAddress,
  notifyReward,
  veShnYieldDistributorApprove,
  getDataForControlPanel,
  removeRewardContract,
  deployNewRewardContract,
  checkLocked,
  dateDiff,
  depositFor,
  roundTo2Decimals
} from "../../templates/utils";
import PulseLoader from "react-spinners/PulseLoader";

import { ThemeContext } from "providers/ThemeProvider";
import veShnYieldDistributor from "../../../../static/abi/veFXSYieldDistributorV4";
import veSHN from "../../../../static/abi/veFXS";
import SHN from "../../../../static/abi/ShineToken";
import GeneralCheckpoint from "../../../../static/abi/GeneralCheckpoint";

export function ControllerPanel({ isWalletEnabled, chainId, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator, rewardAddressesDropdown, tokenSymbolsForDropdown }) {
  const { theme } = useContext(ThemeContext);
  const [totalShnSupply, setTotalShnSupply] = useState("0");

  const [userAddress, setUserAddress] = useState();
  const [rewardToAdd, setRewardToAdd] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const [amountToApprove, setAmountToApprove] = useState();
  const [selectedRewardAddress, setSelectedRewardAddress] = useState();
  const [dataForAdminPanel, setDataForAdminPanel] = useState();

  const [emittedTokenAddress, setEmittedTokenAddress] = useState();
  const [userAddressToCheck, setUserAddressToCheck] = useState();
  const [lockedBalanceOfUser, setLockedBalanceOfUser] = useState();
  const [depositForAmount, setDepositForAmount] = useState(0);

  useEffect(() => {
    if (isWalletEnabled == true) {
      async function getSupply() {
        const shnSupply = await getTotalShnSupply(veSHN.abi, getAddress(chainId, "veShnAddress"));
        console.log("shnSupply balance", shnSupply);
        setTotalShnSupply(shnSupply);
        setUserAddress(await getOnlyUserAddress());
        setSelectedRewardAddress(getAddress(chainId, "veShnYieldDistributorAddress"));
        setDataForAdminPanel(await getDataForControlPanel(await getOnlyUserAddress(), getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi, veShnYieldDistributor.abi));
      }
      getSupply();
    }
  }, [isWalletEnabled, refetchData, chainId]);

  async function handleSync(address) {
    setLoadingIndicator(loadingIndicator.concat(["sync"]));
    await sync(await getOnlyUserAddress(), setRefetchData, loadingIndicator, setLoadingIndicator, veShnYieldDistributor.abi, address);
  }

  function handleRewardChange(notifyRewardAmount) {
    setRewardToAdd(notifyRewardAmount);
  }

  function handleNotifyReward(notifyRewardAmount, rewardContractAddress) {
    notifyReward(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, rewardContractAddress, veShnYieldDistributor.abi, setSuccessMessage, notifyRewardAmount);
  }

  function handleApprove(amountToApprove) {
    setAmountToApprove(amountToApprove);
  }

  function handleAmountToApprove(addressToApprove) {
    veShnYieldDistributorApprove(userAddress, veShnYieldDistributor.abi, addressToApprove, loadingIndicator, setLoadingIndicator, SHN.abi);
  }

  function handleRewardContractRemoval(addressToRemove) {
    if (confirm("Are you sure that you want to remove the reward contract address? Note that this action disables the people to claim the reward from the UI, however, if there are any rewards remaining they can be claimed over the smart contract.")) {
      removeRewardContract(userAddress, addressToRemove, getAddress(chainId, "GeneralCheckpointAddress"), GeneralCheckpoint.abi, veShnYieldDistributor.abi);
    }
  }
  function handleDropdownAddressChange(address) {
    console.log("handleDropdownAddressChange ", address);
    setSelectedRewardAddress(address);
  }

  function handleRewardContractDeploy(ownerAddress, emittedTokenAddress, timelockAddress, veShnAddress) {
    deployNewRewardContract(ownerAddress, emittedTokenAddress, timelockAddress, veShnAddress, GeneralCheckpoint.abi, getAddress(chainId, "GeneralCheckpointAddress"));
  }

  async function getUserLockDetails(address) {
    setUserAddressToCheck(address);
    const lockedBalance = await checkLocked(address, getAddress(chainId, "veShnAddress"), veSHN.abi);
    setLockedBalanceOfUser(lockedBalance);
  }

  async function handleDepositFor(depositAddress, amount) {
    await depositFor(userAddress, depositAddress, amount, getAddress(chainId, "veShnAddress"), veSHN.abi);
  }
  return (
    <div>
      {" "}
      <br></br>
      <HorizontalRuler theme={theme}></HorizontalRuler>
      {console.log("controllerAddress ", getAddress(chainId, "controllerAddress"))}
      {console.log("dataForAdminPanel ", dataForAdminPanel)}
      {userAddress === getAddress(chainId, "controllerAddress") && (
        <div style={{ textAlign: "center" }}>
          {rewardAddressesDropdown &&
            rewardAddressesDropdown.map((address, index) => {
              return (
                <div key={`address-${index}`} style={{ display: "inline-block", marginRight: 10, marginTop: 10 }}>
                  {loadingIndicator.includes("sync") ? (
                    <div>
                      <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                      <br></br>
                      <i>Confirming transaction, please wait.</i>
                    </div>
                  ) : (
                    <Button onClick={() => handleSync(address)}>Sync</Button>
                  )}
                </div>
              );
            })}
          <div style={{ width: "86%", margin: "0px auto" }}>
            <table>
              <tbody>
                <tr>
                  <td>Period finish</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.periodFinish_arr != "undefined" &&
                    dataForAdminPanel.periodFinish_arr.map((item, index) => {
                      return <td key={`period-finish-${index}`}>{timeConverter(item)}</td>;
                    })}
                </tr>

                <tr>
                  <td>Last update time</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.lastUpdateTime_arr != "undefined" &&
                    dataForAdminPanel.lastUpdateTime_arr.map((item, index) => {
                      return <td key={`last-update-time-${index}`}>{timeConverter(item)}</td>;
                    })}
                </tr>

                <tr>
                  <td>Yield Rate</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.yieldRate_arr != "undefined" &&
                    dataForAdminPanel.yieldRate_arr.map((yieldRate, index) => {
                      return <td key={`yieldRate-${index}`}>{fromWei(yieldRate)}</td>;
                    })}
                </tr>

                <tr>
                  <td>Yield Per veSHN Stored</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.yieldPerVeShnStored_arr != "undefined" &&
                    dataForAdminPanel.yieldPerVeShnStored_arr.map((yieldPerVeShnStored, index) => {
                      return <td key={`yield-per-veSHN-${index}`}>{fromWei(yieldPerVeShnStored)}</td>;
                    })}
                </tr>

                <tr>
                  <td>Total veSHN Participating</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.totalVeShnParticipating_arr != "undefined" &&
                    dataForAdminPanel.totalVeShnParticipating_arr.map((totalVeShnParticipating, index) => {
                      return <td key={`total-veSHN-participating-${index}`}>{fromWei(totalVeShnParticipating)}</td>;
                    })}
                </tr>

                <tr>
                  <td>Total veSHN Supply Stored</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.totalVeShnSupplyStored_arr != "undefined" &&
                    dataForAdminPanel.totalVeShnSupplyStored_arr.map((totalVeShnSupplyStored, index) => {
                      return <td key={`total-veShn-supply-stored-${index}`}>{fromWei(totalVeShnSupplyStored)}</td>;
                    })}
                </tr>

                <tr>
                  <td>User veSHN Staked</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.userVeShnCheckpointed_arr != "undefined" &&
                    dataForAdminPanel.userVeShnCheckpointed_arr.map((userVeShnCheckpointed, index) => {
                      return <td key={`user-staked-${index}`}>{fromWei(userVeShnCheckpointed)}</td>;
                    })}
                </tr>
                <tr>
                  <td>Fraction Participating</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.fractionParticipating_arr != "undefined" &&
                    dataForAdminPanel.fractionParticipating_arr.map((fractionParticipating, index) => {
                      return <td key={`fraction-participating-${index}`}>{fractionParticipating / 10000}%</td>;
                    })}
                </tr>

                <tr>
                  <td>Yield Per VeShn</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.yieldPerVeShn_arr != "undefined" &&
                    dataForAdminPanel.yieldPerVeShn_arr.map((yieldPerVeShn, index) => {
                      return <td key={`yield-per-veSHN-${index}`}>{fromWei(yieldPerVeShn)}</td>;
                    })}
                </tr>

                <tr>
                  <td>userVeShnEndpointCheckpointed</td>
                  {isWalletEnabled &&
                    typeof dataForAdminPanel != "undefined" &&
                    dataForAdminPanel.userVeShnEndpointCheckpointed_arr != "undefined" &&
                    dataForAdminPanel.userVeShnEndpointCheckpointed_arr.map((userVeShnEndpointCheckpointed, index) => {
                      return <td key={`user-endpoint-checkpointed-${index}`}>{userVeShnEndpointCheckpointed}</td>;
                    })}
                </tr>

                <tr>
                  <td>User Address</td>
                  <td>{isWalletEnabled && userAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br></br> <Button onClick={() => handleRewardContractRemoval(selectedRewardAddress)}>Remove contract from the UI</Button>
          <br></br>
          <br></br> <Button onClick={() => handleAmountToApprove(selectedRewardAddress)}>Approve Contract</Button> <br></br>
          <br></br>
          <select onChange={target => handleDropdownAddressChange(target.target.value)} name="reward-addresses" id="reward-addresses">
            {rewardAddressesDropdown &&
              tokenSymbolsForDropdown &&
              rewardAddressesDropdown.map((item, index) => {
                return <option key={`dropdown-address-${index}`} value={item}>{`${item}-${tokenSymbolsForDropdown[index]}`}</option>;
              })}
          </select>
          <input onChange={target => handleRewardChange(target.target.value)} value={rewardToAdd} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20 }}></input> <br></br>
          <br></br> <Button onClick={() => handleNotifyReward(rewardToAdd, selectedRewardAddress)}>Notify Reward</Button>
          <br></br>
          <br></br>
          <HorizontalRuler theme={theme}></HorizontalRuler>
          <br></br>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Text fontSize="26px" fontWeight="600" fontFamily="ClashGrotesk-Regular">
              New Reward Contract
            </Text>
            <br></br>
            <br></br>
            <input name="emitted-token-address" onChange={target => setEmittedTokenAddress(target.target.value.toLocaleLowerCase())} value={emittedTokenAddress} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "69%" }}></input>{" "}
            <label for="emitted-token-address">Enter address of the reward token: </label>
            <br></br>
            <Button onClick={async () => handleRewardContractDeploy(await getOnlyUserAddress(), emittedTokenAddress, await getOnlyUserAddress(), getAddress(chainId, "veShnAddress"))}>Deploy new reward contract</Button>
            <br></br>
            <i>Note that you need to notify the reward into the deployed contract soon after deploying. Otherwise the UI will be broken.</i>
          </div>
          <div>
            <HorizontalRuler theme={theme}></HorizontalRuler>
            <br></br>
            <Text fontSize="26px" fontWeight="600" fontFamily="ClashGrotesk-Regular">
              Deposit veSHN for someone else
            </Text>
            <br></br>
            <br></br>
            <label for="deposit-for-address">Address:</label>
            <input name="deposit-for-address" onChange={target => getUserLockDetails(target.target.value.toLocaleLowerCase())} value={userAddressToCheck} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "40%" }}></input>{" "}
            {lockedBalanceOfUser && lockedBalanceOfUser.end != 0 && (
              <div>
                Lock amount:<b> {roundTo2Decimals(fromWei(lockedBalanceOfUser.amount))}</b><br></br>
                Lock end:<b> {timeConverter(lockedBalanceOfUser.end)}</b>
                <br></br>
                Lock end in years from now: { dateDiff(new Date(), new Date(timeConverter(lockedBalanceOfUser.end)))} years <br></br> <br></br>
                <label for="deposit-for-amount">SHN Amount:</label>
                <input name="deposit-for-amount" onChange={target => setDepositForAmount(toWei(target.target.value))} value={fromWei(depositForAmount)} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20, width: "40%" }}></input>
                <br></br>
                <br></br>
                <Button onClick={()=>handleDepositFor(userAddressToCheck, depositForAmount)}>Deposit veSHN For</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
