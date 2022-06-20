import React, { useContext, useState } from "react";
import { ThemeContext } from "providers/ThemeProvider";

import ToggleTheme from "components/theme/Header/ToggleTheme";
import { Wrapper } from "./styles";
import { JoinButton } from "../../../common";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as pagesUtils from "../../../../utils/pagesUtils";
import { useLocation } from '@reach/router';

import { WalletContext } from "providers/WalletProvider";

const NavbarLinks = ({ desktop }) => {
  const pathname = useLocation().pathname.replace(/\//g, '');
  console.log("pathname ", pathname);
  console.log("pathname true ", pathname == "veSHN");

  const { theme } = useContext(ThemeContext);

  const { isWalletEnabled, setWalletStatus, chainId, setChainId, currentAccount, setCurrentAccount } = useContext(WalletContext);

  const options = [
    { value: "0x1", label: "Ethereum" },
    { value: "0x89", label: "Polygon/Matic" },
    //{ value: "0x13881", label: "Mumbai testnet" },
  ];

  let defaultOption;
  if (chainId == "0x1") {
    defaultOption = options[0];
  } else if (chainId == "0x89") {
    defaultOption = options[1];
  }// else if (chainId == "0x13881") {
   // defaultOption = options[2];
  //} 
  else {
    defaultOption = { value: "", label: "Chain unrecognized" };
  }

  function manageButtonClick(pathname, setWalletStatus, setChainId, currentAccount, setCurrentAccount) {
    if (pathname != "veSHN") {
      window.location.href = "#about";
    } else {
      pagesUtils.loadWeb3(setWalletStatus, setChainId, currentAccount, setCurrentAccount);
    }
  }

  function handleDropdown(option) {
    console.log("selected option", option);
    if (option.value == "0x1") {
      pagesUtils.switchToMainnet();
    } else if (option.value == "0x89") {
      pagesUtils.switchChain("0x89");
    } else if (option.value == "0x13881") {
      pagesUtils.switchChain("0x13881");
    }
    setChainId(option.value);
  }
  return (
    <div>

    
    <Wrapper desktop={desktop} theme={theme}>
       <a href="https://app.shinedao.finance/veSHN/" target="_blank">
        Stake
      </a>
      <a href="http://docs.shinedao.finance" target="_blank">
        Docs
      </a>
      <a href="http://forum.shinedao.finance" target="_blank">
        Forum
      </a>
      <a href="/news" target="_blank">
        News
      </a>
      <a href="/seed-sale" target="_blank">
        Seed
      </a>
      {/*<a href="https://shinedao.finance/Litepaper.pdf" target="_blank">Litepaper</a>*/}
      {isWalletEnabled == true && currentAccount != null ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown className="dropDownWrapper" options={options} onChange={option => handleDropdown(option)} value={defaultOption} placeholder="Please select the chain" />
          <div style={{ marginLeft: 5 }}>
            {currentAccount.substring(0, 6)}...
            {currentAccount.substring(currentAccount.length - 4)}
          </div>
        </div>
      ) : (
        <JoinButton onClick={() => manageButtonClick(pathname, setWalletStatus, setChainId, currentAccount, setCurrentAccount)} theme={theme}>
          {pathname == "veSHN" ? "Connect Wallet" : "See Upcoming Projects"}
        </JoinButton>
      )}
      <ToggleTheme />
    </Wrapper>
    </div>
    
  );
};

export default NavbarLinks;
