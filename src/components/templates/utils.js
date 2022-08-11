import Web3 from "web3";
import Migrations from "../../../static/abi/Migrations.json";
var migrationsContractAddress = "0xbACf2F11eB10475DA816c1ADCB8B376FffD1544c";
//var migrationsContractAddress = "0xfC84D046C5ac723722033d8DF9985d70d85D2B18"; //ganache
//var migrationsContractAddress = "0x3f3207c60F6089cFD5828A2e0937DdC7Bd394e99"; //rinkeby
import axios from "axios";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
import ERC20 from "../../../static/abi/ShineToken";

export async function addToWatchlist(metamaskDetails) {
  console.log("details ", metamaskDetails);
  window.web3.currentProvider.sendAsync(
    {
      method: "metamask_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: metamaskDetails.address, // The address that the token is at.
          symbol: metamaskDetails.symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: metamaskDetails.decimals, // The number of decimals in the token
          image: metamaskDetails.image, // A string url of the token logo
        },
      },
      id: Math.round(Math.random() * 100000),
    },
    (err, addedBoolean) => {}
  );
}
export async function getCurrentMigrations(setCurrentMigration) {
  let abiArray = Migrations;
  let abi = abiArray.abi;
  let migrationsInstance = new window.web3.eth.Contract(abi, migrationsContractAddress);
  let currentMigration = await migrationsInstance.methods.last_completed_migration().call();
  setCurrentMigration(currentMigration);
  console.log("current migrations is ", currentMigration);
}

export async function getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi, tokenContractAddress) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);
  await getProjectBalance(setProjectBalance, userAddress, tokenAbi, tokenContractAddress);
}

export async function getUserAddress(setUserAddress, setShineBalance, tokenAbi, tokenContractAddress) {
  let userAddress = await window.ethereum.selectedAddress;
  console.log("user address ", userAddress);
  setUserAddress(userAddress);
  await getShineBalance(setShineBalance, userAddress, tokenAbi, tokenContractAddress);
}
export async function getOnlyUserAddress() {
  let userAddress = await window.ethereum.selectedAddress;
  console.log("user address ", userAddress);
  return userAddress;
}

export async function getWeiRaised(setWeiRaised, saleAbi, saleContractAddress) {
  console.log("abi 1", saleAbi);
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);
  let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();

  setWeiRaised(weiRaised);
  console.log("Wei raised so far", weiRaised);
}

export async function getSeedSaleShnBalance(setSeedSaleShnBalance, tokenAbi, saleContractAddress, tokenContractAddress) {
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);
  var seedSaleShnBalance = await tokenInst.methods.balanceOf(saleContractAddress).call();
  let shnAvailable = window.web3.utils.fromWei(seedSaleShnBalance.toString(), "ether");

  setSeedSaleShnBalance(shnAvailable);
}

export async function getEthRaised(setEthRaised, saleAbi, saleContractAddress) {
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);
  let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();
  let ethRaised = window.web3.utils.fromWei(weiRaised.toString(), "ether");
  setEthRaised(ethRaised);
  console.log("Eth raised so far", ethRaised);
}

export async function getEthBalance(setBalance) {
  window.web3.eth.getBalance(window.ethereum.selectedAddress, (err, balance) => {
    //console.log(window.web3.utils.fromWei(balance, "ether") + " ETH");
    setBalance(window.web3.utils.fromWei(balance.toString(), "ether"));
  });
}
export async function getShineBalance(setShineBalance, userAddress, tokenAbi, tokenContractAddress) {
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var shineBalance = await tokenInst.methods.balanceOf(userAddress).call();

  var shineBalanceFromWei = window.web3.utils.fromWei(shineBalance, "ether");
  setShineBalance(shineBalanceFromWei);
}

export async function getProjectBalance(setProjectBalance, userAddress, tokenAbi, tokenContractAddress) {
  console.log("adress ", userAddress);
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var projectBalance = await tokenInst.methods.balanceOf(userAddress).call();

  var projectBalanceFromWei = window.web3.utils.fromWei(projectBalance, "ether");
  setProjectBalance(projectBalanceFromWei);
}

export async function getTokenBalance(userAddress, tokenAbi, tokenContractAddress) {
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var projectBalance = await tokenInst.methods.balanceOf(userAddress).call();

  var projectBalanceFromWei = window.web3.utils.fromWei(projectBalance, "ether");
  return projectBalanceFromWei;
}

export async function getNftBalance(userAddress, tokenAbi, tokenContractAddress) {
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var projectBalance = await tokenInst.methods.balanceOf(userAddress).call();
  return projectBalance;
}

async function getNttBalanceAndValidity(userAddress, abi, nttAddress) {
  console.log("ntt address and abi", nttAddress,abi)
  const nttInstance = new window.web3.eth.Contract(abi, nttAddress);

  const nttBalance = await nttInstance.methods.balanceOf(userAddress).call();
  const hasValidNtt = await nttInstance.methods.hasValid(userAddress).call();

  return { nttBalance: parseInt(nttBalance), hasValidNtt };
}

export async function getVestingPeriod(saleAbi, saleContractAddress, setUserAddress, setVestingPeriod) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);

  var abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  var vestingPeriod = await simpleCrowdsaleInstance.methods.vestingPeriod(userAddress).call();

  setVestingPeriod(vestingPeriod);
}
export async function getVestedBalances(saleAbi, saleContractAddress, setUserAddress, setVestedBalances) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);

  var abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  var vestedBalances = await simpleCrowdsaleInstance.methods.vestedBalances(userAddress).call();

  var vestedBalancesFromWei = window.web3.utils.fromWei(vestedBalances, "ether");
  setVestedBalances(vestedBalancesFromWei);
}

export async function getRelativeCap(saleAbi, saleContractAddress, setUserAddress, setRelativeCap) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);

  var abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  var relativeCap = await simpleCrowdsaleInstance.methods.relativeCap().call();

  setRelativeCap(relativeCap);
}

export async function getContributions(saleAbi, saleContractAddress, setUserAddress, setContributions) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);

  var abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  var contributions = await simpleCrowdsaleInstance.methods.contributions(userAddress).call();

  setContributions(window.web3.utils.fromWei(toPlainString(contributions), "ether"));
}

export async function getIsSaleOpenForAll(saleAbi, saleContractAddress, setIsSaleOpenForAll) {
  var abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  var isSaleOpenForAll = await simpleCrowdsaleInstance.methods.isSaleOpenForAll().call();

  setIsSaleOpenForAll(isSaleOpenForAll);
}

export function getTier(shineBalance) {
  if (shineBalance < 15000) {
    return "No Tier";
  } else if (shineBalance >= 15000 && shineBalance < 50000) {
    return "Tier 1";
  } else if (shineBalance >= 50000 && shineBalance < 200000) {
    return "Tier 2";
  } else if (shineBalance >= 200000 && shineBalance < 400000) {
    return "Tier 3";
  } else if (shineBalance >= 400000) {
    return "Tier 4";
  }
}
export function getCustomTier(tokenBalance, tier1, tier2, tier3, tier4) {
  console.log("custom tier", tokenBalance, tier1, tier2, tier3, tier4);
  if (tokenBalance < tier1) {
    return "No Tier";
  } else if (tokenBalance >= tier1 && tokenBalance < tier2) {
    return "Tier 1";
  } else if (tokenBalance >= tier2 && tokenBalance < tier3) {
    return "Tier 2";
  } else if (tokenBalance >= tier3 && tokenBalance < tier4) {
    return "Tier 3";
  } else if (tokenBalance >= tier4) {
    return "Tier 4";
  }
}
export function getMaximumContribution(relativeCap, shineBalance) {
  console.log("rc, bal", relativeCap, shineBalance);
  let multiplier;
  if (shineBalance < 1500) {
    multiplier = 0;
  } else if (shineBalance >= 15000 && shineBalance < 50000) {
    multiplier = 1;
  } else if (shineBalance >= 50000 && shineBalance < 200000) {
    multiplier = 2;
  } else if (shineBalance >= 200000 && shineBalance < 400000) {
    multiplier = 4;
  } else if (shineBalance >= 400000) {
    multiplier = 8;
  }
  let maximumContribution = window.web3.utils.fromWei(toPlainString(relativeCap * multiplier), "ether");
  return maximumContribution;
}

