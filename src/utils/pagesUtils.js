const axios = require("axios");

import Web3 from "web3";
export const baseTokenReward = 12.5;
let detect = null;
let userAgentData = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  detect = require("detect.js");
  userAgentData = detect.parse(navigator.userAgent);
  console.log("detec.js ", userAgentData);
}

export function isBackButtonVisible(currentPage, isWalletEnabled, username, serverVerified, correctNetwork) {
  return false; //always hide the back button for now
  if (isWalletEnabled && username && correctNetwork && currentPage > 1) {
    return true;
  }
}

export function isNextButtonVisible(currentPage, isWalletEnabled, username, serverVerified, correctNetwork) {
  console.log("server verified ", serverVerified);

  if (currentPage == 1) {
    return isWalletEnabled && username && correctNetwork;
  } else if (currentPage == 2) {
    return isWalletEnabled && username && correctNetwork && serverVerified;
  } else if (currentPage == 3) {
  }
}

export function decodeUrlFragment(hash, setAccessCode, setUsername, setAccId, setAvatarId, setTokenReward) {
  var result = hash.split("&").reduce(function(result, item) {
    var parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});
  console.log(result);
  verifyAcc(result.access_token, setUsername, setAccId, setAvatarId, setTokenReward);
  setAccessCode(result.access_token);
}
export function claimReward(accessCode, setContributorDetected, currentAccount, username, accId, avatarId, setContributorError, setRegistrationSuccess, setLoading, setTxnHash) {
  setLoading(true);
  axios
    .get(`${process.env.GATSBY_SERVER_ADDRESS}/claimReward?authorization=${accessCode}&address=${currentAccount}&username=${username}&discordId=${accId}&avatarId=${avatarId}`)
    .then(function(response) {
      if (response.data.contributorDetected == true) {
        setContributorDetected(true);
      } else if (response.data.registrationSuccess == false) {
        setContributorError(true);
      } else if (response.data.registrationSuccess == true) {
        setRegistrationSuccess(true);
        setTxnHash(response.data.txnHash);
      }
      setLoading(false);
      console.log("claim ", response.data);
    })
    .catch(function(error) {
      setLoading(false);

      console.log("err5,", error);
    });
}

export async function addToWatchlist(setAddedToMetamask, currentPage, setCurrentPage, setTokenReward, metamaskDetails) {
  try {
    //https://githubmemory.com/repo/MetaMask/metamask-extension/issues/12416
    if (detect && userAgentData.browser.family === "Firefox") {
      //https://github.com/JedWatson/react-codemirror/issues/77
      console.log("Firefox browser detected");

      setAddedToMetamask(true);
      setTokenReward(baseTokenReward * 4);
      setCurrentPage(currentPage + 1);
    }

    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: metamaskDetails.address, // The address that the token is at.
          symbol: metamaskDetails.symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: metamaskDetails.decimals, // The number of decimals in the token
          image: metamaskDetails.image, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!", wasAdded);
      setAddedToMetamask(true);
      setTokenReward(baseTokenReward * 4);
      setCurrentPage(currentPage + 1);
    } else {
      console.log("Your loss!");
      //adding this below because coinbase wallet on mobile wallet cannot pass this step otherwise.
      setAddedToMetamask(true);
      setTokenReward(baseTokenReward * 4);
      setCurrentPage(currentPage + 1);
    }
    //adding this below because coinbase wallet on mobile wallet cannot pass this step otherwise.
    setAddedToMetamask(true);
    setTokenReward(baseTokenReward * 4);
    setCurrentPage(currentPage + 1);
  } catch (error) {
    console.log(error);
    //adding this below because coinbase wallet on mobile wallet cannot pass this step otherwise.
    setAddedToMetamask(true);
    setTokenReward(baseTokenReward * 4);
    setCurrentPage(currentPage + 1);
  }

  //
}

