import React, { useState, useContext, useEffect } from "react";

import { SliderContainer, Slider } from "components/common/Container/index";
import { MobileDiv, Button, Card, Text } from "components/common";
import PulseLoader from "react-spinners/PulseLoader";

import {
  createVeShnLock,
  veShnApprove,
  increaseUnlockTimeForLockedShn,
  increaseAmountOfLockedShn,
  withdrawShnFromVeShn,
  getOnlyUserAddress,
  veShnCheckpoint,
  getShineBalance,
  toWei,
  fromWei,
  getAllowance,
  getEpoch,
  getUserPointHistory,
  getAddress,
  checkLocked,
  roundTo2Decimals,
} from "../../templates/utils";
import veSHN from "../../../../static/abi/veFXS";
import ShineToken from "../../../../static/abi/ShineToken";

const MAXTIME = 4 * 365 * 86400; // 4 years
const VOTE_WEIGHT_MULTIPLIER = 4 - 1; // 4x gives 300% boost at 4 years

export function VeShnContainer({ isWalletEnabled, chainId, refetchData, setRefetchData, loadingIndicator, setLoadingIndicator }) {
  //const [shnAddress, setShnAddress] = useState(getAddress(chainId,"shnAddress")); //not used becuase it doesnt work
  //const [veShnAddress, setVeShnAddress] = useState(getAddress(chainId,"veShnAddress"));

  console.log("chainxxx ", chainId, getAddress(chainId, "shnAddress"));

  const [locked, setLocked] = useState();
  const [shnBalance, setShnBalance] = useState(0);
  const [amountToLock, setAmountToLock] = useState(0);
  const [sliderValue, setSliderValue] = useState(90);
  const [desiredLockTimestamp, setDesiredLockTimestamp] = useState();
  const [allowance, setAllowance] = useState();
  const [lockError, setLockError] = useState(false);
  const [epoch, setEpoch] = useState();
  const [userPointHistory, setUserPointHistory] = useState();

  const [estimatedSlope, setEstimatedSlope] = useState();
  const [estimatedBias, setEstimatedBias] = useState();
  const [userAddress, setUserAddress] = useState();

  //useEffect(() => {
  //    setShnAddress(getAddress(chainId,"shnAddress"))
  //    setVeShnAddress(getAddress(chainId,"veShnAddress"))
  //}, [chainId]); not used because it didnt work as expected

  useEffect(() => {
    if (isWalletEnabled == true) {
      async function updateHistory() {
        getUserPointHistory(setUserPointHistory, await getOnlyUserAddress(), getAddress(chainId, "veShnAddress"), veSHN.abi);
      }
      updateHistory();
    }
  }, [epoch]);

  useEffect(() => {
    if (isWalletEnabled == true) {
      let slope = toWei(amountToLock) / MAXTIME;
      setEstimatedSlope(slope);
      let bias = slope * (desiredLockTimestamp - new Date().getTime() / 1000);
      setEstimatedBias(bias);
      console.log("estimated Slope and bias ", slope, bias, toWei(amountToLock), amountToLock, desiredLockTimestamp);
      console.log("lower timestamp ",new Date(desiredLockTimestamp* 1000).getTime(), new Date(locked.end * 1000).getTime(), locked.end, locked.end != 0 && new Date(desiredLockTimestamp*1000).getTime()  <= new Date(locked.end * 1000).getTime())
      if (locked.end != 0 && new Date(desiredLockTimestamp * 1000).getTime()  <= new Date(locked.end * 1000).getTime()) {
        setLockError("The time on the lock can only be increased.");
      }
    }
  }, [desiredLockTimestamp, amountToLock]);

  useEffect(() => {
    console.log("data ", isWalletEnabled, chainId, getAddress(chainId, "veShnAddress"));
    if (isWalletEnabled == true) {
      async function getLocked() {
        setUserAddress(await getOnlyUserAddress());
        const lockedBalance = await checkLocked(await getOnlyUserAddress(), getAddress(chainId, "veShnAddress"), veSHN.abi);
        console.log("queried balance", lockedBalance);
        console.log("refetchData ", refetchData);
        console.log("chainY ", getAddress(chainId, "shnAddress"));
        setLocked(lockedBalance);
        getShineBalance(setShnBalance, await getOnlyUserAddress(), ShineToken.abi, getAddress(chainId, "shnAddress"));
        getAllowance(setAllowance, getAddress(chainId, "veShnAddress"), await getOnlyUserAddress(), ShineToken.abi, getAddress(chainId, "shnAddress"));
        getEpoch(setEpoch, getAddress(chainId, "veShnAddress"), veSHN.abi);
      }
      getLocked();
    }
  }, [isWalletEnabled, refetchData, chainId]);

  useEffect(() => {
    function toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    }
    if (sliderValue >= 7) {
      let targetDate = new Date(Date.now() + sliderValue * 24 * 60 * 60 * 1000);
      setDesiredLockTimestamp(toTimestamp(targetDate));
      setLockError(false);
    } else {
      setLockError("Minimum lock duration is 7 days");
      let targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      setDesiredLockTimestamp(toTimestamp(targetDate));
    }
  }, [sliderValue]);

  function handleChange(e) {
    setSliderValue(e.target.value);
  }

  async function handleCreateLock() {
    setLockError(false);
    setLoadingIndicator(loadingIndicator.concat(["createLock"]));
    await createVeShnLock(userAddress, veSHN.abi, getAddress(chainId, "veShnAddress"), amountToLock, desiredLockTimestamp, loadingIndicator, setLoadingIndicator, setLockError, setRefetchData);
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  console.log("process env ", process.env.NODE_ENV);

  async function handleApprove() {
    setLoadingIndicator(loadingIndicator.concat(["approve"]));
    await veShnApprove(userAddress, getAddress(chainId, "veShnAddress"), setAllowance, loadingIndicator, setLoadingIndicator, ShineToken.abi, getAddress(chainId, "shnAddress"));
  }

  async function handleAmountIncrease() {
    setLockError(false);
    setLoadingIndicator(loadingIndicator.concat(["increaseLockAmount"]));
    await increaseAmountOfLockedShn(userAddress, amountToLock, getAddress(chainId, "veShnAddress"), veSHN.abi, setLockError, setLocked, loadingIndicator, setLoadingIndicator, setShnBalance, setRefetchData, ShineToken.abi, getAddress(chainId, "shnAddress"));
  }

  async function handleUnlockTimeIncrease() {
    setLockError(false);
    setLoadingIndicator(loadingIndicator.concat(["increaseLockTime"]));
    await increaseUnlockTimeForLockedShn(userAddress, desiredLockTimestamp, getAddress(chainId, "veShnAddress"), veSHN.abi, setLockError, setLocked, loadingIndicator, setLoadingIndicator, setRefetchData);
  }
  async function handleCheckpoint() {
    setLoadingIndicator(loadingIndicator.concat(["veShnCheckpoint"]));
    await veShnCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, getAddress(chainId, "veShnAddress"), veSHN.abi);
  }

  async function handleWithdraw() {
    setLockError(false);
    setLoadingIndicator(loadingIndicator.concat(["withdraw"]));
    await withdrawShnFromVeShn(userAddress, loadingIndicator, setLoadingIndicator, getAddress(chainId, "veShnAddress"), veSHN.abi, setLockError);
  }

  function checkIsValidNumber(str) {
    var numberRegex = /^[0-9.]*$/;
    if (str == "") {
      return false;
    } else if (str.match(numberRegex)) {
      return true;
      console.log("**Its Valid number");
    } else {
      return false;
      console.log("Its not Valid number");
    }
  }
  function handleAmountToLock(amount, setAmountToLock) {
    console.log("typee ", checkIsValidNumber(amount), amount);
    if (checkIsValidNumber(amount)) {
      setAmountToLock(amount);
    } else {
      setAmountToLock("0");
    }
  }

  function filterAmountToLock(amountToLock) {
    console.log("filteredAmount ", amountToLock, typeof amountToLock);
    let filteredString = amountToLock;
    while (filteredString[0] == "0") {
      filteredString = filteredString.substring(1);
    }
    return filteredString;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "80%" }}>
        <div>
          <div>
            <br></br>
            <Text fontWeight="600">veSHN</Text>
            <p>
              veSHN is a governance modelled after Curve's veCRV and Frax's veFXS vote escrow model where the users with longer lock time receive higher weighted voting power. For more info please check the{" "}
              <a href="https://docs.shinedao.finance/community/shn-token/veshn" target="_self">
                docs
              </a>
              .
            </p>
          </div>
          <div>
            <SliderContainer>
              <span>Balance:</span> {roundTo2Decimals(shnBalance)} SHN 🌟   { false && allowance}  <br></br> <br></br>
              <span>{"Enter amount to lock"} </span>
              <input onChange={target => handleAmountToLock(target.target.value, setAmountToLock)} value={filterAmountToLock(amountToLock)} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 20 }}></input>{" "}
              <b onClick={() => setAmountToLock(shnBalance)} style={{ cursor: "pointer" }}>
                MAX
              </b>
              <br></br>
              <br></br>
              {locked &&
                locked.amount > 0 &&
                (loadingIndicator.includes("increaseLockAmount") ? (
                  <div>
                    <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                    <br></br>
                    <i>Confirming transaction, please wait.</i>
                  </div>
                ) : (
                  allowance != 0 && <Button onClick={() => handleAmountIncrease()}>Increase Amount</Button>
                ))}
              <br></br>
              <br></br>
              <br></br><br></br>
              <Slider type="range" min="7" max="1460" value={sliderValue} onChange={handleChange}></Slider>
              <input onChange={handleChange} value={sliderValue} style={{ borderRadius: 6, boder: "1px solid #3f3d56", marginLeft: 35 }}></input>
              <span>{" Days "} </span>
              {sliderValue > 1460 && <Text color="red">Maximum allowed lock time is 4 Years / 1460 days</Text>}
              {lockError && <Text color="red"> {lockError}</Text>}
            </SliderContainer>{" "}
            <Text>Please select the lock time:</Text>
            <br></br>
            {console.log("loading indicator ", loadingIndicator)}
            {allowance == 0 &&
              (loadingIndicator.includes("approve") ? (
                <div>
                  <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                  <br></br>
                  <i>Confirming transaction, please wait.</i>
                </div>
              ) : (
                <div>
                  <Button onClick={() => handleApprove()}>Approve</Button><br></br><br></br>
                </div>
              ))}
            
            {locked && locked.amount > 0 ? (
              <div>
                {loadingIndicator.includes("increaseLockTime") ? (
                  <div>
                    <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                    <br></br>
                    <i>Confirming transaction, please wait.</i>
                  </div>
                ) : (
                  allowance != 0 &&  <Button onClick={() => handleUnlockTimeIncrease()}>Increase Lock Time</Button>
                )}
              </div>
            ) : allowance != 0 && loadingIndicator.includes("createLock") ? (
              <div>
                <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                <br></br>
                <i>Confirming transaction, please wait.</i>
              </div>
            ) : (
              isWalletEnabled && <Button onClick={() => handleCreateLock()}>Create Lock</Button>
            )}
            <br></br>
            {console.log("amount to lock ", amountToLock, typeof amountToLock, amountToLock == 0, amountToLock == "0", amountToLock != "0")}
            {amountToLock != "0" && estimatedBias && <Text> = {(parseInt(amountToLock) + VOTE_WEIGHT_MULTIPLIER * fromWei(estimatedBias)).toFixed(2)} veSHN</Text>}
            {true && (
              <div>
                {locked && (
                  <div>
                    {console.log("locked end ", locked.end, typeof locked.end, locked.end == 0)}
                    <br></br>Locked amount: <b>{roundTo2Decimals(fromWei(locked.amount))} SHN</b>
                    {locked.end != 0 && (
                      <div>
                        Lock end:<b> {timeConverter(locked.end)}</b>
                      </div>
                    )}
                    {userPointHistory && (
                      <Text>
                        <div>
                          <span>Current locked weight</span> <b>{(parseInt(fromWei(locked.amount)) + VOTE_WEIGHT_MULTIPLIER * fromWei(userPointHistory.bias)).toFixed(2)} veSHN</b>
                        </div>
                      </Text>
                    )}
                    {console.log("time now in seconds", new Date().getTime(), new Date(locked.end * 1000).getTime(), new Date().getTime() >= new Date(locked.end * 1000).getTime(), locked.end * 1000)}
                    {locked.end != 0 && new Date().getTime() / 100 >= new Date(locked.end * 1000).getTime() && (
                      <div>
                        <br></br>
                        {loadingIndicator.includes("withdraw") ? (
                          <div>
                            <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                            <br></br>
                            <i>Confirming transaction, please wait.</i>
                          </div>
                        ) : (
                          <Button onClick={() => handleWithdraw()}>Withdraw</Button>
                        )}
                      </div>
                    )}
                    {false && (
                      <div>
                        <br></br>Epoch {epoch}
                        <br></br> <br></br>User point history <br></br>
                        <br></br>bias {userPointHistory && userPointHistory.bias} <br></br>slope {userPointHistory && userPointHistory.slope} <br></br>ts {userPointHistory && userPointHistory.ts} <br></br>blk {userPointHistory && userPointHistory.blk}{" "}
                        <br></br>
                        fxs_amt {userPointHistory && userPointHistory.fxs_amt} <br></br>estimatedSlope {estimatedSlope}
                      </div>
                    )}
                    {
                      //object with keys {0, 1, 2, 3, 4, bias, slope, ts, blk, fxs_amt}
                    }
                  </div>
                )}
                <br></br>
                {loadingIndicator.includes("veShnCheckpoint") ? (
                  <div>
                    <PulseLoader color={"gold"} loading={true} size={15} margin={2} />
                    <br></br>
                    <i>Confirming transaction, please wait.</i>
                  </div>
                ) : (
                  isWalletEnabled && userAddress === getAddress(chainId, "controllerAddress") && <Button onClick={() => handleCheckpoint()}>Checkpoint</Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