//console.log(kFormatter(1200)); // 1.2k
//console.log(kFormatter(-1200)); // -1.2k
//console.log(kFormatter(900)); // 900
//console.log(kFormatter(-900)); // -900
export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" : Math.sign(num) * Math.abs(num);
}

export function timeConverter(UNIX_timestamp) {
  console.log("time ", UNIX_timestamp, typeof UNIX_timestamp);
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

export async function withdrawTokens(saleAbi, saleContractAddress, userAddress, setTransactionBeingProcessed, setMetamaskErrorCode, setIsTokenWithdrawn, setShineBought) {
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  setTransactionBeingProcessed(true);
  setMetamaskErrorCode(undefined);

  try {
    let estimatedGas = await simpleCrowdsaleInstance.methods.withdrawTokens(userAddress).estimateGas({
      from: userAddress,
    });

    const receipt = await simpleCrowdsaleInstance.methods.withdrawTokens(userAddress).send({
      from: userAddress,
      gas: estimatedGas,
    });
    setIsTokenWithdrawn(true);
  } catch (e) {
    console.log("err ", e);
    setIsTokenWithdrawn(false);
    setShineBought(false);
    if (e.message.search("Vesting: the time required for vesting is not expired yet") >= 0) {
      setMetamaskErrorCode("The time required for vesting is not expired yet");
    }
  }
  setTransactionBeingProcessed(false);
}
export async function enableAccessForTier1AndTier2(userAddress, gas, saleAbi, saleContractAddress) {
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  try {
    let estimatedGas = await simpleCrowdsaleInstance.methods.allowAllTierAccess(true).estimateGas({
      from: userAddress,
      gas: gas,
    });

    const receipt = await simpleCrowdsaleInstance.methods.allowAllTierAccess(true).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
  }
}

export async function buyShineTokens(ethAmountToSpend, setEthAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, userAddress, saleAbi, saleContractAddress, currentStatus, setRefetchData) {
  if (ethAmountToSpend !== "") {
    //disable button if no amount is entered
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    setTransactionBeingProcessed(true);
    setMetamaskErrorCode(undefined);

    try {
      let estimatedGas = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).estimateGas({
        from: userAddress,
        value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      });
      //let estimatedGas = 100000;

      console.log("estimated gas ", estimatedGas);

      console.log("eth amount to spend", ethAmountToSpend);
      const receipt = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).send({
        from: userAddress,
        value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
        gas: estimatedGas,
      });
      console.log("receipt", receipt);
      var amountBoughtInWei = receipt.events.TokensPurchased.returnValues.amount;
      var amountBoughtInTKNs = window.web3.utils.fromWei(amountBoughtInWei, "ether");

      setRefetchData(true);
      setShineBought(true);
      setShineBoughtAmount(amountBoughtInTKNs);
      setEthAmountToSpend("");
    } catch (e) {
      setShineBought(false);
      console.log("err ", e);
      console.log("User rejected transaction", e.code);

      if (e.message.search("insufficient funds for transfer") >= 0) {
        setMetamaskErrorCode("The amount that you are trying to buy, exceeds the amount that you have available in your wallet");
      } else if (e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded") >= 0) {
        setMetamaskErrorCode("Your total amount exceeds maximum participation");
      } else if (e.code === 4001) {
        setMetamaskErrorCode(e.message); //MetaMask Tx Signature: User denied transaction signature.
      } else if (e.message.search("Reference to the Shine Token contract has not been set") >= 0) {
        setMetamaskErrorCode("Reference to the Shine Token contract has not been set");
      } else if (e.message.search("Relative cap exceeded") >= 0) {
        setMetamaskErrorCode("Relative cap exceeded");
      } else if (e.message.search("Currently you are below Tier 1 level, but you need to be at least Tier3 in order to participate in the seed sale") >= 0) {
        if (currentStatus === "seed" || currentStatus == "ganacheSeed") {
          setMetamaskErrorCode("Currently you are below Tier 1 level, but you need to have at least 15 000 SHN in order to participate");
        } else if (currentStatus === "ido" || currentStatus == "ganacheSeed") {
          setMetamaskErrorCode("Currently you are below Tier 1 level, but you need to be at least 15 000 SHN in order to participate");
        }
      } else if (e.message.search("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale") >= 0) {
        setMetamaskErrorCode("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2");
      } else if (e.message.search("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale") >= 0) {
        setMetamaskErrorCode("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2");
      } else if (e.message.search("The amount that is being bought is too small to split it partially for vesting") >= 0) {
        setMetamaskErrorCode("The amount that is being bought is too small to split it partially for vesting");
      } else if (e.message.search("weiAmount is 0") >= 0) {
        setMetamaskErrorCode("0 is not a valid amount, please enter another ETH amount in the input field");
      } else {
        setMetamaskErrorCode("Something went wrong, please contact the support"); //"There are not enough project tokens left for sale anymore"
      }

      let searchCapExceeded = e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded");
      console.log("search ", searchCapExceeded); //149
      // console.log("metamask code", metamaskErrorCode)
    }
    setTransactionBeingProcessed(false);
  }
}

export async function swapTokenWithToken(ethAmountToSpend, setEthAmountToSpend, setShineBought, setShineBoughtAmount, setTransactionBeingProcessed, setMetamaskErrorCode, userAddress, saleAbi, saleContractAddress, currentStatus, setRefetchData) {
  if (ethAmountToSpend !== "") {
    //disable button if no amount is entered
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    setTransactionBeingProcessed(true);
    setMetamaskErrorCode(undefined);

    try {
      let estimatedGas = await simpleCrowdsaleInstance.methods.buyTokensWithToken(userAddress, toWei(ethAmountToSpend)).estimateGas({
        from: userAddress,
      });
      //let estimatedGas = 100000;

      console.log("estimated gas ", estimatedGas);

      console.log("eth amount to spend", ethAmountToSpend);
      const receipt = await simpleCrowdsaleInstance.methods.buyTokensWithToken(userAddress, toWei(ethAmountToSpend)).send({
        from: userAddress,
        gas: estimatedGas,
      });
      console.log("receipt", receipt);
      var amountBoughtInWei = receipt.events.TokensPurchased.returnValues.amount;
      var amountBoughtInTKNs = window.web3.utils.fromWei(amountBoughtInWei, "ether");

      setRefetchData(true);
      setShineBought(true);
      setShineBoughtAmount(amountBoughtInTKNs);
      setEthAmountToSpend("");
    } catch (e) {
      setShineBought(false);
      console.log("err ", e);
      console.log("User rejected transaction", e.code);

      if (e.message.search("insufficient funds for transfer") >= 0) {
        setMetamaskErrorCode("The amount that you are trying to buy, exceeds the amount that you have available in your wallet");
      } else if (e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded") >= 0) {
        setMetamaskErrorCode("Your total amount exceeds maximum participation");
      } else if (e.code === 4001) {
        setMetamaskErrorCode(e.message); //MetaMask Tx Signature: User denied transaction signature.
      } else if (e.message.search("Reference to the Shine Token contract has not been set") >= 0) {
        setMetamaskErrorCode("Reference to the Shine Token contract has not been set");
      } else if (e.message.search("Relative cap exceeded") >= 0) {
        setMetamaskErrorCode("Relative cap exceeded");
      } else if (e.message.search("Currently you are below Tier 1 level, but you need to be at least Tier3 in order to participate in the seed sale") >= 0) {
        if (currentStatus === "seed" || currentStatus == "ganacheSeed") {
          setMetamaskErrorCode("Currently you are below Tier 1 level, but you need to have at least 15 000 SHN in order to participate");
        } else if (currentStatus === "ido" || currentStatus == "ganacheSeed") {
          setMetamaskErrorCode("Currently you are below Tier 1 level, but you need to be at least 15 000 SHN in order to participate");
        }
      } else if (e.message.search("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale") >= 0) {
        setMetamaskErrorCode("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2");
      } else if (e.message.search("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale") >= 0) {
        setMetamaskErrorCode("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2");
      } else if (e.message.search("The amount that is being bought is too small to split it partially for vesting") >= 0) {
        setMetamaskErrorCode("The amount that is being bought is too small to split it partially for vesting");
      } else if (e.message.search("weiAmount is 0") >= 0) {
        setMetamaskErrorCode("0 is not a valid amount, please enter another ETH amount in the input field");
      } else {
        setMetamaskErrorCode("Something went wrong, please contact the support"); //"There are not enough project tokens left for sale anymore"
      }

      let searchCapExceeded = e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded");
      console.log("search ", searchCapExceeded); //149
      // console.log("metamask code", metamaskErrorCode)
    }
    setTransactionBeingProcessed(false);
  }
}

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload(true);
}