export async function switchMoralisChain(Moralis) {
  try {
    const web3 = await Moralis.enableWeb3();
    const chainIdHex = await Moralis.switchNetwork("0x89");
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    console.log("code error ", switchError);
    if (switchError.code === 4902) {
      console.log(" switch error");
      try {
        const chainId = "0x89";
        const chainName = "Matic(Polygon) Mainnet";
        const rpcUrls = ["https://polygon-rpc.com"];
        const blockExplorerUrls = ["https://polygonscan.com"];
        const nativeCurrency = { name: "MATIC", symbol: "MATIC", decimals: 18 }; /* ... */
        await Moralis.addNetwork(chainId, chainName, nativeCurrency.name, nativeCurrency.symbol, rpcUrls[0], blockExplorerUrls[0]);
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

//used in veSHN
export async function switchChain() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    console.log("code error ", switchError.code);
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Matic(Polygon) Mainnet",
              rpcUrls: ["https://rpc-mainnet.matic.network"],
              blockExplorerUrls: ["https://polygonscan.com"],
              nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 } /* ... */,
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

export async function switchToMainnet() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  } catch (switchError) {
    console.log("code error 4213 ", switchError)
  }
}

export function verifyServer(accessCode, setTokenReward, setServerVerified) {
  axios
    .get(`${process.env.GATSBY_SERVER_ADDRESS}/verifyServer?authorization=${accessCode}`)
    .then(function(response) {
      console.log(response.data);
      setTokenReward(baseTokenReward * 2);
      console.log("type ", typeof response.data.userJoinedServer);
      if (response.data.userJoinedServer == true) {
        setServerVerified(true);
      } else {
        setServerVerified(false);
      }
    })
    .catch(function(error) {
      console.log("err5,", error);
    });
}

export function verifyMessage(accessCode, setTokenReward, setMessageVerified) {
  axios
    .get(`${process.env.GATSBY_SERVER_ADDRESS}/verifyMessage?authorization=${accessCode}`)
    .then(function(response) {
      console.log(response.data);
      setTokenReward(baseTokenReward * 3);
      if (response.data.userIntroduced == true) {
        setMessageVerified(true);
      } else {
        setMessageVerified(false);
      }
    })
    .catch(function(error) {
      console.log("err5,", error);
    });
}

export function chainIdToName(chainId) {
  console.log("chain id is ", chainId);
  if (chainId === "0x1") {
    return "Ethereum";
  } else if (chainId === "0x89") {
    return "Polygon";
  } else {
    return "Unrecognized Chain";
  }
}
export async function loginUser(Moralis, setWalletStatus) {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Authenticate with ShineDAO" });
  }
  console.log("logged in user: ", user);
  setWalletStatus(true);
  return user;
}

export async function loadWeb3MoralisProviderLight(authenticate, Moralis) {
  await authenticate({ signingMessage: "Authenticate with ShineDAO" });
  const web3 = await Moralis.enableWeb3();

  Moralis.Web3.onAccountsChanged(async function(accounts) {
    // matic "0x89"
    // mainnet "0x1"
    console.log("account changed x: ", accounts[0]);
    await Moralis.User.logOut();
    console.log("logged out");
    handleChainChanged();
  });

  Moralis.Web3.onChainChanged(async function(chain) {
    console.log("chain changed x: ", chain);
    await Moralis.User.logOut();
    console.log("logged out");
    handleChainChanged();
  });
}

export async function loadWeb3MoralisProvider(Moralis, setWalletStatus, setChainId, setCurrentAccount) {
  const user = await loginUser(Moralis, setWalletStatus);
  const web3 = await Moralis.enableWeb3();
  const chainId = await Moralis.getChainId();
  console.log("moralis chain ", chainId);
  setChainId(chainId);
  console.log("user eth address", user.get("ethAddress"));
  setCurrentAccount(user.get("ethAddress"));

  Moralis.Web3.onAccountsChanged(async function(accounts) {
    // matic "0x89"
    // mainnet "0x1"
    console.log("account changed x: ", accounts[0]);
    await Moralis.User.logOut();
    console.log("logged out");
    handleChainChanged();
  });

  Moralis.Web3.onChainChanged(async function(chain) {
    console.log("chain changed x: ", chain);
    await Moralis.User.logOut();
    console.log("logged out");
    handleChainChanged();
  });
}
export async function loadWeb3(setWalletStatus, setChainId, currentAccount, setCurrentAccount) {
  let chainId;
  if (window.ethereum) {
    console.log("load 1", window.web3);
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    //await getEthBalance(setBalance);
    setWalletStatus(true);

    chainId = await ethereum.request({ method: "eth_chainId" });
    setChainId(chainId);
    ethereum.on("chainChanged", handleChainChanged);

    ethereum
      .request({ method: "eth_accounts" })
      .then(accounts => initiateAccount(accounts, currentAccount, setCurrentAccount))
      .catch(err => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });
    ethereum.on("accountsChanged", handleAccountsChanged);

    console.log("load 1", window.web3);
  } else if (window.web3) {
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    window.web3 = new Web3(window.web3.currentProvider);
    setWalletStatus(true);

    chainId = await ethereum.request({ method: "eth_chainId" });
    handleChainChanged(chainId);
    ethereum.on("chainChanged", handleChainChanged);

    console.log("load 2");
  } else {
    setWalletStatus(false);
    window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    console.log("load 3");
  }
}
// No need to export as the function is only used in this file
function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  console.log("called 123");
  window.location.reload(true);
}
// No need to export as the function is only used in this file
function handleAccountsChanged(accounts, currentAccount) {
  console.log("current account called 321", accounts);
  window.location.reload(true);
}
// No need to export as the function is only used in this file
function initiateAccount(accounts, currentAccount, setCurrentAccount) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log("Please connect to MetaMask.");
  } else if (accounts[0] !== currentAccount) {
    setCurrentAccount(accounts[0]);
    console.log("current account ", accounts[0], currentAccount);
    // Do any other work!
  }
}
// No need to export as the function is only used in this file
function verifyAcc(accessCode, setUsername, setAccId, setAvatarId, setTokenReward) {
  axios
    .get(`${process.env.GATSBY_SERVER_ADDRESS}/verifyAcc?authorization=${accessCode}`)
    .then(function(response) {
      console.log(response.data);
      setUsername(response.data.username);
      setAccId(response.data.id);
      setAvatarId(response.data.avatar);
      setTokenReward(baseTokenReward);
    })
    .catch(function(error) {
      console.log("err1,", error);
    });
}
