import React, { useContext, useState, useEffect } from "react";
import { Layout, SEO, Button, Card, Text, MobileDiv } from "components/common";
import { Header } from "components/theme";
import { VeShnContainer } from "../components/common/subpages/veShnContainer";
import { StakingContainer } from "components/common/subpages/stakingContainer";
import { HorizontalRuler } from "components/common/HorizontalRuler";
import { ThemeContext } from "providers/ThemeProvider";
import { WalletContext } from "providers/WalletProvider";
import { ControllerPanel } from "components/common/subpages/controllerPanel";
import { SeedContainer } from "components/common/subpages/seed/seedContainer";
import { useQueryParam } from "../hooks/useQueryParam";

export default ({}) => {
  const [activeContract, setActiveContract] = useQueryParam(`tag`);
  const [chainQueryParam, setChainQueryParam] = useQueryParam(`chain`); // full name e.g. "optimism"
  const { isWalletEnabled, chainId } = useContext(WalletContext);

  function isChainSupported(chainId){
    const supportedChainsMapper = {
      "0x89":"polygon",
      "0xa":"optimism",
      "0xa4b1":"arbitrum",
      "0x4e454152":"aurora",
      "0x13881":"mumbai",
    }
    if(typeof supportedChainsMapper[chainId]!="undefined"){
      return true
    }else{
      return false
    }
  }
  return (
    <Layout position="absolute" bottom="4px" width="100%" height="60px">
      <SEO title="Deals" description="Discover and launch custom token deals" />
      <Header />
      <MobileDiv mobileWidth="100%" width="90%" background="" style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
        {true && !isWalletEnabled && <h3 style={{ paddingTop: 80 }}>Please connect your wallet to see and create deals.</h3>}
    {console.log("chainId 23", chainId, process.env.NODE_ENV)}
        {isChainSupported(chainId) || (process.env.NODE_ENV == "development" && chainId == "0x7a69") ? (
          <SeedContainer chainQueryParam={chainQueryParam} activeContract={activeContract} setActiveContract={setActiveContract}></SeedContainer>
        ) : (
          isWalletEnabled && (
            <div style={{ textAlign: "center" }}>
              <br></br>
              <Text style={{ marginTop: 80 }} fontWeight="600">
                Chain unsupported
              </Text>
              <br></br>
              <p style={{ marginLeft: 80, marginRight: 80 }}>Please select the supported chain from the drop-down menu.</p>
            </div>
          )
        )}
      </MobileDiv>
    </Layout>
  );
};
//0x539 - ganache
//0x7a69 - hardhat
//0x13881 - mumbai
//0x89 - polygon