export async function loadWeb3(setWalletStatus, setBalance, setCurrentNetwork) {
  if (window.ethereum) {
    console.log("load 1", window.web3);
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    await getEthBalance(setBalance);
    setWalletStatus(true);
    setCurrentNetwork(window.web3.currentProvider.chainId);
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);

    console.log("load 1", window.web3);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    setWalletStatus(true);
    setCurrentNetwork(window.web3.currentProvider.chainId);
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);

    console.log("load 2");
  } else {
    setWalletStatus(false);
    setCurrentNetwork(window.web3.currentProvider.chainId);
    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);
    window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    console.log("load 3");
  }
}
function handleAccountsChanged(accounts, currentAccount) {
  console.log("current account called 321", accounts);
  window.location.reload(true);
}
export function handleChangeOfEthAmountToSpend(amount, setEthAmountToSpend) {
  setEthAmountToSpend(amount);
}

export function handleChangeOfShnReference(shnReference, setShnReference) {
  setShnReference(shnReference);
}
export function handleChangeOfNewRelativeCap(newRelativeCap, setNewRelativeCap) {
  setNewRelativeCap(newRelativeCap);
}
export async function setNewRelativeCap(userAddress, newRelativeCap, gas, saleAbi, saleContractAddress) {
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  try {
    let estimatedGas = await simpleCrowdsaleInstance.methods.setRelativeCap(newRelativeCap).estimateGas({
      from: userAddress,
      gas: gas,
    });

    const receipt = await simpleCrowdsaleInstance.methods.setRelativeCap(newRelativeCap).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
  }
}

export async function setShineTokenAddress(userAddress, shnReference, gas, saleAbi, saleContractAddress) {
  let abi = saleAbi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

  try {
    let estimatedGas = await simpleCrowdsaleInstance.methods.setShineTokenAddress(shnReference).estimateGas({
      from: userAddress,
      gas: gas,
    });

    const receipt = await simpleCrowdsaleInstance.methods.setShineTokenAddress(shnReference).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
  }
}
export function toPlainString(num) {
  //console.log("plain straing", num.toLocaleString("fullwide", { useGrouping: false }));
  return num.toLocaleString("fullwide", { useGrouping: false });
}

export function estimateReceivedTokens(ethAmountToSpend, rate) {
  const weiAmountToSpend = window.web3.utils.toWei(ethAmountToSpend.toString(), "ether");
  //console.log("wei", toPlainString(weiAmountToSpend * rate));

  //console.log("www", weiAmountToSpend * rate);

  //const estimatedShnInWei = weiAmountToSpend * rate
  const estimatedReceivedShn = window.web3.utils.fromWei(toPlainString(weiAmountToSpend * rate), "ether");
  //console.log("www1", Number.parseFloat(estimatedReceivedShn));
  return Number.parseFloat(estimatedReceivedShn);
}
export function estimateReceivedShn(ethAmountToSpend, rate) {
  console.log("eth to spend", ethAmountToSpend, rate);
  const weiAmountToSpend = window.web3.utils.toWei(ethAmountToSpend.toString(), "ether");
  //console.log("wei", toPlainString(weiAmountToSpend * rate));

  //console.log("www", weiAmountToSpend * rate);

  //const estimatedShnInWei = weiAmountToSpend * rate
  const estimatedReceivedShn = window.web3.utils.fromWei(toPlainString(weiAmountToSpend * rate), "ether");
  //console.log("www1", Number.parseFloat(estimatedReceivedShn));
  return Number.parseFloat(estimatedReceivedShn);
}

export function fromWei(amountInWei) {
  const amountInBaseUnit = window.web3.utils.fromWei(toPlainString(amountInWei), "ether");
  return Number.parseFloat(amountInBaseUnit);
}

export function toWei(amountInBaseUnit) {
  console.log("convertedRate11 ", amountInBaseUnit);
  const amountInWei = window.web3.utils.toWei(amountInBaseUnit.toString(), "ether");
  return amountInWei.toString();
}

export async function getAllowance(setAllowance, targetContract, userAddress, tokenAbi, tokenContractAddress) {
  var abiToken = tokenAbi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var allowance = await tokenInst.methods.allowance(userAddress, targetContract).call();
  setAllowance(allowance);
}

export async function getEpoch(setEpoch, veShnAddress, veShnTokenAbi) {
  var veShnInstance = new window.web3.eth.Contract(veShnTokenAbi, veShnAddress);
  var epoch = await veShnInstance.methods.epoch().call();
  setEpoch(epoch);
}

export async function getUserPointHistory(setUserPointHistory, userAddress, veShnAddress, veShnTokenAbi) {
  var veShnInstance = new window.web3.eth.Contract(veShnTokenAbi, veShnAddress);
  let epochFound = await veShnInstance.methods.user_point_epoch(userAddress).call();
  var userPointHistory = await veShnInstance.methods.user_point_history(userAddress, epochFound).call();
  console.log("userPointHistory userPointHistory 1", epochFound, userPointHistory, typeof userPointHistory);
  setUserPointHistory(userPointHistory);
}

export async function getTotalShnSupply(veShnTokenAbi, veShnAddress) {
  var veShnInstance = new window.web3.eth.Contract(veShnTokenAbi, veShnAddress);
  var totalShnSupply = await veShnInstance.methods.totalFXSSupply().call();
  return totalShnSupply;
}

export async function getPeriodFinish(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var periodFinish = await veShnYield.methods.periodFinish().call();
  return periodFinish;
}

export async function getLastUpdateTime(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var lastUpdateTime = await veShnYield.methods.lastUpdateTime().call();
  return lastUpdateTime;
}

export async function getYieldRate(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var yieldRate = await veShnYield.methods.yieldRate().call();
  return yieldRate;
}

export async function getyieldPerVeFXSStored(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var yieldPerVeShnStored = await veShnYield.methods.yieldPerVeFXSStored().call();
  return yieldPerVeShnStored;
}

export async function getYieldPerVeShn(userAddress, veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var yieldPerVeShn = await veShnYield.methods.yieldPerVeFXS().call();
  return yieldPerVeShn;
  //try {
  //  let estimatedGas = await veShnYield.methods.yieldPerVeFXS().estimateGas({
  //    from: userAddress,
  //  });
  //  console.log("estimated gas for yieldPerVeShn", estimatedGas);
  //
  //  const receipt = await veShnYield.methods.yieldPerVeFXS().send({
  //    from: userAddress,
  //    gas: estimatedGas,
  //  });
  //  console.log("receipt yieldPerVeShn", receipt);
  //} catch (e) {
  //  console.log("err ", e);
  //  console.log("Transaction rejected", e.code);
  //}
}

export async function getEarned(userAddress, veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var earned = await veShnYield.methods.earned(userAddress).call();
  console.log("earned call ", earned);
  return earned;
}

