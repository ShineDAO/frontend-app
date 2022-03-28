import React, { useContext, useState } from "react";
import { ThemeContext } from "providers/ThemeProvider";

import ToggleTheme from "components/theme/Header/ToggleTheme";
import { Wrapper } from "./styles";
import { JoinButton } from "../../../common";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as pagesUtils from "../../../../utils/pagesUtils";


const NavbarLinks = ({ desktop, pathname
}) => {
  console.log("pathname ", pathname);
  console.log("pathname true ", pathname == "veSHN");

  const { theme } = useContext(ThemeContext);


  const [isWalletEnabled, setWalletStatus] = useState();
  const [chainId, setChainId] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);
  const options = [
    { value: '0x1', label: 'Ethereum' },
    { value: '0x89', label: 'Polygon/Matic' },
  ];

  let defaultOption
  if (chainId=="0x1"){
     defaultOption = options[0];
  }else if(chainId=="0x89"){
     defaultOption = options[1];
  }else{
     defaultOption = {value:'', label:"Chain unrecognized"}
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
    pagesUtils.switchChain()
    setChainId(option.value)
  }
  return (
    <Wrapper desktop={desktop} theme={theme}>
      <a href="http://docs.shinedao.finance" target="_blank">
        DOCS
      </a>
      <a href="http://forum.shinedao.finance" target="_blank">
        FORUM
      </a>
      <a href="/news" target="_blank">
        NEWS
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
          {pathname == "veSHN" ? "CONNECT WALLET" : "SEE UPCOMING PROJECTS"}
        </JoinButton>
      )}
      <ToggleTheme />
    </Wrapper>
  );
};

export default NavbarLinks;
