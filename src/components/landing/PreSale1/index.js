import React, { useContext, useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ThemeContext } from "providers/ThemeProvider";
import { Header } from "components/theme";
import { Container, Button } from "components/common";
import shineNetwork from "assets/illustrations/shine-network.svg";
import shineNetworkV1 from "assets/illustrations/shine-network-v1.svg";
import shineNetworkV2 from "assets/illustrations/shine-network-v2.svg";
import shineNetworkV3 from "assets/illustrations/shine-network-v3.png";

import shineLogo from "assets/illustrations/shine-logo.png";
import shineLogoV1 from "assets/illustrations/shine-logo-v1.png";
import shineLogoV2 from "assets/illustrations/shine-logo-v2.png";
import shineLogoV3 from "assets/illustrations/shine-logo-v3.png";
import shineLogoV4 from "assets/illustrations/shine-logo-v4.png";
import shineLogoV5 from "assets/illustrations/shine-logo-v5.png";
import shineLogoV7 from "assets/illustrations/shine-logo-v7.png";

import { Wrapper, IntroWrapper, Details, Thumbnail, ThumbnailBig, Link, SaleCard, StatusContainer, Dot, EthInput, ColorTitle } from "./styles";

import { Card } from "../../common/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import Wallet from "components/theme/Header/Wallet";
import Web3 from "web3";

import ShineToken from "../../../../static/abi/ShineToken.json";
import SeedCrowdsale from "../../../../static/abi/PreSale1.json";
import Migrations from "../../../../static/abi/Migrations.json";

import PulseLoader from "react-spinners/PulseLoader";
const axios = require("axios");
//Note that you need to select a different user from what created the inital ShineToken, e.g. accounts[1] instead of accounts[0]
// var userAddress = "0xb1D92EEec6f9F224ABD294DE643C94A01cB14E51";
//var userAddress = window.ethereum.selectedAddress
var seedSalecontractAddress = "0x8BeB4C957B5ED91023f4a307bf175E6E3EC70Fe9";
var tokenContractAddress = "0x1C7ede23b1361acC098A1e357C9085D131b34a01";
var migrationsContractAddress = "0xbACf2F11eB10475DA816c1ADCB8B376FffD1544c";
var tokensOffered = "7000000000000000000000000"
var rate = 84000;
var gas = 1500000;

var maxWeiToRaise = tokensOffered / rate; // 7 M SHN tokens * rate
async function getCurrentMigrations() {
  let abiArray = Migrations;
  let abi = abiArray.abi;
  let migrationsInstance = new window.web3.eth.Contract(abi, migrationsContractAddress);
  let currentMigration = await migrationsInstance.methods.last_completed_migration().call();
  console.log("current migrations is ", currentMigration);
}
async function addToWatchlist(){

  window.web3.currentProvider.sendAsync({
    method: 'metamask_watchAsset',
    params: {
      "type":"ERC20", // Initially only supports ERC20, but eventually more!
      "options":{
        "address": "0x1C7ede23b1361acC098A1e357C9085D131b34a01", // The address that the token is at.
        "symbol": "SHN", // A ticker symbol or shorthand, up to 5 chars.
        "decimals": 18, // The number of decimals in the token
        "image": "tokenImage", // A string url of the token logo
      },
    },
    id: Math.round(Math.random() * 100000),
  }, (err, addedBoolean) => {

  })
}
async function getUserAddress(setUserAddress, setShineBalance) {
  let userAddress = await window.ethereum.selectedAddress;
  setUserAddress(userAddress);
  await getShineBalance(setShineBalance, userAddress);
}

async function getWeiRaised(setWeiRaised) {
  let abiArray = SeedCrowdsale;
  let abi = abiArray.abi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, seedSalecontractAddress);
  let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();

  setWeiRaised(weiRaised);
  console.log("Wei raised so far", weiRaised);
}

async function getSeedSaleShnBalance(setSeedSaleShnBalance) {
  var abiArrayToken = ShineToken;
  var abiToken = abiArrayToken.abi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);
  var seedSaleShnBalance = await tokenInst.methods.balanceOf(seedSalecontractAddress).call();
  let shnAvailable = window.web3.utils.fromWei(seedSaleShnBalance.toString(), "ether");

  setSeedSaleShnBalance(shnAvailable);
}

async function getEthRaised(setEthRaised) {
  let abiArray = SeedCrowdsale;
  let abi = abiArray.abi;
  let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, seedSalecontractAddress);
  let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();
  let ethRaised = window.web3.utils.fromWei(weiRaised.toString(), "ether");
  setEthRaised(ethRaised);
  console.log("Eth raised so far", ethRaised);
}