export async function sync(userAddress, setRefetchData, loadingIndicator, setLoadingIndicator, veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYield = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);

  try {
    let estimatedGas = await veShnYield.methods.sync().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnYield.methods.sync().send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "sync"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "sync"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function getTotalVeFXSParticipating(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var totalVeFXSParticipating = await veShnYieldDistributorInstance.methods.totalVeFXSParticipating().call();
  return totalVeFXSParticipating;
}

export async function getTotalVeFXSSupplyStored(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var getTotalVeFXSSupplyStored = await veShnYieldDistributorInstance.methods.totalVeFXSSupplyStored().call();
  return getTotalVeFXSSupplyStored;
}

export async function getUserVeShnCheckpointed(userAddress, veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var userVeShnCheckpointed = await veShnYieldDistributorInstance.methods.userVeFXSCheckpointed(userAddress).call();
  return userVeShnCheckpointed;
}

export async function getUserVeShnCheckpointedInAllAddresses(userAddress, veShnYieldDistributorAbi, GeneralCheckpointAddress, GeneralCheckpointAddressAbi) {
  //var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  //var userVeShnCheckpointed = await veShnYieldDistributorInstance.methods.userVeFXSCheckpointed(userAddress).call();
  //return userVeShnCheckpointed;

  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAddressAbi, GeneralCheckpointAddress);

  let addresses = [];
  let userVeShnCheckpointedInAllContracts = [];
  const count = await GeneralCheckpointInstance.methods.getCount().call();
  for (let i = 0; i < count; i++) {
    let addr = (await GeneralCheckpointInstance.methods.data(i).call()).toLowerCase();
    addresses.push(addr);

    var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, addr);
    var userVeShnCheckpointed = await veShnYieldDistributorInstance.methods.userVeFXSCheckpointed(userAddress).call();
    userVeShnCheckpointedInAllContracts.push(userVeShnCheckpointed);
  }
  console.log("userVeShnCheckpointedInAllContracts ", userVeShnCheckpointedInAllContracts);
  return userVeShnCheckpointedInAllContracts;
}

export async function getUserVeShnEndpointCheckpointed(userAddress, veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var userVeShnEndpointCheckpointed = await veShnYieldDistributorInstance.methods.userVeFXSEndpointCheckpointed(userAddress).call();
  return userVeShnEndpointCheckpointed;
}

export async function getFractionParticipating(veShnYieldDistributorAbi, veShnYieldDistributorAddress) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  var fractionParticipating = await veShnYieldDistributorInstance.methods.fractionParticipating().call();
  return fractionParticipating;
}

export async function veShnCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, veShnAddress, veShnAbi) {
  var veShnInstance = new window.web3.eth.Contract(veShnAbi, veShnAddress);

  try {
    let estimatedGas = await veShnInstance.methods.checkpoint().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnInstance.methods.checkpoint().send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "veShnCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "veShnCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}
export async function getRewardAddresses(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, GeneralCheckpointAddress, GeneralCheckpointAddressAbi) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAddressAbi, GeneralCheckpointAddress);

  try {
    let estimatedGas = await GeneralCheckpointInstance.methods.getCount().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);
    let addresses = [];
    const count = await GeneralCheckpointInstance.methods.getCount().call();
    for (let i = 0; i < count; i++) {
      addresses.push((await GeneralCheckpointInstance.methods.data(i).call()).toLowerCase());
    }

    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
    return addresses;
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function rewardCheckpoint(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, GeneralCheckpointAddress, GeneralCheckpointAddressAbi) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAddressAbi, GeneralCheckpointAddress);

  try {
    let estimatedGas = await GeneralCheckpointInstance.methods.checkpointUserToAllContracts(userAddress).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await GeneralCheckpointInstance.methods.checkpointUserToAllContracts(userAddress).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}
// this function was deprecated as additional abstraction was introduced i.e. we mantain a list of all reward contracts and checkpoint into all of them in a loop.
export async function rewardCheckpoint_DEPRECATED(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, veShnYieldDistributorAddress, veShnYieldDistributorAbi) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);

  try {
    let estimatedGas = await veShnYieldDistributorInstance.methods.checkpoint().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnYieldDistributorInstance.methods.checkpoint().send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function getRewardTokenSymbols(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, GeneralCheckpointAddress, GeneralCheckpointAddressAbi, veShnYieldDistributorAbi, tokenAbi) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAddressAbi, GeneralCheckpointAddress);

  try {
    let estimatedGas = await GeneralCheckpointInstance.methods.getCount().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);
    let addresses = [];
    let emittedTokenAddresses = [];
    let tokenSymbols = [];
    const count = await GeneralCheckpointInstance.methods.getCount().call();
    for (let i = 0; i < count; i++) {
      let addr = (await GeneralCheckpointInstance.methods.data(i).call()).toLowerCase();
      addresses.push(addr);

      var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, addr);
      let emm_addr = (await veShnYieldDistributorInstance.methods.emitted_token_address().call()).toLowerCase();
      emittedTokenAddresses.push(emm_addr);
      var tokenInst = new window.web3.eth.Contract(tokenAbi, emm_addr);
      let tokenSymbol = await tokenInst.methods.symbol().call();
      tokenSymbols.push(tokenSymbol);
      console.log("tokenSymbol ", tokenSymbol);
    }

    //let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    //setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
    //console.log("emittedTokenAddresses ", emittedTokenAddresses)
    return tokenSymbols;
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    //let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "rewardCheckpoint"); // none is default when there is nothing
    //setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function getDataForControlPanel(userAddress, GeneralCheckpointAddress, GeneralCheckpointAddressAbi, veShnYieldDistributorAbi) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAddressAbi, GeneralCheckpointAddress);

  let totalVeShnParticipating_arr = [];
  let yieldPerVeShnStored_arr = [];
  let yieldPerVeShn_arr = [];
  let totalVeShnSupplyStored_arr = [];
  let userVeShnCheckpointed_arr = [];
  let yieldRate_arr = [];
  let periodFinish_arr = [];
  let lastUpdateTime_arr = [];
  let userVeShnEndpointCheckpointed_arr = [];
  let fractionParticipating_arr = [];
  let earned_arr = [];
  const count = await GeneralCheckpointInstance.methods.getCount().call();
  for (let i = 0; i < count; i++) {
    let addr = (await GeneralCheckpointInstance.methods.data(i).call()).toLowerCase();

    var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, addr);
    let totalVeShnParticipating = (await veShnYieldDistributorInstance.methods.totalVeFXSParticipating().call()).toLowerCase();
    totalVeShnParticipating_arr.push(totalVeShnParticipating);

    let yieldRate = (await veShnYieldDistributorInstance.methods.yieldRate().call()).toLowerCase();
    yieldRate_arr.push(yieldRate);

    let yieldPerVeShnStored = (await veShnYieldDistributorInstance.methods.yieldPerVeFXSStored().call()).toLowerCase();
    yieldPerVeShnStored_arr.push(yieldPerVeShnStored);

    let totalVeShnSupplyStored = (await veShnYieldDistributorInstance.methods.totalVeFXSSupplyStored().call()).toLowerCase();
    totalVeShnSupplyStored_arr.push(totalVeShnSupplyStored);

    let userVeShnCheckpointed = (await veShnYieldDistributorInstance.methods.userVeFXSCheckpointed(userAddress).call()).toLowerCase();
    userVeShnCheckpointed_arr.push(userVeShnCheckpointed);

    let userVeShnEndpointCheckpointed = (await veShnYieldDistributorInstance.methods.userVeFXSEndpointCheckpointed(userAddress).call()).toLowerCase();
    userVeShnEndpointCheckpointed_arr.push(userVeShnEndpointCheckpointed);

    let periodFinish = (await veShnYieldDistributorInstance.methods.periodFinish().call()).toLowerCase();
    periodFinish_arr.push(periodFinish);

    let lastUpdateTime = (await veShnYieldDistributorInstance.methods.lastUpdateTime().call()).toLowerCase();
    lastUpdateTime_arr.push(lastUpdateTime);

    let yieldPerVeShn = (await veShnYieldDistributorInstance.methods.yieldPerVeFXS().call()).toLowerCase();
    yieldPerVeShn_arr.push(yieldPerVeShn);

    let fractionParticipating = (await veShnYieldDistributorInstance.methods.fractionParticipating().call()).toLowerCase();
    fractionParticipating_arr.push(fractionParticipating);

    let earned = (await veShnYieldDistributorInstance.methods.earned(userAddress).call()).toLowerCase();
    earned_arr.push(earned);
  }

  //setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  return {
    yieldRate_arr,
    yieldPerVeShn_arr,
    earned_arr,
    fractionParticipating_arr,
    periodFinish_arr,
    lastUpdateTime_arr,
    yieldPerVeShnStored_arr,
    totalVeShnSupplyStored_arr,
    userVeShnCheckpointed_arr,
    totalVeShnParticipating_arr,
    userVeShnEndpointCheckpointed_arr,
  };
}

