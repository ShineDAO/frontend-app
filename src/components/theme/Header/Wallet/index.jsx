// App.js

import React from "react";
import { useWallet, UseWalletProvider } from "use-wallet";

import { Button, LearnButton } from "components/common";

import Web3 from 'web3';


function Wallet() {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();

  //const web3 = new Web3("http://localhost:8545");

  //console.log("web3 ", web3)


  //wallet.ethereum.request()


  const promisify = (inner) =>
  new Promise((resolve, reject) =>
      inner((err, res) => {
          if (err) {
              reject(err);
          } else {
              resolve(res);
          }
      })
  );
  async function getBalance() {
    var address, wei, balance
    address = "0x8124CeEDF0B9c98aaA2B6d9A3c29A6e4b8f53f47"
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        console.log("ballll ", balance)
        //document.getElementById("output").innerHTML = balance + " ETH";
    } catch (error) {
        //document.getElementById("output").innerHTML = error;
    }
}

  var web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function() {
          console.log("works")
          getBalance()
          // User has allowed account access to DApp...
        });
      } catch (e) {
        console.log("doesnt work")

        // User has denied account access to DApp...
      }
    }





  const ethAmount = web3.utils.fromWei(wallet.balance, 'ether');
  console.log("amm ", ethAmount)
  return (
    <>
      {wallet.status === "connected" ? (

        <div style={{paddingBottom:15}}>
          {console.log("wallet ", wallet)}
          <div>Account: {wallet.account}</div>
          <div>Balance: {ethAmount} ETH</div>
          <LearnButton theme={theme}>
          <a  onClick={() => {}}>
            Buy SHN tokens
          </a>
        </LearnButton>
        <br></br>
         {//<button onClick={() => wallet.reset()}>disconnect</button>
         }
        </div>
      ) : (
        <Button>
          <a  onClick={() => wallet.connect()}>
            Connect Wallet
          </a>
        </Button>
      )}
    </>
  );
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: "my-dapp-id-123-xyz" },
    }}
  >
    <Wallet />
  </UseWalletProvider>
);