async function getEthBalance(setBalance) {
  window.web3.eth.getBalance(window.ethereum.selectedAddress, (err, balance) => {
    //console.log(window.web3.utils.fromWei(balance, "ether") + " ETH");
    setBalance(window.web3.utils.fromWei(balance.toString(), "ether"));
  });
}
async function getShineBalance(setShineBalance, userAddress) {
  var abiArrayToken = ShineToken;
  var abiToken = abiArrayToken.abi;
  var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

  var shineBalance = await tokenInst.methods.balanceOf(userAddress).call();

  var shineBalanceFromWei = window.web3.utils.fromWei(shineBalance, "ether");
  setShineBalance(shineBalanceFromWei);
}
async function buyShineTokens(
  ethAmountToSpend,
  setEthAmountToSpend,
  setShineBought,
  setShineBoughtAmount,
  setTransactionBeingProcessed,
  setMetamaskErrorCode,
  userAddress
) {
  if (ethAmountToSpend !== "") { //disable button if no amount is entered
    let abiArray = SeedCrowdsale;
    let abi = abiArray.abi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, seedSalecontractAddress);

    setTransactionBeingProcessed(true);
    setMetamaskErrorCode(undefined)

    try {
      let estimatedGas = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).estimateGas({
        from: userAddress,
        value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
        gas: gas,
      })


      console.log("estimated gas ", estimatedGas)

      console.log("eth amount to spend", ethAmountToSpend);
      const receipt = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).send({
        from: userAddress,
        value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
        gas: estimatedGas,
      });
      console.log("receipt", receipt);
      var amountBoughtInWei = receipt.events.TokensPurchased.returnValues.amount;
      var amountBoughtInTKNs = window.web3.utils.fromWei(amountBoughtInWei, "ether");

      setShineBought(true);
      setShineBoughtAmount(amountBoughtInTKNs);
      setEthAmountToSpend("");
    } catch (e) {
      setShineBought(false);
      console.log("err ", e);
      console.log("User rejected transaction", e.code);

      if (e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded") >= 0) {
        setMetamaskErrorCode("Your total amount exceeds maximum participation");
      } else if (e.code === 4001) {
        setMetamaskErrorCode(e.message); //MetaMask Tx Signature: User denied transaction signature.
      } else {
        setMetamaskErrorCode("There are not enough SHN tokens left for sale anymore"); //"There are not enough SHN tokens left for sale anymore"
      }
      let searchCapExceeded = e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded")
      console.log("search ", searchCapExceeded) //149
      // console.log("metamask code", metamaskErrorCode)
    }
    setTransactionBeingProcessed(false);
  }

}

async function loadWeb3(setWalletStatus, setBalance) {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    await getEthBalance(setBalance);
    setWalletStatus(true);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    setWalletStatus(true);
  } else {
    setWalletStatus(false);
    window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
}

function handleChangeOfEthAmountToSpend(amount, setEthAmountToSpend) {
  setEthAmountToSpend(amount);
}

function toPlainString(num) {
  return num.toLocaleString("fullwide", { useGrouping: false });
}