export async function getYield(rewardAddress, userAddress, loadingIndicator, setLoadingIndicator, index, setRefetchData, veShnYieldDistributorAddress, veShnYieldDistributorAbi, setSuccessMessage, toggle) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, rewardAddress);
  console.log("reward address ", rewardAddress);
  console.log("user address getyield", userAddress);

  try {
    let estimatedGas = await veShnYieldDistributorInstance.methods.getYield().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnYieldDistributorInstance.methods.getYield().send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `claim-${index}`); // none is default when there is nothing
    toggle(); // plays sound when yield is collected
    setSuccessMessage({ location: "rewardClaim" });
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `claim-${index}`); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function withdrawShnFromVeShn(userAddress, loadingIndicator, setLoadingIndicator, veShnAddress, veShnAbi, setLockError) {
  var veShnInstance = new window.web3.eth.Contract(veShnAbi, veShnAddress);

  try {
    let estimatedGas = await veShnInstance.methods.withdraw().estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnInstance.methods.withdraw().send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "withdraw"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  } catch (e) {
    console.log("err ", e);
    setLockError(e.message);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "withdraw"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function increaseAmountOfLockedShn(userAddress, amountToLock, veShnAddress, veShnAbi, setLockError, setLocked, loadingIndicator, setLoadingIndicator, setShnBalance, setRefetchData, ShineTokenAbi, shnAddress) {
  var veSHN = new window.web3.eth.Contract(veShnAbi, veShnAddress);

  try {
    let estimatedGas = await veSHN.methods.increase_amount(toWei(amountToLock)).estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await veSHN.methods.increase_amount(toWei(amountToLock)).send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    setLocked(await checkLocked(userAddress, veShnAddress, veShnAbi));
    getShineBalance(setShnBalance, userAddress, ShineTokenAbi, shnAddress);

    console.log("receipt ", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "increaseLockAmount"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    if (e.message.includes("Transaction reverted without a reason string")) {
      setLockError("Make sure that you are entering correct amount of SHN to lock and that you have enough allowance to do it.");
    } else {
      setLockError("Something went wrong");
    }
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "increaseLockAmount"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    console.log("create lock error ", e);
  }
}

export async function increaseUnlockTimeForLockedShn(userAddress, desiredLockTimestamp, veShnAddress, veShnAbi, setLockError, setLocked, loadingIndicator, setLoadingIndicator, setRefetchData) {
  var veSHN = new window.web3.eth.Contract(veShnAbi, veShnAddress);
  try {
    let estimatedGas = await veSHN.methods.increase_unlock_time(desiredLockTimestamp).estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await veSHN.methods.increase_unlock_time(desiredLockTimestamp).send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    setLocked(await checkLocked(userAddress, veShnAddress, veShnAbi));

    console.log("receipt ", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "increaseLockTime"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    if (e.message.includes("Can only increase lock duration")) {
      setLockError("Please increase lock duration.");
    }
    console.log("create lock error ", e);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "increaseLockTime"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function checkLocked(userAddress, veShnAddress, veShnAbi) {
  console.log("locked 1233 ", veShnAddress);
  var veSHN = new window.web3.eth.Contract(veShnAbi, veShnAddress);
  try {
    const locked = await veSHN.methods.locked(userAddress).call();
    console.log("locked 123 ", locked);
    return locked;
  } catch (e) {
    console.log("locked balance err ", e);
  }
}

export async function veShnApprove(userAddress, veShnAddress, setAllowance, loadingIndicator, setLoadingIndicator, shineAbi, shnAddress) {
  var SHN = new window.web3.eth.Contract(shineAbi, shnAddress);

  try {
    let estimatedGas = await SHN.methods.approve(veShnAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await SHN.methods.approve(veShnAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    getAllowance(setAllowance, veShnAddress, userAddress, shineAbi, shnAddress);

    console.log("receipt ", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "approve"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  } catch (e) {
    console.log("create lock error ", e);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "approve"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function createVeShnLock(userAddress, veShnAbi, veShnAddress, amountToLock, desiredLockTimestamp, loadingIndicator, setLoadingIndicator, setLockError, setRefetchData) {
  console.log("toWei ", toWei(amountToLock), typeof toWei(amountToLock));
  console.log("slider new", desiredLockTimestamp, typeof desiredLockTimestamp);

  let veSHN = new window.web3.eth.Contract(veShnAbi, veShnAddress);
  try {
    let estimatedGas = await veSHN.methods.create_lock(toWei(amountToLock), desiredLockTimestamp).estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await veSHN.methods.create_lock(toWei(amountToLock), desiredLockTimestamp).send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    console.log("receipt ", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "createLock"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("create lock error ", e);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "createLock"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    setLockError("Lock could not be created, please check the amount of SHN that you are locking. Additionally check that you have approved the contract.");
  }
}
import addresses from "../../../static/config/config";
export function getAddress(chainId, contract) {
  let chainIdContainer = {
    "0x1": "main",
    "0x89": "matic",
    "0x13881": "mumbai",
    "0x7a69": "hardhat",
  };
  let chain = chainIdContainer[chainId];
  console.log("chainx ", chain, typeof chain, addresses[contract][chain]);
  if (typeof chain != "undefined") {
    return addresses[contract][chain].toLowerCase();
  } else {
    return addresses[shnAddress].hardhat.toLowerCase();
  }
}

import dealsConfig from "../../../static/config/dealsConfig";
export function getTokenAddressFromDealsConfig(chainId, tokenName) {
  let chainIdContainer = {
    "0x1": "main",
    "0x89": "matic",
    "0x13881": "mumbai",
    "0x7a69": "hardhat",
  };
  let chain = chainIdContainer[chainId];
  console.log("chainx ", chain, typeof chain, dealsConfig[tokenName][chain]);
  if (typeof chain != "undefined") {
    return dealsConfig[tokenName][chain].toLowerCase();
  } else {
    return dealsConfig["usdc"].hardhat.toLowerCase();
  }
}

export function roundTo2Decimals(num) {
  return Math.round(num * 100) / 100;
}

export async function notifyReward(userAddress, loadingIndicator, setLoadingIndicator, setRefetchData, veShnYieldDistributorAddress, veShnYieldDistributorAbi, setSuccessMessage, rewardAmount) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  console.log("reward amm ", rewardAmount);
  try {
    let rewardInWei = window.web3.utils.toWei(rewardAmount.toString(), "ether");
    let estimatedGas = await veShnYieldDistributorInstance.methods.notifyRewardAmount(rewardInWei).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await veShnYieldDistributorInstance.methods.notifyRewardAmount(rewardInWei).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "claim"); // none is default when there is nothing
    setSuccessMessage({ location: "rewardClaim" });
    setLoadingIndicator(currentLoadingIndicator);
    setRefetchData(true); // after every successful transaction, the data on the frontend needs to be refetched
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "claim"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function veShnYieldDistributorApprove(userAddress, veShnYieldDistributorAbi, veShnYieldDistributorAddress, loadingIndicator, setLoadingIndicator, shineAbi) {
  var veShnYieldDistributorInstance = new window.web3.eth.Contract(veShnYieldDistributorAbi, veShnYieldDistributorAddress);
  let emm_addr = (await veShnYieldDistributorInstance.methods.emitted_token_address().call()).toLowerCase();
  var tokenInstance = new window.web3.eth.Contract(shineAbi, emm_addr);

  try {
    let estimatedGas = await tokenInstance.methods.approve(veShnYieldDistributorAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await tokenInstance.methods.approve(veShnYieldDistributorAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    console.log("receipt ", receipt);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "approve"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  } catch (e) {
    console.log("create lock error ", e);
    let currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== "approve"); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
  }
}

export async function removeRewardContract(userAddress, addressToRemove, generalCheckpointAddress, GeneralCheckpointAbi, veShnYieldDistributorAbi) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAbi, generalCheckpointAddress);
  try {
    let estimatedGas = await GeneralCheckpointInstance.methods.deleteRewardAddress(addressToRemove).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await GeneralCheckpointInstance.methods.deleteRewardAddress(addressToRemove).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("Error while removing Contract Address ", e);
  }
}

export async function deployNewRewardContract(userAddress, emittedTokenAddress, timelockAddress, veShnAddress, GeneralCheckpointAbi, generalCheckpointAddress) {
  var GeneralCheckpointInstance = new window.web3.eth.Contract(GeneralCheckpointAbi, generalCheckpointAddress);
  try {
    let estimatedGas = await GeneralCheckpointInstance.methods.deployNewRewardContract(userAddress, emittedTokenAddress, timelockAddress, veShnAddress).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await GeneralCheckpointInstance.methods.deployNewRewardContract(userAddress, emittedTokenAddress, timelockAddress, veShnAddress).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("Error while deploying new Reward Contract Address ", e);
  }
}

export function dateDiff(d1, d2) {
  return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(2);
}

export async function depositFor(userAddress, depositAddress, amount, veShnAddress, generalCheckpointAddress, generalCheckpointAbi, shnAddress) {
  var generalCheckpointInstance = new window.web3.eth.Contract(generalCheckpointAbi, generalCheckpointAddress);
  try {
    let estimatedGas = await generalCheckpointInstance.methods.depositFor(userAddress, depositAddress, amount, shnAddress, veShnAddress).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    const receipt = await generalCheckpointInstance.methods.depositFor(userAddress, depositAddress, amount, shnAddress, veShnAddress).send({
      from: userAddress,
      gas: estimatedGas,
    });
    console.log("receipt", receipt);
  } catch (e) {
    console.log("err ", e);
    console.log("Transaction rejected", e.code);
  }
}

export async function generalCheckpointApprove(userAddress, generalCheckpointAddress, shineAbi, shnAddress) {
  var tokenInstance = new window.web3.eth.Contract(shineAbi, shnAddress);

  try {
    let estimatedGas = await tokenInstance.methods.approve(generalCheckpointAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });

    console.log("estimated gas for lock", estimatedGas);
    const receipt = await tokenInstance.methods.approve(generalCheckpointAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });
    console.log("receipt ", receipt);
  } catch (e) {
    console.log("approve error", e);
  }
}
async function setAccessNft(userAddress, SeedAbi, seedAddress, nftAddress, nftCap) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.setAccessNFT(nftAddress, nftCap).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setAccessNFT(nftAddress, nftCap).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("NFT access token set", receipt);
}

async function setAccessNtt(userAddress, SeedAbi, seedAddress, nttAddress, nttCap) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.setAccessNTT(nttAddress, nttCap).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setAccessNTT(nttAddress, nttCap).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("NTT access token set", receipt);
}
async function setWhitelistedAddresses(userAddress, SeedAbi, seedAddress, whitelistedAddresses, capsForWhitelistedAddresses) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.setWhitelistedAddresses(whitelistedAddresses, capsForWhitelistedAddresses, true).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setWhitelistedAddresses(whitelistedAddresses, capsForWhitelistedAddresses, true).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("Whitelisted addresses set", receipt);
}

async function setAccessToken(userAddress, SeedAbi, seedAddress, accessTokenAddress, accessTokenAmountTier1, accessTokenAmountTier2, accessTokenAmountTier3, accessTokenAmountTier4, tier1Cap, tier2Cap, tier3Cap, tier4Cap) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  console.log("access token ", userAddress, seedInstance, accessTokenAddress, accessTokenAmountTier1, accessTokenAmountTier2, accessTokenAmountTier3, accessTokenAmountTier4, tier1Cap, tier2Cap, tier3Cap, tier4Cap);
  let estimatedGas = await seedInstance.methods.setAccessToken(accessTokenAddress, accessTokenAmountTier1, accessTokenAmountTier2, accessTokenAmountTier3, accessTokenAmountTier4, tier1Cap, tier2Cap, tier3Cap, tier4Cap).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setAccessToken(accessTokenAddress, accessTokenAmountTier1, accessTokenAmountTier2, accessTokenAmountTier3, accessTokenAmountTier4, tier1Cap, tier2Cap, tier3Cap, tier4Cap).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("access token set", receipt);
}

async function setVesting(userAddress, SeedAbi, seedAddress, cliffDuration, vestingDuration, percentageVested) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.setVesting(true, cliffDuration, vestingDuration, percentageVested).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setVesting(true, cliffDuration, vestingDuration, percentageVested).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("Whitelisted addresses set", receipt);
}

export async function setVisibility(userAddress, SeedAbi, seedAddress, visibility) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.setDealVisibility(true).estimateGas({
    from: userAddress,
  });
  console.log("estimated gas for sync", estimatedGas);

  const receipt = await seedInstance.methods.setDealVisibility(true).send({
    from: userAddress,
    gas: estimatedGas,
  });
  console.log("Deal visiblity set", receipt);
}

export async function deployTokens(userAddress, SeedAbi, offeredTokenAddress, seedAddress, amount) {
  var seedInstance = new window.web3.eth.Contract(SeedAbi, seedAddress);
  let estimatedGas = await seedInstance.methods.addTokens(offeredTokenAddress, userAddress, amount).estimateGas({
    from: userAddress,
  });

  console.log("estimated gas for sync", estimatedGas);
  const receipt = await seedInstance.methods.addTokens(offeredTokenAddress, userAddress, amount).send({
    from: userAddress,
    gas: estimatedGas,
  });

  console.log("Tokens added", receipt);
}

export async function deployNewSeed(
  userAddress,
  offeredTokenAddress,
  acceptedTokenAddress,
  SeedFactoryAbi,
  SeedAbi,
  seedFactoryAddress,
  amount,
  rate,
  cliffDuration,
  vestingDuration,
  percentageVested,
  startTime,
  endTime,
  accessTokenAddress,
  accessTokenAmountTier1,
  accessTokenAmountTier2,
  accessTokenAmountTier3,
  accessTokenAmountTier4,
  tier1Cap,
  tier2Cap,
  tier3Cap,
  tier4Cap,
  title,
  accessMechanism,
  whitelistedAddresses,
  capsForWhitelistedAddresses,
  nftAddress,
  nftCap,
  requireKyc,
  nttAddress,
  nttCap,
  distributionMechanism,
  visibility,
  loadingIndicator,
  setLoadingIndicator,
  successMessage,
  setSuccessMessage
) {
  console.log(userAddress, offeredTokenAddress, seedFactoryAddress, parseInt(rate).toLocaleString("fullwide", { useGrouping: false }), visibility);
  var SeedFactoryInstance = new window.web3.eth.Contract(SeedFactoryAbi, seedFactoryAddress);
  try {
    //1000000000000000000000000
    let estimatedGas = await SeedFactoryInstance.methods.deployNewSeed(parseInt(rate).toLocaleString("fullwide", { useGrouping: false }), userAddress, offeredTokenAddress, acceptedTokenAddress, startTime, endTime, title).estimateGas({
      from: userAddress,
    });
    console.log("estimated gas for sync", estimatedGas);

    //vestingEnabled,cliffDuration, vestingDuration,percentageVested,

    let index = 0;
    await setLoadingIndicator(loadingIndicator.concat([`deploy-${index}`]));

    const receipt = await SeedFactoryInstance.methods.deployNewSeed(parseInt(rate).toLocaleString("fullwide", { useGrouping: false }), userAddress, offeredTokenAddress, acceptedTokenAddress, startTime, endTime, title).send({
      from: userAddress,
      gas: estimatedGas,
    });

    console.log("current receipt", receipt);
    let currentSuccessMessage = successMessage;

    let currentLoadingIndicator;
    currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
    await setLoadingIndicator(currentLoadingIndicator);
    currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
    await setSuccessMessage(currentSuccessMessage);
    console.log("current loading indicator ", currentLoadingIndicator);

    let seedAddress = await receipt.events.AddedNewRewardAddress.returnValues.newAddress.toLowerCase();
    console.log("seed address ", seedAddress);
    if (accessMechanism != "open") {
      index = index + 1;
      await setLoadingIndicator(loadingIndicator.concat([`deploy-${index}`]));
      if (accessMechanism == "whitelist") {
        await setWhitelistedAddresses(userAddress, SeedAbi, seedAddress, whitelistedAddresses, capsForWhitelistedAddresses);
        currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        await setLoadingIndicator(currentLoadingIndicator);
        currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
        await setSuccessMessage(currentSuccessMessage);
      } else if (accessMechanism == "nft-gate") {
        console.log("address of deployed contract ", seedAddress);
        await setAccessNft(userAddress, SeedAbi, seedAddress, nftAddress, nftCap);
        currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        await setLoadingIndicator(currentLoadingIndicator);
        currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
        await setSuccessMessage(currentSuccessMessage);
      } else if (accessMechanism == "ntt-gate") {
        //console.log("address of deployed contract ", seedAddress);
        //await setAccessNtt(userAddress, SeedAbi, seedAddress, nttAddress, nttCap);
        //currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        //await setLoadingIndicator(currentLoadingIndicator);
        //await setSuccessMessage(successMessage.concat([`trx-${index}-success`]));
      } else if (accessMechanism == "token-gate-tiers") {
        console.log("address of deployed contract ", seedAddress);
        await setAccessToken(userAddress, SeedAbi, seedAddress, accessTokenAddress, accessTokenAmountTier1, accessTokenAmountTier2, accessTokenAmountTier3, accessTokenAmountTier4, tier1Cap, tier2Cap, tier3Cap, tier4Cap);
        currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        await setLoadingIndicator(currentLoadingIndicator);
        currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
        await setSuccessMessage(currentSuccessMessage);
      }
    }
    if (requireKyc) {
      index = index + 1;
      await setLoadingIndicator(loadingIndicator.concat([`deploy-${index}`]));
      console.log("address of deployed contract ", seedAddress);
      await setAccessNtt(userAddress, SeedAbi, seedAddress, nttAddress, nttCap);
      currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
      await setLoadingIndicator(currentLoadingIndicator);
      currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
      await setSuccessMessage(currentSuccessMessage);
    }
    if (distributionMechanism != "instant") {
      index = index + 1;
      setLoadingIndicator(loadingIndicator.concat([`deploy-${index}`]));
      if (distributionMechanism == "lock") {
        await setVesting(userAddress, SeedAbi, seedAddress, vestingDuration, vestingDuration, percentageVested); // in case of locks without no linear vesting, cliff and vesting duration are the same.
        currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        await setLoadingIndicator(currentLoadingIndicator);
        currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
        await setSuccessMessage(currentSuccessMessage);
      } else if ((distributionMechanism = "linear-vesting")) {
        await setVesting(userAddress, SeedAbi, seedAddress, cliffDuration, vestingDuration, percentageVested);
        currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
        await setLoadingIndicator(currentLoadingIndicator);
        currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
        await setSuccessMessage(currentSuccessMessage);
      }
    }
    if (visibility == "public") {
      index = index + 1;
      await setLoadingIndicator(loadingIndicator.concat([`deploy-${index}`]));
      await setVisibility(userAddress, SeedAbi, seedAddress, visibility);
      currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${index}`); // none is default when there is nothing
      await setLoadingIndicator(currentLoadingIndicator);
      currentSuccessMessage = currentSuccessMessage.concat([`trx-${index}-success`]);
      await setSuccessMessage(currentSuccessMessage);
    }

    await setLoadingIndicator(loadingIndicator.concat([`deploy-${5}`]));
    await approveContract(userAddress, ERC20.abi, offeredTokenAddress, seedAddress, amount, undefined);
    currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${5}`); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    currentSuccessMessage = currentSuccessMessage.concat([`trx-${5}-success`]);
    await setSuccessMessage(currentSuccessMessage);

    await setLoadingIndicator(loadingIndicator.concat([`deploy-${6}`]));
    await deployTokens(userAddress, SeedAbi, offeredTokenAddress, seedAddress, amount);
    currentLoadingIndicator = loadingIndicator.filter(v => v !== "none" && v !== `deploy-${6}`); // none is default when there is nothing
    setLoadingIndicator(currentLoadingIndicator);
    currentSuccessMessage = currentSuccessMessage.concat([`trx-${6}-success`]);
    await setSuccessMessage(currentSuccessMessage);

    console.log("receipt", receipt);
    return seedAddress;
  } catch (e) {
    console.log("Error while deploying new Seed contract ", e);
  }
}

export async function retrieveIndex(SeedFactoryAbi, seedFactoryAddress, seedAddress) {
  const SeedFactoryInstance = new window.web3.eth.Contract(SeedFactoryAbi, seedFactoryAddress);
  let index = await SeedFactoryInstance.methods.retrieveIndex(seedAddress).call();
  return index;
}

export async function getSeedSales(userAddress, seedAbi, SeedFactoryAbi, seedFactoryAddress, erc20Abi, activeContract) {
  console.log("user address seed ", userAddress);
  const SeedFactoryInstance = new window.web3.eth.Contract(SeedFactoryAbi, seedFactoryAddress);

  let count;
  let iteratorStartingPoint;
  let seedSalesData = [];

  if (activeContract) {
    iteratorStartingPoint = parseInt(await SeedFactoryInstance.methods.retrieveIndex(activeContract).call());
    count = iteratorStartingPoint + 1;
  } else {
    iteratorStartingPoint = 0;
    count = await SeedFactoryInstance.methods.getCount().call();
  }

  for (iteratorStartingPoint; iteratorStartingPoint < count; iteratorStartingPoint++) {
    console.log("count acc", iteratorStartingPoint, count);
    let seedAddress = (await SeedFactoryInstance.methods.data(iteratorStartingPoint).call()).toLowerCase();
    let seedInstance = new window.web3.eth.Contract(seedAbi, seedAddress);
    let offeredTokenAddress = await seedInstance.methods.token().call();
    let acceptedTokenAddress = await seedInstance.methods.acceptedToken().call();
    let rate = await seedInstance.methods.rate().call();
    let vestedBalance = await seedInstance.methods.vestedBalances(userAddress).call();
    let vestingPeriod = await seedInstance.methods.vestingPeriod(userAddress).call();
    let cliffPeriod = await seedInstance.methods.cliffPeriod(userAddress).call();
    let startTime = await seedInstance.methods.startTime().call();
    let endTime = await seedInstance.methods.endTime().call();
    let weiRaised = await seedInstance.methods.weiRaised().call();
    let name = await seedInstance.methods.name().call();
    let createdTimestamp = await seedInstance.methods.createdTimestamp().call();
    let totalOffered = await seedInstance.methods.totalOffered().call();

    let tier1 = await seedInstance.methods.tier1().call();
    let tier2 = await seedInstance.methods.tier2().call();
    let tier3 = await seedInstance.methods.tier3().call();
    let tier4 = await seedInstance.methods.tier4().call();

    let tier1Cap = await seedInstance.methods.tier1Cap().call();
    let tier2Cap = await seedInstance.methods.tier2Cap().call();
    let tier3Cap = await seedInstance.methods.tier3Cap().call();
    let tier4Cap = await seedInstance.methods.tier4Cap().call();

    let capPerAddressEnabled = await seedInstance.methods.capPerAddressEnabled().call();
    let capPerAddress = await seedInstance.methods.capPerAddress(userAddress).call();

    let accessNFT = await seedInstance.methods.accessNFT().call();
    let accessNTT = await seedInstance.methods.accessNTT().call();
    let accessToken = await seedInstance.methods.accessToken().call();

    let vestingEnabled = await seedInstance.methods.vestingEnabled().call();
    let cliffDuration = parseInt(await seedInstance.methods.cliffDuration().call());
    let vestingDuration = parseInt(await seedInstance.methods.vestingDuration().call());
    let percentageVested = await seedInstance.methods.percentageVested().call();

    let dealVisibility = await seedInstance.methods.dealVisibility().call();

    let distributionMechanism = "instant";
    if (vestingEnabled) {
      if (cliffDuration == vestingDuration) {
        distributionMechanism = "lock";
      } else if (vestingDuration > cliffDuration) {
        distributionMechanism = "linear-vesting";
      }
    }

    let accessMechanism = "open";
    let accessTokenSymbol, accessTokenBalance, capForNFT, nftBalance;

    if (capPerAddressEnabled == true) {
      accessMechanism = "whitelist";
    } else if (accessNFT != ZERO_ADDRESS) {
      accessMechanism = "nft-gate";
      nftBalance = await getNftBalance(userAddress, erc721Abi, accessNFT);
      capForNFT = await seedInstance.methods.capForNFT().call();
    } else if (accessToken != ZERO_ADDRESS) {
      accessMechanism = "token-gate-tiers";
      let accessErc20Instance = new window.web3.eth.Contract(erc20Abi, accessToken);
      accessTokenSymbol = await accessErc20Instance.methods.symbol().call();
      accessTokenBalance = toWei(await getTokenBalance(userAddress, erc20Abi, accessToken));
    }
    let kycEnabled = false;
    let nttBalance, hasValidNtt, capForNTT;
    if (accessNTT != ZERO_ADDRESS) {
      kycEnabled = true;
      capForNTT = await seedInstance.methods.capForNTT().call();
      ({ nttBalance, hasValidNtt } = await getNttBalanceAndValidity(userAddress, erc4671Abi, accessNTT));
    }

    let rewardPerSecond = vestedBalance / (vestingPeriod - cliffPeriod);
    console.log("token address ()", offeredTokenAddress);

    let erc20Instance = new window.web3.eth.Contract(erc20Abi, offeredTokenAddress);
    let offeredTokenName = await erc20Instance.methods.name().call();
    let offeredTokenSymbol = await erc20Instance.methods.symbol().call();
    let offeredTokenTotalSupply = await erc20Instance.methods.totalSupply().call();

    let acceptedTokenName;
    let acceptedTokenSymbol;
    let acceptedTokenBalance;
    if (acceptedTokenAddress != ZERO_ADDRESS) {
      let acceptedErc20Instance = new window.web3.eth.Contract(erc20Abi, acceptedTokenAddress);
      acceptedTokenName = await acceptedErc20Instance.methods.name().call();
      acceptedTokenSymbol = await acceptedErc20Instance.methods.symbol().call();
      acceptedTokenBalance = await acceptedErc20Instance.methods.balanceOf(userAddress).call();
      //let acceptedTokenTotalSupply = await erc20Instance.methods.totalSupply().call();
    }

    seedSalesData.push({
      offeredTokenName,
      offeredTokenAddress,
      acceptedTokenAddress,
      acceptedTokenBalance,
      seedAddress,
      rate,
      offeredTokenSymbol,
      weiRaised,
      offeredTokenTotalSupply,
      vestedBalance,
      vestingPeriod,
      cliffPeriod,
      rewardPerSecond,
      startTime,
      endTime,
      name,
      accessMechanism,
      distributionMechanism,
      percentageVested,
      capPerAddressEnabled,
      accessNFT,
      accessNTT,
      accessToken,
      capPerAddress,
      dealVisibility,
      vestingDuration,
      cliffDuration,
      acceptedTokenName,
      acceptedTokenSymbol,
      tier1,
      tier2,
      tier3,
      tier4,
      tier1Cap,
      tier2Cap,
      tier3Cap,
      tier4Cap,
      createdTimestamp,
      totalOffered,
      accessTokenSymbol,
      accessTokenBalance,
      capForNTT,
      capForNFT,
      nftBalance,
      nttBalance,
      hasValidNtt,
      kycEnabled,
      //acceptedTokenTotalSupply
    });
  }
  console.log("count acc 1111", iteratorStartingPoint, count, seedSalesData);
  return seedSalesData;
}

export async function checkApprovalStatus(userAddress, tokenAbi, tokenAddress, addressOfContractToApprove, amount, setApprovalStatus) {
  let parsedAmount = parseInt(amount);

  var tokenInstance = new window.web3.eth.Contract(tokenAbi, tokenAddress);
  const amountApproved = await tokenInstance.methods.allowance(userAddress, addressOfContractToApprove).call();
  console.log("tex ", parsedAmount, typeof parsedAmount, parsedAmount != 0, fromWei(amountApproved), typeof fromWei(amountApproved));
  if (fromWei(amountApproved) >= parsedAmount) {
    setApprovalStatus(false);
  } else {
    console.log("tex mex");
    setApprovalStatus(true); // display approve button
  }
}

export async function approveContract(
  userAddress,
  tokenAbi,
  tokenAddress,
  addressOfContractToApprove,
  amount = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  setApprovalStatus,


) {
  console.log("token add", tokenAddress, addressOfContractToApprove);
  var tokenInstance = new window.web3.eth.Contract(tokenAbi, tokenAddress);

  try {
    let estimatedGas = await tokenInstance.methods.approve(addressOfContractToApprove, amount).estimateGas({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      //gas: gas,
    });


    console.log("estimated gas for approval", estimatedGas);
    const receipt = await tokenInstance.methods.approve(addressOfContractToApprove, amount).send({
      from: userAddress,
      //value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
      gas: estimatedGas,
    });

    setApprovalStatus(false);
  

  

    console.log("receipt ", receipt);
  } catch (e) {
    console.log("create lock error ", e);
  }
}
export function getTokenRatio(tokenA, tokenB) {
  const rate = tokenB / tokenA;
  return (rate * 1000000000000000000000000).toLocaleString("fullwide", { useGrouping: false }); // multiplication with 1000000000000000000000000 is there in order to support fixed float operations. For example without it, some tokens ratios could not be offered. Lets say 1USDC for 0.1TKNx rate would be 0.1 which is not supported in Solidity. More info: https://github.com/CementDAO/Fixidity/blob/master/contracts/FixidityLib.sol
}

export function fromFixed(tokenRatio) {
  return tokenRatio / 1000000000000000000000000;
}

export function getTokenRate(nativeTokenPriceInUsd, offeredTokenPriceInUsd) {
  console.log("token rates ", nativeTokenPriceInUsd, offeredTokenPriceInUsd);
  const oneUsdInWei = 1000000000000000000 / nativeTokenPriceInUsd;
  console.log("oneUsdInWei ", oneUsdInWei);
  const oneOfferedTokenInWei = oneUsdInWei * offeredTokenPriceInUsd;
  console.log("oneOfferedTokenInWei ", oneOfferedTokenInWei);

  const rate = Math.pow(10, 18) / oneOfferedTokenInWei;
  //const rate = Math.pow((Math.pow(10, 18) / oneOfferedTokenInWei)*10,24);
  console.log("rate ", rate * 1000000000000000000000000);
  return (rate * 1000000000000000000000000).toLocaleString("fullwide", { useGrouping: false }); // multiplication with 1000000000000000000000000 is there in order to support fixed float operations. For example without it, some tokens ratios could not be offered. Lets say 1USDC for 0.1TKNx rate would be 0.1 which is not supported in Solidity. More info: https://github.com/CementDAO/Fixidity/blob/master/contracts/FixidityLib.sol
}

export function getRateInUsd(rate, nativeTokenPriceInUsd) {
  console.log("rate in usd 111", rate, nativeTokenPriceInUsd);
  return 1 / (rate / nativeTokenPriceInUsd);
}

export async function getNativeTokenPrice(chainId) {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${getCoingeckoName(chainId)}`);
  return response.data[0].current_price;
}

export function getCoingeckoName(chainId) {
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

export function getNetworkName(chainId) {
  const chainMapper = {
    "0x1": "Ethereum",
    "0x89": "Polygon/Matic",
    "0x7a69": "Localhost",
  };
  if (chainMapper[chainId]) {
    return chainMapper[chainId];
  } else {
    return chainId;
  }
}
export function substringAddress(address) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export const erc721Abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const erc4671Abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "hasValid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