function estimateReceivedShn(ethAmountToSpend) {
  console.log("eth to spend", ethAmountToSpend);
  const weiAmountToSpend = window.web3.utils.toWei(ethAmountToSpend.toString(), "ether");
  console.log("wei", toPlainString(weiAmountToSpend * rate));

  console.log("www", weiAmountToSpend * rate);

  //const estimatedShnInWei = weiAmountToSpend * rate
  const estimatedReceivedShn = window.web3.utils.fromWei(toPlainString(weiAmountToSpend * rate), "ether");
  return Number.parseFloat(estimatedReceivedShn);
}
export const PreSale1 = () => {
  const { theme } = useContext(ThemeContext);
  const now = 60;

  const [isWalletEnabled, setWalletStatus] = useState();
  const [balance, setBalance] = useState();
  const [shineBalance, setShineBalance] = useState();
  const [isShineBought, setShineBought] = useState(false);
  const [shineBoughtAmount, setShineBoughtAmount] = useState(false);
  const [isTransactionBeingProcessed, setTransactionBeingProcessed] = useState(false);
  const [ethAmountToSpend, setEthAmountToSpend] = useState("");
  const [currentEthPrice, setCurrentEthPrice] = useState();
  const [ethRaised, setEthRaised] = useState();
  const [weiRaised, setWeiRaised] = useState();
  const [seedSaleShnBalance, setSeedSaleShnBalance] = useState();
  const [metamaskErrorCode, setMetamaskErrorCode] = useState();
  const [saleProgress, setSaleProgress] = useState();
  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
    isWalletEnabled ? getEthBalance(setBalance) : null;
    isWalletEnabled ? getEthRaised(setEthRaised) : null;
    isWalletEnabled ? getWeiRaised(setWeiRaised) : null;
    isWalletEnabled ? getSeedSaleShnBalance(setSeedSaleShnBalance) : null;
    isWalletEnabled ? getUserAddress(setUserAddress, setShineBalance) : null;
    isWalletEnabled ? getCurrentMigrations() : null;
  }, [isWalletEnabled, isTransactionBeingProcessed, isShineBought]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum")
      .then(function (response) {
        // handle success
        setCurrentEthPrice(response.data[0].current_price);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [ethAmountToSpend]);

  useEffect(() => {
    console.log("wwwwwwwwww ", weiRaised);
    isWalletEnabled && setSaleProgress(((weiRaised / maxWeiToRaise) * 100).toFixed(2));
  }, [weiRaised]);

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Shine Pre Sale (Tranche I)</h1>
          <h5>
            Token address{" "}
            <a href="https://etherscan.io/address/0x1C7ede23b1361acC098A1e357C9085D131b34a01" target="_blank">
              0x1C7ede23b1361acC098A1e357C9085D131b34a01
            </a>
          </h5>

          <Thumbnail>
            <img src={shineLogoV7} alt="Shine is meant to interconnect the blockchain community" />
          </Thumbnail>
        </Details>

        <Thumbnail>
          <Link></Link>
          {isWalletEnabled ? (
            <div>
              <span>Account: {window.ethereum.selectedAddress}</span>
              <br></br>
              <span>Balance: {balance} ETH</span>
              <br></br>
              <span>Shine Balance: {Number.parseFloat(shineBalance).toLocaleString()} SHN ✨</span>
              <br></br>
              {false && <span>SeedSale Contract Shn Balance: {Number.parseFloat(seedSaleShnBalance).toLocaleString()} SHN</span>}
              <br></br>
            </div>
          ) : (
            <Button onClick={() => loadWeb3(setWalletStatus, setBalance)}>Connect Wallet </Button>
          )}

          <SaleCard>
            Sale status
            <StatusContainer>
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#10b981"></circle>{/* #10b981 */}
              </svg>
              <span> <b>Sold out</b></span>
            </StatusContainer>
            <br></br>
            Total Swap amount: 7,000,000 SHN
            <br></br>
            Max participation: 5 ETH
            <br></br>
            Rate: ≈ $0.025 / 1 SHN
            <br></br>
            {false && <span>ETH raised so far {ethRaised} ETH </span>}
            <br></br>
            {console.log("weiRaised raised", weiRaised)}
            {console.log("maxWeiToRaise raised", maxWeiToRaise)}
            {weiRaised && (
              <div>
                <span>Sale progress </span>
                <ProgressBar animated striped variant="success" now={saleProgress} label={`${saleProgress}%`} />
              </div>
            )}
            <br></br>
            {metamaskErrorCode && <ColorTitle>{metamaskErrorCode} </ColorTitle>}
            {isWalletEnabled && !isTransactionBeingProcessed && (
              <div>
                <label htmlFor="eth_amount">Enter ETH amount:</label>
                <br></br>
                <EthInput
                  autoComplete="off"
                  type="number"
                  id="eth_amount"
                  value={ethAmountToSpend}
                  onChange={(e) => handleChangeOfEthAmountToSpend(e.target.value, setEthAmountToSpend)}
                ></EthInput>
                {ethAmountToSpend && (
                  <span>
                    <span> ≈ {Number.parseFloat(currentEthPrice * ethAmountToSpend).toLocaleString()} USD</span> <br></br>{" "}
                    <span>Estimated SHN to receive: {estimateReceivedShn(ethAmountToSpend).toLocaleString()}</span>
                  </span>
                )}
                <br></br>
                <br></br>

                <Button
                  onClick={() =>
                    buyShineTokens(
                      ethAmountToSpend,
                      setEthAmountToSpend,
                      setShineBought,
                      setShineBoughtAmount,
                      setTransactionBeingProcessed,
                      setMetamaskErrorCode,
                      userAddress
                    )
                  }
                >
                  Buy Shine
                </Button>
              </div>
            )}
            {isShineBought && !isTransactionBeingProcessed && (
              <div>
                <h4>You just successfully bought {Number.parseFloat(shineBoughtAmount).toLocaleString()} Shine!</h4>
                {false && <Button onClick={()=>addToWatchlist()}>Add SHN to MetaMask</Button>}
              </div>
            )}
            {isTransactionBeingProcessed && (
              <div>
                {" "}
                <h5>Processing </h5>
                <PulseLoader color={"yellow"} loading={true} size={15} margin={2} /> <br></br> <br></br>
                <h5>
                  <i>(Can take up to few minutes)</i>
                </h5>
              </div>
            )}
          </SaleCard>
        </Thumbnail>
      </IntroWrapper>
    </Wrapper>
  );
};
